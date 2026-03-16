"use client";

import Image from "next/image";

type StepTransitionLoaderProps = {
  visible: boolean;
  text?: string;
};

export default function StepTransitionLoader({
  visible,
  text = "Loading next step...",
}: StepTransitionLoaderProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-white/92 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/sellerslogin-logo.svg"
          alt="SellersLogin"
          width={72}
          height={72}
          priority
          className="h-16 w-16 animate-pulse"
        />
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-violet-700" />
        <p className="text-sm font-semibold tracking-[0.08em] text-slate-700">{text}</p>
      </div>
    </div>
  );
}
