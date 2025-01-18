"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/components/WalletContext";

declare global {
  interface Window {
    keplr: any;
    leap: any;
    getOfflineSigner: any;
  }
}

interface WalletConnectionProps {
  onConnect: (wallet: string, addresses: Record<string, string | null>) => void;
}

const WalletConnection = ({ onConnect }: WalletConnectionProps) => {
  const { connectWallet, disconnectWallet } = useWallet();
  const [keplrAddresses, setKeplrAddresses] = useState<{ cosmos: string | null; osmosis: string | null; akash: string | null; regen: string | null; celestia: string | null; }>({ cosmos: null, osmosis: null, akash: null, regen: null, celestia: null });
  const [leapAddresses, setLeapAddresses] = useState<{ cosmos: string | null; osmosis: string | null; akash: string | null; regen: string | null; celestia: string | null; }>({ cosmos: null, osmosis: null, akash: null, regen: null, celestia: null });

  useEffect(() => {
    const storedKeplrCosmos = localStorage.getItem("keplrCosmosHubAddress");
    const storedKeplrOsmosis = localStorage.getItem("keplrOsmosisAddress");
    const storedKeplrAkash = localStorage.getItem("keplrAkashAddress");
    const storedKeplrRegen = localStorage.getItem("keplrRegenAddress");
    const storedKeplrCelestia = localStorage.getItem("keplrCelestiaAddress");

    const storedLeapCosmos = localStorage.getItem("leapCosmosHubAddress");
    const storedLeapOsmosis = localStorage.getItem("leapOsmosisAddress");
    const storedLeapAkash = localStorage.getItem("leapAkashAddress");
    const storedLeapRegen = localStorage.getItem("leapRegenAddress");
    const storedLeapCelestia = localStorage.getItem("leapCelestiaAddress");

    if (storedKeplrCosmos || storedKeplrOsmosis || storedKeplrAkash || storedKeplrRegen || storedKeplrCelestia) {
      setKeplrAddresses({ cosmos: storedKeplrCosmos, osmosis: storedKeplrOsmosis, akash: storedKeplrAkash, regen: storedKeplrRegen, celestia: storedKeplrCelestia });
      onConnect("keplr", { cosmosAddress: storedKeplrCosmos, osmosisAddress: storedKeplrOsmosis, akashAddress: storedKeplrAkash, regenAddress: storedKeplrRegen, celestiaAddress: storedKeplrCelestia });
    }
    if (storedLeapCosmos || storedLeapOsmosis || storedLeapAkash || storedLeapRegen || storedLeapCelestia) {
      setLeapAddresses({ cosmos: storedLeapCosmos, osmosis: storedLeapOsmosis, akash: storedLeapAkash, regen: storedLeapRegen, celestia: storedLeapCelestia });
      onConnect("leap", { cosmosAddress: storedLeapCosmos, osmosisAddress: storedLeapOsmosis, akashAddress: storedLeapAkash, regenAddress: storedLeapRegen, celestiaAddress: storedLeapCelestia });
    }
  }, [onConnect]);

  const connectWalletToNetworks = async (wallet: string) => {
    if (wallet === "keplr" && window.keplr) {
      try {
        // Disconnect Leap if connected
        setLeapAddresses({ cosmos: null, osmosis: null, akash: null, regen: null, celestia: null });
        localStorage.removeItem("leapCosmosHubAddress");
        localStorage.removeItem("leapOsmosisAddress");
        localStorage.removeItem("leapAkashAddress");
        localStorage.removeItem("leapRegenAddress");
        localStorage.removeItem("leapCelestiaAddress");

        // Enable Cosmos Hub chain
        await window.keplr.enable("cosmoshub-4");
        const cosmosOfflineSigner = window.keplr.getOfflineSigner("cosmoshub-4");
        const cosmosAccounts = await cosmosOfflineSigner.getAccounts();
        const cosmosAddress = cosmosAccounts[0].address;

        // Enable Osmosis chain
        await window.keplr.enable("osmosis-1");
        const osmosisOfflineSigner = window.keplr.getOfflineSigner("osmosis-1");
        const osmosisAccounts = await osmosisOfflineSigner.getAccounts();
        const osmosisAddress = osmosisAccounts[0].address;

        // Enable Akash chain
        await window.keplr.enable("akashnet-2");
        const akashOfflineSigner = window.keplr.getOfflineSigner("akashnet-2");
        const akashAccounts = await akashOfflineSigner.getAccounts();
        const akashAddress = akashAccounts[0].address;

        // Enable Regen chain
        await window.keplr.enable("regen-1");
        const regenOfflineSigner = window.keplr.getOfflineSigner("regen-1");
        const regenAccounts = await regenOfflineSigner.getAccounts();
        const regenAddress = regenAccounts[0].address;

        // Enable Celestia chain
        await window.keplr.enable("celestia-1");
        const celestiaOfflineSigner = window.keplr.getOfflineSigner("celestia-1");
        const celestiaAccounts = await celestiaOfflineSigner.getAccounts();
        const celestiaAddress = celestiaAccounts[0].address;

        setKeplrAddresses({ cosmos: cosmosAddress, osmosis: osmosisAddress, akash: akashAddress, regen: regenAddress, celestia: celestiaAddress });
        onConnect("keplr", { cosmosAddress, osmosisAddress, akashAddress, regenAddress, celestiaAddress });
        localStorage.setItem("keplrCosmosHubAddress", cosmosAddress);
        localStorage.setItem("keplrOsmosisAddress", osmosisAddress);
        localStorage.setItem("keplrAkashAddress", akashAddress);
        localStorage.setItem("keplrRegenAddress", regenAddress);
        localStorage.setItem("keplrCelestiaAddress", celestiaAddress);
      } catch (err) {
        console.error("Failed to connect Keplr wallet:", err);
      }
    }

    if (wallet === "leap" && window.leap) {
      try {
        // Disconnect Keplr if connected
        setKeplrAddresses({ cosmos: null, osmosis: null, akash: null, regen: null, celestia: null });
        localStorage.removeItem("keplrCosmosHubAddress");
        localStorage.removeItem("keplrOsmosisAddress");
        localStorage.removeItem("keplrAkashAddress");
        localStorage.removeItem("keplrRegenAddress");
        localStorage.removeItem("keplrCelestiaAddress");

        // Enable Cosmos Hub chain
        await window.leap.enable("cosmoshub-4");
        const cosmosOfflineSigner = window.leap.getOfflineSigner("cosmoshub-4");
        const cosmosAccounts = await cosmosOfflineSigner.getAccounts();
        const cosmosAddress = cosmosAccounts[0].address;

        // Enable Osmosis chain
        await window.leap.enable("osmosis-1");
        const osmosisOfflineSigner = window.leap.getOfflineSigner("osmosis-1");
        const osmosisAccounts = await osmosisOfflineSigner.getAccounts();
        const osmosisAddress = osmosisAccounts[0].address;

        // Enable Akash chain
        await window.leap.enable("akashnet-2");
        const akashOfflineSigner = window.leap.getOfflineSigner("akashnet-2");
        const akashAccounts = await akashOfflineSigner.getAccounts();
        const akashAddress = akashAccounts[0].address;

        // Enable Regen chain
        await window.leap.enable("regen-1");
        const regenOfflineSigner = window.leap.getOfflineSigner("regen-1");
        const regenAccounts = await regenOfflineSigner.getAccounts();
        const regenAddress = regenAccounts[0].address;

        // Enable Celestia chain
        await window.leap.enable("celestia-1");
        const celestiaOfflineSigner = window.leap.getOfflineSigner("celestia-1");
        const celestiaAccounts = await celestiaOfflineSigner.getAccounts();
        const celestiaAddress = celestiaAccounts[0].address;

        setLeapAddresses({ cosmos: cosmosAddress, osmosis: osmosisAddress, akash: akashAddress, regen: regenAddress, celestia: celestiaAddress });
        onConnect("leap", { cosmosAddress, osmosisAddress, akashAddress, regenAddress, celestiaAddress });
        localStorage.setItem("leapCosmosHubAddress", cosmosAddress);
        localStorage.setItem("leapOsmosisAddress", osmosisAddress);
        localStorage.setItem("leapAkashAddress", akashAddress);
        localStorage.setItem("leapRegenAddress", regenAddress);
        localStorage.setItem("leapCelestiaAddress", celestiaAddress);

      } catch (err) {
        console.error("Failed to connect Leap wallet:", err);
      }
    }
  };

  const handleDisconnectWallet = (wallet: string) => {
    if (wallet === "keplr") {
      setKeplrAddresses({ cosmos: null, osmosis: null, akash: null, regen: null, celestia: null });
      localStorage.removeItem("keplrCosmosHubAddress");
      localStorage.removeItem("keplrOsmosisAddress");
      localStorage.removeItem("keplrAkashAddress");
      localStorage.removeItem("keplrRegenAddress");
      localStorage.removeItem("keplrCelestiaAddress");
      onConnect("keplr", { cosmosAddress: null, osmosisAddress: null, akashAddress: null, regenAddress: null, celestiaAddress: null });
    } else if (wallet === "leap") {
      setLeapAddresses({ cosmos: null, osmosis: null, akash: null, regen: null, celestia: null });
      localStorage.removeItem("leapCosmosHubAddress");
      localStorage.removeItem("leapOsmosisAddress");
      localStorage.removeItem("leapAkashAddress");
      localStorage.removeItem("leapRegenAddress");
      localStorage.removeItem("leapCelestiaAddress");
      onConnect("leap", { cosmosAddress: null, osmosisAddress: null, akashAddress: null, regenAddress: null, celestiaAddress: null });
    }
  };

  const truncateAddress = (addr: string | null) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="wallet-connection p-4 shadow rounded-lg">
      <h2 className="text-xl mb-2">Wallet Connection</h2>
      <button
        className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] mb-4"
        onClick={() => (keplrAddresses.cosmos ? handleDisconnectWallet("keplr") : connectWalletToNetworks("keplr"))}
      >
        {keplrAddresses.cosmos
          ? `Disconnect Keplr (${truncateAddress(keplrAddresses.cosmos)})`
          : "Connect Keplr"}
      </button>
      <button
        className="btn w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] mb-4"
        onClick={() => (leapAddresses.cosmos ? handleDisconnectWallet("leap") : connectWalletToNetworks("leap"))}
      >
        {leapAddresses.cosmos
          ? `Disconnect Leap (${truncateAddress(leapAddresses.cosmos)})`
          : "Connect Leap"}
      </button>
    </div>
  );
};

export default WalletConnection;
