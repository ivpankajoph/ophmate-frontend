'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  ShieldCheck,
  Phone,
  Mail,
  Globe,
  Link2,
  MapPin,
  Check,
  Upload,
  X,
  Package,
  CheckCircle2,
  Award,
  Landmark,
  Users,
  Boxes,
  Truck,
  FileCheck
} from 'lucide-react';

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

// Purple Border Tiger Mascot (Stroke only, fill none)
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

      {/* Tiger Cheeks & Chin Outline */}
      <path
        d="M 52 50 C 42 66 40 88 48 104 C 58 122 84 128 100 128 C 116 128 142 122 152 104 C 160 88 158 66 148 50"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tiger Forehead King '王' Markings */}
      <path d="M 90 42 L 110 42" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 86 48 L 114 48" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 100 38 L 100 56" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 94 56 L 100 62 L 106 56" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Left Cheek Tiger Stripes */}
      <path d="M 48 76 L 62 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 46 86 L 60 88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 50 96 L 62 94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Right Cheek Tiger Stripes */}
      <path d="M 152 76 L 138 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 154 86 L 140 88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 150 96 L 138 94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Cute Eyes (Happy curved lines) */}
      <path d="M 72 80 Q 82 72 92 80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 108 80 Q 118 72 128 80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {/* Tiger Nose */}
      <path d="M 96 90 L 104 90 L 100 95 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />

      {/* Tiger W-Mouth */}
      <path d="M 100 95 L 100 98 M 100 98 Q 92 105 84 100 M 100 98 Q 108 105 116 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Left Whiskers */}
      <path d="M 70 94 L 38 90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 69 99 L 36 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 70 104 L 40 110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Right Whiskers */}
      <path d="M 130 94 L 162 90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 131 99 L 164 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 130 104 L 160 110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Body Outline */}
      <path d="M 74 126 C 70 144 66 160 60 176" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 126 126 C 130 144 134 160 140 176" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {/* Body Side Stripes */}
      <path d="M 68 142 L 78 146" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 64 156 L 76 158" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 132 142 L 122 146" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 136 156 L 124 158" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Front Paws */}
      <path d="M 78 148 L 78 178 C 78 182 88 182 88 178 L 88 154" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 122 148 L 122 178 C 122 182 112 182 112 178 L 112 154" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Back Sitting Paws */}
      <path d="M 60 176 C 54 179 54 182 66 182 C 72 182 78 180 78 178" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 140 176 C 146 179 146 182 134 182 C 128 182 122 180 122 178" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />

      {/* Curled Tiger Tail with Tail Stripes */}
      <path d="M 141 170 C 164 168 178 156 180 136 C 182 116 166 108 158 114 C 150 120 154 132 162 132" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 163 158 L 171 162" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 172 144 L 179 148" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 170 126 L 178 124" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

// Purple Border Thought Cloud
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

// Wizard Step Navigation Items (Step 2 Legal & KYC removed for now)
const STEPS = [
  { id: 1, title: 'Basic Info', icon: Building2, desc: 'Identity & Entity' },
  { id: 2, title: 'Contact', icon: Phone, desc: 'Direct Channels' },
  { id: 3, title: 'Capabilities', icon: Boxes, desc: 'Sourcing & Incoterms' },
  { id: 4, title: 'Portfolio', icon: Package, desc: 'Regions & Audits' },
  { id: 5, title: 'Infrastructure', icon: Users, desc: 'Team & Systems' },
  { id: 6, title: 'Certifications', icon: Award, desc: 'Quality & Partners' },
  { id: 7, title: 'Banking', icon: Landmark, desc: 'Payouts & Settlement' }
];

