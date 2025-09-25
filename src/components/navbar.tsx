// app/components/SidebarMegaMenu.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiShoppingCart,
  FiChevronRight,
  FiUser,
  FiHeart,
  FiLogOut,
} from "react-icons/fi";
import CountrySelector from "./CountrySelector";
import LoginModal from "./LoginModal";
import { MenuItem, MenuSection, TopLevel } from "../types/navbar";
import NavLogo from "../images/navlogo";
import Dummyuser from "../../public/Dummyuser.png";
import cart from "../../public/cart.svg";
import { useRouter } from "next/navigation";

type Props = {
  topLevels: TopLevel[];
  loginHref?: string;
  cartHref?: string;
};

export default function SidebarMegaMenu({
  topLevels,
  loginHref = "/login",
  cartHref = "/cart",
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Check user login status from localStorage
  useEffect(() => {
    const checkLoginStatus = () => {
      const userActive = localStorage.getItem("useractive");
      setIsLoggedIn(userActive === "true");
    };

    checkLoginStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener("storage", checkLoginStatus);

    // Listen for custom login status change events (from same tab)
    const handleLoginStatusChange = (event: CustomEvent) => {
      setIsLoggedIn(event.detail.isLoggedIn);
    };

    window.addEventListener(
      "userLoginStatusChanged",
      handleLoginStatusChange as EventListener
    );

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener(
        "userLoginStatusChanged",
        handleLoginStatusChange as EventListener
      );
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setClickedIndex(null);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a,button,[tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();
  }, [mobileOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (clickedIndex !== null) {
        const target = event.target as HTMLElement;
        if (!target.closest(".mega-menu-container")) {
          setClickedIndex(null);
        }
      }

      if (profileDropdownOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest(".profile-dropdown-container")) {
          setProfileDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clickedIndex, profileDropdownOpen]);

  const handleMenuClick = (index: number) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("useractive");

    // Dispatch custom event to notify other components of logout
    window.dispatchEvent(
      new CustomEvent("userLoginStatusChanged", {
        detail: { isLoggedIn: false },
      })
    );

    setIsLoggedIn(false);
    setProfileDropdownOpen(false);
    // You can add additional logout logic here (API calls, redirects, etc.)
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white overflow-x-clip">
      <nav
        aria-label="Primary"
        className="mx-auto max-w-[1330px] p-6 lg:px-6 xl:px-8 lg:py-8"
      >
        <div className="flex h-10 lg:h-12 items-center justify-between">
          <div className="flex items-center gap-[14px] max-w-[50%]">
            <button
              type="button"
              className="inline-flex items-center justify-center w-6 h-6 lg:hidden"
              aria-label="Open menu"
              aria-controls="mobile-drawer"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu className="h-full w-full" />
            </button>

            <Link
              href="/"
              className="h-6 lg:h-7 max-w-[80%] lg:max-w-full"
              aria-label="Go to homepage"
            >
              <NavLogo className="h-full w-full" />
            </Link>
          </div>
          <div className="flex items-center gap-7">
            <ul className="hidden lg:flex lg:relative items-center gap-4 xl:gap-8">
              {topLevels.map((t, i) => (
                <li key={t.label} className=" mega-menu-container">
                  <button
                    type="button"
                    className="inline-flex items-center text-sm xl:text-base cursor-pointer font-medium gap-1 text-neutral-800 hover:text-brand transition-colors"
                    aria-haspopup="true"
                    aria-expanded={clickedIndex === i}
                    aria-controls={`mega-${i}`}
                    onClick={() => handleMenuClick(i)}
                  >
                    <span
                      className={
                        i === clickedIndex
                          ? "text-brand font-satoshi font-bold text-sm xl:text-base"
                          : ""
                      }
                    >
                      {t.label}
                    </span>
                    <FiChevronDown
                      className={`h-4 w-4 xl:h-6 xl:w-6 transition-transform ${
                        clickedIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {clickedIndex === i && (
                    <div
                      id={`mega-${i}`}
                      role="menu"
                      className="absolute left-0 overflow-y-auto  max-h-[60vh] top-full w-screen mt-3 max-w-full rounded-[0.875rem] border border-[#EEEEEE] bg-neutral-50 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)]"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                        {t.sections.map((sec) => (
                          <div key={sec.heading} className="min-w-0">
                            <h3 onClick={()=>router.push("/Category")} className="text-sm xl:text-base font-medium cursor-pointer font-satoshi text-brand uppercase mb-6">
                              {sec.heading}
                            </h3>
                            <ul className="space-y-6">
                              {sec.items.map((item) => (
                                <li key={item.label}>
                                  <Link
                                  href={"/subcategory"}
                                    className="block text-xs xl:text-sm text-neutral-800 hover:text-brand"
                                    onClick={() => 
                                      setClickedIndex(null)}
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className=" flex items-center gap-3">
              <Link
                href={cartHref}
                className="inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-[#EEEEEE] text-black hover:bg-neutral-100"
                aria-label="Cart"
              >
                <Image
                  src={cart}
                  alt="cart"
                  className=" h-5 w-5 md:h-6 md:w-6"
                />
              </Link>

              {!isLoggedIn ? (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="hidden lg:inline-flex text-lg font-bold font-satoshi h-12 px-[1.125rem] items-center rounded-lg bg-brand-50 text-brand hover:bg-brand-100"
                >
                  Log in
                </button>
              ) : (
                <div className="hidden lg:block profile-dropdown-container relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="inline-flex h-12 :w-12 items-center justify-center rounded-full"
                    aria-label="User Profile"
                  >
                    <Image
                      src={Dummyuser}
                      alt="User Profile"
                      className="rounded-full h-full w-full"
                    />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg border border-[#EEEEEE] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)] p-1 z-50">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2.5 px-[0.875rem] py-3 text-base font-medium "
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FiUser className="h-5 w-5" />
                        Personal Details
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2.5 px-[0.875rem] py-3 text-base font-medium "
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FiHeart className="h-5 w-5" />
                        Wishlist
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-[0.875rem] py-3 text-base font-medium "
                      >
                        <FiLogOut className="h-5 w-5" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <>
          <button
            aria-label="Close menu overlay"
            className="fixed inset-0 bg-black/30 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div
            ref={drawerRef}
            id="mobile-drawer"
            className="fixed inset-y-0 max-h-screen h-screen flex flex-col overflow-auto px-6 py-8 left-0 w-80 max-w-[90%] bg-white shadow-2xl lg:hidden "
            data-open={mobileOpen}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div className="flex h-6 items-center justify-between">
              <button
                type="button"
                aria-label="Close menu"
                className="rounded-full h-full w-6"
                onClick={() => setMobileOpen(false)}
              >
                <FiX className="h-6 w-6 text-black" />
              </button>
              <div className="">
                <CountrySelector />
              </div>
            </div>
            {!isLoggedIn ? (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="px-3.5 py-3 mt-8 border-[#EEEEEE] flex items-center justify-between border rounded-lg w-full hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={Dummyuser}
                    alt="Dummyuser"
                    width={36}
                    height={36}
                  />
                  <span className="text-base font-medium font-satoshi text-black">
                    My Account
                  </span>
                </div>

                <FiChevronRight className="h-6 w-6 text-black" />
              </button>
            ) : (
              <div className="mt-8">
                <div className="px-3.5 py-3 border-[#EEEEEE] border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Image
                      src={Dummyuser}
                      alt="User Profile"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    <span className="text-base font-medium font-satoshi text-black">
                      My Account
                    </span>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-3.5 py-3 text-sm text-neutral-800 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    <FiUser className="h-4 w-4" />
                    Personal Details
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-3.5 py-3 text-sm text-neutral-800 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    <FiHeart className="h-4 w-4" />
                    Wishlist
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-3 px-3.5 py-3 text-sm text-neutral-800 hover:bg-gray-50 rounded-lg w-full text-left"
                  >
                    <FiLogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-y-auto flex flex-col justify-between flex-grow max-h-[calc(100vh-100px)]">
              <div className="">
                {topLevels?.map((t, index) => (
                  <details
                    key={index}
                    className="group border rounded-lg overflow-hidden  mt-3.5"
                  >
                    <summary className="flex cursor-pointer list-none  px-3.5 py-4 bg-[#FAFAFA] border-[#EEEEEE] items-center justify-between text-neutral-900">
                      <span className="font-medium font-satoshi text-base">
                        {t.label}
                      </span>
                      <FiChevronDown className="h-6 w-6 transition-transform group-open:hidden" />
                      <FiX className="hidden h-6 w-6 transition-transform  group-open:block" />
                    </summary>

                    {t?.sections?.map((sec, index) => (
                      <div
                        key={index}
                        className="mt-6 px-3.5 bg-white last:mb-6"
                      >
                        <h3 onClick={()=>router.push("/Category")}  className="text-[11px] font-semibold tracking-wide text-brand uppercase mb-2">
                          {sec.heading}
                        </h3>
                        <ul className="space-y-2">
                          {sec.items.map((item, index) => (
                            <li key={index}>
                              <Link
                                href={"/subcategory"}
                                className="block text-sm text-neutral-800"
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </details>
                ))}
              </div>
              <button className="mt-4 py-[1.125rem] bg-[#F0682F] font-satoshi font-bold text-lg text-white text-center rounded-lg">
                View all Spaces
              </button>
            </div>
          </div>
        </>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </header>
  );
}
