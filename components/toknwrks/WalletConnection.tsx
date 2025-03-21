"use client";

import { useState, useEffect } from "react";
import { DirectSecp256k1HdWallet, OfflineDirectSigner, DirectSignResponse, makeSignDoc as makeProtoSignDoc } from "@cosmjs/proto-signing";
import { makeSignDoc as makeAminoSignDoc, StdSignDoc, AminoSignResponse } from "@cosmjs/amino";
import { LedgerSigner } from "@cosmjs/ledger-amino";
import { AccountData } from "@cosmjs/amino";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";

interface WalletConnectionProps {
  onConnect: (address: string, signer: OfflineDirectSigner) => void;
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

const WalletConnection: React.FC<WalletConnectionProps> = ({ onConnect }) => {
  const [cosmosAddress, setCosmosAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<OfflineDirectSigner | null>(null);

  useEffect(() => {
    // Check if the wallet is already connected when the component mounts
    const checkWalletConnection = async () => {
      const address = localStorage.getItem("cosmosAddress");
      if (address && signer) {
        console.log("Wallet already connected:", address);
        setCosmosAddress(address);
        onConnect(address, signer);
      }
    };

    checkWalletConnection();
  }, [onConnect, signer]);

  const connectWallet = async (): Promise<string | null> => {
    try {
      if (!window.keplr) {
        alert("Please install Keplr extension");
        return null;
      }

      const chainId = "cosmoshub-4";
      await window.keplr.enable(chainId);
      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      const address = accounts[0].address;

      const isLedger: boolean = await window.keplr.getKey(chainId).then((key: { isNanoLedger: boolean }) => key.isNanoLedger || false);
      console.log("Using Ledger via Keplr:", isLedger);

      setSigner(offlineSigner);
      localStorage.setItem("cosmosAddress", address);
      setCosmosAddress(address);
      onConnect(address, offlineSigner);
      return address;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return null;
    }
  };

  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) {
      localStorage.setItem("cosmosAddress", address);
    }
  };

  const handleDisconnect = () => {
    console.log("Wallet disconnected");
    // Clear the local storage and reset the state
    setCosmosAddress(null);
    setSigner(null);
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