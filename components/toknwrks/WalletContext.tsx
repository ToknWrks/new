"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { OfflineDirectSigner, AccountData } from "@cosmjs/proto-signing";
import { StdSignDoc, AminoSignResponse } from "@cosmjs/amino";
import { DirectSignResponse } from "@cosmjs/proto-signing";
import { LedgerSigner } from "@cosmjs/ledger-amino";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";

export interface WalletContextType {
  wallet: any;
  userId: string | null;
  address: string | null;
  cosmosAddress: string | null;
  signer: OfflineDirectSigner | null;

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

class LedgerSignerWrapper implements OfflineDirectSigner {
  private ledgerSigner: LedgerSigner;

  constructor(ledgerSigner: LedgerSigner) {
    this.ledgerSigner = ledgerSigner;
  }

  async getAccounts(): Promise<readonly AccountData[]> {
    return this.ledgerSigner.getAccounts();
  }

  async signDirect(signerAddress: string, signDoc: any): Promise<DirectSignResponse> {
    // Convert SignDoc to Amino-compatible format
    const aminoSignDoc: StdSignDoc = {
      chain_id: signDoc.chainId,
      account_number: signDoc.accountNumber.toString(),
      sequence: signDoc.sequence.toString(),
      fee: signDoc.fee,
      msgs: signDoc.msgs.map((msg: any) => ({
        type: msg.typeUrl.replace(/^\/+/, "").replace(/\./g, "/"), // Convert typeUrl to Amino type
        value: msg.value,
      })),
      memo: signDoc.memo || "",
    };

    // Sign using Ledger
    const { signed: aminoSigned, signature }: AminoSignResponse = await this.ledgerSigner.signAmino(signerAddress, aminoSignDoc);

    return {
      signed: {
        bodyBytes: signDoc.bodyBytes, // Verify this matches the Amino-signed content
        authInfoBytes: signDoc.authInfoBytes,
        chainId: signDoc.chainId,
        accountNumber: signDoc.accountNumber,
      },
      signature: {
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: Buffer.from((await this.ledgerSigner.getAccounts())[0].pubkey).toString("base64"),
        },
        signature: signature.signature,
      },
    };
  }
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [cosmosAddress, setCosmosAddress] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<OfflineDirectSigner | null>(null);

  useEffect(() => {
    const checkWalletConnection = async () => {
      const address = localStorage.getItem("cosmosAddress");
      if (address && signer) {
        setCosmosAddress(address);
      }
    };

    checkWalletConnection();
  }, [signer]);

  const connectWallet = async (): Promise<string | null> => {
    try {
      if (!window.keplr) {
        alert("Please install Keplr extension");
        return null;
      }

      const chainId = "cosmoshub-4";
      await window.keplr.enable(chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      const address = accounts[0].address;

      // Get the key to check if it's a Ledger
      const key = await window.keplr.getKey(chainId);
      const isLedger = key.isNanoLedger || false;
      console.log("Using Ledger via Keplr:", isLedger);

      // Use Keplr's signer directly regardless of whether it's Ledger or not
      // Keplr will handle the Ledger connection internally
      setSigner(offlineSigner);

      localStorage.setItem("cosmosAddress", address);
      setCosmosAddress(address);
      return address;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return null;
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setUserId(null);
    setAddress(null);
    setCosmosAddress(null);
    setSigner(null);
    localStorage.removeItem("cosmosAddress");
  };

  const getConnectedWalletAddress = async (): Promise<string | null> => {
    if (cosmosAddress) {
      return cosmosAddress;
    }
    return null;
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        userId,
        address,
        cosmosAddress,
        signer,
        connectWallet,
        disconnectWallet,
        setCosmosAddress,
        getConnectedWalletAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};