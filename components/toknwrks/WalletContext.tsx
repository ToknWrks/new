"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { COSMOS_HUB, OSMOSIS, AKASH, REGEN, CELESTIA, OMNIFLIX, INJECTIVE } from "@/components/toknwrks/chains"; // Adjust the import path as needed

export interface WalletContextType {
  wallet: any;
  userId: string | null;
  address: string | null;
  cosmosAddress: string | null;

  connectWallet: () => Promise<string | null>;
  disconnectWallet: () => void;
  setCosmosAddress: (address: string | null) => void;
  getConnectedWalletAddress: () => Promise<string | null>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [cosmosAddress, setCosmosAddress] = useState<string | null>(null);

  useEffect(() => {
    const storedWallet = localStorage.getItem("wallet");
    if (storedWallet) {
      setWallet(storedWallet);
    }
  }, []);

  const connectWallet = async (): Promise<string | null> => {
    // Implementation for connecting wallet
    return null; // Placeholder return value
  };

  const disconnectWallet = (): void => {
    // Implementation for disconnecting wallet
  };

  const getConnectedWalletAddress = async (): Promise<string | null> => {
    // Implementation for getting connected wallet address
    return null; // Placeholder return value
  };

  return (
    <WalletContext.Provider value={{ wallet, userId, address: null, cosmosAddress,  connectWallet, disconnectWallet, setCosmosAddress, getConnectedWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};