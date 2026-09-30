'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, ArrowRight, Sparkles } from 'lucide-react';

type PartnerRoleKey = 'buyers' | 'sellers' | 'sourcing';

interface PartnerRole {
  key: PartnerRoleKey;
  label: string;
  singular: string;
  highlights: string[];
}

const ROLES: Record<PartnerRoleKey, PartnerRole> = {
  buyers: {
    key: 'buyers',
    label: '1. Buyers',
    singular: 'Buyer',
    highlights: [
      'Private salon access & personal luxury stylist concierge',
      'Early reservation on limited runway drop collections',
      'Insured global door-to-door delivery with verified authenticity'
    ]
  },
  sellers: {
    key: 'sellers',
    label: '2. Sellers',
    singular: 'Seller',
    highlights: [
      'Digital flagship storefront with verified provenance',
      'Direct access to affluent international collectors',
      'Automated multi-currency payouts & escrow protection'
    ]
  },
  sourcing: {
    key: 'sourcing',
    label: '3. Sourcing Agent',
    singular: 'Sourcing Agent',
    highlights: [
      'Institutional commission structure on trade orders',
      'Direct pipeline access to pre-vetted European & Asian ateliers',
      'Priority escrow clearance & logistics liaison support'
    ]
  }
};

// Cat made exclusively from a purple border (stroke only, fill none)
const PurpleBorderCat: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full text-purple-600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Ear */}
      <path
        d="M 65 72 L 48 28 L 86 44"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 62 60 L 54 38 L 76 48"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Ear */}
      <path
        d="M 114 44 L 152 28 L 135 72"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 124 48 L 146 38 L 138 60"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Head Outline */}
      <path
        d="M 86 44 Q 100 47 114 44"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 65 72 C 48 85 52 105 72 116 C 88 124 112 124 128 116 C 148 105 152 85 135 72"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cute Eyes (Happy curved pink lines) */}
      <path
        d="M 74 80 Q 82 72 90 80"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 110 80 Q 118 72 126 80"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Cute Nose */}
      <path
        d="M 97 88 L 103 88 L 100 92 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Cute W-Mouth */}
      <path
        d="M 100 92 L 100 95 M 100 95 Q 94 101 88 97 M 100 95 Q 106 101 112 97"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Left Whiskers */}
      <path
        d="M 68 90 L 36 86"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 67 95 L 34 96"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 68 100 L 38 106"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Right Whiskers */}
      <path
        d="M 132 90 L 164 86"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 133 95 L 166 96"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 132 100 L 162 106"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Cat Body Outline */}
      <path
        d="M 80 120 C 76 138 72 154 66 172"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 120 120 C 124 138 128 154 134 172"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Front Paws */}
      <path
        d="M 82 145 L 82 176 C 82 180 92 180 92 176 L 92 152"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 118 145 L 118 176 C 118 180 108 180 108 176 L 108 152"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Back Sitting Paws Outer Curve */}
      <path
        d="M 66 172 C 60 175 60 180 72 180 C 78 180 82 178 82 176"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 134 172 C 140 175 140 180 128 180 C 122 180 118 178 118 176"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Curled Tail */}
      <path
        d="M 135 168 C 158 166 172 156 174 136 C 176 116 160 108 152 114 C 144 120 148 132 156 132"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtle Chest Collar Accent */}
      <path
        d="M 94 126 Q 100 132 106 126"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default function PartnerPage() {
  const [selectedRole, setSelectedRole] = useState<PartnerRoleKey>('buyers');
  const [submitted, setSubmitted] = useState(false);

  const activeRole = ROLES[selectedRole];

  const handleContinue = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] pt-4 sm:pt-8 pb-14 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-luxury font-medium text-[#8c8c8c] hover:text-purple-600 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Return to Store
          </Link>
        </div>

        {/* Minimalist Editorial Page Title */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] block mb-2 font-medium">
            OPHMNART HAUTE ÉDITION
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#121212] font-normal tracking-wide">
            Become our Partner
          </h1>
          <div className="w-12 h-[1px] bg-[#121212] mx-auto mt-4" />
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* ========================================================== */}
          {/* LEFT COLUMN: WHAT DO YOU WANT TO BE? + TABS + CONTINUE     */}
          {/* ========================================================== */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#121212] font-normal">
                What do you want to be?
              </h2>
            </div>

            {/* Sharp Segmented Tabs with Sliding Purple Background */}
            <div className="relative flex border border-[#121212] rounded-none p-1 bg-white">
              {(['buyers', 'sellers', 'sourcing'] as PartnerRoleKey[]).map((key) => {
                const role = ROLES[key];
                const isSelected = selectedRole === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedRole(key);
                      setSubmitted(false);
                    }}
                    className={`relative z-10 flex-1 py-3 px-2 sm:px-4 text-[11px] sm:text-xs uppercase tracking-luxury font-medium text-center transition-colors cursor-pointer rounded-none select-none ${
                      isSelected ? 'text-white' : 'text-[#121212] hover:text-[#575757]'
                    }`}
                  >
                    {/* Sliding Background Element (Animated Shuffle) */}
                    {isSelected && (
                      <motion.div
                        layoutId="partnerActiveRole"
                        className="absolute inset-0 bg-purple-600 rounded-none"
                        transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                      />
                    )}
                    <span className="relative z-10">{role.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content for the selected role */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRole}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Privileges List */}
                <div className="border border-[#e5e5e5] rounded-none p-5 sm:p-6 bg-[#faf9f6]">
                  <ul className="space-y-2.5">
                    {activeRole.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 text-[#c5a880] flex-shrink-0 mt-1 stroke-[2]" />
                        <span className="text-xs text-[#575757] font-light leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Area: ONLY THE CONTINUE BUTTON (No inputs) */}
                <div className="border border-[#e5e5e5] rounded-none p-6 sm:p-8 bg-white">
                  {submitted ? (
                    <div className="py-4 text-center space-y-3">
                      <div className="w-10 h-10 border border-purple-600 rounded-none flex items-center justify-center mx-auto text-purple-600">
                        <Check className="w-5 h-5 stroke-[2]" />
                      </div>
                      <h4 className="font-serif-luxury text-xl text-[#121212]">
                        Welcome to Ophmart
                      </h4>
                      <p className="text-xs text-[#575757] font-light max-w-sm mx-auto leading-relaxed">
                        Thank you for choosing to be our {activeRole.singular}. Your preference has been registered.
                      </p>
                      <div className="pt-2 flex justify-center gap-4">
                        <Link
                          href="/products"
                          className="px-6 py-2.5 bg-purple-600 text-white text-xs uppercase tracking-luxury font-medium rounded-none hover:bg-purple-700 transition-colors inline-block"
                        >
                          Explore Store
                        </Link>
                        <button
                          type="button"
                          onClick={() => setSubmitted(false)}
                          className="text-[10px] uppercase tracking-luxury text-[#121212] underline hover:text-[#8c8c8c] cursor-pointer"
                        >
                          Change Choice
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* ONLY A BUTTON: Continue */}
                      <button
                        type="button"
                        onClick={handleContinue}
                        className="w-full py-4 px-6 rounded-none bg-purple-600 text-white hover:bg-purple-700 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: PURPLE BORDER CAT + THOUGHT CLOUD BUBBLE     */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* THOUGHT CLOUD */}
            <div className="w-full max-w-sm mb-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRole}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="relative bg-white border border-[#121212] rounded-none p-5 sm:p-6 text-center shadow-xs"
                >
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#121212] font-normal leading-snug">
                    Thank you for being our {activeRole.singular}.
                  </h3>
                </motion.div>
              </AnimatePresence>

              {/* Thought trail dots leading down to the cat */}
              <div className="flex flex-col items-center gap-1.5 mt-2">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-purple-600 bg-white ml-2" />
                <div className="w-2.5 h-2.5 rounded-full border-2 border-purple-600 bg-white ml-5" />
                <div className="w-1.5 h-1.5 rounded-full border-2 border-purple-600 bg-white ml-7" />
              </div>
            </div>

            {/* CAT MADE FROM PURPLE BORDER (NO SQUARE OUTER BORDER, MOVED UP) */}
            <div className="relative w-60 sm:w-68 aspect-square bg-transparent p-2 flex items-center justify-center -mt-3 sm:-mt-5">
              <PurpleBorderCat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
