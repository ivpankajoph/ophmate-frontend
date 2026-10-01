'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Check, ChevronDown, ChevronLeft, Clock3, ContactRound, ImagePlus, MapPin, PhoneCall, Upload, X } from 'lucide-react';

type CompanyForm = {
  legalName: string; tradingName: string; businessType: string; establishmentYear: string;
  employeeCount: string; registrationNumber: string; taxId: string; website: string;
  companyEmail: string; companyPhone: string; addressLine1: string; addressLine2: string;
  country: string; state: string; city: string; postalCode: string; operationalAddress: string;
  contactName: string; contactDesignation: string; contactEmail: string; contactPhone: string;
  emergencyName: string; emergencyRelationship: string; emergencyEmail: string; emergencyPhone: string;
  businessHours: string; timezone: string; description: string;
};

const initialForm: CompanyForm = {
  legalName: '', tradingName: '', businessType: '', establishmentYear: '', employeeCount: '', registrationNumber: '', taxId: '', website: '',
  companyEmail: '', companyPhone: '', addressLine1: '', addressLine2: '', country: '', state: '', city: '', postalCode: '', operationalAddress: '',
  contactName: '', contactDesignation: '', contactEmail: '', contactPhone: '', emergencyName: '', emergencyRelationship: '', emergencyEmail: '', emergencyPhone: '',
  businessHours: '', timezone: '', description: ''
};

type FieldProps = { label: string; name: keyof CompanyForm; value: string; onChange: (name: keyof CompanyForm, value: string) => void; placeholder?: string; required?: boolean; type?: string };

