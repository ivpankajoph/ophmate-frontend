'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Check,
  ArrowRight,
  ChevronDown,
  Building2,
  Sparkles
} from 'lucide-react';

const PRIMARY_ROLES: string[] = [
  'Buyer / Importer',
  'Manufacturer',
  'Supplier / Trader',
  'Exporter',
  'Sourcing Agent',
  'Service Provider'
];

interface SourcingAgentType {
  id: string;
  name: string;
  image: string;
}

const SOURCING_AGENT_TYPES: SourcingAgentType[] = [
  {
    id: 'import-sourcing-agent',
    name: 'Import Sourcing Agent',
    image: '/images/sourcing/import-agent.svg'
  },
  {
    id: 'dropshipping-agent',
    name: 'Dropshipping Agent',
    image: '/images/sourcing/dropshipping-agent.svg'
  },
  {
    id: 'alibaba-sourcing-agent',
    name: 'Alibaba Sourcing Agent',
    image: '/images/sourcing/alibaba-agent.svg'
  },
  {
    id: 'product-sourcing-agent',
    name: 'Product Sourcing Agent',
    image: '/images/sourcing/product-sourcing-agent.svg'
  },
  {
    id: '1688-sourcing-agent',
    name: '1688 Sourcing Agent',
    image: '/images/sourcing/1688-agent.svg'
  },
  {
    id: 'dropshipping-sourcing-agent',
    name: 'Dropshipping Sourcing Agent',
    image: '/images/sourcing/dropshipping-sourcing-agent.svg'
  },
  {
    id: 'indiamart-sourcing-agent',
    name: 'IndiaMART Sourcing Agent',
    image: '/images/sourcing/indiamart-agent.svg'
  },
  {
    id: 'wholesale-trading-agent',
    name: 'Wholesale Trading Agent',
    image: '/images/sourcing/wholesale-trading-agent.svg'
  },
  {
    id: 'asia-sourcing-agent',
    name: 'Asia Sourcing Agent',
    image: '/images/sourcing/asia-sourcing-agent.svg'
  },
  {
    id: 'india-sourcing-agent',
    name: 'India Sourcing Agent',
    image: '/images/sourcing/india-sourcing-agent.svg'
  },
  {
    id: 'china-sourcing-agent',
    name: 'China Sourcing Agent',
    image: '/images/sourcing/china-sourcing-agent.svg'
  },
  {
    id: 'fba-sourcing-agent',
    name: 'FBA Sourcing Agent',
    image: '/images/sourcing/fba-sourcing-agent.svg'
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

export default function SellersPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const [selectedSourcingType, setSelectedSourcingType] = useState<string | null>(null);
  const [isSourcingDropdownOpen, setIsSourcingDropdownOpen] = useState(false);

  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const sourcingDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRoleDropdownOpen(false);
      }
      if (
        sourcingDropdownRef.current &&
        !sourcingDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSourcingDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
    setIsRoleDropdownOpen(false);
    if (role !== 'Sourcing Agent') {
      setSelectedSourcingType(null);
    }
  };

  const handleClearRole = () => {
    setSelectedRole(null);
    setSelectedSourcingType(null);
  };

  const handleSelectSourcingType = (name: string) => {
    setSelectedSourcingType(name);
    setIsSourcingDropdownOpen(false);
  };

  const handleClearSourcingType = () => {
    setSelectedSourcingType(null);
  };

  const handleContinue = () => {
    // Save to localStorage for fresh pages creation
    if (typeof window !== 'undefined') {
      if (selectedRole) {
        localStorage.setItem('ophmart_selected_role', selectedRole);
      }
      if (selectedSourcingType) {
        localStorage.setItem('ophmart_selected_sourcing_type', selectedSourcingType);
      }
    }
    // "abhi uske click pe kuch mat dikhana and jo pehel dikhate hai wo sab code hatao we will create fresh pages"
  };

  const selectedSourcingItem = SOURCING_AGENT_TYPES.find(
    (item) => item.name === selectedSourcingType
  );

  const getCatSpeech = () => {
    if (!selectedRole) {
      return 'Tell us, what do you want to be?';
    }
    if (selectedRole === 'Sourcing Agent') {
      if (selectedSourcingType) {
        return `Awesome! You chose ${selectedSourcingType}!`;
      }
      return 'Which type of Sourcing Agent are you?';
    }
    return `Okay, so you want to be our ${selectedRole}!`;
  };

  const isContinueDisabled =
    !selectedRole || (selectedRole === 'Sourcing Agent' && !selectedSourcingType);

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

        {/* Editorial Page Title: Become our Seller */}
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6">
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#121212] font-normal tracking-wide">
            Become our Seller
          </h1>
          <div className="w-10 h-[2px] bg-purple-600 mx-auto mt-2" />
        </div>

        {/* 2-Column Layout: 50:50 Width Ratio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* ========================================================== */}
          {/* LEFT COLUMN: WHAT DO YOU WANT TO BE? + DROPDOWNS           */}
          {/* ========================================================== */}
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-5">
            <div>
              <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#121212] font-normal">
                What do you want to be?
              </h2>
            </div>

            {/* 1. PRIMARY ROLE DROPDOWN */}
            <div ref={roleDropdownRef} className="relative">
              {/* Trigger Button */}
              <div
                onClick={() => setIsRoleDropdownOpen((prev) => !prev)}
                className={`w-full min-h-[48px] sm:min-h-[52px] p-2.5 sm:p-3 bg-white border-2 rounded-none transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                  isRoleDropdownOpen
                    ? 'border-purple-600 ring-1 ring-purple-600 shadow-sm'
                    : selectedRole
                    ? 'border-purple-600 bg-purple-50/20'
                    : 'border-[#121212] hover:border-purple-600'
                }`}
              >
                {/* Selected Role Display or Placeholder */}
                <div className="flex-1 flex items-center min-w-0">
                  {!selectedRole ? (
                    <span className="text-xs sm:text-[13px] text-[#8c8c8c] font-light truncate">
                      Click to choose your role (Buyer / Importer, Manufacturer, Supplier...)...
                    </span>
                  ) : (
                    <div className="flex items-center gap-2 truncate">
                      <span className="inline-flex items-center gap-1.5 py-1 px-2.5 bg-purple-50 border border-purple-500 text-purple-950 text-xs uppercase tracking-luxury font-medium rounded-none">
                        <Check className="w-3 h-3 text-purple-600 stroke-[2.5]" />
                        <span className="truncate">{selectedRole}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Actions: Clear & Chevron */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {selectedRole && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearRole();
                      }}
                      className="text-[11px] uppercase tracking-luxury text-[#8c8c8c] hover:text-red-600 transition-colors pr-2 border-r border-[#e5e5e5] cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isRoleDropdownOpen ? 'rotate-180 text-purple-600' : 'text-[#121212]'
                    }`}
                  />
                </div>
              </div>

              {/* PRIMARY DROPDOWN MENU PANEL (Clean without subheadings or labels) */}
              <AnimatePresence>
                {isRoleDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-full left-0 right-0 mt-1.5 z-40 bg-white border-2 border-[#121212] shadow-2xl rounded-none overflow-hidden max-h-[340px] flex flex-col"
                  >
                    <div className="divide-y divide-[#f0f0f0] overflow-y-auto">
                      {PRIMARY_ROLES.map((role) => {
                        const isSelected = selectedRole === role;
                        return (
                          <div
                            key={role}
                            onClick={() => handleSelectRole(role)}
                            className={`p-3 sm:p-3.5 flex items-center gap-3 cursor-pointer transition-colors select-none ${
                              isSelected
                                ? 'bg-purple-50/90 text-purple-900 font-bold'
                                : 'bg-white hover:bg-[#faf9f6] text-[#121212]'
                            }`}
                          >
                            {/* Luxury Purple Radio Dot */}
                            <div
                              className={`w-4 h-4 flex-shrink-0 border-2 rounded-full flex items-center justify-center transition-colors ${
                                isSelected
                                  ? 'border-purple-600 bg-white'
                                  : 'border-[#a3a3a3] bg-white'
                              }`}
                            >
                              {isSelected && (
                                <div className="w-2 h-2 rounded-full bg-purple-600" />
                              )}
                            </div>

                            {/* Clean Role Name - No Subheadings, No Labels */}
                            <span className="text-xs sm:text-[13px] uppercase tracking-luxury font-medium">
                              {role}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. SUB-DROPDOWN: SOURCING AGENT SPECIALIZATION WITH IMAGES */}
            <AnimatePresence>
              {selectedRole === 'Sourcing Agent' && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  transition={{ duration: 0.2 }}
                  ref={sourcingDropdownRef}
                  className="relative space-y-1.5 pt-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-luxury text-[#575757] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-600" />
                      Select Sourcing Specialization
                    </span>
                    {selectedSourcingType && (
                      <span className="text-[9px] uppercase tracking-luxury text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 border border-purple-200">
                        {selectedSourcingType}
                      </span>
                    )}
                  </div>

                  {/* Sourcing Sub-Dropdown Trigger */}
                  <div
                    onClick={() => setIsSourcingDropdownOpen((prev) => !prev)}
                    className={`w-full min-h-[48px] sm:min-h-[52px] p-2.5 sm:p-3 bg-white border-2 rounded-none transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                      isSourcingDropdownOpen
                        ? 'border-purple-600 ring-1 ring-purple-600 shadow-sm'
                        : selectedSourcingType
                        ? 'border-purple-600 bg-purple-50/20'
                        : 'border-[#121212] hover:border-purple-600'
                    }`}
                  >
                    <div className="flex-1 flex items-center min-w-0">
                      {!selectedSourcingType ? (
                        <span className="text-xs sm:text-[13px] text-[#8c8c8c] font-light truncate">
                          Choose Sourcing Agent type (Alibaba, 1688, IndiaMART, FBA, Dropshipping...)...
                        </span>
                      ) : (
                        <div className="flex items-center gap-2.5 truncate">
                          {selectedSourcingItem && (
                            <img
                              src={selectedSourcingItem.image}
                              alt={selectedSourcingItem.name}
                              className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0 rounded-xs"
                            />
                          )}
                          <span className="inline-flex items-center gap-1.5 py-1 px-2.5 bg-purple-50 border border-purple-500 text-purple-950 text-xs uppercase tracking-luxury font-medium rounded-none truncate">
                            <Check className="w-3 h-3 text-purple-600 stroke-[2.5] flex-shrink-0" />
                            <span className="truncate">{selectedSourcingType}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {selectedSourcingType && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClearSourcingType();
                          }}
                          className="text-[11px] uppercase tracking-luxury text-[#8c8c8c] hover:text-red-600 transition-colors pr-2 border-r border-[#e5e5e5] cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isSourcingDropdownOpen ? 'rotate-180 text-purple-600' : 'text-[#121212]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* SOURCING DROPDOWN MENU PANEL WITH IMAGES */}
                  <AnimatePresence>
                    {isSourcingDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.16 }}
                        className="absolute top-full left-0 right-0 mt-1.5 z-40 bg-white border-2 border-[#121212] shadow-2xl rounded-none overflow-hidden max-h-[350px] flex flex-col"
                      >
                        <div className="p-2.5 bg-[#faf9f6] border-b border-[#e5e5e5] flex items-center justify-between text-xs flex-shrink-0">
                          <span className="text-[10px] uppercase tracking-luxury text-[#575757] font-semibold">
                            Choose 1 Sourcing Specialization ({SOURCING_AGENT_TYPES.length} Options):
                          </span>
                          {selectedSourcingType && (
                            <button
                              type="button"
                              onClick={handleClearSourcingType}
                              className="text-[9px] uppercase tracking-luxury text-[#8c8c8c] hover:text-red-600 font-semibold cursor-pointer"
                            >
                              Clear Selection
                            </button>
                          )}
                        </div>

                        <div className="divide-y divide-[#f0f0f0] overflow-y-auto">
                          {SOURCING_AGENT_TYPES.map((agent) => {
                            const isSelected = selectedSourcingType === agent.name;
                            return (
                              <div
                                key={agent.id}
                                onClick={() => handleSelectSourcingType(agent.name)}
                                className={`p-2.5 sm:p-3 flex items-center gap-3 cursor-pointer transition-colors select-none ${
                                  isSelected
                                    ? 'bg-purple-50/90 text-purple-950 font-bold'
                                    : 'bg-white hover:bg-[#faf9f6] text-[#121212]'
                                }`}
                              >
                                {/* Radio Dot */}
                                <div
                                  className={`w-4 h-4 flex-shrink-0 border-2 rounded-full flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? 'border-purple-600 bg-white'
                                      : 'border-[#a3a3a3] bg-white'
                                  }`}
                                >
                                  {isSelected && (
                                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                                  )}
                                </div>

                                {/* Option Image */}
                                <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 p-0.5 bg-white border border-[#e5e5e5] rounded-xs flex items-center justify-center shadow-2xs">
                                  <img
                                    src={agent.image}
                                    alt={agent.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>

                                {/* Option Name */}
                                <span className="text-xs sm:text-[13px] font-medium tracking-normal flex-1">
                                  {agent.name}
                                </span>

                                {isSelected && (
                                  <span className="text-[9px] uppercase tracking-wider text-purple-700 font-semibold bg-purple-100 px-1.5 py-0.5 flex-shrink-0">
                                    Selected
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CONTINUE BUTTON */}
            <div className="border border-[#e5e5e5] rounded-none p-4 sm:p-5 bg-white">
              <button
                type="button"
                onClick={handleContinue}
                disabled={isContinueDisabled}
                className={`w-full py-3 sm:py-3.5 px-5 rounded-none border-2 border-purple-600 bg-white text-xs uppercase tracking-luxury font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
                  isContinueDisabled
                    ? 'opacity-40 text-purple-300 cursor-not-allowed'
                    : 'text-purple-600 hover:bg-purple-600 hover:text-white cursor-pointer active:scale-[0.99]'
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
              <div className="w-full max-w-[340px] sm:max-w-[380px] flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedRole || 'empty'}-${selectedSourcingType || ''}`}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="w-full flex justify-center"
                  >
                    <PurpleBorderCloud>
                      <h3 className="font-serif-luxury text-sm sm:text-base md:text-[17px] text-[#121212] font-medium leading-snug text-center">
                        {getCatSpeech()}
                      </h3>
                    </PurpleBorderCloud>
                  </motion.div>
                </AnimatePresence>

                {/* Thought trail dots leading down to the cat */}
                <div className="flex flex-col items-center gap-0.5 my-0.5">
                  <div className="w-2 h-2 rounded-full border-[1.8px] border-purple-600 bg-white ml-2" />
                  <div className="w-1.5 h-1.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-3.5" />
                </div>
              </div>

              {/* CAT MADE FROM PURPLE BORDER - Prominent Mascot */}
              <div className="relative w-48 sm:w-56 md:w-64 max-h-[220px] sm:max-h-[245px] aspect-square bg-transparent flex items-center justify-center -mt-1 sm:-mt-2">
                <PurpleBorderCat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
