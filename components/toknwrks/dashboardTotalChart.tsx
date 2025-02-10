"use client";
import React from "react";
import DoughnutChart from "../charts/doughnut-chart";
import { useState } from "react";
import Modal from "../Modal";
import ClaimPreview from "./claim-preview";


interface DashboardTotalChartProps {
  chainValues: { [key: string]: 
    { totalValue: number; 
      tokenPrice: number; 
      stakedTokens: number; 
      unclaimedRewards: number; 
      availableTokens: number } };
      totalWalletValue: number;
}

const DashboardTotalChart: React.FC<DashboardTotalChartProps> = ({ chainValues, totalWalletValue }) => {
  const data = {
    labels: Object.keys(chainValues),
    datasets: [
      {
        data: Object.values(chainValues).map(chain => chain.totalValue),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  };
  const [isClaimsModalOpen, setIsClaimsModalOpen] = useState(false);
  const openClaimsModal = () => setIsClaimsModalOpen(true);
  const closeClaimsModal = () => setIsClaimsModalOpen(false);

  return (
<section>
        <div className="relative mb-4 border-b pb-5 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1]">
          <div className="mb-2 font-nacelle text-[1rem] text-gray-200">All Chains</div>
          
          <div className="mb-4 grow text-xs text-indigo-200/65">
            Staked, Liquid, and Rewards
          </div>
        
          <DoughnutChart data={data} width={165} height={165} />
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
export default DashboardTotalChart;