function Field({ label, name, value, onChange, placeholder, required, type = 'text' }: FieldProps) {
  return <div><label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-luxury text-[#575757]">{label}{required && <span className="text-purple-600"> *</span>}</label><input type={type} value={value} onChange={(event) => onChange(name, event.target.value)} placeholder={placeholder} required={required} className="min-h-11 w-full border border-[#e8e8e8] bg-white px-3 text-[13px] outline-none transition-all focus:border-purple-600 focus:ring-1 focus:ring-purple-600" /></div>;
}

function SelectField({ label, name, value, onChange, options, required }: FieldProps & { options: string[] }) {
  return <div><label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-luxury text-[#575757]">{label}{required && <span className="text-purple-600"> *</span>}</label><div className="relative"><select value={value} onChange={(event) => onChange(name, event.target.value)} required={required} className="min-h-11 w-full appearance-none border border-[#e8e8e8] bg-white px-3 pr-9 text-[13px] text-[#575757] outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"><option value="">Select {label.toLowerCase()}</option>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-600" /></div></div>;
}

const CompanyIllustration = () => (
  <motion.svg viewBox="0 0 250 230" className="h-full w-full text-purple-600" fill="none" initial={{ y: 1 }} animate={{ y: [1, -3, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
    <path d="M54 193V65L125 32L196 65V193" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <path d="M39 193H211M76 78H99V101H76ZM113 78H137V101H113ZM151 78H174V101H151ZM76 116H99V139H76ZM151 116H174V139H151ZM111 193V147H139V193" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="182" cy="158" r="32" fill="white" stroke="currentColor" strokeWidth="3" />
    <circle cx="182" cy="149" r="9" stroke="currentColor" strokeWidth="2.7" />
    <path d="M164 176C167 164 176 160 182 160C189 160 197 164 200 176" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
    <path d="M111 51H139" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </motion.svg>
);

const ThoughtCloud = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex min-h-[112px] w-full max-w-[390px] items-center justify-center px-10 py-5"><svg viewBox="0 0 390 150" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible text-purple-600" fill="white"><path d="M72 31C86 8 121 10 134 21C154 3 190 7 203 20C225 4 256 9 269 24C296 12 326 28 325 48C356 51 368 76 350 94C357 116 328 133 303 124C286 143 251 140 235 128C214 145 177 142 163 129C140 143 105 137 95 123C67 134 40 116 45 96C19 85 26 56 50 50C49 39 58 32 72 31Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /></svg><div className="relative z-10 max-w-[270px] text-center font-serif-luxury text-base leading-snug sm:text-lg">{children}</div></div>
);

export default function SellerRegistrationStepFour() {
  const [form, setForm] = useState<CompanyForm>(initialForm);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [sameAddress, setSameAddress] = useState(true);
  const [saved, setSaved] = useState(false);
  const [logoError, setLogoError] = useState('');

  useEffect(() => () => { if (logoPreview) URL.revokeObjectURL(logoPreview); }, [logoPreview]);
  const update = (name: keyof CompanyForm, value: string) => { setForm((current) => ({ ...current, [name]: value })); setSaved(false); };
  const chooseLogo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setLogoError('Please choose a PNG, JPG, WEBP, or SVG image.');
    if (file.size > 2 * 1024 * 1024) return setLogoError('Logo must be 2 MB or smaller.');
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogo(file); setLogoPreview(URL.createObjectURL(file)); setLogoError(''); setSaved(false);
  };
  const removeLogo = () => { if (logoPreview) URL.revokeObjectURL(logoPreview); setLogo(null); setLogoPreview(''); setLogoError(''); setSaved(false); };
  const canContinue = Boolean(form.legalName.trim() && form.businessType && form.addressLine1.trim() && form.country.trim() && form.state.trim() && form.city.trim() && form.postalCode.trim() && form.contactName.trim() && form.contactDesignation.trim() && /^\S+@\S+\.\S+$/.test(form.contactEmail) && form.contactPhone.trim().length >= 7 && form.emergencyName.trim() && form.emergencyPhone.trim().length >= 7);
  const submit = (event: FormEvent) => {
    event.preventDefault(); if (!canContinue) return;
    localStorage.setItem('ophmart_seller_registration_company', JSON.stringify({ ...form, operationalAddress: sameAddress ? form.addressLine1 : form.operationalAddress, sameAsRegisteredAddress: sameAddress, logoName: logo?.name || '', logoType: logo?.type || '' }));
    setSaved(true);
  };

  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-1 text-[#121212] sm:px-6 sm:pt-2 md:px-10 lg:px-12"><div className="mx-auto w-full max-w-[1480px]">
      <div className="mb-2 sm:mb-3"><Link href="/sellers/registration/step-3" className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-luxury text-[#737373] hover:text-purple-600"><ChevronLeft className="h-4 w-4" /> Back to terms and conditions</Link></div>
      <div className="mx-auto mb-4 max-w-xl text-center sm:mb-6"><h1 className="font-serif-luxury text-2xl font-normal tracking-wide sm:text-3xl md:text-4xl">Become our Seller</h1><div className="mx-auto mt-2 h-[2px] w-10 bg-purple-600" /></div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
        <motion.section initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="order-2 lg:order-1">
          <div className="mb-4 flex items-end justify-between border-b border-[#e8e8e8] pb-3"><div><p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-purple-600">Seller registration</p><h2 className="font-serif-luxury text-xl font-normal sm:text-2xl">Company Details</h2><p className="mt-1 text-xs text-[#737373]">Tell buyers who you are and how to reach your team.</p></div><div className="text-right"><span className="text-[10px] font-bold uppercase tracking-luxury text-purple-600">Step 4 of 5</span><div className="mt-2 flex gap-1">{[1,2,3,4].map((step) => <span key={step} className="h-1 w-7 bg-purple-600" />)}<span className="h-1 w-7 bg-purple-100" /></div></div></div>
          <form onSubmit={submit} className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#333]"><Building2 className="h-4 w-4 text-purple-600" /> Company identity</div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <label className="flex min-h-28 w-full cursor-pointer items-center justify-center border border-dashed border-[#d8d8d8] bg-[#fafafa] p-3 hover:border-purple-400 sm:w-36">
                {logoPreview ? <Image src={logoPreview} alt="Company logo preview" width={96} height={80} unoptimized className="h-20 w-24 object-contain" /> : <span className="flex flex-col items-center gap-2 text-center text-[10px] uppercase tracking-wider text-[#777]"><ImagePlus className="h-6 w-6 text-purple-600" /> Upload logo<span className="normal-case tracking-normal text-[#999]">Max 2 MB</span></span>}
                <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={chooseLogo} className="hidden" />
              </label>
              <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2"><Field label="Legal company name" name="legalName" value={form.legalName} onChange={update} required placeholder="Registered business name" /><Field label="Trading / brand name" name="tradingName" value={form.tradingName} onChange={update} placeholder="Public brand name" /><SelectField label="Business type" name="businessType" value={form.businessType} onChange={update} required options={['Sole Proprietorship','Partnership','Private Limited Company','Public Limited Company','LLP','Corporation','Non-profit / Cooperative','Other']} /><Field label="Established year" name="establishmentYear" value={form.establishmentYear} onChange={update} type="number" placeholder="e.g. 2018" /></div>
            </div>
            {(logo || logoError) && <div className="flex items-center justify-between text-[11px]"><span className={logoError ? 'text-red-600' : 'text-emerald-700'}>{logoError || `${logo?.name} selected`}</span>{logo && <button type="button" onClick={removeLogo} className="inline-flex items-center gap-1 text-red-600"><X className="h-3 w-3" /> Remove</button>}</div>}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3"><SelectField label="Employees" name="employeeCount" value={form.employeeCount} onChange={update} options={['1–10','11–50','51–200','201–500','501–1,000','1,000+']} /><Field label="Registration number" name="registrationNumber" value={form.registrationNumber} onChange={update} placeholder="CIN / company number" /><Field label="Tax ID" name="taxId" value={form.taxId} onChange={update} placeholder="GST / VAT / EIN" /></div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3"><Field label="Company website" name="website" value={form.website} onChange={update} type="url" placeholder="https://company.com" /><Field label="General email" name="companyEmail" value={form.companyEmail} onChange={update} type="email" placeholder="info@company.com" /><Field label="Office phone" name="companyPhone" value={form.companyPhone} onChange={update} type="tel" placeholder="+91 00000 00000" /></div>

            <div className="border-t border-[#e8e8e8] pt-5"><div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#333]"><MapPin className="h-4 w-4 text-purple-600" /> Registered and operational address</div><div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><Field label="Address line 1" name="addressLine1" value={form.addressLine1} onChange={update} required placeholder="Building, street, area" /><Field label="Address line 2" name="addressLine2" value={form.addressLine2} onChange={update} placeholder="Floor, landmark (optional)" /><Field label="Country" name="country" value={form.country} onChange={update} required /><Field label="State / Province" name="state" value={form.state} onChange={update} required /><Field label="City" name="city" value={form.city} onChange={update} required /><Field label="Postal / ZIP code" name="postalCode" value={form.postalCode} onChange={update} required /></div><label className="mt-3 flex cursor-pointer items-center gap-2 text-[11px] text-[#575757]"><input type="checkbox" checked={sameAddress} onChange={(event) => setSameAddress(event.target.checked)} className="h-4 w-4 accent-purple-600" /> Operational address is the same as registered address</label>{!sameAddress && <div className="mt-3"><Field label="Operational address" name="operationalAddress" value={form.operationalAddress} onChange={update} required placeholder="Warehouse / office operational address" /></div>}</div>

            <div className="border-t border-[#e8e8e8] pt-5"><div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#333]"><ContactRound className="h-4 w-4 text-purple-600" /> Primary contact person</div><div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><Field label="Contact person name" name="contactName" value={form.contactName} onChange={update} required /><Field label="Designation" name="contactDesignation" value={form.contactDesignation} onChange={update} required placeholder="Sales Manager / Director" /><Field label="Direct email" name="contactEmail" value={form.contactEmail} onChange={update} required type="email" /><Field label="Direct phone / WhatsApp" name="contactPhone" value={form.contactPhone} onChange={update} required type="tel" /></div></div>

            <div className="border-t border-[#e8e8e8] pt-5"><div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#333]"><PhoneCall className="h-4 w-4 text-purple-600" /> Emergency / alternate contact</div><div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><Field label="Emergency contact name" name="emergencyName" value={form.emergencyName} onChange={update} required /><Field label="Relationship / designation" name="emergencyRelationship" value={form.emergencyRelationship} onChange={update} placeholder="Owner / Operations Head" /><Field label="Emergency email" name="emergencyEmail" value={form.emergencyEmail} onChange={update} type="email" /><Field label="Emergency phone" name="emergencyPhone" value={form.emergencyPhone} onChange={update} required type="tel" /></div></div>

            <div className="border-t border-[#e8e8e8] pt-5"><div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#333]"><Clock3 className="h-4 w-4 text-purple-600" /> Availability and profile</div><div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><Field label="Business hours" name="businessHours" value={form.businessHours} onChange={update} placeholder="Mon–Fri, 9:00 AM–6:00 PM" /><Field label="Time zone" name="timezone" value={form.timezone} onChange={update} placeholder="e.g. Asia/Kolkata (IST)" /></div><label className="mb-1.5 mt-3 block text-[10px] font-semibold uppercase tracking-luxury text-[#575757]">About the company</label><textarea value={form.description} onChange={(event) => update('description', event.target.value)} rows={3} maxLength={600} placeholder="Briefly describe your company, expertise, facilities, and key strengths..." className="w-full border border-[#e8e8e8] p-3 text-[13px] leading-relaxed outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600" /><div className="text-right text-[10px] text-[#999]">{form.description.length}/600</div></div>
            {saved && <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><Check className="h-4 w-4" /> Company details saved. Step 4 is complete.</p>}
            <button type="submit" disabled={!canContinue} className="flex w-full items-center justify-center gap-2 border-2 border-purple-600 bg-white px-5 py-3 text-xs font-bold uppercase tracking-luxury text-purple-600 transition-all hover:bg-purple-600 hover:text-white disabled:cursor-not-allowed disabled:border-purple-200 disabled:text-purple-300 disabled:hover:bg-white"><span>{saved ? 'Step 4 completed' : 'Save & Continue'}</span>{saved ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}</button>
          </form>
        </motion.section>
        <section className="order-1 flex h-fit flex-col items-center lg:order-2 lg:sticky lg:top-[96px] lg:self-start"><ThoughtCloud>{saved ? 'Your company profile is ready for the final step!' : 'Help buyers know and trust your company.'}</ThoughtCloud><div className="my-1 flex flex-col items-center gap-1"><span className="h-2 w-2 rounded-full border-2 border-purple-600" /><span className="ml-3 h-1.5 w-1.5 rounded-full border-2 border-purple-600" /></div><div className="aspect-square w-48 sm:w-56 md:w-64"><CompanyIllustration /></div><div className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#8c8c8c]"><Upload className="h-3 w-3" /> Build a trusted profile</div></section>
      </div>
    </div></main>
  );
}
