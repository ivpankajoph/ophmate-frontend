/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RootState } from "@/store";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

export default function Footer() {
  const contact = useSelector((state: any) => state?.vendorprofilepage?.vendor);
  const { homepage } = useSelector((state: RootState) => ({
    homepage: (state as any).alltemplatepage?.data,
  }));

  // Get vendor_id dynamically
  const params = useParams();
  const vendor_id = params.vendor_id;

  return (
    <footer className="w-full border-t mt-10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
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
              <span className="text-lg md:text-xl font-semibold tracking-wide truncate max-w-[180px]">
                {homepage?.business_name || "Your Business Name"}
              </span>
            </div>

            <p className="opacity-75 mb-6 leading-relaxed text-sm md:text-base">
              Your premier destination for all things green. Bringing nature into
              your home, one plant at a time.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              {[
                { name: "Home", path: `/template/${vendor_id}` },
                { name: "Shop", path: `/template/${vendor_id}/category` },
                { name: "About Us", path: `/template/${vendor_id}/about` },
                { name: "Contact", path: `/template/${vendor_id}/contact` },
                { name: "FAQs", path: `/template/${vendor_id}/faqs` },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="opacity-75 hover:opacity-100 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4">
              Categories
            </h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              {[
                "Houseplants",
                "Outdoor Plants",
                "Succulents",
                "Desert Bloom",
                "Plant Care",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/template/${vendor_id}/category`}
                    className="opacity-75 hover:opacity-100 transition"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-1" />
                <span className="opacity-75">
                  {contact?.street || "Street Name"}, {contact?.state},{" "}
                  {contact?.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" />
                <a
                  href={`tel:${contact?.phone || ""}`}
                  className="opacity-75 hover:opacity-100 transition"
                >
                  {contact?.phone || "+91 9876543210"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0" />
                <a
                  href={`mailto:${contact?.email || ""}`}
                  className="opacity-75 hover:opacity-100 transition"
                >
                  {contact?.email || "info@yourbusiness.com"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-xl font-semibold mb-1">
              Subscribe to Our Newsletter
            </h3>
            <p className="opacity-75 text-sm md:text-base">
              Get the latest updates on new plants and exclusive offers.
            </p>
          </div>

          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-80 px-4 py-3 rounded-md border focus:outline-none focus:ring transition-all"
            />
            <button className="px-5 py-3 rounded-md font-semibold transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-75">
          <p className="text-center md:text-left">
            © 2025 {contact?.name || "Your Company"}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (link) => (
                <Link
                  key={link}
                  href={`/template/${vendor_id}/${link
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="hover:opacity-100 transition"
                >
                  {link}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-105 z-50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}
