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