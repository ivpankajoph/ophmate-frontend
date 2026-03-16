import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface VendorFlowIntroProps {
  step: string;
  title: string;
  description: string;
  chips?: string[];
  aside?: ReactNode;
}

export default function VendorFlowIntro({
  step,
  title,
  description,
  chips = [],
  aside,
}: VendorFlowIntroProps) {
  return (
    <section className="vendor-section pb-8">
      <div className="vendor-shell grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <div className="vendor-tag">
            <Sparkles className="h-4 w-4" />
            <span>{step}</span>
          </div>

          <h1 className="vendor-display mt-6 max-w-3xl text-4xl font-bold tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-[4.2rem] lg:leading-[0.95]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            {description}
          </p>

          {chips.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {chips.map((chip) => (
                <span key={chip} className="vendor-chip">
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>

        {aside ? <div className="vendor-soft-panel p-6 sm:p-8">{aside}</div> : null}
      </div>
    </section>
  );
}
