import { useState, useEffect } from "react";
import Logo from "../ui/logo";
import Link from "next/link";

export const metadata = {
  title: "Connect - ToknWrks",
  description: "ToknWrks Settings",
};

// Mapping of user-friendly token names to their denominations
const tokenDenomMap = {
  USDC: "uusdc",
};

const getSavedSettings = () => {
  const savedSettings = localStorage.getItem("dashboardSettings");
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return null;
};

const DashboardSettings = () => {
  const savedSettings = getSavedSettings();

  const [SwapPercentage, setSwapPercentage] = useState(savedSettings?.SwapPercentage || 35);
  const [TaxRate, setTaxRate] = useState(savedSettings?.TaxRate || 25);
  const [SwapToken, setSwapToken] = useState<keyof typeof tokenDenomMap>(savedSettings?.SwapToken || "USDC");
  const [Slippage, setSlippage] = useState(savedSettings?.Slippage || 1); // Add state for Slippage
  const [TipAmount, setTipAmount] = useState<number>(savedSettings?.TipAmount || 1); // Add state for Tip Amount
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Save settings to local storage whenever they change
  useEffect(() => {
    const settings = {
      SwapPercentage,
      TaxRate,
      SwapToken,
      Slippage,
      TipAmount,
    };
    localStorage.setItem("dashboardSettings", JSON.stringify(settings));
  }, [SwapPercentage, TaxRate, SwapToken, Slippage, TipAmount]);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="mb-3 text-center">
            <Logo />
          </div>
          <div className="pb-3 text-center">
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-xl font-semibold text-transparent md:text-4xl">
              Settings
            </h2>
          </div>

          <form className="mx-auto max-w-[400px]">
            <div className="space-y-4">
              <div>
                <label
                  className="mb-0 block text-sm font-medium text-indigo-200/65"
                  htmlFor="SwapPercentage">
                  Auto Swap % (not functional yet)
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
                  className="mb-0 block text-sm font-medium text-indigo-200/65"
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
              
                </select>
              </div>

              <div>
                <label
                  className="mb-0 block text-sm font-medium text-indigo-200/65"
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

              <div>
                <label
                  className="mb-0 block text-sm font-medium text-indigo-200/65"
                  htmlFor="Slippage"
                >
                  Slippage (not functional yet)
                </label>
                <select
                  id="Slippage"
                  value={Slippage}
                  onChange={(e) => setSlippage(Number(e.target.value))}
                  className="form-select w-full text-gray-200"
                >
                  <option value={1}>1%</option>
                  <option value={3}>3%</option>
                  <option value={5}>5%</option>
                </select>
              </div>


              <div>
                <label
                  className="mb-0 block text-sm font-medium text-indigo-200/65"
                  htmlFor="TipAmount"
                >
                  Tip Amount
                </label>
                <select
                  id="TipAmount"
                  value={TipAmount}
                  onChange={(e) => setTipAmount(Number(e.target.value))}
                  className="form-select w-full text-gray-200"
                >
                  <option value={.5}>.5%</option>
                  <option value={1}>1%</option>
                  <option value={3}>3%</option>
                  <option value={5}>5%</option>
                  <option value={10}>10%</option>
                </select>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <button
                onClick={() => setShowSuccessMessage(true)}
                className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
              >
                Save Settings
              </button>
              {showSuccessMessage && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  Settings saved successfully!
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DashboardSettings;