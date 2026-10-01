'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  UserRound
} from 'lucide-react';

const getBackendBase = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';
  return envUrl.replace(/\/api\/ophmart\/?$/, '').replace(/\/api\/?$/, '');
};

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

const COUNTRY_CODES = [
  { country: 'India', code: 'in', dial: '91' },
  { country: 'United States', code: 'us', dial: '1' },
  { country: 'United Kingdom', code: 'gb', dial: '44' },
  { country: 'United Arab Emirates', code: 'ae', dial: '971' },
  { country: 'China', code: 'cn', dial: '86' },
  { country: 'Singapore', code: 'sg', dial: '65' },
  { country: 'Australia', code: 'au', dial: '61' },
  { country: 'Canada', code: 'ca', dial: '1' },
  { country: 'Germany', code: 'de', dial: '49' },
  { country: 'France', code: 'fr', dial: '33' },
  { country: 'Japan', code: 'jp', dial: '81' },
  { country: 'South Korea', code: 'kr', dial: '82' },
  { country: 'Saudi Arabia', code: 'sa', dial: '966' },
  { country: 'Bangladesh', code: 'bd', dial: '880' },
  { country: 'Pakistan', code: 'pk', dial: '92' },
  { country: 'Sri Lanka', code: 'lk', dial: '94' },
  { country: 'Nepal', code: 'np', dial: '977' },
  { country: 'South Africa', code: 'za', dial: '27' },
  { country: 'Brazil', code: 'br', dial: '55' }
];

const FlagImage = ({ code }: { code: string }) => (
  <span
    aria-hidden="true"
    className="h-3.5 w-5 flex-shrink-0 bg-cover bg-center shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
    style={{ backgroundImage: `url(https://flagcdn.com/${code}.svg)` }}
  />
);

