"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import type { TemplateCheckoutStep } from "./template-checkout-utils";

const getStepClassName = (
  activeStep: TemplateCheckoutStep,
  step: TemplateCheckoutStep,
) => (activeStep === step ? "text-[#03a685]" : "text-slate-500");

type TemplateCheckoutShellProps = {
  vendorId: string;
  activeStep: TemplateCheckoutStep;
  children: ReactNode;
};

export default function TemplateCheckoutShell({
  vendorId,
  activeStep,
  children,
}: TemplateCheckoutShellProps) {
  const steps: Array<{
    id: TemplateCheckoutStep;
    label: string;
    href: string;
  }> = [
    { id: "bag", label: "BAG", href: `/template/${vendorId}/checkout/bag` },
    {
      id: "address",
      label: "ADDRESS",
      href: `/template/${vendorId}/checkout/address`,
    },
    {
      id: "payment",
      label: "PAYMENT",
      href: `/template/${vendorId}/checkout/payment`,
    },
  ];

  return (
    <div className="bg-[#f5f5f6]">
      <div className="border-y border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 text-xs font-semibold tracking-[0.35em] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-5">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3 sm:gap-5">
                <Link href={step.href} className={getStepClassName(activeStep, step.id)}>
                  {step.label}
                </Link>
                {index < steps.length - 1 ? (
                  <span className="h-px w-10 bg-slate-300 sm:w-16" />
                ) : null}
              </div>
            ))}
          </div>
          <div className="text-[11px] tracking-[0.28em] text-[#03a685]">
            100% SECURE
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
