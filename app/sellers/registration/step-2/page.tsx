'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { City, Country, State } from 'country-state-city';
import { ArrowRight, Check, ChevronDown, ChevronLeft, Globe2, Map as MapIcon, MapPin, PackageSearch, Search, Shapes, X } from 'lucide-react';
import { SELLER_CATEGORIES } from '@/data/seller-categories';

type Option = { id: string; label: string; detail?: string; flagCode?: string };

type MultiSelectProps = {
  label: string;
  placeholder: string;
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  selectAllLabel?: string;
  disabled?: boolean;
  loadingHint?: string;
};

const Flag = ({ code }: { code: string }) => (
  <span className="h-3.5 w-5 flex-shrink-0 bg-cover bg-center shadow-[0_0_0_1px_rgba(0,0,0,0.1)]" style={{ backgroundImage: `url(https://flagcdn.com/${code.toLowerCase()}.svg)` }} />
);

function MultiSelect({ label, placeholder, options, selected, onChange, selectAllLabel, disabled, loadingHint }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const optionMap = useMemo(() => new Map(options.map((option) => [option.id, option])), [options]);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matches = normalized
      ? options.filter((option) => `${option.label} ${option.detail || ''}`.toLowerCase().includes(normalized))
      : options;
    return matches.slice(0, 300);
  }, [options, query]);
  const allSelected = options.length > 0 && selected.length === options.length;

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const toggle = (id: string) => onChange(selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id]);

  return (
    <div ref={rootRef} className="relative space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold uppercase tracking-luxury text-[#575757]">{label}</label>
        {selected.length > 0 && <span className="text-[10px] font-semibold text-purple-700">{selected.length} selected</span>}
      </div>
      <button type="button" disabled={disabled} onClick={() => setOpen((value) => !value)} className="flex min-h-12 w-full items-center gap-2 border border-[#e8e8e8] bg-white px-3 py-2 text-left transition-colors hover:border-purple-400 disabled:cursor-not-allowed disabled:bg-[#fafafa]">
        <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
          {selected.length === 0 ? <span className="text-[13px] text-[#999]">{disabled ? loadingHint : placeholder}</span> : selected.slice(0, 4).map((id) => {
            const item = optionMap.get(id);
            return <span key={id} className="inline-flex items-center gap-1.5 border border-purple-200 bg-purple-50 px-2 py-1 text-[10px] font-semibold text-purple-900">{item?.flagCode && <Flag code={item.flagCode} />}<span className="max-w-36 truncate">{item?.label || id}</span></span>;
          })}
          {selected.length > 4 && <span className="bg-purple-50 px-2 py-1 text-[10px] font-bold text-purple-700">+{selected.length - 4} more</span>}
        </div>
        {selected.length > 0 && <span onClick={(event) => { event.stopPropagation(); onChange([]); }} className="p-1 text-[#999] hover:text-red-600" aria-label={`Clear ${label}`}><X className="h-3.5 w-3.5" /></span>}
        <ChevronDown className={`h-4 w-4 flex-shrink-0 text-[#666] transition-transform ${open ? 'rotate-180 text-purple-600' : ''}`} />
      </button>
      {open && !disabled && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="absolute left-0 right-0 top-full z-50 mt-1 border border-[#e8e8e8] bg-white shadow-xl">
          <div className="flex items-center gap-2 border-b border-[#eee] px-3 py-2"><Search className="h-4 w-4 text-purple-600" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${label.toLowerCase()}...`} className="min-w-0 flex-1 bg-transparent text-xs outline-none" /></div>
          {selectAllLabel && (
            <button type="button" onClick={() => onChange(allSelected ? [] : options.map((option) => option.id))} className="flex w-full items-center gap-2 border-b border-[#eee] bg-purple-50/50 px-3 py-2.5 text-left text-xs font-bold text-purple-800 hover:bg-purple-50">
              <span className={`flex h-4 w-4 items-center justify-center rounded-sm border ${allSelected ? 'border-purple-600 bg-purple-600' : 'border-[#ccc] bg-white'}`}>{allSelected && <Check className="h-3 w-3 text-white" />}</span>{selectAllLabel}
            </button>
          )}
          <div className="max-h-64 overflow-y-auto">
            {filtered.map((option) => {
              const isSelected = selected.includes(option.id);
              return <button key={option.id} type="button" onClick={() => toggle(option.id)} className={`flex w-full items-center gap-2.5 border-b border-[#f4f4f4] px-3 py-2.5 text-left text-xs hover:bg-purple-50 ${isSelected ? 'bg-purple-50/80 text-purple-900' : 'text-[#333]'}`}>
                <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border ${isSelected ? 'border-purple-600 bg-purple-600' : 'border-[#d8d8d8]'}`}>{isSelected && <Check className="h-3 w-3 text-white" />}</span>
                {option.flagCode && <Flag code={option.flagCode} />}<span className="flex-1">{option.label}</span>{option.detail && <span className="text-[10px] text-[#999]">{option.detail}</span>}
              </button>;
            })}
            {filtered.length === 0 && <p className="px-3 py-6 text-center text-xs text-[#999]">No matching options</p>}
            {!query && options.length > 300 && <p className="border-t border-[#eee] px-3 py-2 text-center text-[10px] text-[#888]">Search to browse all {options.length.toLocaleString()} options</p>}
          </div>
        </motion.div>
      )}
    </div>
  );
}

const PurpleBorderEagle = () => (
  <motion.svg viewBox="0 0 240 220" className="h-full w-full text-purple-600" fill="none" initial={{ y: 1 }} animate={{ y: [1, -3, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
    <path d="M120 48C104 31 83 34 72 49C48 45 31 59 38 77C18 85 20 107 42 112C30 132 47 150 68 143C78 161 101 158 120 140C139 158 162 161 172 143C193 150 210 132 198 112C220 107 222 85 202 77C209 59 192 45 168 49C157 34 136 31 120 48Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <path d="M85 71C95 58 108 55 120 64C132 55 145 58 155 71L148 112C144 134 132 148 120 155C108 148 96 134 92 112L85 71Z" stroke="currentColor" strokeWidth="2.7" strokeLinejoin="round" />
    <path d="M98 88Q105 81 112 88M128 88Q135 81 142 88" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
    <path d="M113 98L127 98L120 109Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M120 109V118M120 118L109 124M120 118L131 124" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M89 66L55 87L78 92L51 111L91 108M151 66L185 87L162 92L189 111L149 108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M107 151L101 184M133 151L139 184M101 184L90 192M101 184L103 194M139 184L150 192M139 184L137 194" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </motion.svg>
);

const ThoughtCloud = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex min-h-[112px] w-full max-w-[390px] items-center justify-center px-10 py-5"><svg viewBox="0 0 390 150" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible text-purple-600" fill="white"><path d="M72 31C86 8 121 10 134 21C154 3 190 7 203 20C225 4 256 9 269 24C296 12 326 28 325 48C356 51 368 76 350 94C357 116 328 133 303 124C286 143 251 140 235 128C214 145 177 142 163 129C140 143 105 137 95 123C67 134 40 116 45 96C19 85 26 56 50 50C49 39 58 32 72 31Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /></svg><div className="relative z-10 max-w-[260px] text-center font-serif-luxury text-base leading-snug sm:text-lg">{children}</div></div>
);

export default function SellerRegistrationStepTwo() {
  const router = useRouter();
  const countries = useMemo<Option[]>(() => {
    const supportedCountryCodes = ['CN', 'IN', 'AU', 'DE', 'US', 'GB', 'AE'];
    const countryMap = new Map(Country.getAllCountries().map((country) => [country.isoCode, country]));
    return supportedCountryCodes.flatMap((code) => {
      const country = countryMap.get(code);
      return country ? [{ id: country.isoCode, label: country.name, flagCode: country.isoCode }] : [];
    });
  }, []);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const stateOptions = useMemo<Option[]>(() => selectedCountries.flatMap((countryCode) => {
    const country = countries.find((item) => item.id === countryCode);
    return State.getStatesOfCountry(countryCode).map((state) => ({ id: `${countryCode}:${state.isoCode}`, label: state.name, detail: country?.label, flagCode: countryCode }));
  }), [countries, selectedCountries]);
  const cityOptions = useMemo<Option[]>(() => selectedStates.flatMap((stateId) => {
    const [countryCode, stateCode] = stateId.split(':');
    const state = State.getStateByCodeAndCountry(stateCode, countryCode);
    return (City.getCitiesOfState(countryCode, stateCode) || []).map((city) => ({ id: `${countryCode}:${stateCode}:${city.name}`, label: city.name, detail: state?.name, flagCode: countryCode }));
  }), [selectedStates]);
  const categoryOptions = useMemo<Option[]>(() => SELLER_CATEGORIES.map((category) => ({ id: category.id, label: category.name })), []);
  const productOptions = useMemo<Option[]>(() => SELLER_CATEGORIES.filter((category) => selectedCategories.includes(category.id)).flatMap((category) => category.products.map((product) => ({ id: `${category.id}:${product}`, label: product, detail: category.name }))), [selectedCategories]);

  const updateCountries = (values: string[]) => {
    setSelectedCountries(values);
    const allowed = new Set(values);
    setSelectedStates((current) => current.filter((state) => allowed.has(state.split(':')[0])));
    setSelectedCities((current) => current.filter((city) => allowed.has(city.split(':')[0])));
    setSaved(false);
  };
  const updateStates = (values: string[]) => {
    setSelectedStates(values);
    const allowed = new Set(values);
    setSelectedCities((current) => current.filter((city) => allowed.has(city.split(':').slice(0, 2).join(':'))));
    setSaved(false);
  };
  const updateCategories = (values: string[]) => {
    setSelectedCategories(values);
    const allowed = new Set(values);
    setSelectedProducts((current) => current.filter((product) => allowed.has(product.split(':')[0])));
    setSaved(false);
  };
  const canSave = selectedCountries.length > 0 && selectedStates.length > 0 && selectedCities.length > 0 && selectedCategories.length > 0 && selectedProducts.length > 0;
  const saveStep = () => {
    if (!canSave) return;
    const payload = {
      countries: selectedCountries.map((id) => countries.find((country) => country.id === id)?.label || id),
      countryCodes: selectedCountries,
      states: selectedStates.map((id) => stateOptions.find((state) => state.id === id)?.label || id),
      stateCodes: selectedStates,
      cities: selectedCities.map((id) => id.split(':').slice(2).join(':')),
      categories: selectedCategories.map((id) => SELLER_CATEGORIES.find((category) => category.id === id)?.name || id),
      products: selectedProducts.map((id) => id.split(':').slice(1).join(':'))
    };
    localStorage.setItem('ophmart_seller_registration_regions_categories', JSON.stringify(payload));
    setSaved(true);
    router.push('/sellers/registration/step-3');
  };

  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-1 text-[#121212] sm:px-6 sm:pt-2 md:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-[1480px]">
        <div className="mb-2 sm:mb-3"><Link href="/sellers/registration" className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-luxury text-[#737373] hover:text-purple-600"><ChevronLeft className="h-4 w-4" /> Back to contact details</Link></div>
        <div className="mx-auto mb-4 max-w-xl text-center sm:mb-6"><h1 className="font-serif-luxury text-2xl font-normal tracking-wide sm:text-3xl md:text-4xl">Become our Seller</h1><div className="mx-auto mt-2 h-[2px] w-10 bg-purple-600" /></div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          <motion.section initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="order-2 lg:order-1">
            <div className="mb-4 flex items-end justify-between border-b border-[#e8e8e8] pb-3"><div><p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-purple-600">Seller registration</p><h2 className="font-serif-luxury text-xl font-normal sm:text-2xl">Dealing Region and Categories</h2><p className="mt-1 text-xs text-[#737373]">Choose the markets and products your business serves.</p></div><div className="text-right"><span className="text-[10px] font-bold uppercase tracking-luxury text-purple-600">Step 2 of 5</span><div className="mt-2 flex gap-1">{[1,2].map((step) => <span key={step} className="h-1 w-7 bg-purple-600" />)}{[3,4,5].map((step) => <span key={step} className="h-1 w-7 bg-purple-100" />)}</div></div></div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#333]"><Globe2 className="h-4 w-4 text-purple-600" /> Which countries do you serve?</div>
              <MultiSelect label="Service countries *" placeholder="Select one or more countries" options={countries} selected={selectedCountries} onChange={updateCountries} selectAllLabel="Select all 7 countries" />
              <div className="flex items-center gap-2 text-xs font-semibold text-[#333]"><MapIcon className="h-4 w-4 text-purple-600" /> Which states or provinces do you serve?</div>
              <MultiSelect label="States / Provinces *" placeholder="Select states from your chosen countries" options={stateOptions} selected={selectedStates} onChange={updateStates} selectAllLabel="Select all states in chosen countries" disabled={selectedCountries.length === 0} loadingHint="Select countries first" />
              <div className="flex items-center gap-2 text-xs font-semibold text-[#333]"><MapPin className="h-4 w-4 text-purple-600" /> Which cities do you usually prefer to serve?</div>
              <MultiSelect label="Preferred cities *" placeholder="Select cities from your chosen states" options={cityOptions} selected={selectedCities} onChange={(values) => { setSelectedCities(values); setSaved(false); }} selectAllLabel="Select all cities in chosen states" disabled={selectedStates.length === 0} loadingHint="Select states first" />
              <div className="flex items-center gap-2 text-xs font-semibold text-[#333]"><Shapes className="h-4 w-4 text-purple-600" /> Select the categories you want to deal in.</div>
              <MultiSelect label="Categories *" placeholder="Select one or more categories" options={categoryOptions} selected={selectedCategories} onChange={updateCategories} selectAllLabel="Select all categories" />
              <div className="flex items-center gap-2 text-xs font-semibold text-[#333]"><PackageSearch className="h-4 w-4 text-purple-600" /> Select products based on your chosen categories.</div>
              <MultiSelect label="Products *" placeholder="Select one or more products" options={productOptions} selected={selectedProducts} onChange={(values) => { setSelectedProducts(values); setSaved(false); }} selectAllLabel="Select all products in chosen categories" disabled={selectedCategories.length === 0} loadingHint="Select categories first" />
              {saved && <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><Check className="h-4 w-4" /> Dealing regions and categories saved.</p>}
              <button type="button" onClick={saveStep} disabled={!canSave} className="flex w-full items-center justify-center gap-2 border-2 border-purple-600 bg-white px-5 py-3 text-xs font-bold uppercase tracking-luxury text-purple-600 transition-all hover:bg-purple-600 hover:text-white disabled:cursor-not-allowed disabled:border-purple-200 disabled:text-purple-300 disabled:hover:bg-white"><span>{saved ? 'Step 2 completed' : 'Save & Continue'}</span>{saved ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}</button>
            </div>
          </motion.section>
          <section className="order-1 flex flex-col items-center lg:order-2 lg:sticky lg:top-[84px]"><ThoughtCloud>{selectedProducts.length > 0 ? `Excellent! You are ready to deal in ${selectedProducts.length} products.` : 'Show us where and what your business deals in.'}</ThoughtCloud><div className="my-1 flex flex-col items-center gap-1"><span className="h-2 w-2 rounded-full border-2 border-purple-600" /><span className="ml-3 h-1.5 w-1.5 rounded-full border-2 border-purple-600" /></div><div className="aspect-square w-48 sm:w-56 md:w-64"><PurpleBorderEagle /></div><div className="mt-1 text-[10px] uppercase tracking-wider text-[#8c8c8c]">Global market coverage</div></section>
        </div>
      </div>
    </main>
  );
}
