"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { COSMOS_HUB, OSMOSIS, AKASH, REGEN, CELESTIA, OMNIFLIX, INJECTIVE, STRIDE, } from "@/components/chains"; // Adjust the import path as needed

export interface WalletContextProps {
  wallet: string | null;
  cosmosAddress: string | null;
  osmosisAddress: string | null;
  akashAddress: string | null;
  regenAddress: string | null;
  celestiaAddress: string | null;
  connectWallet: (wallet: string, addresses: Record<string, string | null>) => void;
  disconnectWallet: () => void;
  setCosmosAddress: (address: string) => void;
  setOsmosisAddress: (address: string) => void;
  setAkashAddress: (address: string) => void;
  setRegenAddress: (address: string) => void;
  setCelestiaAddress: (address: string) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<string | null>(null);
  const [cosmosAddress, setCosmosAddress] = useState<string | null>(null);
  const [osmosisAddress, setOsmosisAddress] = useState<string | null>(null);
  const [akashAddress, setAkashAddress] = useState<string | null>(null);
  const [regenAddress, setRegenAddress] = useState<string | null>(null);
  const [celestiaAddress, setCelestiaAddress] = useState<string | null>(null);

  useEffect(() => {
    const storedWallet = localStorage.getItem("wallet");
    const storedCosmosAddress = localStorage.getItem("cosmosAddress");
    const storedOsmosisAddress = localStorage.getItem("osmosisAddress");
    const storedAkashAddress = localStorage.getItem("akashAddress");
    const storedRegenAddress = localStorage.getItem("regenAddress");
    const storedCelestiaAddress = localStorage.getItem("celestiaAddress");

    if (storedWallet) {
      setWallet(storedWallet);
      setCosmosAddress(storedCosmosAddress);
      setOsmosisAddress(storedOsmosisAddress);
      setAkashAddress(storedAkashAddress);
      setRegenAddress(storedRegenAddress);
      setCelestiaAddress(storedCelestiaAddress);
    }
  }, []);

  const connectWallet = (wallet: string, addresses: Record<string, string | null>) => {
    setWallet(wallet);
    setCosmosAddress(addresses.cosmosAddress);
    setOsmosisAddress(addresses.osmosisAddress);
    setAkashAddress(addresses.akashAddress);
    setRegenAddress(addresses.regenAddress);
    setCelestiaAddress(addresses.celestiaAddress);
    localStorage.setItem("cosmosAddress", addresses.cosmosAddress || "");
    localStorage.setItem("osmosisAddress", addresses.osmosisAddress || "");
    localStorage.setItem("akashAddress", addresses.akashAddress || "");
    localStorage.setItem("regenAddress", addresses.regenAddress || "");
    localStorage.setItem("celestiaAddress", addresses.celestiaAddress || "");   
  };

  const disconnectWallet = () => {
    setWallet(null);
    setCosmosAddress(null);
    setOsmosisAddress(null);
    setAkashAddress(null);
    setRegenAddress(null);
    setCelestiaAddress(null);
    localStorage.removeItem("wallet");
    localStorage.removeItem("cosmosAddress");
    localStorage.removeItem("osmosisAddress");
    localStorage.removeItem("akashAddress");
    localStorage.removeItem("regenAddress");
    localStorage.removeItem("celestiaAddress");
  };

  return (
    <WalletContext.Provider value={{ wallet, cosmosAddress, osmosisAddress, akashAddress, regenAddress, celestiaAddress, connectWallet, disconnectWallet, setCosmosAddress, setOsmosisAddress, setAkashAddress, setRegenAddress, setCelestiaAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};