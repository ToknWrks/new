"use client";

import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import Dropdown from "@/components/dropdown";
import Modal from "@/components/Modal";
import DashboardSettings from "../toknwrks/dashboardSettings"; // Assuming you have a DashboardSettings component

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="flex md:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`group inline-flex h-8 w-8 items-center justify-center text-center text-gray-200 transition ${mobileNavOpen && "active"}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="pointer-events-none fill-current"
          width={16}
          height={16}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className="origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-expanded=true]]:translate-x-0 group-[[aria-expanded=true]]:translate-y-0 group-[[aria-expanded=true]]:rotate-[315deg]"
            y="7"
            width="9"
            height="2"
            rx="1"
          ></rect>
          <rect
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-[[aria-expanded=true]]:rotate-45"
            y="7"
            width="16"
            height="2"
            rx="1"
          ></rect>
          <rect
            className="origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-expanded=true]]:translate-y-0 group-[[aria-expanded=true]]:rotate-[135deg]"
            y="7"
            width="9"
            height="2"
            rx="1"
          ></rect>
        </svg>
      </button>

      {/*Mobile navigation */}
      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute left-0 top-full z-20 mt-2 w-full rounded-xl bg-gray-900/90 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="p-2 text-sm">
            <li>
              <Link
                href="/pricing"
                className="flex rounded-lg px-2 py-1.5 text-white hover:text-indigo-500"
                onClick={() => setMobileNavOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="flex rounded-lg px-2 py-1.5 text-white hover:text-indigo-500"
                onClick={() => setMobileNavOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="flex rounded-lg px-2 py-1.5 text-white hover:text-indigo-500"
                onClick={() => setMobileNavOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/help/frequently-asked-questions"
                className="flex rounded-lg px-2 py-1.5 text-white hover:text-indigo-500"
                onClick={() => setMobileNavOpen(false)}
              >
                Help Centre
              </Link>
            </li>
            <li>
              <Link
                href="/newsletter"
                className="flex rounded-lg px-2 py-1.5 text-white hover:text-indigo-500"
                onClick={() => setMobileNavOpen(false)}
              >
                Newsletter
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex rounded-lg px-2 py-1.5 text-white hover:text-indigo-500"
                onClick={() => setMobileNavOpen(false)}
              >
                Settings: Chains
              </Link>
            </li>
            <li>
              <button
                onClick={openSettingsModal}
                className="flex rounded-lg px-2 py-1.5 text-sm text-white hover:text-indigo-500"
              >
                Settings: Tax & Swap
              </button>
            </li>
          </ul>
        </Transition>
      </div>
      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <Modal isOpen={isSettingsModalOpen} onClose={closeSettingsModal}>
          <DashboardSettings />
        </Modal>
      )}
    </div>
  );
}
