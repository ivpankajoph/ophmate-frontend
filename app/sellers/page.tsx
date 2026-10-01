'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Check,
  ArrowRight,
  ChevronDown,
  Store,
  Factory,
  Sparkles,
  Layers,
  Globe2,
  Palette,
  Truck,
  ShieldCheck,
  Award,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface SellerTypeOption {
  id: string;
  name: string;
  badge: string;
  icon: React.ElementType;
  description: string;
  highlights: string[];
  catDialogue: string;
}

const SELLER_TYPES: SellerTypeOption[] = [
  {
    id: 'manufacturer',
    name: 'Direct Factory / Manufacturer (OEM & ODM)',
    badge: 'Direct Production',
    icon: Factory,
    description:
      'Garment, footwear & textile manufacturing plants, CMT units, and custom private label specialists with bulk production capacity.',
    highlights: [
      'Direct RFQ bidding & purchase order routing from global retail importers & brand buyers',
      'Advance milestone escrow contracts with 100% production deposit guarantees',
      'Factory audit verification badge & instant catalog distribution to enterprise accounts'
    ],
    catDialogue: 'Awesome! Ready to manufacture bulk orders for verified global buyers?'
  },
  {
    id: 'brand-owner',
    name: 'Brand Owner & Independent Designer Atelier',
    badge: 'Designer & Label',
    icon: Palette,
    description:
      'Proprietary luxury labels, designer studios & contemporary fashion houses with in-house collections and seasonal releases.',
    highlights: [
      'Zero upfront listing fees with ironclad brand equity, pricing autonomy & IP copyright protection',
      'Curated showcase in the exclusive Ophmart Designer Salons & Private Sales',
      'Full control over seasonal line sheets, wholesale MOQs & authorized retailer screening'
    ],
    catDialogue: "Love your brand! Let's introduce your collections to premier worldwide buyers!"
  },
  {
    id: 'wholesale-distributor',
    name: 'Wholesale Distributor & Stockist',
    badge: 'Ready Inventory',
    icon: Layers,
    description:
      'Authorized regional distributors, volume stockists & multi-brand trade wholesalers with ready-to-ship inventory.',
    highlights: [
      'Real-time multi-currency catalog synchronization & tiered bulk volume pricing',
      'Rapid clearance channels for excess stock, seasonal overruns & volume closeouts',
      'Integrated B2B freight logistics with discounted domestic & international shipping'
    ],
    catDialogue: 'Great stock! Ready to move bulk inventory to verified commercial buyers?'
  },
  {
    id: 'exporter',
    name: 'Exporter & International Trading House',
    badge: 'Cross-Border Trade',
    icon: Globe2,
    description:
      'Licensed export corporations, cross-border trading firms & international mercantile intermediaries.',
    highlights: [
      'Comprehensive export customs clearance, HS-code mapping & tariff advisory assistance',
      'Multi-port container freight coordination & bonded warehouse storage across global hubs',
      'Letters of Credit (LC) escrow settlement & currency risk hedging protection'
    ],
    catDialogue: "Global trade ready! Let's expand your export shipments worldwide!"
  },
  {
    id: 'artisan-atelier',
    name: 'Artisan & Handcrafted Atelier',
    badge: 'Heritage & Craft',
    icon: Sparkles,
    description:
      'Handmade leather goods, heritage loom weavers, organic ateliers & master artisan craft creators.',
    highlights: [
      'Fair-trade certified premium pricing & global craft heritage storytelling showcase',
      'Dedicated artisan concierge for export packaging, barcoding & luxury presentation',
      'Flexible, low-minimum order caps (MOQs) tailored for hand-made craftsmanship'
    ],
    catDialogue: 'Pure craftsmanship! Global buyers will adore your handcrafted luxury creations!'
  },
  {
    id: 'dropshipping-ondemand',
    name: 'Dropshipping & On-Demand Supplier',
    badge: 'Agile Fulfillment',
    icon: Truck,
    description:
      'Agile on-demand printers, made-to-order apparel studios & fast-dispatch direct fulfillment partners.',
    highlights: [
      'Direct API integration for automated purchase order routing & white-label packing slips',
      'Blind drop-shipping directly to domestic and international commercial clients',
      '24-48 hour dispatch performance tracking with verified carrier tracking sync'
    ],
    catDialogue: "Agile supply! Let's connect your on-demand inventory to high-volume buyers!"
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

      <div className="relative z-10 text-center px-6 sm:px-8 py-2.5 sm:py-3.5 max-w-[85%] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default function SellersPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
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

  const selectedSeller = SELLER_TYPES.find((role) => role.name === selectedRole) || null;

  const handleSelectRole = (roleName: string) => {
    setSelectedRole(roleName);
    setIsDropdownOpen(false);
  };

  const handleClearRole = () => {
    setSelectedRole(null);
  };

  const handleContinue = () => {
    if (!selectedRole) return;

    setIsRedirecting(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem('ophmart_seller_role', selectedRole);
      localStorage.setItem('ophmart_seller_type', selectedRole);
      localStorage.setItem('ophmart_partner_role', selectedRole);
    }

    // Direct to the dedicated Vendor Registration flow
    const vendorRegBase =
      process.env.NEXT_PUBLIC_VENDOR_REGISTRATION_URL || 'http://localhost:3100/vendor/registration';
    const targetUrl = `${vendorRegBase}?role=${encodeURIComponent(selectedRole)}`;

    // Smooth redirect
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 250);
  };

  const getCatSpeech = () => {
    if (!selectedSeller) {
      return 'Tell us, which type of seller are you?';
    }
    return selectedSeller.catDialogue;
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

        {/* Minimalist Editorial Page Title: Become our Seller */}
        <div className="text-center max-w-xl mx-auto mb-5 sm:mb-7">

          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#121212] font-normal tracking-wide">
            Become our Seller
          </h1>
          <div className="w-14 h-[2.5px] bg-purple-600 mx-auto mt-2.5" />

        </div>

        {/* 2-Column Layout: 50:50 Width Ratio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* ========================================================== */}
          {/* LEFT COLUMN: WHICH TYPE OF SELLER ARE YOU? (50%)           */}
          {/* ========================================================== */}
          <div className="order-2 lg:order-1 space-y-6">
            <div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#121212] font-normal">
                Which type of seller are you?
              </h2>
              <p className="text-xs text-[#737373] mt-1 font-light leading-relaxed">
                Select your seller category to access dedicated wholesale tools, verified buyer RFQs, and secure escrow settlement payouts.
              </p>
            </div>

            {/* SINGLE-SELECT DROPDOWN CONTAINER */}
            <div ref={dropdownRef} className="relative">
              {/* Dropdown Label */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-luxury text-[#575757] font-semibold flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-purple-600" />
                  Select Seller Category
                </span>
                {selectedRole && (
                  <span className="text-[10px] uppercase tracking-luxury text-purple-700 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                    Selected: {selectedSeller?.badge || selectedRole}
                  </span>
                )}
              </div>

              {/* Large Dropdown Trigger Button */}
              <div
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={`w-full min-h-[58px] p-3.5 sm:p-4 bg-white border-2 rounded-none transition-all cursor-pointer flex items-center justify-between gap-3 ${isDropdownOpen
                  ? 'border-purple-600 ring-1 ring-purple-600 shadow-sm'
                  : selectedRole
                    ? 'border-purple-600 bg-purple-50/20'
                    : 'border-[#121212] hover:border-purple-600'
                  }`}
              >
                {/* Selected Role Display or Placeholder */}
                <div className="flex-1 flex items-center min-w-0">
                  {!selectedRole ? (
                    <span className="text-sm text-[#8c8c8c] font-light truncate">
                      Click to choose your seller category (Manufacturer, Brand Owner, Distributor...)...
                    </span>
                  ) : (
                    <div className="flex items-center gap-2 truncate">
                      <span className="inline-flex items-center gap-2 py-1.5 px-3 bg-purple-50 border border-purple-600 text-purple-950 text-xs sm:text-sm uppercase tracking-wider font-bold rounded-none">
                        <Check className="w-3.5 h-3.5 text-purple-600 stroke-[3]" />
                        <span className="truncate">{selectedRole}</span>
                      </span>
                    </div>
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
                    className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-purple-600' : 'text-[#121212]'
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
                    className="absolute top-full left-0 right-0 mt-2 z-40 bg-white border-2 border-[#121212] shadow-2xl rounded-none overflow-hidden max-h-[420px] flex flex-col"
                  >
                    {/* Header */}
                    <div className="p-3 bg-[#faf9f6] border-b border-[#e5e5e5] flex items-center justify-between text-xs flex-shrink-0">
                      <span className="text-[11px] uppercase tracking-luxury text-[#575757] font-semibold">
                        Choose 1 seller category:
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
                      {SELLER_TYPES.map((role) => {
                        const isSelected = selectedRole === role.name;
                        const IconComponent = role.icon;
                        return (
                          <div
                            key={role.id}
                            onClick={() => handleSelectRole(role.name)}
                            className={`p-4 flex items-start gap-3.5 cursor-pointer transition-colors select-none ${isSelected
                              ? 'bg-purple-50/80 hover:bg-purple-50'
                              : 'bg-white hover:bg-[#faf9f6]'
                              }`}
                          >
                            {/* Luxury Purple Radio Dot */}
                            <div
                              className={`w-5 h-5 mt-0.5 flex-shrink-0 border-2 rounded-full flex items-center justify-center transition-colors ${isSelected
                                ? 'border-purple-600 bg-white'
                                : 'border-[#a3a3a3] bg-white'
                                }`}
                            >
                              {isSelected && (
                                <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                              )}
                            </div>

                            {/* Role Name, Badge & Description */}
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center justify-between gap-1.5">
                                <div className="flex items-center gap-2">
                                  <IconComponent className="w-4 h-4 text-purple-600" />
                                  <span
                                    className={`text-sm uppercase tracking-luxury font-medium ${isSelected
                                      ? 'text-purple-900 font-bold'
                                      : 'text-[#121212]'
                                      }`}
                                  >
                                    {role.name}
                                  </span>
                                </div>
                                <span className="text-[9px] uppercase tracking-widest text-purple-700 font-semibold bg-purple-100/70 border border-purple-200 px-2 py-0.5">
                                  {role.badge}
                                </span>
                              </div>
                              <p className="text-xs text-[#737373] font-light mt-1.5 leading-relaxed">
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

            {/* SELLER HIGHLIGHTS / PRIVILEGES CARD (Shown when role is selected) */}
            <AnimatePresence>
              {selectedSeller && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="border-2 border-purple-600 bg-purple-50/30 p-5 rounded-none space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-purple-200 pb-3">
                    <div className="flex items-center gap-2">
                      <selectedSeller.icon className="w-4 h-4 text-purple-600" />
                      <span className="text-xs uppercase tracking-luxury font-bold text-purple-950">
                        Tailored Seller Privileges
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-purple-700 bg-purple-100 px-2 py-0.5">
                      {selectedSeller.badge}
                    </span>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-2.5">
                    {selectedSeller.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-[#333333] font-normal leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Trust guarantees bar */}
                  <div className="pt-3 border-t border-purple-200/80 grid grid-cols-3 gap-2 text-center">
                    <div className="p-1.5 bg-white border border-purple-200">
                      <p className="text-[10px] font-bold text-purple-950 tracking-wider">0% LISTING FEE</p>
                      <p className="text-[9px] text-[#737373]">Zero upfront cost</p>
                    </div>
                    <div className="p-1.5 bg-white border border-purple-200">
                      <p className="text-[10px] font-bold text-purple-950 tracking-wider">ESCROW SECURE</p>
                      <p className="text-[9px] text-[#737373]">Guaranteed payouts</p>
                    </div>
                    <div className="p-1.5 bg-white border border-purple-200">
                      <p className="text-[10px] font-bold text-purple-950 tracking-wider">GLOBAL REACH</p>
                      <p className="text-[9px] text-[#737373]">Verified buyers</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ACTION AREA: CONTINUE BUTTON */}
            <div className="border border-[#e5e5e5] rounded-none p-5 sm:p-6 bg-white space-y-3">
              <button
                type="button"
                onClick={handleContinue}
                disabled={!selectedRole || isRedirecting}
                className={`w-full py-4 px-6 rounded-none border-2 border-purple-600 bg-white text-xs sm:text-sm uppercase tracking-luxury font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${!selectedRole || isRedirecting
                  ? 'opacity-40 text-purple-300 cursor-not-allowed'
                  : 'text-purple-600 hover:bg-purple-600 hover:text-white cursor-pointer active:scale-[0.99]'
                  }`}
              >
                {isRedirecting ? (
                  <span>Initiating Seller Registration...</span>
                ) : (
                  <>
                    <span>
                      {selectedRole ? `Become our Seller — Continue` : 'Select a Category to Continue'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Secondary link for existing sellers */}

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
