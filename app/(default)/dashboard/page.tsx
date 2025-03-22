"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import PageIllustration from "@/components/page-illustration";
import FooterSeparator from "@/components/footer-separator";
import { CHAINS, AddressesForChain } from "@/components/toknwrks/chains";
import { useWallet } from "@/components/toknwrks/WalletContext";
import { SigningStargateClient, MsgWithdrawDelegatorRewardEncodeObject, MsgSendEncodeObject, AminoTypes } from "@cosmjs/stargate";
import { MsgWithdrawDelegatorReward } from "cosmjs-types/cosmos/distribution/v1beta1/tx";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { Registry, GeneratedType } from "@cosmjs/proto-signing";
import { osmosis } from "osmojs"; // Correct import
import { ibc } from 'osmojs';
import { sendIBCTransfer } from "@/components/toknwrks/sendIBCTransfer";
import DashboardTotalChart from "@/components/toknwrks/dashboardTotalChart";
import WalletConnection from "@/components/toknwrks/WalletConnection"; // Import WalletConnection

const priceCache: { [key: string]: number } = {};
const rateLimit = 10; // Number of requests per minute
let requestCount = 0;
let lastRequestTime = Date.now();

const fetchAssetPrice = async (assetId: string) => {
  if (priceCache[assetId]) {
    return priceCache[assetId];
  }

  if (requestCount >= rateLimit && Date.now() - lastRequestTime < 60000) {
    console.warn("Rate limit exceeded, waiting...");
    await new Promise(resolve => setTimeout(resolve, 60000 - (Date.now() - lastRequestTime)));
    requestCount = 0;
    lastRequestTime = Date.now();
  }

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${assetId}&vs_currencies=usd`;
    const res = await fetch(url);
    const data = await res.json();
    const price = data[assetId]?.usd || 0;
    priceCache[assetId] = price;
    requestCount++;
    return price;
  } catch (err) {
    console.error(`Failed to fetch price for ${assetId}:`, err);
    if (priceCache[assetId]) {
      console.warn(`Using cached price for ${assetId}: ${priceCache[assetId]}`);
      return priceCache[assetId];
    }
    return 0;
  }
};

const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const calculateSwapAmount = (rewardAmount: number, swapPercentage: number) => {
  return rewardAmount * (swapPercentage / 100);
};

const convertToSmallestUnit = (amount: number, decimals: number) => {
  return Math.floor(amount * Math.pow(10, decimals));
};

// UI 

export default function ClaimRewardsPage() {
  const { cosmosAddress, signer, connectWallet } = useWallet();
  const [unclaimedRewards, setUnclaimedRewards] = useState<{ [key: string]: number }>({});
  const [assetPrices, setAssetPrices] = useState<{ [key: string]: number }>({});
  const [claimStatus, setClaimStatus] = useState("");
  const [savedChains, setSavedChains] = useState<string[]>([]);
  const [swapPercentage, setSwapPercentage] = useState<number>(0);
  const [tokensUnswapped, setTokensUnswapped] = useState<number>(0);
  const [costBasis, setCostBasis] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [addresses, setAddresses] = useState<{ [key: string]: string | null }>({});
  const [visibleCards, setVisibleCards] = useState<number>(7);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [stakedTokens, setStakedTokens] = useState<{ [key: string]: number }>({});
  const [availableTokens, setAvailableTokens] = useState<{ [key: string]: number }>({});

  const handleClaim = async (chainName: string, validatorAddress: string) => {
    if (!signer || !cosmosAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const aminoTypes = new AminoTypes({
        "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": {
          aminoType: "cosmos-sdk/MsgWithdrawDelegatorReward",
          toAmino: ({ delegatorAddress, validatorAddress }) => ({
            delegator_address: delegatorAddress,
            validator_address: validatorAddress,
          }),
          fromAmino: ({ delegator_address, validator_address }) => ({
            delegatorAddress: delegator_address,
            validatorAddress: validator_address,
          }),
        },
      });
      const client = await SigningStargateClient.connectWithSigner("https://rpc.cosmos.network", signer, { aminoTypes });
      const msg: MsgWithdrawDelegatorRewardEncodeObject = {
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: MsgWithdrawDelegatorReward.fromPartial({
          delegatorAddress: cosmosAddress,
          validatorAddress: validatorAddress,
        }),
      };

      const fee = {
        amount: [{ denom: "uatom", amount: "5000" }],
        gas: "200000",
      };

      const result = await client.signAndBroadcast(cosmosAddress, [msg], fee);
      if (result.code !== undefined && result.code !== 0) {
        throw new Error(`Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`);
      }

      alert("Claim successful!");
    } catch (error) {
      console.error("Error claiming rewards:", error);
      alert("Error claiming rewards. Check the console for more details.");
    }
  };

  useEffect(() => {
    const savedChains = localStorage.getItem("savedChains") || "[]";
    if (savedChains) {
      setSavedChains(JSON.parse(savedChains));
    }
    const savedSettings = localStorage.getItem("dashboardSettings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSwapPercentage(settings.SwapPercentage || 0);
      setTokensUnswapped(settings.TokensUnswapped || 0);
      setCostBasis(settings.CostBasis || 0);
      setTaxRate(settings.TaxRate || 0);
      setTipAmount(settings.TipAmount || 0);
    }
  }, []);

  useEffect(() => {
    const enableChains = async () => {
      if (!window.keplr && !window.leap) {
        console.warn("Keplr or Leap extension is not installed");
        return;
      }

      try {
        for (const chain of CHAINS) {
          if (chain.chainName && savedChains.includes(chain.chainName)) {
            if (window.keplr) {
              await window.keplr.enable(chain.chainId);
              const offlineSigner = window.keplr.getOfflineSigner(chain.chainId);
              const accounts = await offlineSigner.getAccounts();
              setAddresses((prev) => ({ ...prev, [String(chain.chainName)]: accounts[0].address }));
            } else if (window.leap) {
              await window.leap.enable(chain.chainId);
              const offlineSigner = window.leap.getOfflineSigner(chain.chainId);
              const accounts = await offlineSigner.getAccounts();
              setAddresses((prev) => ({ ...prev, [String(chain.chainName)]: accounts[0].address }));
            }
          }
        }
      } catch (err) {
        console.error("Failed to enable chains:", err);
      }
    };

    enableChains();
  }, [savedChains]);

  const fetchStakedTokens = async (chain: any, address: string) => {
    try {
      const url = `${chain.restEndpoint}/cosmos/staking/v1beta1/delegations/${address}`;
      const res = await fetch(url);
      const data = await res.json();
      const stakedTokens = data.delegation_responses.reduce((acc: number, delegation: { balance: { amount: string } }) => {
        return acc + parseFloat(delegation.balance.amount);
      }, 0);
      const truncatedStakedTokens = chain.chainId === "injective-1" ? (stakedTokens / Math.pow(10, 18)).toFixed(2) : (stakedTokens / 1_000_000).toFixed(2);
      return parseFloat(truncatedStakedTokens); // Convert back to number
    } catch (err) {
      console.error(`Failed to fetch staked tokens for ${chain.chainId}:`, err);
      return 0;
    }
  };
  
  const fetchAvailableTokens = async (chain: any, address: string) => {
    try {
      const url = `${chain.restEndpoint}/cosmos/bank/v1beta1/balances/${address}`;
      const res = await fetch(url);
      const data = await res.json();
      const availableTokens = data.balances.find((balance: { denom: string }) => balance.denom === chain.Denom);
      const truncatedAvailableTokens = availableTokens ? (chain.chainId === "injective-1" ? (parseFloat(availableTokens.amount) / Math.pow(10, 18)).toFixed(2) : (parseFloat(availableTokens.amount) / 1_000_000).toFixed(2)) : "0.00";
      return parseFloat(truncatedAvailableTokens); // Convert back to number
    } catch (err) {
      console.error(`Failed to fetch available tokens for ${chain.chainId}:`, err);
      return 0;
    }
  };
  
  const fetchUnclaimedRewards = async (chain: any, address: string) => {
    try {
      const url = `${chain.restEndpoint}/cosmos/distribution/v1beta1/delegators/${address}/rewards`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(`API response for ${chain.chainId}:`, data);
      const rewards = data.total.reduce((acc: number, reward: { denom: string; amount: string }) => {
        if (reward.denom === chain.Denom) {
          return acc + parseFloat(reward.amount);
        }
        return acc;
      }, 0);
      console.log(`Fetched rewards for ${chain.chainId}: ${rewards}`);
      const truncatedRewards = chain.chainId === "injective-1" ? rewards / Math.pow(10, 18) : rewards / 1_000_000;
      return Math.floor(truncatedRewards * 100) / 100; // Truncate to 2 decimals
    } catch (err) {
      console.error(`Failed to fetch unclaimed rewards for ${chain.chainId}:`, err);
      return 0;
    }
  };

  useEffect(() => {
    const fetchAllUnclaimedRewards = async () => {
      const rewards: { [key: string]: number } = {};
      const prices: { [key: string]: number } = {};
      const staked: { [key: string]: number } = {};
      const available: { [key: string]: number } = {};
      for (const chain of CHAINS) {
        if (chain.chainName && savedChains.includes(chain.chainName)) {
          const address = addresses[chain.chainName];
          if (address) {
            const reward = await fetchUnclaimedRewards(chain, address);
            console.log(`Unclaimed rewards for ${chain.chainName}: ${reward}`);
            rewards[chain.chainName] = reward;

            const price = await fetchAssetPrice(chain.AssetId);
            console.log(`Price for ${chain.chainName}: ${price}`);
            prices[chain.chainName] = price;

            const stakedToken = await fetchStakedTokens(chain, address);
            console.log(`Staked tokens for ${chain.chainName}: ${stakedToken}`);
            staked[chain.chainName] = stakedToken;

            const availableToken = await fetchAvailableTokens(chain, address);
            console.log(`Available tokens for ${chain.chainName}: ${availableToken}`);
            available[chain.chainName] = availableToken;
          }
          
        }
      }
      console.log("Fetched all unclaimed rewards:", rewards);
      console.log("Fetched all asset prices:", prices);
      console.log("Fetched all staked tokens:", staked);
      console.log("Fetched all available tokens:", available);
      setStakedTokens(staked);
      setAvailableTokens(available);
      setUnclaimedRewards(rewards);
      setAssetPrices(prices);
    };

    if (Object.keys(addresses).length > 0) {
      fetchAllUnclaimedRewards();
    }
  }, [addresses, savedChains]);

  const calculateTotalClaimableRewards = () => {
    let total = 0;
    for (const chainName in unclaimedRewards) {
      if (unclaimedRewards.hasOwnProperty(chainName) && assetPrices[chainName] !== undefined) {
        total += unclaimedRewards[chainName] * assetPrices[chainName];
      }
    }
    return total.toFixed(2);
  };

  const calculateTaxAmount = (chainName: string) => {
    if (unclaimedRewards[chainName] && assetPrices[chainName] !== undefined) {
      return ((unclaimedRewards[chainName] * assetPrices[chainName]) * (taxRate / 100)).toFixed(2);
    }
    return "Loading...";
  };

  const calculateTipAmount = (chainName: string) => {
    if (unclaimedRewards[chainName] !== undefined) {
      return ((unclaimedRewards[chainName]) * (tipAmount / 100)).toFixed(2);
    }
    return "Loading...";
  };

  const loadMoreCards = () => {
    setVisibleCards((prev) => prev + 4);
  };
  const totalWalletValue = parseFloat(calculateTotalClaimableRewards());
  const chainValues = Object.keys(unclaimedRewards).reduce((acc, chainName) => {
    acc[chainName] = {
      totalValue: unclaimedRewards[chainName] * assetPrices[chainName],
      tokenPrice: assetPrices[chainName],
      stakedTokens: stakedTokens[chainName] || 0,
      unclaimedRewards: unclaimedRewards[chainName],
      availableTokens: availableTokens[chainName] || 0,
    };
    return acc;
  }, {} as { [key: string]: { totalValue: number; tokenPrice: number; stakedTokens: number; unclaimedRewards: number; availableTokens: number } });

  // Claiming rewards and swapping functions
 // Dynamic retrieval of validator addresses for claiming

 const fetchValidatorAddresses = async (chain:any, address: string): Promise<string[]> => {
  try {
    const url = `${chain.restEndpoint}/cosmos/staking/v1beta1/delegations/${address}`;
    const res = await fetch(url);
    const data = await res.json();
    const delegations = data.delegation_responses || [];
    return delegations.map((d: any) => d.delegation.validator_address);
  } catch (err) {
    console.error("Failed to fetch validator addresses:", err);
    return [];
  }
}


  const getOsmosisAddress = async () => {
    if (!window.keplr) {
      throw new Error("Keplr extension is not installed");
    }
    await window.keplr.enable("osmosis-1");
    const offlineSigner = window.keplr.getOfflineSigner("osmosis-1");
    const accounts = await offlineSigner.getAccounts();
    return accounts[0].address;
  };

  const claimRewards = async (chain: any, address: string) => {
    try {
      setClaimStatus(`Claiming rewards for ${chain.chainName}...`);
    
      if (!window.keplr && !window.leap) {
        throw new Error("Keplr or Leap extension is required");
      }
    
      await window.keplr.enable(chain.chainId);
  
      // Check if the connected account is using a Ledger
      const key = await window.keplr.getKey(chain.chainId);
      const isLedger = key.isNanoLedger || false;
      console.log("Using Ledger:", isLedger);
  
      // Use the appropriate signer based on whether it's a Ledger or not
      let signer;
      if (isLedger) {
        // Use Amino signer for Ledger
        signer = window.keplr.getOfflineSignerOnlyAmino(chain.chainId);
        console.log("Using Amino signer for Ledger");
      } else {
        // Use Direct signer for regular accounts
        signer = window.keplr.getOfflineSigner(chain.chainId);
        console.log("Using Direct signer");
      }
  
      const client = await SigningStargateClient.connectWithSigner(chain.rpcEndpoint, signer);
    
      const validators = await fetchValidatorAddresses(chain, address);
      if (validators.length === 0) {
        setClaimStatus(`No delegations found for ${chain.chainName}`);
        return;
      }
    
      const rewardMsgs = validators.map((valAddr: string): MsgWithdrawDelegatorRewardEncodeObject => ({
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: {
          delegatorAddress: address,
          validatorAddress: valAddr,
        },
      }));
  
      // Calculate the tip value
      const tipValue = (unclaimedRewards[chain.chainName] ?? 0) * (tipAmount / 100);
    
      // Create the MsgSend message for the tip
      const tipAddress = chain.tipAddress;
      if (!tipAddress) {
        throw new Error(`Tip address not found for ${chain.chainName}`);
      }
      const tipMsg: MsgSendEncodeObject = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: {
          fromAddress: address,
          toAddress: tipAddress,
          amount: [{ denom: chain.Denom, amount: convertToSmallestUnit(tipValue, 6).toString() }],
        },
      };
    
      const fee = {
        amount: [{ denom: chain.Denom, amount: "200000" }],
        gas: "2000000",
      };
    
      // Include the tipMsg in the messages array
      const result = await client.signAndBroadcast(address, [...rewardMsgs, tipMsg], fee, "Claiming rewards and sending tip");
    
      if (result.code !== 0) {
        throw new Error(`Failed to claim rewards: ${result.rawLog}`);
      }
    
      setClaimStatus(`Rewards claimed successfully for ${chain.chainName}`);
  
      // Conditionally send claim details to the database if user is logged in
      const user = localStorage.getItem("user");
      if (user) {
        const userId = JSON.parse(user).id;
        const claimDetails = {
          userId, // Use userId from parsed user data
          chainName: chain.chainName,
          tokensClaimed: unclaimedRewards[chain.chainName],
          tokenPrice: assetPrices[chain.chainName],
          dateClaimed: new Date().toISOString(),
          tokenSymbol: chain.Symbol,
          walletAddress: address,
          txHash: result.transactionHash,
        };
    
        console.log("Sending claim details to the server:", claimDetails);
    
        await fetch('/api/claims', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(claimDetails),
        });
      }
    
    } catch (error) {
      console.error(`Failed to claim rewards for ${chain.chainName}:`, error);
      setClaimStatus(`Failed to claim rewards for ${chain.chainName}`);
    }
  };
  

  return (
    <>
      <Head>
        <title>Proof of Stake Dashboard</title>
        <meta name="description" content="This is a custom description for my page." />
      </Head>
      <PageIllustration multiple />
      <section>
         {claimStatus && (
              <div className="mt-4 text-center text-sm text-gray-200">
                {claimStatus}
              </div>
            )}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-5">
            {/* Section header */}
            
            {/* Chain Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="relative flex flex-col rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
                <DashboardTotalChart
                  chainValues={chainValues}
                  totalWalletValue={totalWalletValue}
                />
              </div>
              {CHAINS.filter(chain => chain.chainName && savedChains.includes(chain.chainName))
                .slice(0, visibleCards)
                .map((chain) => (
                  <div key={chain.chainName} className="relative flex flex-col rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
                    <div className="relative mb-4 border-b pb-5 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1]">
                      <div className="mb-2 font-nacelle text-[1rem] text-gray-200">
                        <img src={chain.icon} alt={`${chain.chainName} icon`} className="inline-block h-6 w-6 mr-2" />
                        {chain.chainName} <span className="text-gray-500 text-xs">{chain.chainName && assetPrices[chain.chainName] !== undefined ? `$${assetPrices[chain.chainName].toFixed(2)}` : "Loading..."}</span>
                      </div>
                      <div className="mb-1.5 flex items-baseline font-nacelle">
                        <span className="bg-gradient-to-r from-indigo-300 to-indigo-200 bg-clip-text text-transparent text-xl font-bold">
                        {chain.chainName && unclaimedRewards[chain.chainName] !== undefined
                         && stakedTokens[chain.chainName] !== undefined 
                         && availableTokens[chain.chainName] !== undefined 
                         && assetPrices[chain.chainName] !== undefined? `$${(
                         (unclaimedRewards[chain.chainName] + stakedTokens[chain.chainName] + availableTokens[chain.chainName]) * assetPrices[chain.chainName]
                         ).toFixed(2)}` : "Loading..."}
                        </span>
                      </div>
                      <div className="mb-4 grow text-xs text-indigo-200/65">
                        Wallet Value
                      </div>
                      <ul className="mb-4 grow text-xs text-indigo-200/65">
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-3 w-3 shrink-0 fill-current text-indigo-500"
                            viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                          </svg>
                          <span>
                            Available
                            <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent text-l font-bold pl-3">
                              {chain.chainName && availableTokens[chain.chainName] !== undefined ? availableTokens[chain.chainName].toFixed(2) : "Loading..."} </span>
                              <span className="mb-4 ml-2 grow text-xs text-indigo-200/65"> {chain.chainName && availableTokens[chain.chainName] && assetPrices[chain.chainName] !== undefined
                            ? `$${((availableTokens[chain.chainName] ?? 0) * (assetPrices[chain.chainName] ?? 0)).toFixed(2)}`
                            : "Loading..."}
                            </span>
                          </span>
                        </li>
                      </ul>
                      <ul className="mb-4 grow text-xs text-indigo-200/65">
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-3 w-3 shrink-0 fill-current text-indigo-500"
                            viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                          </svg>
                          <span>
                            Staked:
                            <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent text-l font-bold pl-3">
                              {chain.chainName && stakedTokens[chain.chainName] !== undefined ? stakedTokens[chain.chainName].toFixed(2) : "Loading..."}</span>
                              <span className="mb-4 ml-2 grow text-xs text-indigo-200/65">
                              {chain.chainName && stakedTokens[chain.chainName] && assetPrices[chain.chainName] !== undefined
                            ? `$${((stakedTokens[chain.chainName] ?? 0) * (assetPrices[chain.chainName] ?? 0)).toFixed(2)}`
                            : "Loading..."}
                            </span>
                          </span>
                        </li>
                      </ul>
                      <ul className="mb-4 grow text-xs text-indigo-200/65">
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-3 w-3 shrink-0 fill-current text-indigo-500"
                            viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                          </svg>
                          <span>
                            Rewards
                            <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent text-l font-bold pl-3">
                              {chain.chainName && unclaimedRewards[chain.chainName] !== undefined ? unclaimedRewards[chain.chainName].toFixed(2) : "Loading..."}</span>
                              <span className="mb-4 ml-2 grow text-xs text-indigo-200/65">
                              {chain.chainName && unclaimedRewards[chain.chainName] && assetPrices[chain.chainName] !== undefined
                            ? `$${((unclaimedRewards[chain.chainName] ?? 0) * (assetPrices[chain.chainName] ?? 0)).toFixed(2)}`
                            : "Loading..."}
                            </span>
                          </span>
                        </li>
                      </ul>
                      <a
                        className="btn-sm relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
                        onClick={async () => {
                          const chainName = chain.chainName;
                          if (chainName && addresses[chainName]) {
                            await claimRewards(chain, addresses[chainName]);
                          } else {
                            console.error(`Address for ${chainName} is undefined`);
                          }
                        }}
                      >
                        Claim Rewards
                      </a>
                    </div>
                    
                  </div>
                ))}
            </div>
            {visibleCards < savedChains.length && (
              <div className="flex justify-center mt-4">
                <button
                  className="btn-sm relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
                  onClick={loadMoreCards}
                >
                  Load More
                </button>
              </div>
            )}
           
          </div>
        </div>
      </section>
      <FooterSeparator />
    </>
  );
}