"use client";

import { useState } from "react";

export default function ClaimPreview() {
  const [annual, setAnnual] = useState<boolean>(true);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Progress  */}
        <div className="relative flex h-full flex-col rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.indigo.500/.5),theme(colors.indigo.500),theme(colors.indigo.500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          <div className="relative mb-4 border-b pb-5 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1]">
            <div className="absolute right-0 top-0 inline-flex items-center rounded-full bg-indigo-500/[.15] px-2 py-0.5 text-xs font-medium text-indigo-500 shadow-sm">
              In Progress
            </div>
            <div className="mb-2 font-nacelle text-[1rem] text-gray-200">
              Claim & Swap
            </div>
            <div className="mb-1.5 flex items-baseline font-nacelle">
              
            </div>
            <div className="mb-1 grow text-xs text-indigo-200/65">
              Claiming  & swapping 35% to USDC
            </div>
           
          </div>
          <p className="mb-4 text-sm italic text-gray-200">
            This process will:
          </p>
          <ul className="grow space-y-2 text-sm text-indigo-200/65">
            <li className="flex items-center">
              <svg
                className="mr-2 h-3 w-3 shrink-0 fill-current text-indigo-500"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Claim ATOM</span>
            </li>
            <li className="flex items-center">
              <svg
                className="mr-2 h-3 w-3 shrink-0 fill-current text-indigo-500"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Sent to Osmosis</span>
            </li>
            <li className="flex items-center">
              <svg
                className="mr-2 h-3 w-3 shrink-0 fill-current text-indigo-500"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Swapped for USDC</span>
            </li>
            <li className="flex items-center">
              <svg
                className="mr-2 h-3 w-3 shrink-0 fill-current text-indigo-500"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Fee: .1 OSMO</span>
            </li>
            <a
              className="btn-sm relative w-full bg-gradient-to-b from-indigo-600 to-indigo-500  bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
              href="#0"
            >
              Claim & Swap
            </a>
          </ul>
        </div>
        {/* Pricing table 4 */}
      
           
        </div>
      
    
  );
}
