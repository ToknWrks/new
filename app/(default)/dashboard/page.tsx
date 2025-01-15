"use client";

import { useState, useEffect } from "react";
import pLimit from "p-limit";
import DashboardCosmos from "@/components/dashboard-cosmos";
import DashboardOsmosis from "@/components/dashboard-osmosis";
import DashboardAkash from "@/components/dashboard-akash";
import DashboardTimeline from "@/components/dashboard-timeline";
import DashboardTotal from "@/components/dashboard-all"; // Adjust the import path as needed

const limit = pLimit(1); // Limit to 1 concurrent request

const Page = () => {
  const [cosmosPrice, setCosmosPrice] = useState<number | null>(null);
  const [osmosisPrice, setOsmosisPrice] = useState<number | null>(null);
  const [akashPrice, setAkashPrice] = useState<number | null>(null);
  const [cosmosAddress, setCosmosAddress] = useState<string | null>(null);
  const [osmosisAddress, setOsmosisAddress] = useState<string | null>(null);
  const [akashAddress, setAkashAddress] = useState<string | null>(null);
  const [totalWalletValue, setTotalWalletValue] = useState<number>(0);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const fetchCosmosPrice = limit(async () => {
          const cosmosUrl = "https://api.coingecko.com/api/v3/simple/price?ids=cosmos&vs_currencies=usd";
          const cosmosRes = await fetch(cosmosUrl);
          const cosmosData = await cosmosRes.json();
          setCosmosPrice(cosmosData.cosmos.usd);
          console.log("Cosmos Price:", cosmosData);
        });

        const fetchOsmosisPrice = limit(async () => {
          const osmosisUrl = "https://api.coingecko.com/api/v3/simple/price?ids=osmosis&vs_currencies=usd";
          const osmosisRes = await fetch(osmosisUrl);
          const osmosisData = await osmosisRes.json();
          setOsmosisPrice(osmosisData.osmosis.usd);
          console.log("Osmosis Price:", osmosisData);
        });

        const fetchAkashPrice = limit(async () => {
          const akashUrl = "https://api.coingecko.com/api/v3/simple/price?ids=akash-network&vs_currencies=usd";
          const akashRes = await fetch(akashUrl);
          const akashData = await akashRes.json();
          setAkashPrice(akashData["akash-network"].usd);
          console.log("Akash Price:", akashData);
        });

        await Promise.all([
          fetchCosmosPrice,
          fetchOsmosisPrice,
          fetchAkashPrice,
        ]);
      } catch (err) {
        console.error("Failed to fetch prices:", err);
      }
    };

    const connectToChains = async () => {
      if (!window.keplr) {
        alert("Please install Keplr extension");
        return;
      }

      try {
        // Enable Cosmos Hub chain
        await window.keplr.enable("cosmoshub-4");
        const cosmosOfflineSigner = window.keplr.getOfflineSigner("cosmoshub-4");
        const cosmosAccounts = await cosmosOfflineSigner.getAccounts();
        setCosmosAddress(cosmosAccounts[0].address);

        // Enable Osmosis chain
        await window.keplr.enable("osmosis-1");
        const osmosisOfflineSigner = window.keplr.getOfflineSigner("osmosis-1");
        const osmosisAccounts = await osmosisOfflineSigner.getAccounts();
        setOsmosisAddress(osmosisAccounts[0].address);

        // Enable Akash chain
        await window.keplr.enable("akashnet-2");
        const akashOfflineSigner = window.keplr.getOfflineSigner("akashnet-2");
        const akashAccounts = await akashOfflineSigner.getAccounts();
        setAkashAddress(akashAccounts[0].address);

      } catch (err) {
        console.error("Failed to connect to chains:", err);
      }
    };

    fetchPrices();
    connectToChains();
  }, []);

  const handleTotalValueChange = (value: number) => {
    console.log("Updating total wallet value by:", value);
    setTotalWalletValue((prevValue) => {
      const newValue = prevValue + value;
      console.log("New total wallet value:", newValue);
      return newValue;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-3">
        <div className="mx-auto grid max-w-xs items-start gap-8 md:max-w-2xl md:grid-cols-2 xl:max-w-none xl:grid-cols-4 xl:gap-6">
        <div>
            {/* Total Wallet Value */}
            <DashboardTotal totalWalletValue={totalWalletValue} />
          </div>
          {/* Cosmos Hub Dashboard */}
          {cosmosAddress && (
            <div>
              <DashboardCosmos connectedAddress={cosmosAddress} cosmosPrice={cosmosPrice} onTotalValueChange={handleTotalValueChange} />
            </div>
          )}
          {/* Osmosis Dashboard */}
          {osmosisAddress && (
            <div>
              <DashboardOsmosis connectedAddress={osmosisAddress} osmosisPrice={osmosisPrice} onTotalValueChange={handleTotalValueChange} />
            </div>
          )}
          {/* Akash Dashboard */}
          {akashAddress && (
            <div>
              <DashboardAkash connectedAddress={akashAddress} akashPrice={akashPrice} onTotalValueChange={handleTotalValueChange} />
            </div>
          )}
            
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-3">
        <DashboardTimeline />
      </div>
    </>
  );
};

export default Page;