const PurpleBorderLion = () => (
  <motion.svg
    viewBox="0 0 220 220"
    className="h-full w-full text-purple-600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0.92, scale: 0.985 }}
    animate={{ opacity: 1, scale: 1, y: [0, -2, 0] }}
    transition={{ opacity: { duration: 0.45 }, scale: { duration: 0.45 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
  >
    <path d="M76 46C55 30 34 48 43 70C24 76 26 104 45 112C31 130 45 151 64 149C65 170 89 180 104 166C119 181 144 171 145 150C166 152 179 129 164 112C185 102 184 76 164 68C173 45 150 30 130 46C118 27 88 27 76 46Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <path d="M70 78C70 57 87 46 105 46C124 46 141 58 141 79V112C141 137 125 151 105 151C84 151 69 137 69 112L70 78Z" stroke="currentColor" strokeWidth="2.7" strokeLinejoin="round" />
    <path d="M71 74C56 61 52 83 70 89M140 74C155 61 159 83 141 89" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M82 91Q90 83 98 91M112 91Q120 83 128 91" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
    <path d="M101 99H109L105 105Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M105 105V110M105 110Q97 118 89 112M105 110Q113 118 121 112" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M84 121Q105 135 126 121" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M83 153C79 168 75 181 70 194M127 153C131 168 136 181 141 194" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
    <path d="M87 169V195C87 201 76 201 70 194M123 169V195C123 201 135 201 141 194" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M141 190C168 192 181 178 177 158C174 144 160 143 157 153C154 163 164 167 170 161" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
  </motion.svg>
);

const ThoughtCloud = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex min-h-[112px] w-full max-w-[390px] items-center justify-center px-10 py-5">
    <svg viewBox="0 0 390 150" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible text-purple-600" fill="white">
      <path d="M72 31C86 8 121 10 134 21C154 3 190 7 203 20C225 4 256 9 269 24C296 12 326 28 325 48C356 51 368 76 350 94C357 116 328 133 303 124C286 143 251 140 235 128C214 145 177 142 163 129C140 143 105 137 95 123C67 134 40 116 45 96C19 85 26 56 50 50C49 39 58 32 72 31Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
    <div className="relative z-10 text-center font-serif-luxury text-base leading-snug sm:text-lg">{children}</div>
  </div>
);

type VerificationFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: 'email' | 'tel';
  icon: typeof Mail;
  verified: boolean;
  otpSent: boolean;
  otp: string;
  setOtp: (value: string) => void;
  loading: boolean;
  verifying: boolean;
  error: string;
  timer: number;
  onSend: () => void;
  onVerify: () => void;
  prefix?: React.ReactNode;
};

function VerificationField({ label, value, onChange, placeholder, type = 'tel', icon: Icon, verified, otpSent, otp, setOtp, loading, verifying, error, timer, onSend, onVerify, prefix }: VerificationFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-luxury text-[#575757]">
          <Icon className="h-3.5 w-3.5 text-purple-600" /> {label}
        </label>
        {verified && <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5" /> Verified</span>}
      </div>
      <div className={`flex min-h-12 border bg-white transition-all duration-300 focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600 ${verified ? 'border-emerald-400' : 'border-[#d8d8d8]'}`}>
        {prefix}
        <input type={type} value={value} disabled={verified} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent px-3 text-[13px] outline-none disabled:text-[#575757]" />
        <button type="button" disabled={verified || loading || (timer > 0 && otpSent)} onClick={onSend} className="m-1 min-w-[112px] border-l border-[#e5e5e5] px-3 text-[10px] font-bold uppercase tracking-wider text-purple-600 transition-colors hover:bg-purple-50 disabled:cursor-not-allowed disabled:text-[#a3a3a3]">
          {loading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : verified ? 'Verified' : timer > 0 && otpSent ? `Resend ${timer}s` : otpSent ? 'Resend OTP' : 'Send OTP'}
        </button>
      </div>
      {otpSent && !verified && (
        <motion.div initial={{ opacity: 0, height: 0, y: -4 }} animate={{ opacity: 1, height: 'auto', y: 0 }} transition={{ duration: 0.28, ease: 'easeOut' }} className="flex gap-2 overflow-hidden">
          <input value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" placeholder="Enter 6-digit OTP" className="min-h-11 min-w-0 flex-1 border border-[#d8d8d8] px-3 text-center font-mono text-sm tracking-[0.3em] outline-none transition-colors focus:border-purple-600" />
          <button type="button" onClick={onVerify} disabled={verifying} className="min-w-[112px] bg-purple-600 px-4 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-purple-700 disabled:opacity-60">
            {verifying ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : 'Verify OTP'}
          </button>
        </motion.div>
      )}
      {error && <p className="text-[11px] text-red-600">{error}</p>}
    </div>
  );
}

export default function SellerRegistrationPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('India');
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [sendingPhone, setSendingPhone] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [verifyingPhone, setVerifyingPhone] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailTimer, setEmailTimer] = useState(0);
  const [phoneTimer, setPhoneTimer] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (emailTimer <= 0 && phoneTimer <= 0) return;
    const timerId = window.setInterval(() => {
      setEmailTimer((value) => Math.max(0, value - 1));
      setPhoneTimer((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [emailTimer, phoneTimer]);

  const sendEmailOtp = async () => {
    setEmailError('');
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setEmailError('Please enter a valid business email.');
    try {
      setSendingEmail(true);
      const response = await fetch(`${getBackendBase()}/api/v1/live-chat/email/send-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim() }) });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) throw new Error(data?.message || 'Failed to send email OTP.');
      setEmailOtpSent(true);
      setEmailTimer(data?.resendAfter || 30);
    } catch (error) { setEmailError(getErrorMessage(error, 'Could not send email OTP.')); }
    finally { setSendingEmail(false); }
  };

  const verifyEmailOtp = async () => {
    setEmailError('');
    if (emailOtp.length < 4) return setEmailError('Please enter the OTP sent to your email.');
    try {
      setVerifyingEmail(true);
      const response = await fetch(`${getBackendBase()}/api/v1/live-chat/email/verify-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim(), otp: emailOtp }) });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) throw new Error(data?.message || 'Invalid or expired OTP.');
      setEmailVerified(true);
      setEmailOtpSent(false);
    } catch (error) { setEmailError(getErrorMessage(error, 'Email verification failed.')); }
    finally { setVerifyingEmail(false); }
  };

  const cleanPhone = phone.replace(/\D/g, '');
  const selectedPhoneCountry = COUNTRY_CODES.find((item) => item.country === phoneCountry) || COUNTRY_CODES[0];
  const sendPhoneOtp = async () => {
    setPhoneError('');
    if (cleanPhone.length < 8) return setPhoneError('Please enter a valid mobile / WhatsApp number.');
    try {
      setSendingPhone(true);
      const response = await fetch(`${getBackendBase()}/api/v1/live-chat/whatsapp/send-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ whatsappNumber: `${selectedPhoneCountry.dial}${cleanPhone}` }) });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) throw new Error(data?.message || 'Failed to send phone OTP.');
      setPhoneOtpSent(true);
      setPhoneTimer(data?.resendAfter || 30);
    } catch (error) { setPhoneError(getErrorMessage(error, 'Could not send phone OTP.')); }
    finally { setSendingPhone(false); }
  };

  const verifyPhoneOtp = async () => {
    setPhoneError('');
    if (phoneOtp.length < 4) return setPhoneError('Please enter the OTP sent to your number.');
    try {
      setVerifyingPhone(true);
      const response = await fetch(`${getBackendBase()}/api/v1/live-chat/whatsapp/verify-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ whatsappNumber: `${selectedPhoneCountry.dial}${cleanPhone}`, otp: phoneOtp }) });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) throw new Error(data?.message || 'Invalid or expired OTP.');
      setPhoneVerified(true);
      setPhoneOtpSent(false);
    } catch (error) { setPhoneError(getErrorMessage(error, 'Phone verification failed.')); }
    finally { setVerifyingPhone(false); }
  };

  const canContinue = fullName.trim().length > 1 && emailVerified && phoneVerified;
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!canContinue) return;
    localStorage.setItem('ophmart_seller_registration_contact', JSON.stringify({ fullName: fullName.trim(), companyName: companyName.trim(), email: email.trim(), country: selectedPhoneCountry.country, countryDialCode: `+${selectedPhoneCountry.dial}`, phone: `+${selectedPhoneCountry.dial}${cleanPhone}`, emailVerified, phoneVerified }));
    setSaved(true);
    router.push('/sellers/registration/step-2');
  };

  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-1 text-[#121212] sm:px-6 sm:pt-2 md:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-[1480px]">
        <div className="mb-2 sm:mb-3">
          <Link href="/sellers" className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-luxury text-[#737373] transition-colors hover:text-purple-600"><ChevronLeft className="h-4 w-4" /> Return to Store</Link>
        </div>

        <div className="mx-auto mb-4 max-w-xl text-center sm:mb-6">
          <h1 className="font-serif-luxury text-2xl font-normal tracking-wide sm:text-3xl md:text-4xl">Become our Seller</h1>
          <div className="mx-auto mt-2 h-[2px] w-10 bg-purple-600" />
        </div>

        <motion.div initial={{ opacity: 0.96 }} animate={{ opacity: 1 }} transition={{ duration: 0.38 }} className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          <motion.section initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36, ease: 'easeOut' }} className="order-2 lg:order-1">
            <div className="mb-4 flex items-end justify-between border-b border-[#e8e8e8] pb-3">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-purple-600">Seller registration</p>
                <h2 className="font-serif-luxury text-xl font-normal sm:text-2xl">Contact details</h2>
                <p className="mt-1 text-xs text-[#737373]">Tell us who will manage this seller profile.</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-luxury text-purple-600">Step 1 of 5</span>
                <div className="mt-2 flex gap-1"><span className="h-1 w-7 bg-purple-600" />{[2,3,4,5].map((step) => <span key={step} className="h-1 w-7 bg-purple-100" />)}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-luxury text-[#575757]"><UserRound className="h-3.5 w-3.5 text-purple-600" /> Full name *</label>
                  <input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Your full name" className="min-h-12 w-full border border-[#d8d8d8] px-3 text-[13px] outline-none transition-all focus:border-purple-600 focus:ring-1 focus:ring-purple-600" />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-luxury text-[#575757]">Company name</label>
                  <input value={companyName} onChange={(event) => setCompanyName(event.target.value)} placeholder="Your company name" className="min-h-12 w-full border border-[#d8d8d8] px-3 text-[13px] outline-none transition-all focus:border-purple-600 focus:ring-1 focus:ring-purple-600" />
                </div>
              </div>

              <VerificationField label="Business email *" type="email" icon={Mail} value={email} onChange={(value) => { setEmail(value); setEmailVerified(false); setEmailOtpSent(false); }} placeholder="name@company.com" verified={emailVerified} otpSent={emailOtpSent} otp={emailOtp} setOtp={setEmailOtp} loading={sendingEmail} verifying={verifyingEmail} error={emailError} timer={emailTimer} onSend={sendEmailOtp} onVerify={verifyEmailOtp} />
              <VerificationField label="Mobile / WhatsApp number *" icon={Phone} value={phone} onChange={(value) => { setPhone(value.replace(/\D/g, '').slice(0, 15)); setPhoneVerified(false); setPhoneOtpSent(false); }} placeholder="Phone number" verified={phoneVerified} otpSent={phoneOtpSent} otp={phoneOtp} setOtp={setPhoneOtp} loading={sendingPhone} verifying={verifyingPhone} error={phoneError} timer={phoneTimer} onSend={sendPhoneOtp} onVerify={verifyPhoneOtp} prefix={
                <div className="relative flex-shrink-0 border-r border-[#e5e5e5]">
                  <button type="button" aria-label="Select country calling code" aria-expanded={countryDropdownOpen} onClick={() => setCountryDropdownOpen((open) => !open)} className="flex h-full min-w-[112px] items-center gap-2 px-3 text-xs font-semibold text-[#575757] hover:bg-purple-50/60">
                    <FlagImage code={selectedPhoneCountry.code} />
                    <span>+{selectedPhoneCountry.dial}</span>
                    <ChevronDown className={`ml-auto h-3.5 w-3.5 transition-transform ${countryDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {countryDropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="absolute left-0 top-[calc(100%+2px)] z-50 max-h-64 w-64 overflow-y-auto border border-[#d8d8d8] bg-white py-1 shadow-xl">
                      {COUNTRY_CODES.map((item) => (
                        <button key={item.country} type="button" onClick={() => { setPhoneCountry(item.country); setCountryDropdownOpen(false); setPhoneVerified(false); setPhoneOtpSent(false); }} className={`flex w-full items-center gap-3 px-3 py-2 text-left text-xs hover:bg-purple-50 ${phoneCountry === item.country ? 'bg-purple-50 font-semibold text-purple-800' : 'text-[#575757]'}`}>
                          <FlagImage code={item.code} />
                          <span className="flex-1">{item.country}</span>
                          <span className="text-[#737373]">+{item.dial}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              } />

              <div className="flex items-start gap-2 border border-purple-100 bg-purple-50/50 p-3 text-[11px] leading-relaxed text-[#575757]"><ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-600" /><span>Email and number verification keeps seller accounts secure. Your contact details are used only for onboarding and account communication.</span></div>

              {saved && <motion.p initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><Check className="h-4 w-4" /> Contact details saved. Step 1 is complete.</motion.p>}

              <button type="submit" disabled={!canContinue} className="flex w-full items-center justify-center gap-2 border-2 border-purple-600 bg-white px-5 py-3 text-xs font-bold uppercase tracking-luxury text-purple-600 transition-all hover:bg-purple-600 hover:text-white disabled:cursor-not-allowed disabled:border-purple-200 disabled:text-purple-300 disabled:hover:bg-white"><span>{saved ? 'Step 1 completed' : 'Save & Continue'}</span>{saved ? <CheckCircle2 className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}</button>
            </form>
          </motion.section>

          <section className="order-1 flex flex-col items-center lg:order-2 lg:sticky lg:top-[84px]">
            <ThoughtCloud>{emailVerified && phoneVerified ? 'Perfect! Your contact details are verified.' : 'Let’s verify your contact details first.'}</ThoughtCloud>
            <div className="my-1 flex flex-col items-center gap-1"><span className="h-2 w-2 rounded-full border-2 border-purple-600" /><span className="ml-3 h-1.5 w-1.5 rounded-full border-2 border-purple-600" /></div>
            <div className="aspect-square w-48 sm:w-56 md:w-64"><PurpleBorderLion /></div>
            <div className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#8c8c8c]"><LockKeyhole className="h-3 w-3" /> Secure verification</div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
