'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Building2 } from 'lucide-react';

const SOURCING_AGENT_TYPES_MAP: Record<string, string> = {
  'Import Sourcing Agent': '/images/sourcing/import-agent.svg',
  'Dropshipping Agent': '/images/sourcing/dropshipping-agent.svg',
  'Alibaba Sourcing Agent': '/images/sourcing/alibaba-agent.svg',
  'Product Sourcing Agent': '/images/sourcing/product-sourcing-agent.svg',
  '1688 Sourcing Agent': '/images/sourcing/1688-agent.svg',
  'Dropshipping Sourcing Agent': '/images/sourcing/dropshipping-sourcing-agent.svg',
  'IndiaMART Sourcing Agent': '/images/sourcing/indiamart-agent.svg',
  'Wholesale Trading Agent': '/images/sourcing/wholesale-trading-agent.svg',
  'Asia Sourcing Agent': '/images/sourcing/asia-sourcing-agent.svg',
  'India Sourcing Agent': '/images/sourcing/india-sourcing-agent.svg',
  'China Sourcing Agent': '/images/sourcing/china-sourcing-agent.svg',
  'FBA Sourcing Agent': '/images/sourcing/fba-sourcing-agent.svg'
};

// Purple Border Tiger (Stroke only, fill none)
const PurpleBorderTiger: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full text-purple-600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Rounded Tiger Ear */}
      <path
        d="M 52 50 C 40 32 60 20 74 36"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left Inner Ear */}
      <path
        d="M 56 46 C 48 36 60 30 68 38"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Right Rounded Tiger Ear */}
      <path
        d="M 126 36 C 140 20 160 32 148 50"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Inner Ear */}
      <path
        d="M 132 38 C 140 30 152 36 144 46"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Tiger Head Top Outline */}
      <path
        d="M 74 36 C 88 32 112 32 126 36"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Tiger Chubby Cheeks & Chin Outline */}
      <path
        d="M 52 50 C 42 66 40 88 48 104 C 58 122 84 128 100 128 C 116 128 142 122 152 104 C 160 88 158 66 148 50"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tiger Forehead King '王' Markings */}
      {/* Top Stripe */}
      <path
        d="M 90 42 L 110 42"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Middle Stripe */}
      <path
        d="M 86 48 L 114 48"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Center Vertical */}
      <path
        d="M 100 38 L 100 56"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Bottom Inverted V mark */}
      <path
        d="M 94 56 L 100 62 L 106 56"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left Cheek Tiger Stripes */}
      <path
        d="M 48 76 L 62 80"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 46 86 L 60 88"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 50 96 L 62 94"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Right Cheek Tiger Stripes */}
      <path
        d="M 152 76 L 138 80"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 154 86 L 140 88"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 150 96 L 138 94"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Cute Eyes (Happy curved lines) */}
      <path
        d="M 72 80 Q 82 72 92 80"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 108 80 Q 118 72 128 80"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Tiger Nose */}
      <path
        d="M 96 90 L 104 90 L 100 95 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Tiger W-Mouth */}
      <path
        d="M 100 95 L 100 98 M 100 98 Q 92 105 84 100 M 100 98 Q 108 105 116 100"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Left Whiskers */}
      <path
        d="M 70 94 L 38 90"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 69 99 L 36 100"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 70 104 L 40 110"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Right Whiskers */}
      <path
        d="M 130 94 L 162 90"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 131 99 L 164 100"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 130 104 L 160 110"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Body Outline */}
      <path
        d="M 74 126 C 70 144 66 160 60 176"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 126 126 C 130 144 134 160 140 176"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Body Side Stripes */}
      <path
        d="M 68 142 L 78 146"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 64 156 L 76 158"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 132 142 L 122 146"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 136 156 L 124 158"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Front Paws */}
      <path
        d="M 78 148 L 78 178 C 78 182 88 182 88 178 L 88 154"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 122 148 L 122 178 C 122 182 112 182 112 178 L 112 154"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Back Sitting Paws */}
      <path
        d="M 60 176 C 54 179 54 182 66 182 C 72 182 78 180 78 178"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 140 176 C 146 179 146 182 134 182 C 128 182 122 180 122 178"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Curled Tiger Tail with Tail Stripes */}
      <path
        d="M 141 170 C 164 168 178 156 180 136 C 182 116 166 108 158 114 C 150 120 154 132 162 132"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tiger Tail Stripes */}
      <path
        d="M 163 158 L 171 162"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 172 144 L 179 148"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 170 126 L 178 124"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Purple Border Thought Cloud with elegant padding
const PurpleBorderCloud: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <div
      className={`relative w-full max-w-[340px] sm:max-w-[380px] flex items-center justify-center p-3 sm:p-4 min-h-[92px] sm:min-h-[110px] ${className}`}
    >
      <svg
        viewBox="-15 -15 410 230"
        className="absolute inset-0 w-full h-full text-purple-600 pointer-events-none drop-shadow-xs overflow-visible"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M 80,45 
             A 35,35 0 0,1 140,25 
             A 45,45 0 0,1 210,22 
             A 40,40 0 0,1 270,30 
             A 35,35 0 0,1 325,50 
             A 35,35 0 0,1 355,95 
             A 38,38 0 0,1 350,145 
             A 32,32 0 0,1 315,175 
             A 38,38 0 0,1 255,188 
             A 42,42 0 0,1 185,190 
             A 38,38 0 0,1 125,185 
             A 32,32 0 0,1 70,170 
             A 35,35 0 0,1 30,135 
             A 38,38 0 0,1 30,80 
             A 36,36 0 0,1 80,45 Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative z-10 text-center px-4 sm:px-6 py-2 sm:py-2.5 max-w-[85%] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

