'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, ArrowRight } from 'lucide-react';

type PartnerRoleKey = 'buyers' | 'sellers' | 'sourcing';

interface PartnerRole {
  key: PartnerRoleKey;
  label: string;
  singular: string;
  highlights: string[];
  actionLabel: string;
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
    ],
    actionLabel: 'Apply for VIP Buyer Access'
  },
  sellers: {
    key: 'sellers',
    label: '2. Sellers',
    singular: 'Seller',
    highlights: [
      'Digital flagship storefront with verified provenance',
      'Direct access to affluent international collectors',
      'Automated multi-currency payouts & escrow protection'
    ],
    actionLabel: 'Apply for Atelier Storefront'
  },
  sourcing: {
    key: 'sourcing',
    label: '3. Sourcing Agent',
    singular: 'Sourcing Agent',
    highlights: [
      'Institutional commission structure on trade orders',
      'Direct pipeline access to pre-vetted European & Asian ateliers',
      'Priority escrow clearance & logistics liaison support'
    ],
    actionLabel: 'Register as Sourcing Agent'
  }
};

export default function PartnerPage() {
  const [selectedRole, setSelectedRole] = useState<PartnerRoleKey>('buyers');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeRole = ROLES[selectedRole];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] py-8 sm:py-12 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-luxury font-medium text-[#8c8c8c] hover:text-[#121212] transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Return to Store
          </Link>
        </div>

        {/* Minimalist Editorial Page Title */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] block mb-2 font-medium">
            OPHMNART HAUTE ÉDITION
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#121212] font-normal tracking-wide">
            Become our Partner
          </h1>
          <div className="w-12 h-[1px] bg-[#121212] mx-auto mt-4" />
        </div>

        {/* 2-Column Luxury Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* ========================================================== */}
          {/* LEFT COLUMN: WHAT DO YOU WANT TO BE? + SHARP SHUFFLE TABS */}
          {/* ========================================================== */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#121212] font-normal">
                What do you want to be?
              </h2>
            </div>

            {/* Sharp Segmented Tabs with Sliding Solid Black Background */}
            <div className="relative flex border border-[#121212] rounded-none p-1 bg-white">
              {(['buyers', 'sellers', 'sourcing'] as PartnerRoleKey[]).map((key) => {
                const role = ROLES[key];
                const isSelected = selectedRole === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedRole(key)}
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

                {/* Onboarding Form */}
                <div className="border border-[#e5e5e5] rounded-none p-6 sm:p-8 bg-white">
                  {submitted ? (
                    <div className="py-6 text-center space-y-3">
                      <div className="w-8 h-8 border border-[#121212] rounded-none flex items-center justify-center mx-auto">
                        <Check className="w-4 h-4 text-[#121212]" />
                      </div>
                      <h4 className="font-serif-luxury text-xl text-[#121212]">
                        Application Transmitted
                      </h4>
                      <p className="text-xs text-[#575757] font-light max-w-sm mx-auto leading-relaxed">
                        Thank you for applying as our {activeRole.singular}. An executive concierge officer will review your dossier and contact you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="text-[10px] uppercase tracking-luxury text-[#121212] underline hover:text-[#8c8c8c] cursor-pointer pt-2"
                      >
                        Submit another dossier
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-luxury text-[#575757] block mb-1 font-medium">
                          Full Name / Company Name
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Maison de Laurent"
                          className="w-full px-4 py-3 rounded-none border border-[#e5e5e5] bg-[#faf9f6] text-xs text-[#121212] focus:border-[#121212] focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-luxury text-[#575757] block mb-1 font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="liaison@domain.com"
                          className="w-full px-4 py-3 rounded-none border border-[#e5e5e5] bg-[#faf9f6] text-xs text-[#121212] focus:border-[#121212] focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 py-3.5 px-6 rounded-none bg-purple-600 text-white hover:bg-purple-700 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Processing...</span>
                        ) : (
                          <>
                            <span>{activeRole.actionLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: CARTOON MASCOT + THOUGHT CLOUD BUBBLE        */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* THOUGHT CLOUD */}
            <div className="w-full max-w-sm mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRole}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="relative bg-white border border-[#121212] rounded-none p-5 sm:p-6 text-center shadow-xs"
                >
                  {/* Thought content: Exactly as requested */}
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#121212] font-normal leading-snug">
                    Thank you for being our {activeRole.singular}.
                  </h3>
                </motion.div>
              </AnimatePresence>

              {/* Thought trail dots leading down to the cartoon character */}
              <div className="flex flex-col items-center gap-1.5 mt-2">
                <div className="w-3.5 h-3.5 rounded-full border border-[#121212] bg-white ml-2" />
                <div className="w-2.5 h-2.5 rounded-full border border-[#121212] bg-white ml-5" />
                <div className="w-1.5 h-1.5 rounded-full border border-[#121212] bg-white ml-7" />
              </div>
            </div>

            {/* CARTOON MASCOT IN SHARP LUXURY FRAME */}
            <div className="relative w-64 sm:w-72 aspect-square border border-[#e5e5e5] bg-[#faf9f6] rounded-none p-3 shadow-2xs">
              <div className="relative w-full h-full">
                <Image
                  src="/images/partner-mascot.jpg"
                  alt="Ophmnart Concierge"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