function SellerRegistrationContent() {
  const searchParams = useSearchParams();

  const [role, setRole] = useState<string>(() => searchParams.get('role') || 'Sourcing Agent');
  const [sourcingType, setSourcingType] = useState<string>(() => searchParams.get('sourcingType') || '');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State covering all 8 requested sections
  const [formData, setFormData] = useState({
    // 1. Basic Information
    legalBusinessName: '',
    tradingBrandName: '',
    businessRole: 'Sourcing Agent',
    establishmentYear: '',
    officeAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    operatingLocations: [] as string[],
    newLocationInput: '',

    // 2. Country-Specific Legal & KYC
    kycCountry: 'India' as 'India' | 'United States' | 'United Kingdom' | 'European Union' | 'China' | 'Other',
    // India KYC
    panNumber: '',
    gstinNumber: '',
    msmeUdyamNumber: '',
    cinLlpinNumber: '',
    iecNumber: '',
    // US KYC
    einNumber: '',
    stateLicenseNumber: '',
    resaleCertNumber: '',
    // UK KYC
    companiesHouseNumber: '',
    ukVatNumber: '',
    utrNumber: '',
    // EU KYC
    euVatNumber: '',
    eoriNumber: '',
    commercialRegisterExtract: '',
    // China KYC
    usccNumber: '',
    chinaBusinessLicense: '',
    customsRegistrationCode: '',
    // Other KYC
    localTaxId: '',
    incorporationCertificateNumber: '',
    kycDocumentName: '',

    // 3. Contact & Communication Details
    contactPersonName: '',
    contactPersonJobTitle: '',
    businessEmail: '',
    phoneCountryCode: '+91',
    phoneNumber: '',
    officialWebsite: '',
    linkedinUrl: '',

    // 4. Operational & Sourcing Capabilities
    selectedCategories: [] as string[],
    targetRegions: [] as string[],
    moqCapability: '',
    averageTat: '',
    selectedIncoterms: [] as string[],

    // 5. Catalog, Portfolio & Service Offerings
    sourcingRegionsCovered: '',
    factoryAuditingExpertise: [] as string[],
    manufacturerNetworkSize: '',
    productCatalogFileName: '',
    sampleAvailability: '',
    scopeOfServices: [] as string[],

    // 6. Infrastructure, Capacity & Team
    totalTeamSize: '',
    qcStaffCount: '',
    facilityDetails: '',
    softwareSystems: [] as string[],

    // 7. Certifications & Quality Standards
    qualityCertifications: [] as string[],
    regionalCertifications: [] as string[],
    inspectionPartners: [] as string[],
    certificateFileName: '',

    // 8. Banking & International Payout Setup
    bankAccountHolderName: '',
    accountNumberIban: '',
    swiftBicRoutingCode: '',
    supportedCurrencies: [] as string[],
    taxResidencyDocType: '',
    taxDocFileName: ''
  });

  useEffect(() => {
    const paramRole = searchParams.get('role');
    const paramSourcingType = searchParams.get('sourcingType');

    if (paramRole) {
      setRole(paramRole);
    } else if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ophmart_selected_role');
      if (stored) setRole(stored);
    }

    if (paramSourcingType) {
      setSourcingType(paramSourcingType);
    } else if (typeof window !== 'undefined') {
      const storedSourcing = localStorage.getItem('ophmart_selected_sourcing_type');
      if (storedSourcing) setSourcingType(storedSourcing);
    }
  }, [searchParams]);

  const sourcingImage = sourcingType ? SOURCING_AGENT_TYPES_MAP[sourcingType] : null;

  const leftScrollRef = React.useRef<HTMLDivElement>(null);

  const isSourcingAgent = !role || role === 'Sourcing Agent';

  // Tiger Speech based on current step or role
  const getTigerSpeech = () => {
    if (!isSourcingAgent) {
      return `Welcome! The registration portal for ${role} will be unlocked soon. Stay tuned!`;
    }
    if (isSubmitted) {
      return 'Application Received! Welcome to the Ophmart Merchant Network!';
    }
    switch (currentStep) {
      case 1:
        return sourcingType
          ? `Welcome! Let's start with your ${sourcingType} official identity!`
          : `Welcome! Let's start with your official business identity!`;
      case 2:
        return 'Who is the primary contact person managing sourcing contracts?';
      case 3:
        return 'Tell global buyers about your categories and shipping terms!';
      case 4:
        return 'Showcase your verified factory network & audit expertise!';
      case 5:
        return 'Detail your on-ground QC inspection strength and facilities.';
      case 6:
        return 'Certifications build maximum trust with international importers!';
      case 7:
        return 'Setup your international banking for secure escrow payouts!';
      default:
        return 'Roar! Your Sourcing Agent registration is in progress!';
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: string, item: string) => {
    setFormData((prev) => {
      const currentList: string[] = (prev as any)[field] || [];
      const updated = currentList.includes(item)
        ? currentList.filter((x) => x !== item)
        : [...currentList, item];
      return { ...prev, [field]: updated };
    });
  };

  const handleAddLocation = () => {
    if (!formData.newLocationInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      operatingLocations: [...prev.operatingLocations, prev.newLocationInput.trim()],
      newLocationInput: ''
    }));
  };

  const handleRemoveLocation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      operatingLocations: prev.operatingLocations.filter((_, i) => i !== index)
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
      leftScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      leftScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('ophmart_sourcing_agent_submission', JSON.stringify(formData));
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] pt-1 sm:pt-2 pb-20 px-4 sm:px-6 md:px-10 lg:px-12">
      <div className="max-w-[1480px] mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-2 sm:mb-3 flex items-center justify-between">
          <Link
            href="/sellers"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury font-medium text-[#737373] hover:text-purple-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Role Selection
          </Link>
          <span className="text-[11px] uppercase tracking-luxury text-[#8c8c8c] hidden sm:inline-block">
            Sourcing Agent Onboarding Protocol
          </span>
        </div>

        {/* Editorial Page Title: Seller Registration */}
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6">
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#121212] font-normal tracking-wide">
            Seller Registration
          </h1>
          <div className="w-10 h-[2px] bg-purple-600 mx-auto mt-2" />
        </div>

        {/* 2-Column Layout: Left (Form 65%) & Right (Tiger & Checklist 35%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* ========================================================== */}
          {/* LEFT COLUMN: SCROLLABLE SOURCING AGENT REGISTRATION WIZARD */}
          {/* ========================================================== */}
          <div
            ref={leftScrollRef}
            className="lg:col-span-8 order-2 lg:order-1 space-y-4 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto lg:pr-3.5 scroll-smooth"
          >
            {/* Small text display of selected data */}
            <div className="flex flex-wrap items-center gap-2 p-2.5 sm:p-3 bg-white border border-[#e5e5e5]">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-luxury font-semibold text-[#737373]">
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
                  {role || 'Sourcing Agent'}
                </span>
                {sourcingType && (
                  <span className="text-purple-700 font-semibold">• {sourcingType}</span>
                )}
              </div>
              <Link
                href="/sellers"
                className="text-[10px] sm:text-[11px] uppercase tracking-luxury text-purple-600 hover:text-purple-800 transition-colors ml-auto font-medium"
              >
                Change Role
              </Link>
            </div>

            {/* Sourcing Agent 7-Step Wizard or Pending Role Display */}
            {isSourcingAgent ? (
              <>
                {/* Horizontal Step Indicator Bar */}
                <div className="bg-[#faf9f6] border border-[#e5e5e5] p-2.5 sm:p-3 overflow-x-auto">
              <div className="flex items-center justify-between min-w-[560px] gap-2">
                {STEPS.map((step) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => {
                        setCurrentStep(step.id);
                        leftScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`flex-1 flex flex-col items-center gap-1 py-1.5 px-1 border-b-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-purple-600 text-purple-900 font-semibold bg-white'
                          : isCompleted
                          ? 'border-emerald-600 text-emerald-800'
                          : 'border-transparent text-[#8c8c8c] hover:text-[#121212]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs">
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                            isActive
                              ? 'bg-purple-600 text-white font-bold'
                              : isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#e5e5e5] text-[#575757]'
                          }`}
                        >
                          {isCompleted ? '✓' : step.id}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider truncate">
                          {step.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MAIN FORM CONTAINER */}
            <div className="bg-white border-2 border-[#121212] p-5 sm:p-7 shadow-xs">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-luxury text-2xl text-[#121212]">
                    Registration Submitted Successfully!
                  </h3>
                  <p className="text-xs text-[#737373] max-w-md mx-auto leading-relaxed">
                    Your Sourcing Agent enterprise profile has been recorded in the Ophmart global network. Our institutional vetting desk will review your KYC and compliance documents within 24 hours.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <Link
                      href="/"
                      className="px-6 py-2.5 bg-purple-600 text-white text-xs uppercase tracking-luxury font-bold hover:bg-purple-700 transition-colors"
                    >
                      Return to Store
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 border border-[#121212] text-xs uppercase tracking-luxury font-semibold hover:bg-gray-50"
                    >
                      Edit Submission
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-6">
                  {/* ======================================================== */}
                  {/* STEP 1: Basic Information & Identification (Global Standard) */}
                  {/* ======================================================== */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="border-b border-[#e5e5e5] pb-2.5 flex items-center justify-between">
                        <div>
                          <h2 className="font-serif-luxury text-lg sm:text-xl text-[#121212] font-medium flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-purple-600" />
                            1. Basic Information & Identification (Global Standard)
                          </h2>
                          <p className="text-[11px] text-[#737373] mt-0.5">
                            Official registered corporate entity credentials
                          </p>
                        </div>
                        <span className="text-[10px] uppercase tracking-luxury text-purple-700 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                          Step 1 of 7
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Legal Business Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.legalBusinessName}
                            onChange={(e) => handleInputChange('legalBusinessName', e.target.value)}
                            placeholder="e.g. Apex Global Sourcing Private Limited"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 focus:outline-none rounded-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Trading / Brand Name
                          </label>
                          <input
                            type="text"
                            value={formData.tradingBrandName}
                            onChange={(e) => handleInputChange('tradingBrandName', e.target.value)}
                            placeholder="e.g. Apex Sourcing Hub"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 focus:outline-none rounded-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Business Role
                          </label>
                          <select
                            value={formData.businessRole}
                            onChange={(e) => handleInputChange('businessRole', e.target.value)}
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 focus:outline-none bg-white rounded-none"
                          >
                            <option value="Sourcing Agent">Sourcing Agent</option>
                            <option value="Manufacturer">Manufacturer</option>
                            <option value="Supplier">Supplier</option>
                            <option value="Service Provider">Service Provider</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Year of Establishment *
                          </label>
                          <input
                            type="number"
                            required
                            min="1950"
                            max="2026"
                            value={formData.establishmentYear}
                            onChange={(e) => handleInputChange('establishmentYear', e.target.value)}
                            placeholder="e.g. 2016"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 focus:outline-none rounded-none"
                          />
                        </div>
                      </div>

                      {/* Registered Office Address */}
                      <div className="pt-2">
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-purple-600" />
                          Registered Office Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.officeAddress}
                          onChange={(e) => handleInputChange('officeAddress', e.target.value)}
                          placeholder="Street Address, Building, Floor / Suite"
                          className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 focus:outline-none rounded-none mb-2"
                        />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="City / District"
                            className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 focus:outline-none rounded-none"
                          />
                          <input
                            type="text"
                            required
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            placeholder="State / Province"
                            className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 focus:outline-none rounded-none"
                          />
                          <input
                            type="text"
                            required
                            value={formData.postalCode}
                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            placeholder="Postal / ZIP Code"
                            className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 focus:outline-none rounded-none"
                          />
                          <input
                            type="text"
                            required
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            placeholder="Country"
                            className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 focus:outline-none rounded-none"
                          />
                        </div>
                      </div>

                      {/* Operating Locations */}
                      <div className="pt-2">
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                          Operating Locations & Regional Sourcing Offices
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={formData.newLocationInput}
                            onChange={(e) => handleInputChange('newLocationInput', e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddLocation();
                              }
                            }}
                            placeholder="e.g. Guangzhou, Surat, Mumbai, Shenzhen, London (Press Enter or Add)"
                            className="flex-1 text-xs p-2 border border-[#cccccc] focus:border-purple-600 focus:outline-none rounded-none"
                          />
                          <button
                            type="button"
                            onClick={handleAddLocation}
                            className="px-4 py-2 bg-purple-50 text-purple-900 border border-purple-300 text-xs uppercase tracking-luxury font-bold hover:bg-purple-100"
                          >
                            Add
                          </button>
                        </div>
                        {formData.operatingLocations.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {formData.operatingLocations.map((loc, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 text-xs py-1 px-2.5 bg-gray-100 border border-gray-300 text-[#121212]"
                              >
                                <span>{loc}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveLocation(idx)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* ======================================================== */}
                  {/* STEP 2: Country-Specific Legal, Tax & Compliance (KYC)   */}
                  {/* TEMPORARILY DISABLED AS REQUESTED                      */}
                  {/* ======================================================== */}
                  {false && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="border-b border-[#e5e5e5] pb-2.5 flex items-center justify-between">
                        <div>
                          <h2 className="font-serif-luxury text-lg sm:text-xl text-[#121212] font-medium flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-purple-600" />
                            2. Country-Specific Legal, Tax & Compliance (KYC)
                          </h2>
                          <p className="text-[11px] text-[#737373] mt-0.5">
                            Jurisdiction-tailored tax identification and statutory numbers
                          </p>
                        </div>
                        <span className="text-[10px] uppercase tracking-luxury text-purple-700 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                          Step 2 of 8
                        </span>
                      </div>

                      {/* Country Selector Tabs */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1.5">
                          Select Incorporation / Tax Jurisdiction:
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                          {(['India', 'United States', 'United Kingdom', 'European Union', 'China', 'Other'] as const).map(
                            (c) => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => handleInputChange('kycCountry', c)}
                                className={`py-2 px-1 text-center text-xs uppercase tracking-wider font-semibold border transition-all ${
                                  formData.kycCountry === c
                                    ? 'border-purple-600 bg-purple-50 text-purple-900 ring-1 ring-purple-600'
                                    : 'border-[#cccccc] bg-white text-[#575757] hover:border-purple-400'
                                }`}
                              >
                                {c}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Conditional KYC Form Fields */}
                      <div className="p-4 bg-[#faf9f6] border border-[#e5e5e5] space-y-3">
                        <div className="text-[11px] uppercase tracking-luxury font-bold text-purple-900 mb-2">
                          Compliance Requirements for: {formData.kycCountry}
                        </div>

                        {formData.kycCountry === 'India' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                PAN (Permanent Account Number) *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.panNumber}
                                onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                                placeholder="e.g. ABCDE1234F"
                                maxLength={10}
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none uppercase font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                GSTIN (Goods and Services Tax ID) *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.gstinNumber}
                                onChange={(e) => handleInputChange('gstinNumber', e.target.value.toUpperCase())}
                                placeholder="e.g. 27ABCDE1234F1Z5"
                                maxLength={15}
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none uppercase font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                MSME / Udyam Registration Number
                              </label>
                              <input
                                type="text"
                                value={formData.msmeUdyamNumber}
                                onChange={(e) => handleInputChange('msmeUdyamNumber', e.target.value.toUpperCase())}
                                placeholder="e.g. UDYAM-MH-01-0000000"
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none uppercase font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                CIN / LLPIN (Corporate Identity Number)
                              </label>
                              <input
                                type="text"
                                value={formData.cinLlpinNumber}
                                onChange={(e) => handleInputChange('cinLlpinNumber', e.target.value.toUpperCase())}
                                placeholder="e.g. U74999MH2016PTC288888"
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none uppercase font-mono"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                IEC (Import Export Code) *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.iecNumber}
                                onChange={(e) => handleInputChange('iecNumber', e.target.value.toUpperCase())}
                                placeholder="e.g. 0516000000 (10-digit Import Export Code)"
                                maxLength={10}
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none uppercase font-mono"
                              />
                            </div>
                          </div>
                        )}

                        {formData.kycCountry === 'United States' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                EIN (Employer Identification Number) *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.einNumber}
                                onChange={(e) => handleInputChange('einNumber', e.target.value)}
                                placeholder="XX-XXXXXXX"
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                State Business License Number *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.stateLicenseNumber}
                                onChange={(e) => handleInputChange('stateLicenseNumber', e.target.value)}
                                placeholder="e.g. CA-BL-987654"
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                Resale Certificate / Sales Tax Permit Number
                              </label>
                              <input
                                type="text"
                                value={formData.resaleCertNumber}
                                onChange={(e) => handleInputChange('resaleCertNumber', e.target.value)}
                                placeholder="e.g. ST-12345678"
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                              />
                            </div>
                          </div>
                        )}

                        {formData.kycCountry === 'United Kingdom' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                Companies House Registration Number *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.companiesHouseNumber}
                                onChange={(e) => handleInputChange('companiesHouseNumber', e.target.value)}
                                placeholder="8-digit company number"
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                VAT Registration Number
                              </label>
                              <input
                                type="text"
                                value={formData.ukVatNumber}
                                onChange={(e) => handleInputChange('ukVatNumber', e.target.value)}
                                placeholder="e.g. GB 123 4567 89"
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                Unique Taxpayer Reference (UTR) *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.utrNumber}
                                onChange={(e) => handleInputChange('utrNumber', e.target.value)}
                                placeholder="10-digit UTR reference"
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                              />
                            </div>
                          </div>
                        )}

                        {formData.kycCountry === 'European Union' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                VAT Identification Number *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.euVatNumber}
                                onChange={(e) => handleInputChange('euVatNumber', e.target.value)}
                                placeholder="e.g. DE123456789 / FR123456789"
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                EORI Number (Customs Registration) *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.eoriNumber}
                                onChange={(e) => handleInputChange('eoriNumber', e.target.value)}
                                placeholder="e.g. DE123456789012345"
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                Commercial Register Extract Number
                              </label>
                              <input
                                type="text"
                                value={formData.commercialRegisterExtract}
                                onChange={(e) => handleInputChange('commercialRegisterExtract', e.target.value)}
                                placeholder="e.g. HRB 123456 B"
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                              />
                            </div>
                          </div>
                        )}

                        {formData.kycCountry === 'China' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                Unified Social Credit Code (USCC) *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.usccNumber}
                                onChange={(e) => handleInputChange('usccNumber', e.target.value)}
                                placeholder="18-digit USCC (统一社会信用代码)"
                                maxLength={18}
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                Business License Number (营业执照) *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.chinaBusinessLicense}
                                onChange={(e) => handleInputChange('chinaBusinessLicense', e.target.value)}
                                placeholder="Business License Registration No."
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                Customs Registration Code (海关编码) *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.customsRegistrationCode}
                                onChange={(e) => handleInputChange('customsRegistrationCode', e.target.value)}
                                placeholder="10-digit PRC Customs Registration Code"
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                              />
                            </div>
                          </div>
                        )}

                        {formData.kycCountry === 'Other' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                Local Tax ID / TIN *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.localTaxId}
                                onChange={(e) => handleInputChange('localTaxId', e.target.value)}
                                placeholder="National Tax Identification Number"
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                                Business Registration / Incorporation Certificate *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.incorporationCertificateNumber}
                                onChange={(e) => handleInputChange('incorporationCertificateNumber', e.target.value)}
                                placeholder="Certificate / Entity Registration No."
                                className="w-full text-xs p-2 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Document Attachment Upload */}
                      <div className="pt-2">
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1 flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5 text-purple-600" />
                          Upload Statutory Certificate / Tax License (PDF / Image)
                        </label>
                        <div className="border-2 border-dashed border-[#cccccc] p-3 text-center bg-[#faf9f6] hover:border-purple-500 cursor-pointer">
                          <input
                            type="file"
                            id="kyc-doc-file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleInputChange('kycDocumentName', file.name);
                            }}
                          />
                          <label htmlFor="kyc-doc-file" className="cursor-pointer block">
                            {formData.kycDocumentName ? (
                              <div className="flex items-center justify-center gap-2 text-xs text-purple-900 font-semibold">
                                <FileCheck className="w-4 h-4 text-emerald-600" />
                                <span>{formData.kycDocumentName}</span>
                                <button
                                  type="button"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    handleInputChange('kycDocumentName', '');
                                  }}
                                  className="text-red-500 ml-2"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="text-xs text-[#737373]">
                                <span className="font-semibold text-purple-600">Click to upload certificate</span> or drag & drop (Max 10MB)
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ======================================================== */}
                  {/* STEP 2: Contact & Communication Details                  */}
                  {/* ======================================================== */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="border-b border-[#e5e5e5] pb-2.5 flex items-center justify-between">
                        <div>
                          <h2 className="font-serif-luxury text-lg sm:text-xl text-[#121212] font-medium flex items-center gap-2">
                            <Phone className="w-4 h-4 text-purple-600" />
                            2. Contact & Communication Details
                          </h2>
                          <p className="text-[11px] text-[#737373] mt-0.5">
                            Direct channels for contract negotiations and buyer communication
                          </p>
                        </div>
                        <span className="text-[10px] uppercase tracking-luxury text-purple-700 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                          Step 2 of 7
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Primary Contact Person Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.contactPersonName}
                            onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                            placeholder="e.g. Rajesh Sharma"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 rounded-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Job Title / Designation *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.contactPersonJobTitle}
                            onChange={(e) => handleInputChange('contactPersonJobTitle', e.target.value)}
                            placeholder="e.g. Managing Director / Head of Sourcing"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 rounded-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1 flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-purple-600" />
                            Business Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.businessEmail}
                            onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                            placeholder="e.g. sourcing@apexsourcing.com"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 rounded-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1 flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-purple-600" />
                            Phone Number with Country Code *
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={formData.phoneCountryCode}
                              onChange={(e) => handleInputChange('phoneCountryCode', e.target.value)}
                              className="text-xs p-2 border border-[#cccccc] focus:border-purple-600 bg-white rounded-none"
                            >
                              <option value="+91">+91 (IN)</option>
                              <option value="+1">+1 (US)</option>
                              <option value="+44">+44 (UK)</option>
                              <option value="+86">+86 (CN)</option>
                              <option value="+971">+971 (AE)</option>
                              <option value="+49">+49 (DE)</option>
                              <option value="+84">+84 (VN)</option>
                              <option value="+880">+880 (BD)</option>
                            </select>
                            <input
                              type="tel"
                              required
                              value={formData.phoneNumber}
                              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                              placeholder="e.g. 9876543210"
                              className="flex-1 text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 rounded-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1 flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5 text-purple-600" />
                            Official Website & Verified Domain *
                          </label>
                          <input
                            type="url"
                            required
                            value={formData.officialWebsite}
                            onChange={(e) => handleInputChange('officialWebsite', e.target.value)}
                            placeholder="https://www.apexsourcing.com"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 rounded-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1 flex items-center gap-1">
                            <Link2 className="w-3.5 h-3.5 text-purple-600" />
                            Professional Network Links (LinkedIn Profile)
                          </label>
                          <input
                            type="url"
                            value={formData.linkedinUrl}
                            onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                            placeholder="https://linkedin.com/company/apexsourcing"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 rounded-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ======================================================== */}
                  {/* STEP 3: Operational & Sourcing Capabilities              */}
                  {/* ======================================================== */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="border-b border-[#e5e5e5] pb-2.5 flex items-center justify-between">
                        <div>
                          <h2 className="font-serif-luxury text-lg sm:text-xl text-[#121212] font-medium flex items-center gap-2">
                            <Boxes className="w-4 h-4 text-purple-600" />
                            3. Operational & Sourcing Capabilities
                          </h2>
                          <p className="text-[11px] text-[#737373] mt-0.5">
                            Category depth, regional export reach, minimum order quantities & Incoterms
                          </p>
                        </div>
                        <span className="text-[10px] uppercase tracking-luxury text-purple-700 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                          Step 3 of 7
                        </span>
                      </div>

                      {/* Primary Categories Handled */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1.5">
                          Primary Categories & Subcategories Handled (Select all that apply) *
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'Apparel & Menswear',
                            'Womens Luxury & Haute Couture',
                            'Footwear & Athletic Shoes',
                            'Leather Goods & Handbags',
                            'Textiles, Yarns & Mills',
                            'Fashion Jewelry & Watches',
                            'Home Décor & Furnishings',
                            'Packaging & Luxury Boxes',
                            'Industrial Hardware',
                            'Consumer Electronics',
                            'Beauty & Personal Care',
                            'Organic & Sustainable Crafts'
                          ].map((cat) => {
                            const isSelected = formData.selectedCategories.includes(cat);
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => toggleArrayItem('selectedCategories', cat)}
                                className={`p-2 text-left text-xs border transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-semibold'
                                    : 'border-[#cccccc] bg-white text-[#575757] hover:border-purple-400'
                                }`}
                              >
                                <span className="truncate">{cat}</span>
                                {isSelected && <Check className="w-3 h-3 text-purple-600 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Target Export/Import Regions */}
                      <div className="pt-2">
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1.5">
                          Target Export and Import Countries / Regions Served *
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'North America (USA, Canada)',
                            'Western Europe (UK, DE, FR, IT)',
                            'Middle East & GCC (UAE, KSA)',
                            'South Asia (India, BD, LK)',
                            'Southeast Asia (VN, SG, MY)',
                            'East Asia (China, JP, KR)',
                            'Australia & New Zealand',
                            'Latin America & Brazil'
                          ].map((region) => {
                            const isSelected = formData.targetRegions.includes(region);
                            return (
                              <button
                                key={region}
                                type="button"
                                onClick={() => toggleArrayItem('targetRegions', region)}
                                className={`p-2 text-left text-xs border transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-semibold'
                                    : 'border-[#cccccc] bg-white text-[#575757] hover:border-purple-400'
                                }`}
                              >
                                <span className="truncate">{region}</span>
                                {isSelected && <Check className="w-3 h-3 text-purple-600 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* MOQ & TAT */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Minimum Order Quantity (MOQ) Capabilities *
                          </label>
                          <select
                            value={formData.moqCapability}
                            onChange={(e) => handleInputChange('moqCapability', e.target.value)}
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 bg-white rounded-none"
                          >
                            <option value="">Select MOQ Range</option>
                            <option value="Flexible Ultra-Low (50 - 100 pcs)">Flexible Ultra-Low (50 - 100 pcs)</option>
                            <option value="Low to Medium (100 - 500 pcs)">Low to Medium (100 - 500 pcs)</option>
                            <option value="Standard Bulk (500 - 2,500 pcs)">Standard Bulk (500 - 2,500 pcs)</option>
                            <option value="High-Volume Industrial (5,000+ pcs)">High-Volume Industrial (5,000+ pcs)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Average Turnaround Time (TAT) for Delivery or Sourcing *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.averageTat}
                            onChange={(e) => handleInputChange('averageTat', e.target.value)}
                            placeholder="e.g. Sample: 5-7 days | Bulk Production: 25-35 days"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 rounded-none"
                          />
                        </div>
                      </div>

                      {/* Incoterms Handled */}
                      <div className="pt-2">
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1.5 flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-purple-600" />
                          Logistics & Shipping Terms Handled (Incoterms) *
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {['FOB', 'CIF', 'EXW', 'DDP', 'DAP', 'FCA'].map((term) => {
                            const isSelected = formData.selectedIncoterms.includes(term);
                            return (
                              <button
                                key={term}
                                type="button"
                                onClick={() => toggleArrayItem('selectedIncoterms', term)}
                                className={`p-2 text-center text-xs uppercase tracking-wider font-bold border transition-all ${
                                  isSelected
                                    ? 'border-purple-600 bg-purple-50 text-purple-950 ring-1 ring-purple-600'
                                    : 'border-[#cccccc] bg-white text-[#575757] hover:border-purple-400'
                                }`}
                              >
                                {term}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ======================================================== */}
                  {/* STEP 4: Catalog, Portfolio & Service Offerings           */}
                  {/* ======================================================== */}
                  {currentStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="border-b border-[#e5e5e5] pb-2.5 flex items-center justify-between">
                        <div>
                          <h2 className="font-serif-luxury text-lg sm:text-xl text-[#121212] font-medium flex items-center gap-2">
                            <Package className="w-4 h-4 text-purple-600" />
                            4. Catalog, Portfolio & Service Offerings
                          </h2>
                          <p className="text-[11px] text-[#737373] mt-0.5">
                            Sourcing regions covered, factory auditing expertise, manufacturer network & catalog deck
                          </p>
                        </div>
                        <span className="text-[10px] uppercase tracking-luxury text-purple-700 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                          Step 4 of 7
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Sourcing Regions Covered *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.sourcingRegionsCovered}
                            onChange={(e) => handleInputChange('sourcingRegionsCovered', e.target.value)}
                            placeholder="e.g. Guangdong & Zhejiang (China), Tirupur & Surat (India)"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 rounded-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Verified Manufacturer Network Size *
                          </label>
                          <select
                            value={formData.manufacturerNetworkSize}
                            onChange={(e) => handleInputChange('manufacturerNetworkSize', e.target.value)}
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 bg-white rounded-none"
                          >
                            <option value="">Select Pre-Vetted Network Size</option>
                            <option value="10 - 50 Audited Factories">10 - 50 Audited Factories</option>
                            <option value="50 - 200 Pre-Vetted Manufacturing Units">50 - 200 Pre-Vetted Manufacturing Units</option>
                            <option value="200 - 500+ Partner Mills & Facilities">200 - 500+ Partner Mills & Facilities</option>
                            <option value="500+ Multi-Country Sourcing Network">500+ Multi-Country Sourcing Network</option>
                          </select>
                        </div>
                      </div>

                      {/* Factory Auditing Expertise */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1.5">
                          Factory Auditing Expertise (Select all that apply)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            'Social Compliance Audits (BSCI / SMETA / Sedex)',
                            'Technical & Machinery Capacity Auditing',
                            'In-Line Quality Control (AQL 1.5 / 2.5)',
                            'Pre-Shipment Container Loading Inspection (PSI)',
                            'Raw Fabric & Yarn Lab Testing Supervision',
                            'Environmental & Waste Discharge Audits'
                          ].map((audit) => {
                            const isSelected = formData.factoryAuditingExpertise.includes(audit);
                            return (
                              <button
                                key={audit}
                                type="button"
                                onClick={() => toggleArrayItem('factoryAuditingExpertise', audit)}
                                className={`p-2 text-left text-xs border transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-semibold'
                                    : 'border-[#cccccc] bg-white text-[#575757] hover:border-purple-400'
                                }`}
                              >
                                <span className="truncate">{audit}</span>
                                {isSelected && <Check className="w-3 h-3 text-purple-600 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sample Availability */}
                      <div className="pt-2">
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                          Sample Availability & Prototyping Policy *
                        </label>
                        <select
                          value={formData.sampleAvailability}
                          onChange={(e) => handleInputChange('sampleAvailability', e.target.value)}
                          className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 bg-white rounded-none"
                        >
                          <option value="">Select Sample Provision Terms</option>
                          <option value="Complimentary samples on verified corporate RFQs">Complimentary samples on verified corporate RFQs</option>
                          <option value="Paid custom prototype with full production order rebate">Paid custom prototype with full production order rebate</option>
                          <option value="Fast-track 48h swatch & catalog dispatch available">Fast-track 48h swatch & catalog dispatch available</option>
                          <option value="Custom 3D CAD / tech pack prototyping before physical run">Custom 3D CAD / tech pack prototyping before physical run</option>
                        </select>
                      </div>

                      {/* Sourcing Agent Portfolio Deck Upload */}
                      <div className="pt-2">
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1 flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5 text-purple-600" />
                          Upload Sourcing Portfolio / Catalog Deck (PDF or Images)
                        </label>
                        <div className="border-2 border-dashed border-[#cccccc] p-3 text-center bg-[#faf9f6] hover:border-purple-500 cursor-pointer">
                          <input
                            type="file"
                            id="catalog-deck-file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleInputChange('productCatalogFileName', file.name);
                            }}
                          />
                          <label htmlFor="catalog-deck-file" className="cursor-pointer block">
                            {formData.productCatalogFileName ? (
                              <div className="flex items-center justify-center gap-2 text-xs text-purple-900 font-semibold">
                                <FileCheck className="w-4 h-4 text-emerald-600" />
                                <span>{formData.productCatalogFileName}</span>
                                <button
                                  type="button"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    handleInputChange('productCatalogFileName', '');
                                  }}
                                  className="text-red-500 ml-2"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="text-xs text-[#737373]">
                                <span className="font-semibold text-purple-600">Upload portfolio PDF or lookbook</span> (Max 25MB)
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ======================================================== */}
                  {/* STEP 5: Infrastructure, Capacity & Team                  */}
                  {/* ======================================================== */}
                  {currentStep === 5 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="border-b border-[#e5e5e5] pb-2.5 flex items-center justify-between">
                        <div>
                          <h2 className="font-serif-luxury text-lg sm:text-xl text-[#121212] font-medium flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-600" />
                            5. Infrastructure, Capacity & Team
                          </h2>
                          <p className="text-[11px] text-[#737373] mt-0.5">
                            Workforce size, dedicated QC staff, warehouse facilities & software systems
                          </p>
                        </div>
                        <span className="text-[10px] uppercase tracking-luxury text-purple-700 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                          Step 5 of 7
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Total Team Size and Workforce Strength *
                          </label>
                          <select
                            value={formData.totalTeamSize}
                            onChange={(e) => handleInputChange('totalTeamSize', e.target.value)}
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 bg-white rounded-none"
                          >
                            <option value="">Select Team Size</option>
                            <option value="1 - 10 Specialists">1 - 10 Specialists</option>
                            <option value="11 - 50 Employees">11 - 50 Employees</option>
                            <option value="51 - 200 Workforce">51 - 200 Workforce</option>
                            <option value="200+ Global Team">200+ Global Team</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Dedicated Quality Control (QC) & Sourcing Staff Count *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.qcStaffCount}
                            onChange={(e) => handleInputChange('qcStaffCount', e.target.value)}
                            placeholder="e.g. 15 on-ground QC inspectors & 10 merchandisers"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 rounded-none"
                          />
                        </div>
                      </div>

                      {/* Facility Details */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                          Facility Details (Warehouse Size, Sourcing Offices, Sample Labs) *
                        </label>
                        <textarea
                          rows={3}
                          value={formData.facilityDetails}
                          onChange={(e) => handleInputChange('facilityDetails', e.target.value)}
                          placeholder="e.g. 35,000 sq. ft bonded consolidation warehouse in Ningbo, regional liaison office in Mumbai, fabric testing laboratory."
                          className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 rounded-none resize-none"
                        />
                      </div>

                      {/* Software & Systems Used */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1.5">
                          Software and Systems Used (ERP, CRM, Sourcing Tools)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'SAP Enterprise ERP',
                            'Oracle NetSuite',
                            'Microsoft Dynamics 365',
                            'Zoho Inventory & CRM',
                            'TradeGecko / QuickBooks',
                            'In-House Custom Sourcing ERP',
                            'Barcoding & RFID Tracking',
                            'EDI Integration Gateway'
                          ].map((sys) => {
                            const isSelected = formData.softwareSystems.includes(sys);
                            return (
                              <button
                                key={sys}
                                type="button"
                                onClick={() => toggleArrayItem('softwareSystems', sys)}
                                className={`p-2 text-left text-xs border transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-semibold'
                                    : 'border-[#cccccc] bg-white text-[#575757] hover:border-purple-400'
                                }`}
                              >
                                <span className="truncate">{sys}</span>
                                {isSelected && <Check className="w-3 h-3 text-purple-600 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ======================================================== */}
                  {/* STEP 6: Certifications & Quality Standards               */}
                  {/* ======================================================== */}
                  {currentStep === 6 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="border-b border-[#e5e5e5] pb-2.5 flex items-center justify-between">
                        <div>
                          <h2 className="font-serif-luxury text-lg sm:text-xl text-[#121212] font-medium flex items-center gap-2">
                            <Award className="w-4 h-4 text-purple-600" />
                            6. Certifications & Quality Standards
                          </h2>
                          <p className="text-[11px] text-[#737373] mt-0.5">
                            International standards, regional approvals & third-party inspection agencies
                          </p>
                        </div>
                        <span className="text-[10px] uppercase tracking-luxury text-purple-700 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                          Step 6 of 7
                        </span>
                      </div>

                      {/* International Quality Certifications */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1.5">
                          International Quality Certifications (ISO 9001, CE, RoHS, FDA, GMP, etc.)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'ISO 9001 (Quality Management)',
                            'ISO 14001 (Environmental)',
                            'CE Marking Certification',
                            'RoHS Compliant',
                            'FDA Registered / Facility ID',
                            'GMP (Good Manufacturing)',
                            'OEKO-TEX Standard 100',
                            'GOTS (Global Organic Textile)'
                          ].map((cert) => {
                            const isSelected = formData.qualityCertifications.includes(cert);
                            return (
                              <button
                                key={cert}
                                type="button"
                                onClick={() => toggleArrayItem('qualityCertifications', cert)}
                                className={`p-2 text-left text-xs border transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-semibold'
                                    : 'border-[#cccccc] bg-white text-[#575757] hover:border-purple-400'
                                }`}
                              >
                                <span className="truncate">{cert}</span>
                                {isSelected && <Check className="w-3 h-3 text-purple-600 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Regional Compliance Certifications */}
                      <div className="pt-2">
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1.5">
                          Regional Compliance Certifications (BIS, UL, FCC, REACH)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'BIS (Bureau of Indian Standards)',
                            'UL Certified (United States)',
                            'FCC Approved (USA)',
                            'REACH Compliant (EU)',
                            'UKCA Marking (UK)',
                            'CCC (China Compulsory Cert)'
                          ].map((regCert) => {
                            const isSelected = formData.regionalCertifications.includes(regCert);
                            return (
                              <button
                                key={regCert}
                                type="button"
                                onClick={() => toggleArrayItem('regionalCertifications', regCert)}
                                className={`p-2 text-left text-xs border transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-semibold'
                                    : 'border-[#cccccc] bg-white text-[#575757] hover:border-purple-400'
                                }`}
                              >
                                <span className="truncate">{regCert}</span>
                                {isSelected && <Check className="w-3 h-3 text-purple-600 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Third-Party Inspection Partner Approvals */}
                      <div className="pt-2">
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1.5">
                          Third-Party Inspection Partner Approvals (SGS, Intertek, TÜV, etc.)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'SGS Inspection Partner',
                            'Intertek Audited',
                            'TÜV Rheinland Approved',
                            'Bureau Veritas Certified',
                            'QIMA Partner Network',
                            'Cotecna Inspection'
                          ].map((partner) => {
                            const isSelected = formData.inspectionPartners.includes(partner);
                            return (
                              <button
                                key={partner}
                                type="button"
                                onClick={() => toggleArrayItem('inspectionPartners', partner)}
                                className={`p-2 text-left text-xs border transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-semibold'
                                    : 'border-[#cccccc] bg-white text-[#575757] hover:border-purple-400'
                                }`}
                              >
                                <span className="truncate">{partner}</span>
                                {isSelected && <Check className="w-3 h-3 text-purple-600 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Certificate Upload */}
                      <div className="pt-2">
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1 flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5 text-purple-600" />
                          Upload Consolidated Certificates Document (PDF / ZIP)
                        </label>
                        <div className="border-2 border-dashed border-[#cccccc] p-3 text-center bg-[#faf9f6] hover:border-purple-500 cursor-pointer">
                          <input
                            type="file"
                            id="cert-doc-file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleInputChange('certificateFileName', file.name);
                            }}
                          />
                          <label htmlFor="cert-doc-file" className="cursor-pointer block">
                            {formData.certificateFileName ? (
                              <div className="flex items-center justify-center gap-2 text-xs text-purple-900 font-semibold">
                                <FileCheck className="w-4 h-4 text-emerald-600" />
                                <span>{formData.certificateFileName}</span>
                                <button
                                  type="button"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    handleInputChange('certificateFileName', '');
                                  }}
                                  className="text-red-500 ml-2"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="text-xs text-[#737373]">
                                <span className="font-semibold text-purple-600">Upload certification files</span> (Max 15MB)
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ======================================================== */}
                  {/* STEP 7: Banking & International Payout Setup             */}
                  {/* ======================================================== */}
                  {currentStep === 7 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="border-b border-[#e5e5e5] pb-2.5 flex items-center justify-between">
                        <div>
                          <h2 className="font-serif-luxury text-lg sm:text-xl text-[#121212] font-medium flex items-center gap-2">
                            <Landmark className="w-4 h-4 text-purple-600" />
                            7. Banking & International Payout Setup
                          </h2>
                          <p className="text-[11px] text-[#737373] mt-0.5">
                            Bank details for direct escrow settlement, multi-currency payouts & withholding tax
                          </p>
                        </div>
                        <span className="text-[10px] uppercase tracking-luxury text-purple-700 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                          Step 7 of 7
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Bank Account Holder Name (Must match legal entity name) *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.bankAccountHolderName}
                            onChange={(e) => handleInputChange('bankAccountHolderName', e.target.value)}
                            placeholder="e.g. Apex Global Sourcing Private Limited"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 rounded-none uppercase font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Account Number / IBAN *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.accountNumberIban}
                            onChange={(e) => handleInputChange('accountNumberIban', e.target.value)}
                            placeholder="e.g. GB29NWBK60161331926819 or 9876543210123"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                            Routing Number / SWIFT / BIC Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.swiftBicRoutingCode}
                            onChange={(e) => handleInputChange('swiftBicRoutingCode', e.target.value.toUpperCase())}
                            placeholder="e.g. CHASUS33XXX or HDFCINBBXXX"
                            className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 rounded-none font-mono uppercase"
                          />
                        </div>
                      </div>

                      {/* Currency Support */}
                      <div className="pt-2">
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1.5">
                          Currency Support for Settlements (USD, EUR, INR, GBP, etc.) *
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {['USD ($)', 'EUR (€)', 'INR (₹)', 'GBP (£)', 'AED (د.إ)', 'CNY (¥)'].map((curr) => {
                            const isSelected = formData.supportedCurrencies.includes(curr);
                            return (
                              <button
                                key={curr}
                                type="button"
                                onClick={() => toggleArrayItem('supportedCurrencies', curr)}
                                className={`p-2 text-center text-xs font-bold border transition-all ${
                                  isSelected
                                    ? 'border-purple-600 bg-purple-50 text-purple-950 ring-1 ring-purple-600'
                                    : 'border-[#cccccc] bg-white text-[#575757] hover:border-purple-400'
                                }`}
                              >
                                {curr}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tax Residency & Withholding Documents */}
                      <div className="pt-2 space-y-2">
                        <label className="block text-[11px] uppercase tracking-luxury font-semibold text-[#575757] mb-1">
                          Tax Residency / Withholding Tax Form (W-8BEN, W-9, TRC, Form 10F) *
                        </label>
                        <select
                          value={formData.taxResidencyDocType}
                          onChange={(e) => handleInputChange('taxResidencyDocType', e.target.value)}
                          className="w-full text-xs p-2.5 border border-[#cccccc] focus:border-purple-600 bg-white rounded-none mb-2"
                        >
                          <option value="">Select Applicable Tax Document</option>
                          <option value="W-8BEN-E (Certificate of Status of Beneficial Owner - Non-US Entities)">W-8BEN-E (Non-US Entities with US buyers)</option>
                          <option value="W-9 (Request for Taxpayer ID - US Entities)">W-9 (US Registered Entities)</option>
                          <option value="TRC & Form 10F (Tax Residency Certificate - India/Global treaty)">TRC & Form 10F (Double Tax Avoidance / DTAA)</option>
                          <option value="Local National Tax Exemption / Residency Certificate">Local National Tax Exemption / Residency Certificate</option>
                        </select>

                        <div className="border-2 border-dashed border-[#cccccc] p-3 text-center bg-[#faf9f6] hover:border-purple-500 cursor-pointer">
                          <input
                            type="file"
                            id="tax-res-doc-file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleInputChange('taxDocFileName', file.name);
                            }}
                          />
                          <label htmlFor="tax-res-doc-file" className="cursor-pointer block">
                            {formData.taxDocFileName ? (
                              <div className="flex items-center justify-center gap-2 text-xs text-purple-900 font-semibold">
                                <FileCheck className="w-4 h-4 text-emerald-600" />
                                <span>{formData.taxDocFileName}</span>
                                <button
                                  type="button"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    handleInputChange('taxDocFileName', '');
                                  }}
                                  className="text-red-500 ml-2"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="text-xs text-[#737373]">
                                <span className="font-semibold text-purple-600">Upload signed tax residency form (PDF)</span> (Max 10MB)
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* NAVIGATION & SUBMISSION BUTTONS */}
                  <div className="pt-4 border-t border-[#e5e5e5] flex items-center justify-between gap-3">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="py-2.5 px-4 border border-[#121212] text-xs uppercase tracking-luxury font-semibold flex items-center gap-1.5 hover:bg-gray-50 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 7 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="py-2.5 px-6 bg-purple-600 text-white text-xs uppercase tracking-luxury font-bold flex items-center gap-1.5 hover:bg-purple-700 transition-colors shadow-xs"
                      >
                        <span>Save & Next Step</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="py-3 px-8 bg-purple-600 text-white text-xs uppercase tracking-luxury font-bold flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-md active:scale-[0.99]"
                      >
                        <span>Submit Sourcing Agent Registration</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
              </>
            ) : (
              <div className="bg-white border-2 border-[#121212] p-8 sm:p-12 text-center space-y-6 shadow-xs">
                <div className="w-16 h-16 mx-auto rounded-full bg-purple-50 border-2 border-purple-300 flex items-center justify-center text-purple-700">
                  <Building2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#121212]">
                    {role} Registration
                  </h2>
                  <p className="text-xs sm:text-sm text-[#737373] max-w-lg mx-auto leading-relaxed">
                    The onboarding criteria and specialized verification fields for <strong className="text-[#121212]">{role}</strong> are currently being prepared.
                  </p>
                </div>
                <div className="p-4 sm:p-5 bg-[#faf9f6] border border-[#e5e5e5] max-w-md mx-auto text-left text-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-purple-900 font-semibold uppercase tracking-wider text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                    <span>Active Selection: {role}</span>
                  </div>
                  <p className="text-[#575757] leading-relaxed">
                    We are actively finalizing the KYC & document standards for this category. Stay tuned!
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setRole('Sourcing Agent');
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('ophmart_selected_role', 'Sourcing Agent');
                      }
                    }}
                    className="px-6 py-2.5 bg-purple-600 text-white text-xs uppercase tracking-luxury font-bold hover:bg-purple-700 transition-colors shadow-xs"
                  >
                    Open Sourcing Agent Form
                  </button>
                  <Link
                    href="/sellers"
                    className="px-6 py-2.5 border border-[#121212] text-xs uppercase tracking-luxury font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Choose Another Role
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: FIXED PURPLE BORDER TIGER SECTION            */}
          {/* ========================================================== */}
          <div className="lg:col-span-4 order-1 lg:order-2 lg:sticky lg:top-24 self-start flex flex-col items-center justify-center pt-2">
            <div className="w-full flex flex-col items-center space-y-3">
              {/* THOUGHT CLOUD */}
              <div className="w-full max-w-[340px] sm:max-w-[380px] flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentStep}-${isSubmitted}-${role}`}
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
              <div className="relative w-44 sm:w-52 md:w-56 max-h-[200px] sm:max-h-[225px] aspect-square bg-transparent flex items-center justify-center -mt-1 sm:-mt-2">
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