function SellerRegistrationContent() {
  const searchParams = useSearchParams();

  const [role, setRole] = useState<string>('');
  const [sourcingType, setSourcingType] = useState<string>('');

  useEffect(() => {
    // Read from searchParams or fallback to localStorage
    const paramRole = searchParams.get('role');
    const paramSourcingType = searchParams.get('sourcingType');

    if (paramRole) {
      setRole(paramRole);
    } else if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('ophmart_selected_role') || '';
      setRole(storedRole);
    }

    if (paramSourcingType) {
      setSourcingType(paramSourcingType);
    } else if (typeof window !== 'undefined') {
      const storedSourcing = localStorage.getItem('ophmart_selected_sourcing_type') || '';
      setSourcingType(storedSourcing);
    }
  }, [searchParams]);

  const sourcingImage = sourcingType ? SOURCING_AGENT_TYPES_MAP[sourcingType] : null;

  const getTigerSpeech = () => {
    if (sourcingType) {
      return `Welcome! Ready to register as ${sourcingType}?`;
    }
    if (role) {
      return `Welcome! Ready to register as our ${role}?`;
    }
    return 'Welcome to Seller Registration!';
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] pt-1 sm:pt-2 pb-16 px-4 sm:px-6 md:px-10 lg:px-12">
      <div className="max-w-[1480px] mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-2 sm:mb-3">
          <Link
            href="/sellers"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury font-medium text-[#737373] hover:text-purple-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Role Selection
          </Link>
        </div>

        {/* Editorial Page Title: Seller Registration */}
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6">
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#121212] font-normal tracking-wide">
            Seller Registration
          </h1>
          <div className="w-10 h-[2px] bg-purple-600 mx-auto mt-2" />
        </div>

        {/* 2-Column Layout: 50:50 Width Ratio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* ========================================================== */}
          {/* LEFT COLUMN: SELECTED DATA SUMMARY + NO FIELDS YET         */}
          {/* ========================================================== */}
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-5">
            {/* Small text display of selected data */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-[#e5e5e5]">
              <span className="text-[11px] uppercase tracking-luxury font-semibold text-[#737373]">
                Selected Profile:
              </span>
              <div className="inline-flex items-center gap-2 py-1 px-2.5 bg-purple-50 border border-purple-300 text-purple-950 text-xs font-medium">
                {sourcingImage && (
                  <img
                    src={sourcingImage}
                    alt={sourcingType}
                    className="w-4 h-4 object-contain flex-shrink-0"
                  />
                )}
                <span className="uppercase tracking-wider font-semibold">
                  {role || 'Seller'}
                </span>
                {sourcingType && (
                  <span className="text-purple-700 font-semibold">• {sourcingType}</span>
                )}
              </div>
              <Link
                href="/sellers"
                className="text-[11px] uppercase tracking-luxury text-purple-600 hover:text-purple-800 transition-colors ml-auto font-medium"
              >
                Change
              </Link>
            </div>

            {/* Clean Placeholder Waiting for user fields */}
            <div className="border-2 border-dashed border-[#e2e2e2] p-8 sm:p-12 text-center bg-[#faf9f6]">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="font-serif-luxury text-lg sm:text-xl text-[#121212] font-medium">
                Registration Form
              </h2>
              <p className="text-xs text-[#8c8c8c] mt-1.5 max-w-sm mx-auto font-light leading-relaxed">
                Awaiting registration fields. Tell us what inputs to configure here.
              </p>
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: PURPLE BORDER TIGER + THOUGHT CLOUD BUBBLE   */}
          {/* ========================================================== */}
          <div className="order-1 lg:order-2 relative">
            <div className="lg:sticky lg:top-[84px] flex flex-col items-center">
              {/* THOUGHT CLOUD */}
              <div className="w-full max-w-[340px] sm:max-w-[380px] flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${role}-${sourcingType}`}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="w-full flex justify-center"
                  >
                    <PurpleBorderCloud>
                      <h3 className="font-serif-luxury text-sm sm:text-base md:text-[17px] text-[#121212] font-medium leading-snug text-center">
                        {getTigerSpeech()}
                      </h3>
                    </PurpleBorderCloud>
                  </motion.div>
                </AnimatePresence>

                {/* Thought trail dots leading down to the tiger */}
                <div className="flex flex-col items-center gap-0.5 my-0.5">
                  <div className="w-2 h-2 rounded-full border-[1.8px] border-purple-600 bg-white ml-2" />
                  <div className="w-1.5 h-1.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-3.5" />
                </div>
              </div>

              {/* TIGER MADE FROM PURPLE BORDER */}
              <div className="relative w-48 sm:w-56 md:w-64 max-h-[220px] sm:max-h-[245px] aspect-square bg-transparent flex items-center justify-center -mt-1 sm:-mt-2">
                <PurpleBorderTiger />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SellerRegistrationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SellerRegistrationContent />
    </Suspense>
  );
}
