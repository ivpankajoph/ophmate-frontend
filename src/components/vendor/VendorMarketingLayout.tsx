"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface VendorMarketingLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const buildAnchor = (pathname: string, hash: string) =>
  pathname === "/vendor" ? hash : `/vendor${hash}`;

export default function VendorMarketingLayout({
  children,
  showFooter = true,
}: VendorMarketingLayoutProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { label: "Overview", href: "/vendor" },
      { label: "Journey", href: buildAnchor(pathname, "#journey") },
      { label: "Benefits", href: buildAnchor(pathname, "#benefits") },
      { label: "Support", href: buildAnchor(pathname, "#support") },
    ],
    [pathname],
  );

  return (
    <div className="vendor-flow vendor-nav-offset">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.05)]">
        <div className="vendor-shell">
          <div className="flex min-h-[84px] items-center justify-between gap-4">
            <Link href="/vendor" className="flex min-w-0 items-center gap-3">
              <Image
                src="/sellerslogin-logo.svg"
                alt="SellersLogin logo"
                width={48}
                height={48}
                priority
                className="h-12 w-12 shrink-0"
              />
              <div className="min-w-0">
                <p className="vendor-display text-xl font-bold tracking-tight text-slate-950">
                  SellersLogin
                </p>
                <p className="hidden max-w-[18rem] text-xs font-semibold uppercase leading-[1.2] tracking-[0.24em] text-slate-400 sm:block">
                  Build for your all e-commerce needs
                </p>
              </div>
            </Link>

            <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center justify-center rounded-md border border-transparent px-3 py-2 text-[13px] font-semibold text-slate-600 hover:border-violet-100 hover:bg-violet-50 hover:text-violet-700"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-[13px] font-semibold text-slate-900 shadow-sm hover:border-violet-200 hover:text-violet-700"
              >
                Main Site
              </Link>
              <Link
                href="/vendor/registration"
                className="inline-flex h-10 items-center justify-center rounded-md bg-violet-700 px-4 text-[13px] font-semibold text-white shadow-[0_12px_24px_rgba(109,40,217,0.18)] hover:-translate-y-0.5 hover:bg-violet-800"
              >
                Start Registration
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen((current) => !current)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 lg:hidden"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <div className="vendor-shell py-5">
              <div className="vendor-surface-card p-5">
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-md px-4 py-3 text-base font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-md px-4 py-3 text-base font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                  >
                    Main Site
                  </Link>
                </div>
                <Link
                  href="/vendor/registration"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-violet-700 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(109,40,217,0.18)] hover:-translate-y-0.5 hover:bg-violet-800"
                >
                  Start Registration
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {children}

      {showFooter && (
        <footer className="border-t border-slate-200 bg-white/92">
          <div className="vendor-shell py-10 sm:py-14">
            <div className="vendor-soft-panel p-7 sm:p-9">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.26em] text-violet-600">
                    Seller onboarding
                  </p>
                  <h2 className="vendor-display mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                    Ready to move from interest to a live seller account?
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                    Verify your phone, confirm your business details, and keep every
                    registration step in one composed flow.
                  </p>
                </div>

                <Link href="/vendor/registration" className="vendor-primary-button w-full sm:w-auto">
                  Start registration
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
              <div>
                <div className="flex items-center gap-3">
                  <Image
                    src="/sellerslogin-logo.svg"
                    alt="SellersLogin logo"
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0"
                  />
                  <div>
                    <p className="vendor-display text-xl font-bold text-slate-950">
                      SellersLogin
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                      A platform for your all e-commerce needs
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
                  White-label storefronts, native payments, and calmer operating
                  surfaces for teams who want registration and day-to-day commerce to
                  feel part of the same system.
                </p>
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">
                  Explore
                </p>
                <div className="mt-4 space-y-3 text-sm font-semibold text-slate-600">
                  <Link href="/vendor" className="block hover:text-violet-700">
                    Vendor overview
                  </Link>
                  <Link href="/vendor/registration" className="block hover:text-violet-700">
                    Start registration
                  </Link>
                  <Link href={buildAnchor(pathname, "#journey")} className="block hover:text-violet-700">
                    Registration journey
                  </Link>
                  <Link href={buildAnchor(pathname, "#support")} className="block hover:text-violet-700">
                    Support
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">
                  Contact
                </p>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <p>support@sellerslogin.com</p>
                  <p>+91 98731 38444</p>
                  {/* <p>
                    Office No 834, Gaur City Mall, Greater Noida,
                    Uttar Pradesh 201312, India
                  </p> */}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>Copyright {new Date().getFullYear()} SellersLogin. All rights reserved.</p>
              <div className="flex flex-wrap gap-4 text-sm font-semibold">
                <span>Seller onboarding</span>
                <span>Global commerce</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
