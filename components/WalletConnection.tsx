// components/WalletConnection.tsx
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
  onConnect: (address: string) => void;
}

const WalletConnection = ({ onConnect }: WalletConnectionProps) => {
  const [keplrAddress, setKeplrAddress] = useState<string | null>(null);
  const [leapAddress, setLeapAddress] = useState<string | null>(null);

  useEffect(() => {
    // Load the addresses from localStorage when the component mounts
    const storedKeplrAddress = localStorage.getItem("keplrAddress");
    const storedLeapAddress = localStorage.getItem("leapAddress");
    if (storedKeplrAddress) {
      setKeplrAddress(storedKeplrAddress);
    }
    if (storedLeapAddress) {
      setLeapAddress(storedLeapAddress);
    }
  }, []);

  const connectKeplr = async () => {
    if (!window.keplr) {
      alert("Please install Keplr extension");
      return;
    }

    try {
      if (keplrAddress) {
        // Disconnect
        setKeplrAddress(null);
        localStorage.removeItem("keplrAddress");
        console.log("Keplr disconnected");
        window.location.reload(); // Refresh the page
      } else {
        // Disconnect Leap if connected
        if (leapAddress) {
          setLeapAddress(null);
          localStorage.removeItem("leapAddress");
          console.log("Leap disconnected");
        }
        // Connect Keplr
        await window.keplr.enable("cosmoshub-4");
        const offlineSigner = window.keplr.getOfflineSigner("cosmoshub-4");
        const accounts = await offlineSigner.getAccounts();
        setKeplrAddress(accounts[0].address);
        localStorage.setItem("keplrAddress", accounts[0].address);
        onConnect(accounts[0].address);
        console.log("Keplr connected:", accounts);
        window.location.reload(); // Refresh the page
      }
    } catch (error) {
      console.error("Failed to connect to Keplr:", error);
    }
  };

  const connectLeap = async () => {
    if (!window.leap) {
      alert("Please install Leap extension");
      return;
    }

    try {
      if (leapAddress) {
        // Disconnect
        setLeapAddress(null);
        localStorage.removeItem("leapAddress");
        console.log("Leap disconnected");
        window.location.reload(); // Refresh the page
      } else {
        // Disconnect Keplr if connected
        if (keplrAddress) {
          setKeplrAddress(null);
          localStorage.removeItem("keplrAddress");
          console.log("Keplr disconnected");
        }
        // Connect Leap
        await window.leap.enable("cosmoshub-4");
        const offlineSigner = window.leap.getOfflineSigner("cosmoshub-4");
        const accounts = await offlineSigner.getAccounts();
        setLeapAddress(accounts[0].address);
        localStorage.setItem("leapAddress", accounts[0].address);
        onConnect(accounts[0].address);
        console.log("Leap connected:", accounts);
        window.location.reload(); // Refresh the page
      }
    } catch (error) {
      console.error("Failed to connect to Leap:", error);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="wallet-connection p-4 shadow rounded-lg">
      <h2 className="text-xl mb-2"></h2>
      <button
        className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] mb-4"
        onClick={connectKeplr}
      >
        {keplrAddress ? truncateAddress(keplrAddress) : "Connect Keplr"}
      </button>
      <button
        className="btn w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] mb-4"
        onClick={connectLeap}
      >
        {leapAddress ? truncateAddress(leapAddress) : "Connect Leap"}
      </button>
    </div>
  );
};

export default WalletConnection;