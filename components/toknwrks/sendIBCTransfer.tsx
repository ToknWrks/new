import { SigningStargateClient } from "@cosmjs/stargate";
import { CHAINS } from "./chains"; // Import the chain configurations

const checkAccountBalance = async (client: SigningStargateClient, address: string, denom: string) => {
  try {
    const balance = await client.getBalance(address, denom);
    console.log("Account balance:", balance);
    return balance;
  } catch (error) {
    console.error("Failed to fetch account balance:", error);
    throw error;
  }
};

const extractDenom = (amount: string) => {
  const denom = amount.match(/[a-zA-Z]+/g)?.[0];
  if (!denom) {
    throw new Error("Invalid denom");
  }
  return denom;
};

const extractAmount = (amount: string) => {
  const value = amount.match(/\d+/g)?.[0];
  if (!value) {
    throw new Error("Invalid amount");
  }
  return value;
};

const convertToSmallestUnit = (amount: number, decimals: number) => {
  return (amount * Math.pow(10, decimals)).toFixed(0);
};

const getOsmosisAddress = async () => {
  if (!window.keplr) {
    throw new Error("Keplr extension is required");
  }
  await window.keplr.enable("osmosis-1");
  const offlineSigner = window.keplr.getOfflineSigner("osmosis-1");
  const accounts = await offlineSigner.getAccounts();
  return accounts[0].address;
};

export const sendIBCTransfer = async (sourceChainId: string, address: string, recipientAddress: string, amount: string) => {
  try {
    console.log(`Sending tokens from ${sourceChainId} to Osmosis...`);

    // Find the source chain configuration
    const sourceChain = CHAINS.find(chain => chain.chainId === sourceChainId);
    if (!sourceChain) {
      throw new Error(`Source chain configuration not found for chainId: ${sourceChainId}`);
    }

    // Enable the source chain
    await window.keplr.enable(sourceChainId);
    const offlineSigner = window.keplr.getOfflineSigner(sourceChainId);

    // Retrieve account information for the source chain
    const accounts = await offlineSigner.getAccounts();
    if (accounts.length === 0) {
      throw new Error("Failed to retrieve account from signer");
    }
    const sourceChainAddress = accounts[0].address;
    console.log("Retrieved source chain account:", sourceChainAddress);

    const client = await SigningStargateClient.connectWithSigner(
      sourceChain.rpcEndpoint, // Use the RPC endpoint from the chain configuration
      offlineSigner
    );

    // Extract denom and amount from the amount string
    const denom = extractDenom(amount);
    const value = extractAmount(amount);
    if (!denom || !value) {
      throw new Error("Invalid amount or denom");
    }

    // Convert the required amount to the smallest unit
    const requiredAmount = convertToSmallestUnit(parseFloat(value), sourceChain.decimals);

    // Check account balance
    const balance = await checkAccountBalance(client, sourceChainAddress, denom);
    console.log(`Required amount: ${requiredAmount}, Available balance: ${balance.amount}`);
    if (parseInt(balance.amount, 10) < parseInt(requiredAmount, 10)) {
      throw new Error("Insufficient funds to cover the transaction fees");
    }

    // Prepare the IBC transfer message
    const message = {
      typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
      value: {
        source_port: 'transfer',
        source_channel: sourceChain.sourceChannel,
        token: {
          denom: denom,
          amount: requiredAmount,
        },
        sender: sourceChainAddress,
        receiver: recipientAddress,
        timeout_timestamp: (Date.now() + 1000 * 60 * 10) * 1e6, // 10 minutes from now in nanoseconds
      },
    };

    // Prepare transaction fee with "auto" gas estimation
    const fee = {
      amount: [{ denom: denom, amount: "200000" }],
      gas: "auto",
    };

    // Send the transaction
    const result = await client.signAndBroadcast(
      sourceChainAddress,
      [message],
      fee,
      "Sending tokens to Osmosis"
    );

    if (result.code !== 0) {
      throw new Error(`Failed to send tokens: ${result.rawLog}`);
    }

    console.log(`Tokens sent to Osmosis successfully. Transaction Hash: ${result.transactionHash}`);
  } catch (error) {
    console.error(`Error sending tokens:`, error);
    throw error;
  }
};

