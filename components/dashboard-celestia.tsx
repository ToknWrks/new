import Image from "next/image";
import { useState, useEffect } from "react";
import {
  SigningStargateClient,
  MsgWithdrawDelegatorRewardEncodeObject,
} from "@cosmjs/stargate";
import { CELESTIA } from "@/components/chains";

import Spotlight from "@/components/spotlight";

interface DashboardCelestiaProps {
  connectedAddress: string;
  tiaPrice: number | null;
  onTotalValueChange: (value: number) => void;
}

const DashboardCelestia: React.FC<DashboardCelestiaProps> = ({ connectedAddress, tiaPrice, onTotalValueChange }) => {
  const [tiaBalance, setTiaBalance] = useState<number | null>(null);
  const [stakedBalance, setStakedBalance] = useState<number | null>(null);
  const [unclaimedRewards, setUnclaimedRewards] = useState<number | null>(null);
  const [claimStatus, setClaimStatus] = useState("");
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    if (connectedAddress && tiaPrice !== null) {
      enableCelestiaChain();
      fetchBalancesAndRewards();
    }
  }, [connectedAddress, tiaPrice]);

  useEffect(() => {
    if (tiaPrice !== null && tiaBalance !== null && stakedBalance !== null && unclaimedRewards !== null) {
      const totalValue = calculateTotalValue(tiaBalance, stakedBalance, unclaimedRewards, tiaPrice);
      setTotalValue(totalValue);
      onTotalValueChange(totalValue);
    }
  }, [tiaBalance, stakedBalance, unclaimedRewards, tiaPrice]);

  const enableCelestiaChain = async () => {
    if (!window.keplr) {
      alert("Please install Keplr extension");
      return;
    }
    try {
      await window.keplr.enable(CELESTIA.chainId);
    } catch (err) {
      console.error("Failed to enable Celestia chain:", err);
    }
  };

  const fetchBalancesAndRewards = async () => {
    if (!connectedAddress) return;

    try {
      const [tiaBalance, stakedBalance, unclaimedRewards] = await Promise.all([
        fetchTiaBalance(connectedAddress),
        fetchStakedBalance(connectedAddress),
        fetchUnclaimedRewards(connectedAddress),
      ]);

      setTiaBalance(tiaBalance);
      setStakedBalance(stakedBalance);
      setUnclaimedRewards(unclaimedRewards);
    } catch (err) {
      console.error("Failed to fetch balances and rewards:", err);
    }
  };

  async function fetchTiaBalance(address: string) {
    try {
      const url = `${CELESTIA.restEndpoint}/cosmos/bank/v1beta1/balances/${address}`;
      const res = await fetch(url);
      const data = await res.json();
      const tia = data.balances?.find((coin: any) => coin.denom === "utia");
      return tia ? Number(tia.amount) / 1e6 : 0;
    } catch (err) {
      console.error("Failed to fetch TIA balance:", err);
      return 0;
    }
  }

  async function fetchStakedBalance(address: string) {
    try {
      const url = `${CELESTIA.restEndpoint}/cosmos/staking/v1beta1/delegations/${address}`;
      const res = await fetch(url);
      const data = await res.json();
      const delegations = data.delegation_responses || [];
      let totalStaked = 0;
      for (const d of delegations) {
        totalStaked += Number(d.balance?.amount || 0);
      }
      return totalStaked / 1e6;
    } catch (err) {
      console.error("Failed to fetch staked balance:", err);
      return 0;
    }
  }

  async function fetchUnclaimedRewards(address: string) {
    try {
      const url = `${CELESTIA.restEndpoint}/cosmos/distribution/v1beta1/delegators/${address}/rewards`;
      const res = await fetch(url);
      const data = await res.json();
      const totalObj = data.total?.find((coin: any) => coin.denom === "utia");
      return totalObj ? Number(totalObj.amount) / 1e6 : 0;
    } catch (err) {
      console.error("Failed to fetch unclaimed rewards:", err);
      return 0;
    }
  }

  const calculateTotalValue = (tiaBalance: number, stakedBalance: number, unclaimedRewards: number, tiaPrice: number) => {
    return (tiaBalance + stakedBalance + unclaimedRewards) * tiaPrice;
  };

  const fetchValidatorAddresses = async (delegatorAddress: string): Promise<string[]> => {
    try {
      const url = `${CELESTIA.restEndpoint}/cosmos/staking/v1beta1/delegations/${delegatorAddress}`;
      const res = await fetch(url);
      const data = await res.json();
      const delegations = data.delegation_responses || [];
      return delegations.map((d: any) => d.delegation.validator_address);
    } catch (err) {
      console.error("Failed to fetch validator addresses:", err);
      return [];
    }
  };

  const handleClaimRewards = async () => {
    if (!connectedAddress) {
      setClaimStatus("No connected address");
      return;
    }
    if (!window.keplr) {
      setClaimStatus("Keplr not found");
      return;
    }

    try {
      await window.keplr.enable(CELESTIA.chainId);
      const offlineSigner = window.getOfflineSigner!(CELESTIA.chainId);
      const client = await SigningStargateClient.connectWithSigner(
        CELESTIA.rpcEndpoint,
        offlineSigner
      );

      const validatorAddresses = await fetchValidatorAddresses(connectedAddress);

      if (validatorAddresses.length === 0) {
        setClaimStatus("No delegations found");
        return;
      }

      const msgs = validatorAddresses.map(
        (valAddr: string): MsgWithdrawDelegatorRewardEncodeObject => ({
          typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
          value: {
            delegatorAddress: connectedAddress,
            validatorAddress: valAddr,
          },
        })
      );

      const fee = {
        amount: [{ denom: "utia", amount: "100000" }], // Adjust the fee amount if necessary
        gas: "200000", // Adjust the gas amount if necessary
      };

      const result = await client.signAndBroadcast(connectedAddress, msgs, fee, "Claiming rewards");

      if (result.code === 0) {
        setClaimStatus("Rewards claimed successfully");
      } else {
        setClaimStatus(`Failed to claim: code ${result.code}`);
      }
    } catch (err) {
      console.error(err);
      setClaimStatus("Failed to claim rewards");
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <section>
      <div className="pb-12 md:pb-20"></div>
      <div className="relative flex h-full flex-col rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
        <div className="relative mb-4 border-b pb-5 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1]">
          <div className="mb-2 font-nacelle text-[1rem] text-gray-200">Celestia</div>
          <div className="mb-1.5 flex items-baseline font-nacelle">
            <span className="text-2xl text-indigo-200/65">$</span>
            <span className="text-4xl font-semibold tabular-nums text-gray-200">{totalValue.toFixed(2)}</span>
          </div>
          <div className="mb-4 grow text-xs text-indigo-200/65">
            Current TIA price: ${tiaPrice !== null && tiaPrice !== undefined ? tiaPrice.toFixed(2) : "Loading..."}
          </div>
          <button
            className="btn-sm relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
            onClick={handleClaimRewards}
          >
            Claim Rewards
          </button>
          {claimStatus && <p className="text-sm text-indigo-200/70 mt-2">{claimStatus}</p>}
        </div>
        <p className="mb-4 text-sm italic text-gray-200">Chain details:</p>
        <ul className="grow space-y-2 text-sm text-indigo-200/65">
          <li className="flex items-center">
            <svg
              className="mr-2 h-3 w-3 shrink-0 fill-current text-indigo-500"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>
              Balance: {tiaBalance !== null ? tiaBalance.toFixed(2) : "Loading..."}
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent text-l font-bold">
                {" "}
                ${tiaBalance !== null && tiaPrice !== null ? (tiaBalance * tiaPrice).toFixed(2) : "Loading..."}
              </span>{" "}
            </span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-2 h-3 w-3 shrink-0 fill-current text-indigo-500"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>
              Staked: {stakedBalance !== null ? stakedBalance.toFixed(2) : "Loading..."}{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent text-l font-bold">
                ${stakedBalance !== null && tiaPrice !== null ? (stakedBalance * tiaPrice).toFixed(2) : "Loading..."}
              </span>{" "}
            </span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-2 h-3 w-3 shrink-0 fill-current text-indigo-500"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>
              Unclaimed Rewards: {unclaimedRewards !== null ? unclaimedRewards.toFixed(2) : "Loading..."}{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent text-l font-bold">
                ${unclaimedRewards !== null && tiaPrice !== null ? (unclaimedRewards * tiaPrice).toFixed(2) : "Loading..."}
              </span>{" "}
            </span>
          </li>
        </ul>
        <div className="mx-auto max-w-3xl pb-12 text-center md:pb-1 pt-2">
          <div className="inline-flex items-center gap-3 pb- before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
            <span className="inline-flex bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
              {connectedAddress ? truncateAddress(connectedAddress) : ""}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardCelestia;
