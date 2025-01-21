"use client";

import PageIllustration from "@/components/page-illustration";
import FooterSeparator from "@/components/footer-separator";
import Logo from "@/components/ui/logo";
import { CHAINS } from "@/components/toknwrks/chains";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [savedChains, setSavedChains] = useState<string[]>(["Cosmos Hub"]); // Cosmos Hub is required

  useEffect(() => {
    const savedChains = localStorage.getItem("savedChains");
    if (savedChains) {
      setSavedChains(JSON.parse(savedChains));
    }
  }, []);

  const handleCheckboxChange = (chainName: string) => {
    const updatedChains = savedChains.includes(chainName)
      ? savedChains.filter((name) => name !== chainName)
      : [...savedChains, chainName];
    setSavedChains(updatedChains);
    localStorage.setItem("savedChains", JSON.stringify(updatedChains));
  };

  return (
    <>
      <PageIllustration multiple />
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section header */}
            <div className="pb-12 text-center">
              <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl">
                Chain Settings
              </h1>
              <div className="mx-auto max-w-3xl">
                <p className="text-xl text-indigo-200/65">
                  Select Chains to Enable in your dashboard
                </p>
              </div>
            </div>
            {/* Chain Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CHAINS.map((chain) => (
                <div key={chain.chainName} className="bg-gray-900 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={chain.icon} alt={`${chain.chainName} icon`} className="h-10 w-10 mr-4" />
                      <h2 className="text-xl font-semibold text-gray-200">{chain.chainName}</h2>
                    </div>
                    <label htmlFor={`${chain.chainName}-checkbox`} className="flex items-center text-sm font-medium text-gray-200">
                      <input
                        id={`${chain.chainName}-checkbox`}
                        type="checkbox"
                        checked={chain.chainName ? savedChains.includes(chain.chainName) : false}
                        onChange={() => chain.chainName && handleCheckboxChange(chain.chainName)}
                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        disabled={chain.chainName === "Cosmos Hub"} // Disable checkbox for Cosmos Hub
                      />
                      <span className="ml-2">Enable</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <FooterSeparator />
    </>
  );
}