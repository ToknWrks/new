"use client";
import React from "react";
import DoughnutChart from "../charts/doughnut-chart";
import DashboardCosmos from "../toknwrks/dashboardCosmos";
import DashboardOsmosis from "../toknwrks/dashboardOsmosis";
import DashboardAkash from "../toknwrks/dashboardAkash";
import DashboardRegen from "../toknwrks/dashboardRegen";
import DashboardCelestia from "../toknwrks/dashboardCelestia";
import DashboardOmniflix from "../toknwrks/dashboardOmniflix";
import { useState } from "react";
import Modal from "../Modal";
import ClaimPreview from "./claim-preview";

interface DashboardTotalProps {
  totalWalletValue: number;
  cosmosValue: number;
  osmosisValue: number;
  akashValue: number;
  regenValue: number;
  celestiaValue: number;
  omniflixValue: number;
  cosmosPrice: number;
  osmosisPrice: number;
  akashPrice: number;
  regenPrice: number;
  celestiaPrice: number;
  omniflixPrice: number;
}

export default function DashboardTotal({ totalWalletValue, cosmosValue, osmosisValue, akashValue, regenValue, celestiaValue, omniflixValue }: DashboardTotalProps) {
  const data = {
    labels: ["ATOM", "OSMO", "AKT", "REGEN", "TIA", "FLIX"],
    datasets: [
      {
        data: [cosmosValue, osmosisValue, akashValue, regenValue, celestiaValue, omniflixValue],
        backgroundColor: ["#6c3483", "#7e57c2", "#34495e", "#73c6b6", "#5d6d7e"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#c0392b", "#4BC0C0", "#9966FF"],
      },
    ],
  };
  const [isClaimsModalOpen, setIsClaimsModalOpen] = useState(false);
  const openClaimsModal = () => setIsClaimsModalOpen(true);
  const closeClaimsModal = () => setIsClaimsModalOpen(false);


  return (
    <section>
      <div className="pb-12 md:pb-20"></div>
      <div className="relative flex h-full flex-col rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
        <div className="relative mb-4 border-b pb-5 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1]">
          <div className="mb-2 font-nacelle text-[1rem] text-gray-200">All Chains</div>
          <div className="mb-1.5 flex items-baseline font-nacelle">
            <span className="text-2xl text-indigo-200/65">$</span>
            <span className="text-4xl font-semibold tabular-nums text-gray-200">{totalWalletValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="mb-4 grow text-xs text-indigo-200/65">
            Staked, Liquid, and Rewards
          </div>
          <button
           onClick={openClaimsModal}
            className="btn-sm relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
          
          >
            Claim All Rewards
          </button>
          
        </div>
        <div className="flex justify-center">
          <DoughnutChart data={data} width={165} height={165} />
        </div>
      </div>

       {/* Claims Modal */}
 {isClaimsModalOpen && (
  <Modal isOpen={isClaimsModalOpen} onClose={closeClaimsModal}>
    <ClaimPreview  />
  </Modal>
)}
    </section>
  );
}