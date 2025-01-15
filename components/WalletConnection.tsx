"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    keplr: any;
    leap: any;
    getOfflineSigner: any;
  }
}

interface WalletConnectionProps {
  onConnect: (wallet: string, cosmosHubAddress: string, osmosisAddress: string, akashAddress: string) => void;
}

const WalletConnection = ({ onConnect }: WalletConnectionProps) => {
  const [keplrAddresses, setKeplrAddresses] = useState<{ cosmos: string | null; osmosis: string | null; akash: string | null; }>({ cosmos: null, osmosis: null, akash: null });
  const [leapAddresses, setLeapAddresses] = useState<{ cosmos: string | null; osmosis: string | null; akash: string | null; }>({ cosmos: null, osmosis: null, akash: null });

  useEffect(() => {
    const storedKeplrCosmos = localStorage.getItem("keplrCosmosHubAddress");
    const storedKeplrOsmosis = localStorage.getItem("keplrOsmosisAddress");
    const storedKeplrAkash = localStorage.getItem("keplrAkashAddress");
    const storedLeapCosmos = localStorage.getItem("leapCosmosHubAddress");
    const storedLeapOsmosis = localStorage.getItem("leapOsmosisAddress");
    const storedLeapAkash = localStorage.getItem("leapAkashAddress");

    if (storedKeplrCosmos && storedKeplrOsmosis) {
      setKeplrAddresses({ cosmos: storedKeplrCosmos, osmosis: storedKeplrOsmosis, akash: storedKeplrAkash });
    }
    if (storedLeapCosmos && storedLeapOsmosis) {
      setLeapAddresses({ cosmos: storedLeapCosmos, osmosis: storedLeapOsmosis, akash: storedLeapAkash });
    }
  }, []);

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

        setKeplrAddresses({ cosmos: cosmosAddress, osmosis: osmosisAddress, akash: akashAddress });
        onConnect("keplr", cosmosAddress, osmosisAddress, akashAddress);
        window.location.reload(); // Refresh the browser page
      } catch (err) {
        console.error("Failed to connect Keplr wallet:", err);
      }
    }

    if (wallet === "leap" && window.leap) {
      try {
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

        setLeapAddresses({ cosmos: cosmosAddress, osmosis: osmosisAddress, akash: akashAddress });
        onConnect("leap", cosmosAddress, osmosisAddress, akashAddress);
        window.location.reload(); // Refresh the browser page
      } catch (err) {
        console.error("Failed to connect Leap wallet:", err);
      }
    }
  };

  const disconnectWallet = (wallet: string) => {
    if (wallet === "keplr") {
      setKeplrAddresses({ cosmos: null, osmosis: null, akash: null });
      localStorage.removeItem("keplrCosmosHubAddress");
      localStorage.removeItem("keplrOsmosisAddress");
      localStorage.removeItem("keplrAkashAddress");
    } else if (wallet === "leap") {
      setLeapAddresses({ cosmos: null, osmosis: null, akash: null });
      localStorage.removeItem("leapCosmosHubAddress");
      localStorage.removeItem("leapOsmosisAddress");
      localStorage.removeItem("leapAkashAddress");
    }
    window.location.reload(); // Refresh the browser page
  };

  const truncateAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  const refreshBalances = async () => {
    if (window.keplr) {
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

        setKeplrAddresses({ cosmos: cosmosAddress, osmosis: osmosisAddress, akash: akashAddress });
        onConnect("keplr", cosmosAddress, osmosisAddress, akashAddress);
      } catch (err) {
        console.error("Failed to refresh balances:", err);
      }
    }

    if (window.leap) {
      try {
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

        setLeapAddresses({ cosmos: cosmosAddress, osmosis: osmosisAddress, akash: akashAddress });
        onConnect("leap", cosmosAddress, osmosisAddress, akashAddress);
      } catch (err) {
        console.error("Failed to refresh balances:", err);
      }
    }
  };

  return (
    <div className="wallet-connection p-4 shadow rounded-lg">
      <h2 className="text-xl mb-2"></h2>
      <button
        className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] mb-4"
        onClick={() => (keplrAddresses.cosmos && keplrAddresses.osmosis  && keplrAddresses.akash ? disconnectWallet("keplr") : connectWalletToNetworks("keplr"))}
      >
        {keplrAddresses.cosmos && keplrAddresses.osmosis && keplrAddresses.akash
          ? `Disconnect Keplr (${truncateAddress(keplrAddresses.cosmos)})`
          : "Connect Keplr"}
      </button>
      <button
        className="btn w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] mb-4"
        onClick={() => (leapAddresses.cosmos && leapAddresses.osmosis && leapAddresses.akash ? disconnectWallet("leap") : connectWalletToNetworks("leap"))}
      >
        {leapAddresses.cosmos && leapAddresses.osmosis && leapAddresses.akash
          ? `Disconnect Leap (${truncateAddress(leapAddresses.cosmos)})`
          : "Connect Leap"}
      </button>
      
    </div>
  );
};

export default WalletConnection;
