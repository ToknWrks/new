"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";
import Dropdown from "@/components/dropdown";
import MobileMenu from "./mobile-menu";
import Modal from "@/components/Modal";
import WalletConnection from "@/components/toknwrks/WalletConnection";
import DashboardSettings from "../toknwrks/dashboardSettings";

export default function Header() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const openWalletModal = () => setIsWalletModalOpen(true);
  const closeWalletModal = () => setIsWalletModalOpen(false);

  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);

  const handleLogout = () => {
    // Handle logout logic
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.reload(); // Refresh the page to update the UI
  };

  const handleWalletConnect = () => {
    console.log("Wallet connected in Header");
  };

  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-sm">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
           
            <ul className="flex grow flex-wrap items-center justify-center gap-4 text-sm lg:gap-8">
              {/* Claim link 
              <li>
                <Link
                  href="/claim-rewards"
                  className="flex items-center px-2 py-1 text-gray-200 transition hover:text-indigo-500 lg:px-3"
                >
                  Claim Rewards
                </Link>
              </li>
              */}
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center px-2 py-1 text-gray-200 transition hover:text-indigo-500 lg:px-3"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/claim-history"
                  className="flex items-center px-2 py-1 text-gray-200 transition hover:text-indigo-500 lg:px-3"
                >
                  Claim History
                </Link>
              </li>
              <li>
                <Link
                  href="/help/frequently-asked-questions"
                  className="flex items-center px-2 py-1 text-gray-200 transition hover:text-indigo-500 lg:px-3"
                >
                  Help Centre
                </Link>
              </li>
              {/* 1st level: hover */}
              <Dropdown title="Settings">
                {/* 2nd level: hover */}
                <li>
                    <button
                      onClick={openSettingsModal}
                      className="flex rounded-lg px-2 py-1.5 text-sm text-white hover:text-indigo-500"
                    >
                      Tax &  Swap
                    </button>
                  </li>
                <li>
                  <Link
                    href="/settings"
                    className="flex rounded-lg px-2 py-1.5 text-sm text-white hover:text-indigo-500"
                  >
                    Chains
                  </Link>
                </li>
              </Dropdown>
            </ul>
          </nav>
          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            {isLoggedIn ? (
              <>
                <li>
                  <button onClick={handleLogout} className="btn-sm relative bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/signin"
                    className="btn-sm relative bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="btn-sm bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={openWalletModal}
                className="btn-sm relative bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
              >
                Wallet
              </button>
            </li>
          </ul>

          <MobileMenu />
        </div>
      </div>

     {/* Wallet Modal */}
     {isWalletModalOpen && (
        <Modal isOpen={isWalletModalOpen} onClose={closeWalletModal}>
          <WalletConnection onConnect={handleWalletConnect} />
        </Modal>
      )}

      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <Modal isOpen={isSettingsModalOpen} onClose={closeSettingsModal}>
          <DashboardSettings />
        </Modal>
      )}

    </header>
  );
}
