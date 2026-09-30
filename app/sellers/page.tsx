'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ArrowRight, Check } from 'lucide-react';

// Purple Border Puppy / Dog
const PurpleBorderPuppy: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full text-purple-600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Floppy Left Ear */}
      <path
        d="M 64 54 C 38 48 30 75 38 96 C 42 106 54 102 62 88"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Floppy Right Ear */}
      <path
        d="M 136 54 C 162 48 170 75 162 96 C 158 106 146 102 138 88"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Head Contour */}
      <path
        d="M 64 54 C 84 44 116 44 136 54 C 152 75 148 108 128 120 C 108 128 92 128 72 120 C 52 108 48 75 64 54"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cute Eyes */}
      <path
        d="M 76 76 Q 84 68 92 76"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 108 76 Q 116 68 124 76"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Cute Puppy Nose */}
      <path
        d="M 94 88 Q 100 82 106 88 Q 100 96 94 88 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Happy Tongue */}
      <path
        d="M 95 96 C 94 108 106 108 105 96"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 100 96 L 100 104"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Body Silhouette */}
      <path
        d="M 76 122 C 72 140 68 156 64 174"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 124 122 C 128 140 132 156 136 174"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Front Paws */}
      <path
        d="M 80 148 L 80 176 C 80 180 90 180 90 176 L 90 154"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 120 148 L 120 176 C 120 180 110 180 110 176 L 110 154"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Outer Back Paws */}
      <path
        d="M 64 174 C 58 176 58 180 70 180 C 76 180 80 178 80 176"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 136 174 C 142 176 142 180 130 180 C 124 180 120 178 120 176"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Wagging Tail */}
      <path
        d="M 138 166 C 160 162 174 150 172 132 C 170 118 158 116 150 124 C 144 130 148 140 156 138"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
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
      className={`relative w-full max-w-[380px] sm:max-w-[420px] flex items-center justify-center p-4 sm:p-6 min-h-[105px] sm:min-h-[125px] ${className}`}
    >
      {/* SVG Cloud Border with Safe Padding & Overflow Visible */}
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

      {/* Cloud inner content with comfortable padding */}
      <div className="relative z-10 text-center px-6 sm:px-8 py-2.5 sm:py-3.5 max-w-[80%] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default function SellersPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] pt-1 sm:pt-2 pb-16 px-4 sm:px-6 md:px-10 lg:px-12">
      <div className="max-w-[1480px] mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-2 sm:mb-3">
          <Link
            href="/partner"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury font-medium text-[#737373] hover:text-purple-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Partner Selection
          </Link>
        </div>

        {/* Minimalist Editorial Title */}
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-5">
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#121212] font-normal tracking-wide">
            Seller Registration
          </h1>
          <div className="w-12 h-[1px] bg-purple-600 mx-auto mt-2" />
        </div>

        {/* 2-Column Layout with STICKY RIGHT COLUMN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ========================================================== */}
          {/* LEFT COLUMN: SELLER ONBOARDING FORM (BALANCED)            */}
          {/* ========================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1 space-y-6">
            {/* Form Container (Ready for custom inputs) */}
            <div className="border border-[#e5e5e5] rounded-none p-6 sm:p-8 bg-white">
              {submitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-10 h-10 border border-purple-600 rounded-none flex items-center justify-center mx-auto text-purple-600">
                    <Check className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h4 className="font-serif-luxury text-xl text-[#121212]">
                    Seller Dossier Transmitted
                  </h4>
                  <p className="text-xs text-[#575757] font-light max-w-sm mx-auto leading-relaxed">
                    Thank you for applying as an Ophmart Seller. Our merchant team will evaluate your catalog and contact you.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-[10px] uppercase tracking-luxury text-[#121212] underline hover:text-purple-600 cursor-pointer pt-2"
                  >
                    Edit Information
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Placeholder box awaiting user's custom form inputs */}
                  <div className="border-2 border-dashed border-[#e5e5e5] rounded-none p-6 text-center bg-[#faf9f6]">
                    <span className="text-xs uppercase tracking-luxury text-[#8c8c8c] block font-medium">
                      Seller Registration Form
                    </span>
                    <p className="text-xs text-[#575757] mt-1 font-light">
                      Ready for custom form inputs.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-none border-2 border-purple-600 bg-white text-purple-600 hover:bg-purple-600 hover:text-white text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Submit Seller Application</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: PURPLE BORDER PUPPY + THOUGHT CLOUD BUBBLE   */}
          {/* STICKY BELOW FIXED HEADER (84px) SO ENTIRE PET IS VISIBLE  */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 relative">
            <div className="lg:sticky lg:top-[84px] flex flex-col items-center">
              {/* THOUGHT CLOUD */}
              <div className="w-full max-w-[380px] sm:max-w-[420px] flex flex-col items-center">
                <PurpleBorderCloud>
                  <h3 className="font-serif-luxury text-base sm:text-lg md:text-xl text-[#121212] font-medium leading-snug text-center">
                    Thanks for choosing to be our Seller!
                  </h3>
                </PurpleBorderCloud>

                {/* Thought trail dots */}
                <div className="flex flex-col items-center gap-0.5 my-0.5">
                  <div className="w-2.5 h-2.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-2" />
                  <div className="w-1.5 h-1.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-4" />
                </div>
              </div>

              {/* PURPLE OUTLINE PUPPY - Prominent Large Mascot */}
              <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 max-h-[260px] sm:max-h-[285px] aspect-square bg-transparent flex items-center justify-center -mt-1 sm:-mt-2">
                <PurpleBorderPuppy />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
