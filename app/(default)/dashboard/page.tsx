"use client";

import { useState, useEffect } from "react";
import pLimit from "p-limit";
import DashboardCosmos from "@/components/dashboard-cosmos";
import DashboardOsmosis from "@/components/dashboard-osmosis";
import DashboardAkash from "@/components/dashboard-akash";
import DashboardRegen from "@/components/dashboard-regen";
import DashboardCelestia from "@/components/dashboard-celestia";
import DashboardTotal from "@/components/dashboard-all"; // Adjust the import path as needed
import { useWallet } from "@/components/WalletContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import BlurredShape from "@/public/images/blurred-shape.svg";


const limit = pLimit(1); // Limit to 1 concurrent request

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Page = () => {
  const { wallet, cosmosAddress, osmosisAddress, akashAddress, regenAddress, celestiaAddress } = useWallet();
  const [cosmosPrice, setCosmosPrice] = useState<number | null>(null);
  const [osmosisPrice, setOsmosisPrice] = useState<number | null>(null);
  const [akashPrice, setAkashPrice] = useState<number | null>(null);
  const [regenPrice, setRegenPrice] = useState<number | null>(null);
  const [celestiaPrice, setCelestiaPrice] = useState<number | null>(null);
  const [totalWalletValue, setTotalWalletValue] = useState<number>(0);
  const [cosmosValue, setCosmosValue] = useState<number>(0);
  const [osmosisValue, setOsmosisValue] = useState<number>(0);
  const [akashValue, setAkashValue] = useState<number>(0);
  const [regenValue, setRegenValue] = useState<number>(0);
  const [celestiaValue, setCelestiaValue] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(6); // Initial number of visible cards
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrices = async () => {
      const fetchFunctions = [
        async () => {
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
        },
        async () => {
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
        },
        async () => {
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
        },
        async () => {
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
        },
        async () => {
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
        },
      ];

      try {
        for (const fetchFunction of fetchFunctions) {
          await fetchFunction();
          await delay(3000); // 5 seconds delay between each API call
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch prices:", err);
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

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
  if (!wallet) {
    return (
      <section className="relative">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-20 -translate-x-1/3"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
             
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-10 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Connect Wallet
            </h2>
          </div>
        
        </div>
      </div>
    </section>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 sm:px-6 pt-1 w-full">
        <div className="mx-auto grid w-full items-start gap-7 md:max-w-2xl md:grid-cols-2 xl:max-w-none xl:grid-cols-4 xl:gap-6">
          {/* Total Wallet Value */}
          {loading ? (
            <Skeleton height={150} baseColor="#17202a" highlightColor="#1c2833" borderRadius={15} />
          ) : (
            <DashboardTotal
              totalWalletValue={totalWalletValue}
              cosmosValue={cosmosValue}
              osmosisValue={osmosisValue}
              akashValue={akashValue}
              regenValue={regenValue}
              celestiaValue={celestiaValue}
            />
          )}

          {/* Cosmos Hub Dashboard */}
          {loading ? (
            <Skeleton height={150} baseColor="#17202a" highlightColor="#1c2833" borderRadius={15} />
          ) : (
            cosmosAddress && cosmosPrice !== null && visibleCards > 1 && (
              <DashboardCosmos
                connectedAddress={cosmosAddress}
                cosmosPrice={cosmosPrice}
                onTotalValueChange={(value) => {
                  handleTotalValueChange(value);
                  setCosmosValue(value);
                }}
              />
            )
          )}
          {/* Osmosis Dashboard */}
          {loading ? (
            <Skeleton height={150} baseColor="#17202a" highlightColor="#1c2833" borderRadius={15} />
          ) : (
            osmosisAddress && osmosisPrice !== null && visibleCards > 2 && (
              <DashboardOsmosis
                connectedAddress={osmosisAddress}
                osmosisPrice={osmosisPrice}
                onTotalValueChange={(value) => {
                  handleTotalValueChange(value);
                  setOsmosisValue(value);
                }}
              />
            )
          )}
          {/* Akash Dashboard */}
          {loading ? (
            <Skeleton height={150} baseColor="#17202a" highlightColor="#1c2833" borderRadius={15} />
          ) : (
            akashAddress && akashPrice !== null && visibleCards > 3 && (
              <DashboardAkash
                connectedAddress={akashAddress}
                akashPrice={akashPrice}
                onTotalValueChange={(value) => {
                  handleTotalValueChange(value);
                  setAkashValue(value);
                }}
              />
            )
          )}
          {/* Regen Dashboard */}
          {loading ? (
            <Skeleton height={150} baseColor="#17202a" highlightColor="#1c2833" borderRadius={15} />
          ) : (
            regenAddress && regenPrice !== null && visibleCards > 4 && (
              <DashboardRegen
                connectedAddress={regenAddress}
                regenPrice={regenPrice}
                onTotalValueChange={(value) => {
                  handleTotalValueChange(value);
                  setRegenValue(value);
                }}
              />
            )
          )}
          {/* Celestia Dashboard */}
          {loading ? (
            <Skeleton height={150} baseColor="#17202a" highlightColor="#1c2833" borderRadius={15} />
          ) : (
            celestiaAddress && celestiaPrice !== null && visibleCards > 5 && (
              <DashboardCelestia
                connectedAddress={celestiaAddress}
                tiaPrice={celestiaPrice}
                onTotalValueChange={(value) => {
                  handleTotalValueChange(value);
                  setCelestiaValue(value);
                }}
              />
            )
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