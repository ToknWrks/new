import { useState, useEffect } from "react";
import { SigningStargateClient } from "@cosmjs/stargate";
import axios from "axios";

interface ClaimRewardsProps {
  address: string;
  chainId: string;
  rpcEndpoint: string;
  denom: string;
  onProgress: (step: number) => void;
}

const ClaimRewards = ({ address, chainId, rpcEndpoint, denom, onProgress }: ClaimRewardsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [validatorAddresses, setValidatorAddresses] = useState<string[]>([]);
  const [osmosisAddress, setOsmosisAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchDelegations = async () => {
      try {
        const response = await axios.get(`https://api.cosmos.network/cosmos/staking/v1beta1/delegations/${address}`);
        const delegations = response.data.delegation_responses;
        const validators = delegations.map((delegation: any) => delegation.delegation.validator_address);
        setValidatorAddresses(validators);
      } catch (error) {
        console.error("Failed to fetch delegations:", error);
      }
    };

    const fetchOsmosisAddress = async () => {
      if (window.keplr) {
        await window.keplr.enable("osmosis-1");
        const osmosisOfflineSigner = window.keplr.getOfflineSigner("osmosis-1");
        const osmosisAccounts = await osmosisOfflineSigner.getAccounts();
        setOsmosisAddress(osmosisAccounts[0].address);
      }
    };

    fetchDelegations();
    fetchOsmosisAddress();
  }, [address]);

  const claimRewards = async () => {
    try {
      if (validatorAddresses.length === 0 || !osmosisAddress) {
        console.error("Validator addresses or Osmosis address not available");
        return;
      }

      // Step 1: Claim rewards
      onProgress(0);
      const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, window.keplr.getOfflineSigner(chainId));
      const claimMsgs = validatorAddresses.map((validatorAddress) => ({
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: {
          delegatorAddress: address,
          validatorAddress: validatorAddress,
        },
      }));
      const fee = {
        amount: [{ denom, amount: "5000" }],
        gas: "200000",
      };
      await client.signAndBroadcast(address, claimMsgs, fee);

      // Step 2: Send to Osmosis
      onProgress(1);
      const sendMsg = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: {
          fromAddress: address,
          toAddress: osmosisAddress,
          amount: [{ denom, amount: "1000000" }], // Replace with actual amount
        },
      };
      await client.signAndBroadcast(address, [sendMsg], fee);

      // Step 3: Swap for USDC
      onProgress(2);
      // Implement swap logic here

      onProgress(3);
    } catch (error) {
      console.error("Failed to claim rewards:", error);
    }
  };

  return (
    <div>
      <button onClick={claimRewards}>Claim Rewards</button>
    </div>
  );
};

export default ClaimRewards;