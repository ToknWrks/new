import { useState, useEffect } from "react";
import Logo from "../ui/logo";

export const metadata = {
  title: "Connect - ToknWrks",
  description: "ToknWrks Settings",
};

// Mapping of user-friendly token names to their denominations
const tokenDenomMap = {
  USDC: "uusdc",
  BTC: "ubtc",
  REGEN: "uregen",
};

import Link from "next/link";

export default function DashboardSettings() {
  const [SwapPercentage, setSwapPercentage] = useState(35);
  const [TaxRate, setTaxRate] = useState(25);
  const [SwapToken, setSwapToken] = useState<keyof typeof tokenDenomMap>("USDC");

  // Load settings from local storage when the component mounts
  useEffect(() => {
    const savedSettings = localStorage.getItem("dashboardSettings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSwapPercentage(settings.SwapPercentage);
      setTaxRate(settings.TaxRate);
      setSwapToken(settings.SwapToken);
    }
  }, []);

  const handleSaveSettings = () => {
    const settings = {
      SwapPercentage,
      TaxRate,
      SwapToken: tokenDenomMap[SwapToken], // Map the token name to its denomination
    };
    // Save settings to local storage
    localStorage.setItem("dashboardSettings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="mb-3 text-center">
            <Logo />
          </div>
          <div className="pb-6 text-center">
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-2xl font-semibold text-transparent md:text-4xl">
              Settings
            </h2>
          </div>

          <form className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="SwapPercentage"
                >
                  Auto Swap %
                </label>
                <input
                  id="SwapPercentage"
                  type="number"
                  value={SwapPercentage}
                  onChange={(e) => setSwapPercentage(Number(e.target.value))}
                  className="form-input w-full"
                  placeholder="Auto Swap %"
                />
              </div>

              <div className="flex-1">
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="SwapToken"
                >
                  Swap Token
                </label>
                <select
                  id="SwapToken"
                  value={SwapToken}
                  onChange={(e) => setSwapToken(e.target.value as keyof typeof tokenDenomMap)}
                  className="form-select w-full text-gray-200"
                >
                  <option value="default" disabled hidden>
                    Select a Token
                  </option>
                  <option value="USDC">USDC</option>
                  <option value="BTC">BTC</option>
                  <option value="REGEN">REGEN</option>
                </select>
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="TaxRate"
                >
                  Tax Rate %
                </label>
                <input
                  id="TaxRate"
                  type="number"
                  value={TaxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="form-input w-full"
                  placeholder="Your Tax Rate %"
                />
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <button
                onClick={handleSaveSettings}
                className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}