"use client";

import { useState, useEffect } from "react";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";
import { LedgerSigner } from "@cosmjs/ledger-amino";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import { useWallet } from "../toknwrks/WalletContext"; // Adjust the import path as needed

interface WalletConnectionProps {
  onConnect: (address: string, signer: OfflineDirectSigner) => void;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ onConnect }) => {
  const { cosmosAddress, setCosmosAddress, signer, connectWallet, disconnectWallet } = useWallet();

  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) {
      onConnect(address, signer!);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const truncateAddress = (address: string | null) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div>
      {cosmosAddress ? (
        <div className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
          <button
            onClick={handleDisconnect}
            className="flex items-center space-x-2 text-gray-300 hover:text-indigo-400"
          >
          <img 
          src="/keplr-dark.png" 
         alt="Disconnect Keplr" 
         className="h-[25px] w-auto"
          />
            <span>Disconnect {truncateAddress(cosmosAddress)}</span>
          </button>
        </div>
      ) : (
        <div className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
          <button
            onClick={handleConnect}
            className="flex items-center space-x-2 text-gray-300 hover:text-indigo-400"
          >
            <img 
              src="/keplr.png" 
              alt="Keplr Logo" 
              className="h-[25px] w-auto"
            />
            <span>Connect Keplr</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnection;