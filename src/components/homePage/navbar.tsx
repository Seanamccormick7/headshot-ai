// components/Navbar.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-20 top-0 bg-transparent">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <Link href="/" className="text-white text-xl font-bold">
          Headshot-ai
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="#hero" className="text-white hover:underline">
            Home
          </Link>
          <Link href="#showcase" className="text-white hover:underline">
            Showcase
          </Link>
          <Link href="#reviews" className="text-white hover:underline">
            Reviews
          </Link>
          <Link href="#pricing" className="text-white hover:underline">
            Pricing
          </Link>
          <Button asChild variant="default">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <Link href="#hero" className="block px-4 py-2 text-white">
            Home
          </Link>
          <Link href="#showcase" className="block px-4 py-2 text-white">
            Showcase
          </Link>
          <Link href="#reviews" className="block px-4 py-2 text-white">
            Reviews
          </Link>
          <Link href="#pricing" className="block px-4 py-2 text-white">
            Pricing
          </Link>
          <Link href="/signup" className="block px-4 py-2 text-white">
            <Button asChild variant="default" className="w-full">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
