"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") {
    return null;
  }

  return (
    <nav className="bg-purple-950 text-white flex justify-between md:py-2 md:h-16 px-9 flex-col items-center md:flex-row">
      <div>
      <Link className="flex items-center font-bold md:text-lg" href={"/"}>
        <span>GetMeaCoffee!</span>
        <img className="w-10 ml-2 " src="/coffee.gif" alt="coffee" />
      </Link>
      </div>

      <div className="flex items-center md:px-5 md:mt-4 gap-3 mb-3">
        {session ? (
          <>
            <div
              className="relative"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-md"
              >
                Welcome {session.user?.email}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </Link>
                  <Link
                    href={`/${session.user.username}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Your Page
                  </Link>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-gradient-to-br from-purple-900 to-blue-700 hover:from-purple-800 hover:to-blue-600 rounded-md"
            >
              Logout
            </button>
          </>
            
        ) : (
          pathname !== "/login" && (
            <Link href="/login">
              <button className="px-4 py-2 bg-gradient-to-br from-purple-900 to-blue-700 hover:from-purple-800 hover:to-blue-600 rounded-md">
                Login
              </button>
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;