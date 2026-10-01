'use client';

import { FormEvent, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeDollarSign,
  Check,
  ChevronDown,
  ChevronLeft,
  ClipboardCheck,
  PackageCheck,
  Scale
} from 'lucide-react';

type YesNo = '' | 'yes' | 'no';

type SelectFieldProps = {
  label: string;
  value: YesNo;
  onChange: (value: YesNo) => void;
};

function YesNoSelect({ label, value, onChange }: SelectFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-luxury text-[#575757]">
        {label} <span className="text-purple-600">*</span>
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as YesNo)}
          className={`min-h-12 w-full appearance-none border bg-white px-3 pr-10 text-[13px] outline-none transition-all focus:border-purple-600 focus:ring-1 focus:ring-purple-600 ${value ? 'border-[#d8d8d8] text-[#121212]' : 'border-[#e5e5e5] text-[#8c8c8c]'}`}
        >
          <option value="" disabled>Select Yes or No</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-600" />
      </div>
    </div>
  );
}

const TermsIllustration = () => (
  <motion.svg
    viewBox="0 0 250 230"
    className="h-full w-full text-purple-600"
    fill="none"
    initial={{ y: 1 }}
    animate={{ y: [1, -3, 1] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
  >
    <rect x="55" y="34" width="140" height="164" rx="8" stroke="currentColor" strokeWidth="3" />
    <path d="M95 34V27C95 20 101 15 108 15H142C149 15 155 20 155 27V34" stroke="currentColor" strokeWidth="3" />
    <rect x="91" y="27" width="68" height="23" rx="5" fill="white" stroke="currentColor" strokeWidth="3" />
    <path d="M82 79L88 85L100 71M111 79H169M82 116L88 122L100 108M111 116H169M82 153L88 159L100 145M111 153H151" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="177" cy="169" r="37" fill="white" stroke="currentColor" strokeWidth="3" />
    <path d="M161 169L172 180L194 156" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
);

const ThoughtCloud = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex min-h-[112px] w-full max-w-[390px] items-center justify-center px-10 py-5">
    <svg viewBox="0 0 390 150" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible text-purple-600" fill="white">
      <path d="M72 31C86 8 121 10 134 21C154 3 190 7 203 20C225 4 256 9 269 24C296 12 326 28 325 48C356 51 368 76 350 94C357 116 328 133 303 124C286 143 251 140 235 128C214 145 177 142 163 129C140 143 105 137 95 123C67 134 40 116 45 96C19 85 26 56 50 50C49 39 58 32 72 31Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
    <div className="relative z-10 max-w-[270px] text-center font-serif-luxury text-base leading-snug sm:text-lg">{children}</div>
  </div>
);

export default function SellerRegistrationStepThree() {
  const router = useRouter();
  const [minimumOrderValue, setMinimumOrderValue] = useState('');
  const [minimumQuantity, setMinimumQuantity] = useState('');
  const isSourcingAgent = useSyncExternalStore(
    () => () => undefined,
    () => {
      const role = localStorage.getItem('ophmart_selected_role');
      try {
        const roles: string[] = JSON.parse(localStorage.getItem('ophmart_selected_roles') || '[]');
        return role === 'Sourcing Agent' || roles.includes('Sourcing Agent');
      } catch {
        return role === 'Sourcing Agent';
      }
    },
    () => false
  );
  const [chargeInAdvance, setChargeInAdvance] = useState<YesNo>('');
  const [provideSamples, setProvideSamples] = useState<YesNo>('');
  const [qualityInspection, setQualityInspection] = useState<YesNo>('');
  const [arrangeShipping, setArrangeShipping] = useState<YesNo>('');
  const [saved, setSaved] = useState(false);

  const sourcingAnswersComplete = !isSourcingAgent || [chargeInAdvance, provideSamples, qualityInspection, arrangeShipping].every(Boolean);
  const canContinue = Number(minimumOrderValue) > 0 && Number(minimumQuantity) > 0 && sourcingAnswersComplete;

  const markChanged = (setter: (value: YesNo) => void) => (value: YesNo) => {
    setter(value);
    setSaved(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!canContinue) return;
    localStorage.setItem('ophmart_seller_registration_terms', JSON.stringify({
      minimumOrderValue: Number(minimumOrderValue),
      minimumQuantity: Number(minimumQuantity),
      ...(isSourcingAgent && {
        chargeInAdvance: chargeInAdvance === 'yes',
        provideSamples: provideSamples === 'yes',
        qualityInspection: qualityInspection === 'yes',
        arrangeShipping: arrangeShipping === 'yes'
      })
    }));
    setSaved(true);
    router.push('/sellers/registration/step-4');
  };

  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-1 text-[#121212] sm:px-6 sm:pt-2 md:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-[1480px]">
        <div className="mb-2 sm:mb-3">
          <Link href="/sellers/registration/step-2" className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-luxury text-[#737373] hover:text-purple-600"><ChevronLeft className="h-4 w-4" /> Back to region and categories</Link>
        </div>
        <div className="mx-auto mb-4 max-w-xl text-center sm:mb-6">
          <h1 className="font-serif-luxury text-2xl font-normal tracking-wide sm:text-3xl md:text-4xl">Become our Seller</h1>
          <div className="mx-auto mt-2 h-[2px] w-10 bg-purple-600" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          <motion.section initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="order-2 lg:order-1">
            <div className="mb-4 flex items-end justify-between border-b border-[#e8e8e8] pb-3">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-purple-600">Seller registration</p>
                <h2 className="font-serif-luxury text-xl font-normal sm:text-2xl">Terms and Condition</h2>
                <p className="mt-1 text-xs text-[#737373]">Set the basic order terms you offer to buyers.</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-luxury text-purple-600">Step 3 of 5</span>
                <div className="mt-2 flex gap-1">{[1, 2, 3].map((step) => <span key={step} className="h-1 w-7 bg-purple-600" />)}{[4, 5].map((step) => <span key={step} className="h-1 w-7 bg-purple-100" />)}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#333]"><PackageCheck className="h-4 w-4 text-purple-600" /> What are your minimum order requirements?</div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-luxury text-[#575757]"><BadgeDollarSign className="h-3.5 w-3.5 text-purple-600" /> Minimum order value *</label>
                  <div className="flex min-h-12 border border-[#d8d8d8] bg-white focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600">
                    <span className="flex items-center border-r border-[#e5e5e5] px-3 text-xs font-semibold text-[#575757]">USD</span>
                    <input type="number" min="1" step="0.01" value={minimumOrderValue} onChange={(event) => { setMinimumOrderValue(event.target.value); setSaved(false); }} placeholder="e.g. 500" className="min-w-0 flex-1 px-3 text-[13px] outline-none" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-luxury text-[#575757]"><Scale className="h-3.5 w-3.5 text-purple-600" /> Minimum quantity *</label>
                  <div className="flex min-h-12 border border-[#d8d8d8] bg-white focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600">
                    <input type="number" min="1" step="1" value={minimumQuantity} onChange={(event) => { setMinimumQuantity(event.target.value); setSaved(false); }} placeholder="e.g. 100" className="min-w-0 flex-1 px-3 text-[13px] outline-none" />
                    <span className="flex items-center border-l border-[#e5e5e5] px-3 text-xs text-[#737373]">Units</span>
                  </div>
                </div>
              </div>

              {isSourcingAgent && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 border-t border-[#e8e8e8] pt-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <YesNoSelect label="Do you charge in advance?" value={chargeInAdvance} onChange={markChanged(setChargeInAdvance)} />
                    <YesNoSelect label="Do you provide samples?" value={provideSamples} onChange={markChanged(setProvideSamples)} />
                    <YesNoSelect label="Do you provide quality inspection?" value={qualityInspection} onChange={markChanged(setQualityInspection)} />
                    <YesNoSelect label="Do you arrange shipping?" value={arrangeShipping} onChange={markChanged(setArrangeShipping)} />
                  </div>
                </motion.div>
              )}

              {saved && <motion.p initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><Check className="h-4 w-4" /> Terms and conditions saved. Step 3 is complete.</motion.p>}
              <button type="submit" disabled={!canContinue} className="flex w-full items-center justify-center gap-2 border-2 border-purple-600 bg-white px-5 py-3 text-xs font-bold uppercase tracking-luxury text-purple-600 transition-all hover:bg-purple-600 hover:text-white disabled:cursor-not-allowed disabled:border-purple-200 disabled:text-purple-300 disabled:hover:bg-white"><span>{saved ? 'Step 3 completed' : 'Save & Continue'}</span>{saved ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}</button>
            </form>
          </motion.section>

          <section className="order-1 flex flex-col items-center lg:order-2 lg:sticky lg:top-[84px]">
            <ThoughtCloud>{saved ? 'Perfect! Your order terms are clear and ready for buyers.' : isSourcingAgent ? 'Tell buyers how your sourcing service works.' : 'Clear terms help buyers order with confidence.'}</ThoughtCloud>
            <div className="my-1 flex flex-col items-center gap-1"><span className="h-2 w-2 rounded-full border-2 border-purple-600" /><span className="ml-3 h-1.5 w-1.5 rounded-full border-2 border-purple-600" /></div>
            <div className="aspect-square w-48 sm:w-56 md:w-64"><TermsIllustration /></div>
            <div className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#8c8c8c]"><ClipboardCheck className="h-3 w-3" /> Clear business terms</div>
          </section>
        </div>
      </div>
    </main>
  );
}
