'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, ArrowRight, ChevronDown, Building2 } from 'lucide-react';

interface PartnerRoleOption {
  id: string;
  name: string;
  description: string;
  highlights: string[];
}

const PARTNER_ROLES: PartnerRoleOption[] = [
  {
    id: 'buyer-importer',
    name: 'Buyer / Importer',
    description: 'Procure wholesale & luxury inventory, bulk orders and direct import consignments',
    highlights: [
      'Dedicated VIP buyer concierge & private salon curation',
      'Early reservation on high-volume production & catalog releases',
      'Duty-free import clearance advisory & verified door-to-door logistics'
    ]
  },
  {
    id: 'manufacturer',
    name: 'Manufacturer',
    description: 'Direct production factories, OEM/ODM creators & private label specialists',
    highlights: [
      'Direct showcase to international enterprise buyers & global importers',
      'Automated purchase order fulfillment & advance escrow payouts',
      'Factory audit verification badge & high-volume production RFQs'
    ]
  },
  {
    id: 'supplier-trader',
    name: 'Supplier / Trader',
    description: 'Authorized distributors, wholesale stockists & multi-brand traders',
    highlights: [
      'Instant catalog integration & B2B wholesale marketplace reach',
      'Real-time multi-currency pricing & inventory synchronization',
      'Verified buyer network with guaranteed transaction settlement'
    ]
  },
  {
    id: 'exporter',
    name: 'Exporter',
    description: 'International export houses, cross-border merchants & trade intermediaries',
    highlights: [
      'Global cross-border compliance, documentation & export subsidies aid',
      'Multi-port international freight shipping & bonded warehouse storage',
      'Letters of credit (LC) support & risk-free currency hedging'
    ]
  },
  {
    id: 'sourcing-agent',
    name: 'Sourcing Agent',
    description: 'Independent procurement directors, liaison agents & regional buying consultants',
    highlights: [
      'Tiered institutional commission structure on verified trade transactions',
      'Direct liaison access to pre-vetted factories & luxury ateliers',
      'Priority escrow clearance & specialized trade dispute representation'
    ]
  },
  {
    id: 'service-provider',
    name: 'Service Provider',
    description: 'Authentication labs, quality inspection, freight logistics & business services',
    highlights: [
      'Preferred service listing across Ophmart global merchant network',
      'Integrated dispatch for verification, quality audits & appraisal contracts',
      'Automated service billing, insured custody & guaranteed prompt payouts'
    ]
  }
];

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

      {/* Cute Eyes (Happy curved lines) */}
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

      <path
        d="M 94 126 Q 100 132 106 126"
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
      className={`relative w-full max-w-[380px] sm:max-w-[420px] flex items-center justify-center p-4 sm:p-6 min-h-[105px] sm:min-h-[125px] ${className}`}
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

      <div className="relative z-10 text-center px-6 sm:px-8 py-2.5 sm:py-3.5 max-w-[80%] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default function SellersPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectRole = (roleName: string) => {
    setSelectedRole(roleName);
    setIsDropdownOpen(false);
  };

  const handleClearRole = () => {
    setSelectedRole(null);
  };

  const handleContinue = () => {
    if (!selectedRole) return;

    if (typeof window !== 'undefined') {
      localStorage.setItem('ophmart_partner_role', selectedRole);
    }

    if (selectedRole === 'Buyer / Importer') {
      router.push('/buyers');
    } else if (selectedRole === 'Sourcing Agent') {
      router.push('/sourcing-agent');
    } else if (selectedRole === 'Service Provider') {
      router.push('/service-provider');
    }
  };

  const getCatSpeech = () => {
    if (!selectedRole) {
      return 'Tell us, what do you want to be?';
    }
    return `Okay, so you want to be our ${selectedRole}!`;
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] pt-1 sm:pt-2 pb-16 px-4 sm:px-6 md:px-10 lg:px-12">
      <div className="max-w-[1480px] mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-2 sm:mb-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury font-medium text-[#737373] hover:text-purple-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Return to Store
          </Link>
        </div>

        {/* Minimalist Editorial Page Title */}
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-5">
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#121212] font-normal tracking-wide">
            Become our Partner
          </h1>
          <div className="w-12 h-[2px] bg-purple-600 mx-auto mt-2" />
        </div>

        {/* 2-Column Layout: Exact 50:50 Width Ratio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* ========================================================== */}
          {/* LEFT COLUMN: WHAT DO YOU WANT TO BE? + SINGLE DROPDOWN (50%) */}
          {/* ========================================================== */}
          <div className="order-2 lg:order-1 space-y-6">
            <div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#121212] font-normal">
                What do you want to be?
              </h2>
              <p className="text-xs text-[#737373] mt-1 font-light">
                Select the corporate role that defines your business relationship with Ophmart.
              </p>
            </div>

            {/* SINGLE-SELECT DROPDOWN CONTAINER */}
            <div ref={dropdownRef} className="relative">
              {/* Dropdown Label */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-luxury text-[#575757] font-semibold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                  Select Company Role
                </span>
                {selectedRole && (
                  <span className="text-[10px] uppercase tracking-luxury text-purple-700 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                    Selected: {selectedRole}
                  </span>
                )}
              </div>

              {/* Large Dropdown Trigger Button */}
              <div
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={`w-full min-h-[58px] p-3.5 sm:p-4 bg-white border-2 rounded-none transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isDropdownOpen
                    ? 'border-purple-600 ring-1 ring-purple-600 shadow-sm'
                    : selectedRole
                    ? 'border-purple-600'
                    : 'border-[#121212] hover:border-purple-600'
                }`}
              >
                {/* Selected Role Display or Placeholder */}
                <div className="flex-1 flex items-center min-w-0">
                  {!selectedRole ? (
                    <span className="text-sm text-[#8c8c8c] font-light truncate">
                      Click to choose your role (Buyer / Importer, Manufacturer, Supplier...)...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 py-1.5 px-3 bg-purple-50 border border-purple-600 text-purple-900 text-xs sm:text-sm uppercase tracking-wider font-bold rounded-none">
                      <Check className="w-3.5 h-3.5 text-purple-600 stroke-[3]" />
                      <span>{selectedRole}</span>
                    </span>
                  )}
                </div>

                {/* Right Actions: Clear & Chevron */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {selectedRole && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearRole();
                      }}
                      className="text-xs uppercase tracking-luxury text-[#8c8c8c] hover:text-red-600 transition-colors pr-2 border-r border-[#e5e5e5] cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180 text-purple-600' : 'text-[#121212]'
                    }`}
                  />
                </div>
              </div>

              {/* DROPDOWN MENU PANEL */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-full left-0 right-0 mt-2 z-40 bg-white border-2 border-[#121212] shadow-2xl rounded-none overflow-hidden max-h-[390px] flex flex-col"
                  >
                    {/* Header */}
                    <div className="p-3 bg-[#faf9f6] border-b border-[#e5e5e5] flex items-center justify-between text-xs flex-shrink-0">
                      <span className="text-[11px] uppercase tracking-luxury text-[#575757] font-medium">
                        Choose 1 corporate role:
                      </span>
                      {selectedRole && (
                        <button
                          type="button"
                          onClick={handleClearRole}
                          className="text-[10px] uppercase tracking-luxury text-[#8c8c8c] hover:text-red-600 font-semibold cursor-pointer"
                        >
                          Clear Selection
                        </button>
                      )}
                    </div>

                    {/* Roles Options List */}
                    <div className="divide-y divide-[#f0f0f0] overflow-y-auto">
                      {PARTNER_ROLES.map((role) => {
                        const isSelected = selectedRole === role.name;
                        return (
                          <div
                            key={role.id}
                            onClick={() => handleSelectRole(role.name)}
                            className={`p-4 flex items-start gap-3.5 cursor-pointer transition-colors select-none ${
                              isSelected
                                ? 'bg-purple-50/80 hover:bg-purple-50'
                                : 'bg-white hover:bg-[#faf9f6]'
                            }`}
                          >
                            {/* Luxury Purple Radio Dot */}
                            <div
                              className={`w-5 h-5 mt-0.5 flex-shrink-0 border-2 rounded-full flex items-center justify-center transition-colors ${
                                isSelected
                                  ? 'border-purple-600 bg-white'
                                  : 'border-[#a3a3a3] bg-white'
                              }`}
                            >
                              {isSelected && (
                                <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                              )}
                            </div>

                            {/* Role Name & Description */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-sm uppercase tracking-luxury font-medium ${
                                    isSelected
                                      ? 'text-purple-900 font-bold'
                                      : 'text-[#121212]'
                                  }`}
                                >
                                  {role.name}
                                </span>
                                {isSelected && (
                                  <span className="text-[9px] uppercase tracking-widest text-purple-700 font-bold bg-purple-100 px-2 py-0.5">
                                    Selected
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#737373] font-light mt-1 leading-relaxed">
                                {role.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Area: CONTINUE BUTTON */}
            <div className="border border-[#e5e5e5] rounded-none p-5 sm:p-6 bg-white">
              <button
                type="button"
                onClick={handleContinue}
                disabled={!selectedRole}
                className={`w-full py-4 px-6 rounded-none border-2 border-purple-600 bg-white text-xs sm:text-sm uppercase tracking-luxury font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
                  !selectedRole
                    ? 'opacity-40 text-purple-300 cursor-not-allowed'
                    : 'text-purple-600 hover:bg-purple-600 hover:text-white cursor-pointer'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: PURPLE BORDER CAT + THOUGHT CLOUD BUBBLE (50%)*/}
          {/* STICKY BELOW FIXED HEADER (84px) SO ENTIRE PET IS VISIBLE  */}
          {/* ========================================================== */}
          <div className="order-1 lg:order-2 relative">
            <div className="lg:sticky lg:top-[84px] flex flex-col items-center">
              {/* THOUGHT CLOUD */}
              <div className="w-full max-w-[380px] sm:max-w-[420px] flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedRole || 'empty'}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="w-full flex justify-center"
                  >
                    <PurpleBorderCloud>
                      <h3 className="font-serif-luxury text-base sm:text-lg md:text-xl text-[#121212] font-medium leading-snug text-center">
                        {getCatSpeech()}
                      </h3>
                    </PurpleBorderCloud>
                  </motion.div>
                </AnimatePresence>

                {/* Thought trail dots leading down to the cat */}
                <div className="flex flex-col items-center gap-0.5 my-0.5">
                  <div className="w-2.5 h-2.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-2" />
                  <div className="w-1.5 h-1.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-4" />
                </div>
              </div>

              {/* CAT MADE FROM PURPLE BORDER - Prominent Large Mascot */}
              <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 max-h-[260px] sm:max-h-[285px] aspect-square bg-transparent flex items-center justify-center -mt-1 sm:-mt-2">
                <PurpleBorderCat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
