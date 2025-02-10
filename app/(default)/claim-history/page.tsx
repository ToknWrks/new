"use client"
import { useState, useEffect } from "react";
import { CHAINS } from "@/components/toknwrks/chains";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';  // Import theme
import 'primereact/resources/primereact.min.css';  // Core CSS
import 'primeicons/primeicons.css';  // Icons

const priceCache: { [key: string]: number } = {};
const rateLimit = 10; // Number of requests per minute
let requestCount = 0;
let lastRequestTime = Date.now();

const fetchAssetPrice = async (assetId: string) => {
  if (priceCache[assetId]) {
    return priceCache[assetId];
  }

  if (requestCount >= rateLimit && Date.now() - lastRequestTime < 60000) {
    console.warn("Rate limit exceeded, waiting...");
    await new Promise(resolve => setTimeout(resolve, 60000 - (Date.now() - lastRequestTime)));
    requestCount = 0;
    lastRequestTime = Date.now();
  }

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${assetId}&vs_currencies=usd`;
    const res = await fetch(url);
    const data = await res.json();
    const price = data[assetId]?.usd || 0;
    priceCache[assetId] = price;
    requestCount++;
    return price;
  } catch (err) {
    console.error(`Failed to fetch price for ${assetId}:`, err);
    if (priceCache[assetId]) {
      console.warn(`Using cached price for ${assetId}: ${priceCache[assetId]}`);
      return priceCache[assetId];
    }
    return 0;
  }
};

const ClaimsPage = () => {
  const [claims, setClaims] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [taxRate, setTaxRate] = useState<number>(0); // Initialize with 0
  const [currentPrices, setCurrentPrices] = useState<{ [key: string]: number }>({}); // Store current prices

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("User data from local storage:", user); // Debugging log
    if (user) {
      setIsLoggedIn(true);
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser.id);
      fetchClaims(parsedUser.id);
      fetchTaxRate(); // Fetch tax rate from local storage
      fetchCurrentPrices(); // Fetch current prices
    }
  }, []);

  const fetchClaims = async (userId: string) => {
    try {
      console.log("Fetching claims for userId:", userId); // Debugging log
      const res = await fetch(`/api/claims?userId=${userId}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched claims data:", data); // Debugging log
      setClaims(data);
    } catch (err) {
      console.error("Failed to fetch claims:", err);
    }
  };

  const fetchTaxRate = () => {
    const savedSettings = localStorage.getItem("dashboardSettings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setTaxRate(settings.TaxRate || 0);
    }
  };

  const fetchCurrentPrices = async () => {
    try {
      console.log("Fetching current prices"); // Debugging log
      const prices = await Promise.all(
        CHAINS.map(async (chain) => {
          const price = await fetchAssetPrice(chain.AssetId);
          return { [chain.Symbol]: price };
        })
      );
      const pricesObject = prices.reduce((acc, price) => ({ ...acc, ...price }), {});
      console.log("Fetched current prices:", pricesObject); // Debugging log
      setCurrentPrices(pricesObject);
    } catch (err) {
      console.error("Failed to fetch current prices:", err);
    }
  };

  const getChainIcon = (chainName: string) => {
    const chain = CHAINS.find((chain) => chain.chainName === chainName);
    return chain ? chain.icon : "";
  };

  const toggleAccordion = (chainName: string) => {
    setOpenAccordion(openAccordion === chainName ? null : chainName);
  };

  const groupedClaims = claims.reduce((acc: any, claim: any) => {
    if (!acc[claim.chain_name]) {
      acc[claim.chain_name] = [];
    }
    acc[claim.chain_name].push(claim);
    return acc;
  }, {});

  const calculateTaxObligation = (tokensClaimed: number, tokenPrice: number) => {
    return (tokensClaimed * tokenPrice * (taxRate / 100)).toFixed(2);
  };

  const calculateCostBasis = (tokensClaimed: number, tokenPrice: number) => {
    return (tokensClaimed * tokenPrice).toFixed(2);
  };

  const calculateCurrentValue = (tokensClaimed: number, currentPrice: number) => {
    return (tokensClaimed * currentPrice).toFixed(2);
  };

  const calculateProfitLoss = (costBasis: number, currentValue: number) => {
    return (currentValue - costBasis).toFixed(2);
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4 mt-4">Claims</h1>
        <p className="text-blue-500">You must be logged in to view claim data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl mt-4">
      {Object.keys(groupedClaims).map((chainName) => (
        <div key={chainName} className="mb-4 px-4"> {/* Add padding to the container */}
          <div
            className="accordion-header relative flex h-14 items-center gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-sm"
            onClick={() => toggleAccordion(chainName)}
          >
            <img src={getChainIcon(chainName)} alt={`${chainName} icon`} className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-semibold">{chainName}</h2>
          </div>
          {openAccordion === chainName && (
            <div className="accordion-body bg-gray-200 p-4 rounded-b-lg border border-gray-600">
              <DataTable value={groupedClaims[chainName]} stripedRows>
                <Column field="tokens_claimed" header="Claimed" body={(rowData) => parseFloat(rowData.tokens_claimed).toFixed(2)} className="text-center" />
                <Column field="token_price" header="Price" body={(rowData) => `$${parseFloat(rowData.token_price).toFixed(2)}`} className="text-center" />
                <Column field="date_claimed" header="Date" body={(rowData) => new Date(rowData.date_claimed).toLocaleDateString()} className="text-center" />
                <Column field="tax" header="Tax" body={(rowData) => `$${calculateTaxObligation(parseFloat(rowData.tokens_claimed), parseFloat(rowData.token_price))}`} className="text-center" />
                <Column field="basis" header="Basis" body={(rowData) => `$${calculateCostBasis(parseFloat(rowData.tokens_claimed), parseFloat(rowData.token_price))}`} className="text-center" />
                <Column field="value" header="Value" body={(rowData) => `$${calculateCurrentValue(parseFloat(rowData.tokens_claimed), currentPrices[rowData.token_symbol] || parseFloat(rowData.token_price))}`} className="text-center" />
                <Column field="profit_loss" header="P&L" body={(rowData) => `$${calculateProfitLoss(parseFloat(calculateCostBasis(parseFloat(rowData.tokens_claimed), parseFloat(rowData.token_price))), parseFloat(calculateCurrentValue(parseFloat(rowData.tokens_claimed), currentPrices[rowData.token_symbol] || parseFloat(rowData.token_price))))}`} className="text-center" />
              </DataTable>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClaimsPage;