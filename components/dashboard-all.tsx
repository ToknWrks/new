"use client";

interface DashboardTotalProps {
  totalWalletValue: number;
}

export default function DashboardTotal({ totalWalletValue }: DashboardTotalProps) {
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
        </div>
      </div>
    </section>
  );
}