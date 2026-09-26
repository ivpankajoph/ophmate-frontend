import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
      <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a880] block mb-2 font-medium">
        DOSSIER VOID
      </span>
      <h1 className="font-serif-luxury text-6xl md:text-8xl text-[#121212] mb-3">
        404
      </h1>
      <h2 className="font-serif-luxury text-2xl md:text-3xl text-[#121212] mb-4">
        Page Not Found In Archives
      </h2>
      <p className="text-xs text-[#8c8c8c] font-light max-w-sm mx-auto mb-8 leading-relaxed">
        The creation or editorial chapter you are looking for has been relocated or is currently in private archival storage.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="bg-[#121212] text-white text-xs uppercase tracking-luxury px-8 py-3.5 hover:bg-[#333] transition-colors"
        >
          Return Home
        </Link>
        <Link
          href="/products"
          className="border border-[#121212] text-[#121212] text-xs uppercase tracking-luxury px-8 py-3.5 hover:bg-[#121212] hover:text-white transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
