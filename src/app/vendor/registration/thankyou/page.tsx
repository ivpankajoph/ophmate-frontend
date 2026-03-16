"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import VendorMarketingLayout from "@/components/vendor/VendorMarketingLayout";

export default function ThankYouPage() {
  return (
    <VendorMarketingLayout>
      <main className="vendor-section">
        <div className="vendor-shell">
          <div className="vendor-surface-card mx-auto max-w-3xl p-8 text-center sm:p-12">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200">
              <CheckCircle2 className="h-10 w-10" />
            </span>
            <p className="vendor-step-pill mt-8">Registration complete</p>
            <h1 className="vendor-display mt-6 text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Your seller registration has been submitted.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Verification and account updates will be sent to your registered email.
              You can return to the vendor overview now or continue exploring the main
              SellersLogin site.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/vendor" className="vendor-primary-button">
                Back to vendor overview
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/" className="vendor-secondary-button">
                Visit main site
              </Link>
            </div>
          </div>
        </div>
      </main>
    </VendorMarketingLayout>
  );
}
