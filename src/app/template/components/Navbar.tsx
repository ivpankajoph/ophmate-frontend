/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
  const { homepage } = useSelector((state: RootState) => ({
    homepage: (state as any).alltemplatepage?.data,
  }));

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4 md:py-6 relative z-20 backdrop-blur-2xl">
      {/* Logo Section */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-12 h-12 rounded-full border flex items-center justify-center overflow-hidden shadow-sm">
          <img
            src={
              homepage?.components?.logo ||
              "https://images.unsplash.com/photo-1620632523414-054c7bea12ac?auto=format&fit=crop&q=80&w=687"
            }
            alt="Business Logo"
            className="w-full h-full object-cover"
          />
        </div>

        <span className="text-lg md:text-xl lg:text-2xl font-semibold tracking-wide truncate max-w-[160px] md:max-w-[200px]">
          {homepage?.business_name || "Your Business Name"}
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-8">
        {["Home", "About", "Contact", "Category"].map((item) => (
          <Link
            key={item}
            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className="text-base font-medium hover:opacity-75 transition-all duration-200"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Desktop Icons */}
      <div className="hidden lg:flex items-center gap-5">
        {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
          <a key={i} href="#" className="transition-opacity hover:opacity-75">
            <Icon size={22} />
          </a>
        ))}
        <a href="#" className="relative transition-opacity hover:opacity-75">
          <ShoppingBag size={22} />
          <span className="absolute -top-2 -right-2 text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold bg-opacity-80 backdrop-blur-sm">
            0
          </span>
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden flex items-center justify-center p-2 rounded-md transition-transform duration-200 hover:scale-105"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-opacity-70 backdrop-blur-lg py-8 shadow-md animate-slideDown bg-white">
          <div className="flex flex-col items-center gap-6">
            {["Home", "About", "Contact", "Category"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-lg font-medium transition-all hover:opacity-75"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}

            <div className="flex items-center gap-5 mt-4">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="transition-opacity hover:opacity-75"
                >
                  <Icon size={22} />
                </a>
              ))}
              <a href="#" className="relative transition-opacity hover:opacity-75">
                <ShoppingBag size={22} />
                <span className="absolute -top-2 -right-2 text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold bg-opacity-80 backdrop-blur-sm">
                  0
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
