"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/components/toknwrks/WalletContext";

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
  const [keplrAddresses, setKeplrAddresses] = useState<{ cosmos: string | null; osmosis: string | null; akash: string | null; regen: string | null; celestia: string | null; omniflix: string | null; injective: string | null; }>({ cosmos: null, osmosis: null, akash: null, regen: null, celestia: null, omniflix: null, injective: null });
 
  useEffect(() => {
    const storedKeplrCosmos = localStorage.getItem("keplrCosmosHubAddress");
    const storedKeplrOsmosis = localStorage.getItem("keplrOsmosisAddress");
    const storedKeplrAkash = localStorage.getItem("keplrAkashAddress");
    const storedKeplrRegen = localStorage.getItem("keplrRegenAddress");
    const storedKeplrCelestia = localStorage.getItem("keplrCelestiaAddress");
    const storedKeplrOmniflix = localStorage.getItem("keplrOmniflixAddress");
    const storedKeplrInjective = localStorage.getItem("keplrInjectiveAddress");


    if (storedKeplrCosmos || storedKeplrOsmosis || storedKeplrAkash || storedKeplrRegen || storedKeplrCelestia || storedKeplrOmniflix || storedKeplrInjective) {
      setKeplrAddresses({ cosmos: storedKeplrCosmos, osmosis: storedKeplrOsmosis, akash: storedKeplrAkash, regen: storedKeplrRegen, celestia: storedKeplrCelestia, omniflix: storedKeplrOmniflix, injective: storedKeplrInjective });
      onConnect("keplr", { cosmosAddress: storedKeplrCosmos, osmosisAddress: storedKeplrOsmosis, akashAddress: storedKeplrAkash, regenAddress: storedKeplrRegen, celestiaAddress: storedKeplrCelestia, omniflixAddress: storedKeplrOmniflix, injectiveAddress: storedKeplrInjective });
    }
   
  }, [onConnect]);

  const connectWalletToNetworks = async (wallet: string) => {
    if (wallet === "keplr" && window.keplr) {
      try {
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

        // Enable Omniflix chain
        await window.keplr.enable("omniflixhub-1");
        const omniflixOfflineSigner = window.keplr.getOfflineSigner("omniflixhub-1");
        const omniflixAccounts = await omniflixOfflineSigner.getAccounts();
        const omniflixAddress = omniflixAccounts[0].address;

        // Enable Injective chain
        await window.keplr.enable("injective-1");
        const injectiveOfflineSigner = window.keplr.getOfflineSigner("injective-1");
        const injectiveAccounts = await injectiveOfflineSigner.getAccounts();
        const injectiveAddress = injectiveAccounts[0].address;

        setKeplrAddresses({ cosmos: cosmosAddress, osmosis: osmosisAddress, akash: akashAddress, regen: regenAddress, celestia: celestiaAddress, omniflix: omniflixAddress, injective: injectiveAddress });
        onConnect("keplr", { cosmosAddress, osmosisAddress, akashAddress, regenAddress, celestiaAddress, omniflixAddress, injectiveAddress });
        localStorage.setItem("keplrCosmosHubAddress", cosmosAddress);
        localStorage.setItem("keplrOsmosisAddress", osmosisAddress);
        localStorage.setItem("keplrAkashAddress", akashAddress);
        localStorage.setItem("keplrRegenAddress", regenAddress);
        localStorage.setItem("keplrCelestiaAddress", celestiaAddress);
        localStorage.setItem("keplrOmniflixAddress", omniflixAddress);
        localStorage.setItem("keplrInjectiveAddress", injectiveAddress);
      } catch (err) {
        console.error("Failed to connect Keplr wallet:", err);
      }
    }

  };

  const handleDisconnectWallet = (wallet: string) => {
    if (wallet === "keplr") {
      setKeplrAddresses({ cosmos: null, osmosis: null, akash: null, regen: null, celestia: null,  omniflix: null, injective: null });
      localStorage.removeItem("keplrCosmosHubAddress");
      localStorage.removeItem("keplrOsmosisAddress");
      localStorage.removeItem("keplrAkashAddress");
      localStorage.removeItem("keplrRegenAddress");
      localStorage.removeItem("keplrCelestiaAddress");
      localStorage.removeItem("keplrOmniflixAddress");
      localStorage.removeItem("keplrInjectiveAddress");
      onConnect("keplr", { cosmosAddress: null, osmosisAddress: null, akashAddress: null, regenAddress: null, omniflixAddress: null, celestiaAddress: null, injectiveAddress: null });
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
     
    </div>
  );
};

export default WalletConnection;
