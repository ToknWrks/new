"use client";

import { useState, useEffect } from "react";

interface WalletConnectionProps {
  onConnect: () => void;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ onConnect }) => {
  const [cosmosAddress, setCosmosAddress] = useState<string | null>(null);

  useEffect(() => {
    // Check if the wallet is already connected when the component mounts
    const checkWalletConnection = async () => {
      const address = localStorage.getItem("cosmosAddress");
      if (address) {
        console.log("Wallet already connected:", address);
        setCosmosAddress(address);
        onConnect();
      }
    };

    checkWalletConnection();
  }, [onConnect]);

  const connectWallet = async (): Promise<string | null> => {
    try {
      if (!window.keplr) {
        alert("Please install Keplr extension");
        return null;
      }

      // Enable Keplr for a specific chain
      await window.keplr.enable("cosmoshub-4");

      // Get the offline signer for the chain
      const offlineSigner = window.getOfflineSigner("cosmoshub-4");

      // Get the accounts
      const accounts = await offlineSigner.getAccounts();

      if (accounts.length > 0) {
        const address = accounts[0].address;
        console.log("Connected address:", address);
        return address;
      } else {
        console.error("No accounts found");
        return null;
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
      return null;
    }
  };

  const handleConnect = async () => {
    try {
      const address = await connectWallet();
      if (address) {
        console.log("Wallet connected:", address);
        setCosmosAddress(address);
        onConnect();
        // Persist the address in local storage
        localStorage.setItem("cosmosAddress", address);
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setCosmosAddress(null);
    }
  };

  const handleDisconnect = () => {
    console.log("Wallet disconnected");
    // Clear the local storage and reset the state
    setCosmosAddress(null);
    localStorage.removeItem("cosmosAddress");
  };

  const truncateAddress = (address: string | null) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="btn-sm relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]">
      {cosmosAddress ? (
        <div>
          <button onClick={handleDisconnect}>Disconnect {truncateAddress(cosmosAddress)}</button>
        </div>
      ) : (
        <button onClick={handleConnect}>Connect Keplr</button>
      )}
    </div>
  );
};

export default WalletConnection;