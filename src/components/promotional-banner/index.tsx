"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, X } from "lucide-react";

export default function PromotionalBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full border-b border-white/15 bg-[linear-gradient(90deg,#7c3aed_0%,#5b21b6_45%,#4338ca_100%)] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
            <Sparkles className="h-4 w-4" />
          </span>
          <p className="truncate text-sm font-medium tracking-wide text-white/95">
            Free shipping over <span className="font-semibold">Rs. 75</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className="hidden items-center gap-2 rounded-full bg-white/12 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-white/18 sm:inline-flex"
          >
            <span>Shop Now</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Close banner"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
