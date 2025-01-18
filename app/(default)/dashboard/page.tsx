"use client";

import { useState, useEffect } from "react";
import pLimit from "p-limit";
import DashboardCosmos from "@/components/dashboard-cosmos";
import DashboardOsmosis from "@/components/dashboard-osmosis";
import DashboardAkash from "@/components/dashboard-akash";
import DashboardRegen from "@/components/dashboard-regen";
import DashboardCelestia from "@/components/dashboard-celestia";
import DashboardTotal from "@/components/dashboard-all"; // Adjust the import path as needed
import { useWallet } from "@/components/WalletContext"; // Adjust the import path as needed

const limit = pLimit(1); // Limit to 1 concurrent request

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Page = () => {
  const [cosmosPrice, setCosmosPrice] = useState<number | null>(null);
  const [osmosisPrice, setOsmosisPrice] = useState<number | null>(null);
  const [akashPrice, setAkashPrice] = useState<number | null>(null);
  const [regenPrice, setRegenPrice] = useState<number | null>(null);
  const [celestiaPrice, setCelestiaPrice] = useState<number | null>(null);
  const { cosmosAddress, osmosisAddress, akashAddress, regenAddress, celestiaAddress, setCosmosAddress, setOsmosisAddress, setAkashAddress, setRegenAddress, setCelestiaAddress } = useWallet();
  const [totalWalletValue, setTotalWalletValue] = useState<number>(0);
  const [cosmosValue, setCosmosValue] = useState<number>(0);
  const [osmosisValue, setOsmosisValue] = useState<number>(0);
  const [akashValue, setAkashValue] = useState<number>(0);
  const [regenValue, setRegenValue] = useState<number>(0);
  const [celestiaValue, setCelestiaValue] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(6); // Initial number of visible cards

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const fetchCosmosPrice = limit(async () => {
          const cosmosUrl = "https://api.coingecko.com/api/v3/simple/price?ids=cosmos&vs_currencies=usd";
          try {
            const cosmosRes = await fetch(cosmosUrl);
            if (!cosmosRes.ok) throw new Error("Failed to fetch Cosmos price");
            const cosmosData = await cosmosRes.json();
            setCosmosPrice(cosmosData.cosmos.usd);
            console.log("Cosmos Price:", cosmosData);
          } catch (error) {
            console.error("Error fetching Cosmos price:", error);
          }
        });

        const fetchOsmosisPrice = limit(async () => {
          const osmosisUrl = "https://api.coingecko.com/api/v3/simple/price?ids=osmosis&vs_currencies=usd";
          try {
            const osmosisRes = await fetch(osmosisUrl);
            if (!osmosisRes.ok) throw new Error("Failed to fetch Osmosis price");
            const osmosisData = await osmosisRes.json();
            setOsmosisPrice(osmosisData.osmosis.usd);
            console.log("Osmosis Price:", osmosisData);
          } catch (error) {
            console.error("Error fetching Osmosis price:", error);
          }
        });

        const fetchAkashPrice = limit(async () => {
          const akashUrl = "https://api.coingecko.com/api/v3/simple/price?ids=akash-network&vs_currencies=usd";
          try {
            const akashRes = await fetch(akashUrl);
            if (!akashRes.ok) throw new Error("Failed to fetch Akash price");
            const akashData = await akashRes.json();
            setAkashPrice(akashData["akash-network"].usd);
            console.log("Akash Price:", akashData);
          } catch (error) {
            console.error("Error fetching Akash price:", error);
          }
        });

        const fetchRegenPrice = limit(async () => {
          const regenUrl = "https://api.coingecko.com/api/v3/simple/price?ids=regen&vs_currencies=usd";
          try {
            const regenRes = await fetch(regenUrl);
            if (!regenRes.ok) throw new Error("Failed to fetch Regen price");
            const regenData = await regenRes.json();
            setRegenPrice(regenData.regen.usd);
            console.log("Regen Price:", regenData);
          } catch (error) {
            console.error("Error fetching Regen price:", error);
          }
        });

        const fetchCelestiaPrice = limit(async () => {
          const celestiaUrl = "https://api.coingecko.com/api/v3/simple/price?ids=celestia&vs_currencies=usd";
          try {
            const celestiaRes = await fetch(celestiaUrl);
            if (!celestiaRes.ok) throw new Error("Failed to fetch Celestia price");
            const celestiaData = await celestiaRes.json();
            setCelestiaPrice(celestiaData.celestia.usd);
            console.log("Celestia Price:", celestiaData);
          } catch (error) {
            console.error("Error fetching Celestia price:", error);
          }
        });

        await fetchCosmosPrice;
        await delay(5000); // 5 seconds delay
        await fetchOsmosisPrice;
        await delay(5000); // 5 seconds delay
        await fetchAkashPrice;
        await delay(5000); // 5 seconds delay
        await fetchRegenPrice;
        await delay(5000); // 5 seconds delay
        await fetchCelestiaPrice;
      } catch (err) {
        console.error("Failed to fetch prices:", err);
      }
    };

    fetchPrices();
  }, []);

  useEffect(() => {
    const enableChains = async () => {
      if (!window.keplr && !window.leap) {
        console.warn("Keplr or Leap extension is not installed");
        return;
      }

      try {
        if (cosmosAddress) {
          // Enable Cosmos Hub chain
          if (window.keplr) {
            await window.keplr.enable("cosmoshub-4");
            const cosmosOfflineSigner = window.keplr.getOfflineSigner("cosmoshub-4");
            const cosmosAccounts = await cosmosOfflineSigner.getAccounts();
            setCosmosAddress(cosmosAccounts[0].address);
          } else if (window.leap) {
            await window.leap.enable("cosmoshub-4");
            const cosmosOfflineSigner = window.leap.getOfflineSigner("cosmoshub-4");
            const cosmosAccounts = await cosmosOfflineSigner.getAccounts();
            setCosmosAddress(cosmosAccounts[0].address);
          }
        }

        if (osmosisAddress) {
          // Enable Osmosis chain
          if (window.keplr) {
            await window.keplr.enable("osmosis-1");
            const osmosisOfflineSigner = window.keplr.getOfflineSigner("osmosis-1");
            const osmosisAccounts = await osmosisOfflineSigner.getAccounts();
            setOsmosisAddress(osmosisAccounts[0].address);
          } else if (window.leap) {
            await window.leap.enable("osmosis-1");
            const osmosisOfflineSigner = window.leap.getOfflineSigner("osmosis-1");
            const osmosisAccounts = await osmosisOfflineSigner.getAccounts();
            setOsmosisAddress(osmosisAccounts[0].address);
          }
        }

        if (akashAddress) {
          // Enable Akash chain
          if (window.keplr) {
            await window.keplr.enable("akashnet-2");
            const akashOfflineSigner = window.keplr.getOfflineSigner("akashnet-2");
            const akashAccounts = await akashOfflineSigner.getAccounts();
            setAkashAddress(akashAccounts[0].address);
          } else if (window.leap) {
            await window.leap.enable("akashnet-2");
            const akashOfflineSigner = window.leap.getOfflineSigner("akashnet-2");
            const akashAccounts = await akashOfflineSigner.getAccounts();
            setAkashAddress(akashAccounts[0].address);
          }
        }

        if (regenAddress) {
          // Enable Regen chain
          if (window.keplr) {
            await window.keplr.enable("regen-1");
            const regenOfflineSigner = window.keplr.getOfflineSigner("regen-1");
            const regenAccounts = await regenOfflineSigner.getAccounts();
            setRegenAddress(regenAccounts[0].address);
          } else if (window.leap) {
            await window.leap.enable("regen-1");
            const regenOfflineSigner = window.leap.getOfflineSigner("regen-1");
            const regenAccounts = await regenOfflineSigner.getAccounts();
            setRegenAddress(regenAccounts[0].address);
          }
        }

        if (celestiaAddress) {
          // Enable Celestia chain
          if (window.keplr) {
            await window.keplr.enable("celestia-1");
            const celestiaOfflineSigner = window.keplr.getOfflineSigner("celestia-1");
            const celestiaAccounts = await celestiaOfflineSigner.getAccounts();
            setCelestiaAddress(celestiaAccounts[0].address);
          } else if (window.leap) {
            await window.leap.enable("celestia-1");
            const celestiaOfflineSigner = window.leap.getOfflineSigner("celestia-1");
            const celestiaAccounts = await celestiaOfflineSigner.getAccounts();
            setCelestiaAddress(celestiaAccounts[0].address);
          }
        }

      } catch (err) {
        console.error("Failed to enable chains:", err);
      }
    };

    enableChains();
  }, [cosmosAddress, osmosisAddress, akashAddress, regenAddress, celestiaAddress]);

  const handleTotalValueChange = (value: number) => {
    console.log("Updating total wallet value by:", value);
    setTotalWalletValue((prevValue) => {
      const newValue = prevValue + value;
      console.log("New total wallet value:", newValue);
      return newValue;
    });
  };

  const loadMoreCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 4); // Load 4 more card each time
  };

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 sm:px-6 pt-1 w-full">
        <div className="mx-auto grid w-full items-start gap-7 md:max-w-2xl md:grid-cols-2 xl:max-w-none xl:grid-cols-4 xl:gap-6">
          {/* Total Wallet Value */}
          <DashboardTotal
            totalWalletValue={totalWalletValue}
            cosmosValue={cosmosValue}
            osmosisValue={osmosisValue}
            akashValue={akashValue}
            regenValue={regenValue}
            celestiaValue={celestiaValue}
          />

          {/* Cosmos Hub Dashboard */}
          {cosmosAddress && cosmosPrice !== null && cosmosValue > 0 && visibleCards > 1 && (
            <DashboardCosmos
              connectedAddress={cosmosAddress}
              cosmosPrice={cosmosPrice}
              onTotalValueChange={(value) => {
                handleTotalValueChange(value);
                setCosmosValue(value);
              }}
            />
          )}
          {/* Osmosis Dashboard */}
          {osmosisAddress && osmosisPrice !== null && osmosisValue > 0 && visibleCards > 2 && (
            <DashboardOsmosis
              connectedAddress={osmosisAddress}
              osmosisPrice={osmosisPrice}
              onTotalValueChange={(value) => {
                handleTotalValueChange(value);
                setOsmosisValue(value);
              }}
            />
          )}
          {/* Akash Dashboard */}
          {akashAddress && akashPrice !== null && akashValue > 0 && visibleCards > 3 && (
            <DashboardAkash
              connectedAddress={akashAddress}
              akashPrice={akashPrice}
              onTotalValueChange={(value) => {
                handleTotalValueChange(value);
                setAkashValue(value);
              }}
            />
          )}
          {/* Regen Dashboard */}
          {regenAddress && regenPrice !== null && regenValue > 0 && visibleCards > 4 && (
            <DashboardRegen
              connectedAddress={regenAddress}
              regenPrice={regenPrice}
              onTotalValueChange={(value) => {
                handleTotalValueChange(value);
                setRegenValue(value);
              }}
            />
          )}
          {/* Celestia Dashboard */}
          {celestiaAddress && celestiaPrice !== null && celestiaValue > 0 && visibleCards > 5 && (
            <DashboardCelestia
              connectedAddress={celestiaAddress}
              tiaPrice={celestiaPrice}
              onTotalValueChange={(value) => {
                handleTotalValueChange(value);
                setCelestiaValue(value);
              }}
            />
          )}
        </div>
        {visibleCards < 8 && (
          <div className="flex justify-center mt-4">
            <button
              className="btn bg-indigo-600 text-white px-4 py-2 rounded"
              onClick={loadMoreCards}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;