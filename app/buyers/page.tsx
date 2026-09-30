'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ArrowRight,
  Check,
  Package,
  Briefcase,
  Upload,
  AlertCircle,
  FileText,
  Globe,
  X
} from 'lucide-react';

const COUNTRY_FLAGS: Record<string, { code: string; emoji: string }> = {
  'Any of the above': { code: 'un', emoji: '🌐' },
  'China': { code: 'cn', emoji: '🇨🇳' },
  'India': { code: 'in', emoji: '🇮🇳' },
  'Vietnam': { code: 'vn', emoji: '🇻🇳' },
  'Taiwan': { code: 'tw', emoji: '🇹🇼' },
  'South Korea': { code: 'kr', emoji: '🇰🇷' },
  'Indonesia': { code: 'id', emoji: '🇮🇩' },
  'Italy': { code: 'it', emoji: '🇮🇹' },
  'Germany': { code: 'de', emoji: '🇩🇪' },
  'Brazil': { code: 'br', emoji: '🇧🇷' },
  'Colombia': { code: 'co', emoji: '🇨🇴' },
  'Philippines': { code: 'ph', emoji: '🇵🇭' },
  'South Africa': { code: 'za', emoji: '🇿🇦' },
  'Australia': { code: 'au', emoji: '🇦🇺' },
  'Pakistan': { code: 'pk', emoji: '🇵🇰' },
  'Cambodia': { code: 'kh', emoji: '🇰🇭' },
  'Japan': { code: 'jp', emoji: '🇯🇵' },
  'Malaysia': { code: 'my', emoji: '🇲🇾' },
  'Mexico': { code: 'mx', emoji: '🇲🇽' },
  'Thailand': { code: 'th', emoji: '🇹🇭' },
  'Bangladesh': { code: 'bd', emoji: '🇧🇩' },
  'Turkey': { code: 'tr', emoji: '🇹🇷' },
  'Poland': { code: 'pl', emoji: '🇵🇱' }
};

const COUNTRIES = [
  'Any of the above',
  'China',
  'India',
  'Vietnam',
  'Taiwan',
  'South Korea',
  'Indonesia',
  'Italy',
  'Germany',
  'Brazil',
  'Colombia',
  'Philippines',
  'South Africa',
  'Australia',
  'Pakistan',
  'Cambodia',
  'Japan',
  'Malaysia',
  'Mexico',
  'Thailand',
  'Bangladesh',
  'Turkey',
  'Poland'
];

// Purple Border Bunny / Rabbit
const PurpleBorderBunny: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full text-purple-600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tall Left Bunny Ear */}
      <path
        d="M 76 68 C 66 42 62 14 74 8 C 86 3 92 28 86 64"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 75 54 C 70 38 68 20 74 16 C 80 13 83 30 81 52"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tall Right Bunny Ear */}
      <path
        d="M 114 64 C 108 28 114 3 126 8 C 138 14 134 42 124 68"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 119 52 C 117 30 120 13 126 16 C 132 20 130 38 125 54"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Forehead between ears */}
      <path
        d="M 86 64 Q 100 66 114 64"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Round Chubby Bunny Head Contour */}
      <path
        d="M 76 68 C 58 78 52 102 70 118 C 86 128 114 128 130 118 C 148 102 142 78 124 68"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Happy Curved Eyes */}
      <path
        d="M 76 84 Q 84 76 92 84"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 108 84 Q 116 76 124 84"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Cute Bunny Nose */}
      <path
        d="M 97 92 L 103 92 L 100 96 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Bunny W-Mouth */}
      <path
        d="M 100 96 L 100 99 M 100 99 Q 94 104 89 100 M 100 99 Q 106 104 111 100"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Whisker details */}
      <path
        d="M 68 94 L 42 90"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 67 99 L 40 101"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 132 94 L 158 90"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 133 99 L 160 101"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Body Silhouette */}
      <path
        d="M 78 122 C 72 142 68 158 62 174"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 122 122 C 128 142 132 158 138 174"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Front Paws */}
      <path
        d="M 88 148 L 88 175 C 88 179 97 179 97 175 L 97 152"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 112 148 L 112 175 C 112 179 103 179 103 175 L 103 152"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Large Sitting Feet */}
      <path
        d="M 62 174 C 50 176 50 180 72 180 C 80 180 86 178 86 174"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 138 174 C 150 176 150 180 128 180 C 120 180 114 178 114 174"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Fluffy Round Cotton-Tail */}
      <path
        d="M 138 162 C 150 156 162 164 160 174 C 158 181 144 182 136 174"
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
      className={`relative w-full max-w-[300px] sm:max-w-[330px] flex items-center justify-center p-3 sm:p-3.5 min-h-[80px] sm:min-h-[90px] ${className}`}
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
      <div className="relative z-10 text-center px-4 sm:px-6 py-1.5 max-w-[84%] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default function BuyersPage() {
  const [submitted, setSubmitted] = useState(false);

  // Dynamic Branching: 'product' | 'services'
  const [sourcingType, setSourcingType] = useState<'product' | 'services'>('product');

  // Form Fields State
  const [formData, setFormData] = useState({
    titleName: '',
    brief: '',
    specification: '',
    currentDealing: 'Yes, I am selling Online',
    currentDealingOther: '',
    sourcedBefore: 'Yes',
    sourceCountries: [] as string[],
    quantityVolume: '',
    targetTimeline: '',
    budget: '',
    customisationBranding: '',
    sampleTrialRequirement: 'Yes',
    shippingTerms: 'FOB',
    fullName: '',
    email: '',
    mobile: '',
    whatsapp: '',
    sameAsMobile: false,
    addressPin: '',
    companyName: '',
    companyWebsite: ''
  });

  // File Upload State (Sample Image <= 100 KB)
  const [sampleImage, setSampleImage] = useState<{
    name: string;
    sizeKb: number;
    preview: string;
  } | null>(null);
  const [sampleImageError, setSampleImageError] = useState<string | null>(null);

  // Supporting Document Upload State
  const [supportingDoc, setSupportingDoc] = useState<{
    name: string;
    sizeKb: number;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle WhatsApp "Same as Mobile" Toggle
  const handleSameAsMobileToggle = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      sameAsMobile: checked,
      whatsapp: checked ? prev.mobile : prev.whatsapp
    }));
  };

  // Handle Country Selection Multi-Toggle
  const handleCountryToggle = (country: string) => {
    if (country === 'Any of the above') {
      setFormData((prev) => ({
        ...prev,
        sourceCountries: prev.sourceCountries.includes('Any of the above')
          ? []
          : ['Any of the above']
      }));
      return;
    }

    setFormData((prev) => {
      const filtered = prev.sourceCountries.filter((c) => c !== 'Any of the above');
      if (filtered.includes(country)) {
        return {
          ...prev,
          sourceCountries: filtered.filter((c) => c !== country)
        };
      } else {
        return {
          ...prev,
          sourceCountries: [...filtered, country]
        };
      }
    });
  };

  // Handle Sample Image Upload with STRICT <= 100 KB Validation
  const handleSampleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSampleImageError(null);

    if (!file) return;

    const sizeInKb = Math.round(file.size / 1024);
    const MAX_KB = 100;

    if (file.size > MAX_KB * 1024) {
      setSampleImageError(
        `File size (${sizeInKb} KB) exceeds the strict 100 KB limit. Please upload an image under 100 KB.`
      );
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSampleImage({
        name: file.name,
        sizeKb: sizeInKb,
        preview: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  // Handle Supporting Document File Upload
  const handleSupportingDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSupportingDoc({
      name: file.name,
      sizeKb: Math.round(file.size / 1024)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'ophmart_buyer_registration',
        JSON.stringify({
          sourcingType,
          ...formData,
          sampleImageName: sampleImage?.name,
          supportingDocName: supportingDoc?.name,
          submittedAt: new Date().toISOString()
        })
      );
    }

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
            Buyer Registration
          </h1>
          <div className="w-12 h-[2px] bg-purple-600 mx-auto mt-2" />
        </div>

        {/* 2-Column Layout with STICKY RIGHT COLUMN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ========================================================== */}
          {/* LEFT COLUMN: SCROLLABLE DYNAMIC BUYER SOURCING FORM (BALANCED)*/}
          {/* ========================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1 space-y-6">
            {/* FORM CONTAINER */}
            <div className="border border-[#e5e5e5] rounded-none p-6 sm:p-9 bg-white shadow-xs">
              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 border-2 border-purple-600 rounded-none flex items-center justify-center mx-auto text-purple-600">
                    <Check className="w-7 h-7 stroke-[2]" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#121212]">
                    Buyer Application Submitted
                  </h4>
                  <p className="text-sm text-[#575757] font-light max-w-md mx-auto leading-relaxed">
                    Thank you for applying as an Ophmart VIP Buyer for{' '}
                    <strong className="font-semibold text-purple-700">
                      {sourcingType === 'product' ? 'Physical Products' : 'Professional Services'}
                    </strong>
                    . Our concierge desk will review your specifications and contact you shortly.
                  </p>

                  <div className="border border-[#e5e5e5] p-5 text-left max-w-md mx-auto bg-[#faf9f6] text-sm space-y-2">
                    <div>
                      <strong className="text-[#121212]">Name:</strong> {formData.fullName}
                    </div>
                    <div>
                      <strong className="text-[#121212]">Item:</strong> {formData.titleName}
                    </div>
                    <div>
                      <strong className="text-[#121212]">Email:</strong> {formData.email}
                    </div>
                    <div>
                      <strong className="text-[#121212]">Mobile:</strong> {formData.mobile}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-block text-xs uppercase tracking-luxury text-[#121212] underline hover:text-purple-600 cursor-pointer pt-3 font-semibold"
                  >
                    Edit Registration Information
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* ===================================================== */}
                  {/* SECTION 1: SOURCING FOR (PRODUCT VS SERVICES)         */}
                  {/* ===================================================== */}
                  <div className="space-y-3 pb-6 border-b border-[#e5e5e5]">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm uppercase tracking-luxury font-bold text-[#121212]">
                        Sourcing For:
                      </label>
                      <span className="text-xs uppercase tracking-luxury text-purple-600 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                        Dynamic Branching Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Product Option Card */}
                      <button
                        type="button"
                        onClick={() => setSourcingType('product')}
                        className={`p-4 sm:p-5 border-2 text-left transition-all rounded-none cursor-pointer flex items-start gap-3.5 ${
                          sourcingType === 'product'
                            ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                            : 'border-[#e5e5e5] hover:border-[#121212] bg-white'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                            sourcingType === 'product'
                              ? 'border-purple-600 bg-purple-600'
                              : 'border-[#a3a3a3]'
                          }`}
                        >
                          {sourcingType === 'product' && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-purple-600" />
                            <span className="text-sm sm:text-base uppercase tracking-luxury font-bold text-[#121212]">
                              Product
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-[#575757] block mt-1 font-light">
                            Physical Goods, Apparel, Materials
                          </span>
                        </div>
                      </button>

                      {/* Services Option Card */}
                      <button
                        type="button"
                        onClick={() => setSourcingType('services')}
                        className={`p-4 sm:p-5 border-2 text-left transition-all rounded-none cursor-pointer flex items-start gap-3.5 ${
                          sourcingType === 'services'
                            ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                            : 'border-[#e5e5e5] hover:border-[#121212] bg-white'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                            sourcingType === 'services'
                              ? 'border-purple-600 bg-purple-600'
                              : 'border-[#a3a3a3]'
                          }`}
                        >
                          {sourcingType === 'services' && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-purple-600" />
                            <span className="text-sm sm:text-base uppercase tracking-luxury font-bold text-[#121212]">
                              Services
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-[#575757] block mt-1 font-light">
                            Professional & Business Services
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* ===================================================== */}
                  {/* SECTION 2: PRODUCT / SERVICE CORE DETAILS             */}
                  {/* ===================================================== */}
                  <div className="space-y-6">
                    <span className="text-xs sm:text-sm uppercase tracking-luxury text-purple-700 block font-bold">
                      1. Specification & Scope
                    </span>

                    {/* Product / Service Title */}
                    <div>
                      <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                        {sourcingType === 'product'
                          ? 'Product (Title / Name) *'
                          : 'Service (Title / Name) *'}
                      </label>
                      <input
                        type="text"
                        name="titleName"
                        value={formData.titleName}
                        onChange={handleInputChange}
                        required
                        placeholder={
                          sourcingType === 'product'
                            ? 'e.g. Mulberry Silk Evening Gowns, Exotic Leather Handbags'
                            : 'e.g. Atelier Quality Inspection, International Freight Audit'
                        }
                        className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                      />
                    </div>

                    {/* Product / Service Brief */}
                    <div>
                      <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                        {sourcingType === 'product'
                          ? 'Product Brief *'
                          : 'Service Brief *'}
                      </label>
                      <textarea
                        rows={3}
                        name="brief"
                        value={formData.brief}
                        onChange={handleInputChange}
                        required
                        placeholder={
                          sourcingType === 'product'
                            ? 'Provide a concise overview of the physical product, fabric grade, intended market, or collection theme...'
                            : 'Describe the scope of service needed, deliverables, performance milestones, and expectations...'
                        }
                        className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 leading-relaxed transition-colors"
                      />
                    </div>

                    {/* Detailed Specifications */}
                    <div>
                      <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-1">
                        What {sourcingType === 'product' ? 'product' : 'service'} you want, tell us with some specification? *
                      </label>
                      <span className="text-xs sm:text-sm text-[#666666] block mb-2 font-normal">
                        (If you want more than 1, list your primary ones)
                      </span>
                      <textarea
                        rows={4}
                        name="specification"
                        value={formData.specification}
                        onChange={handleInputChange}
                        required
                        placeholder={
                          sourcingType === 'product'
                            ? 'Detail fabric GSM, color pantone, hardware finish, sizing range, stitching quality standards...'
                            : 'Specify required certifications, service SLAs, turnaround requirements, and compliance standards...'
                        }
                        className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 leading-relaxed transition-colors"
                      />
                    </div>

                    {/* SAMPLE IMAGES UPLOAD (PRODUCT ONLY, STRICTLY <= 100 KB) */}
                    {sourcingType === 'product' && (
                      <div className="p-5 border border-[#e5e5e5] bg-[#faf9f6] space-y-2.5">
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-bold text-[#121212]">
                          Any Product Sample Images
                        </label>
                        <span className="text-xs sm:text-sm text-purple-700 block font-semibold">
                          Attachment option below 100 KB only.
                        </span>

                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <label className="cursor-pointer inline-flex items-center gap-2 py-3 px-5 bg-white border border-[#121212] hover:border-purple-600 text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] transition-colors rounded-none">
                            <Upload className="w-4 h-4 text-purple-600" />
                            <span>Select Sample Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleSampleImageChange}
                              className="hidden"
                            />
                          </label>

                          {sampleImage && (
                            <div className="flex items-center gap-2 text-sm text-[#121212] bg-white border border-purple-300 px-3.5 py-2">
                              {sampleImage.preview && (
                                <img
                                  src={sampleImage.preview}
                                  alt="Preview"
                                  className="w-8 h-8 object-cover border border-purple-200"
                                />
                              )}
                              <span className="truncate max-w-[180px] font-mono text-xs sm:text-sm">
                                {sampleImage.name}
                              </span>
                              <span className="text-xs text-[#737373]">
                                ({sampleImage.sizeKb} KB)
                              </span>
                              <button
                                type="button"
                                onClick={() => setSampleImage(null)}
                                className="text-red-500 hover:text-red-700 ml-1.5 p-1 cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        {sampleImageError && (
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-red-600 pt-1.5 font-medium">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{sampleImageError}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ===================================================== */}
                  {/* SECTION 3: SOURCING HISTORY & ORIGINS                 */}
                  {/* ===================================================== */}
                  <div className="space-y-6 pt-5 border-t border-[#e5e5e5]">
                    <span className="text-xs sm:text-sm uppercase tracking-luxury text-purple-700 block font-bold">
                      2. Market Experience & Origins
                    </span>

                    {/* Are you currently dealing in these products / services? */}
                    <div>
                      <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2.5">
                        Are you currently dealing in these {sourcingType === 'product' ? 'products' : 'services'}?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'Yes, I am selling Online',
                          'Yes, I am selling offline',
                          'I am planning to start / new business',
                          'Other'
                        ].map((option) => (
                          <label
                            key={option}
                            className={`p-3.5 sm:p-4 border text-sm cursor-pointer flex items-center gap-3 transition-colors rounded-none ${
                              formData.currentDealing === option
                                ? 'border-purple-600 bg-purple-50/70 font-semibold text-purple-900'
                                : 'border-[#e5e5e5] bg-white text-[#121212] hover:border-[#121212]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="currentDealing"
                              value={option}
                              checked={formData.currentDealing === option}
                              onChange={handleInputChange}
                              className="w-4 h-4 accent-purple-600"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>

                      {formData.currentDealing === 'Other' && (
                        <input
                          type="text"
                          name="currentDealingOther"
                          value={formData.currentDealingOther}
                          onChange={handleInputChange}
                          placeholder="Please describe your current business model..."
                          className="mt-2.5 w-full p-4 border border-[#121212] text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600"
                        />
                      )}
                    </div>

                    {/* Have you sourced this product before? */}
                    <div>
                      <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2.5">
                        Have you sourced this {sourcingType === 'product' ? 'product' : 'service'} before?
                      </label>
                      <div className="flex gap-4">
                        {['Yes', 'No'].map((option) => (
                          <label
                            key={option}
                            className={`py-3 px-8 border text-sm sm:text-base cursor-pointer flex items-center gap-2.5 transition-colors rounded-none ${
                              formData.sourcedBefore === option
                                ? 'border-purple-600 bg-purple-50/70 font-bold text-purple-900'
                                : 'border-[#e5e5e5] bg-white text-[#121212] hover:border-[#121212]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="sourcedBefore"
                              value={option}
                              checked={formData.sourcedBefore === option}
                              onChange={handleInputChange}
                              className="w-4 h-4 accent-purple-600"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Where would you like to source/import from? */}
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212]">
                          Where would you like to source/import from?
                        </label>
                        <span className="text-xs uppercase tracking-luxury text-purple-700 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                          {formData.sourceCountries.length} Selected
                        </span>
                      </div>

                      {/* Selectable Countries Grid with Flags */}
                      <div className="border border-[#e5e5e5] p-3.5 max-h-72 overflow-y-auto bg-[#faf9f6] grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {COUNTRIES.map((country) => {
                          const isSelected = formData.sourceCountries.includes(country);
                          const isAny = country === 'Any of the above';
                          const flag = COUNTRY_FLAGS[country];

                          return (
                            <button
                              key={country}
                              type="button"
                              onClick={() => handleCountryToggle(country)}
                              className={`p-2.5 sm:p-3 text-left text-xs sm:text-sm transition-all rounded-none flex items-center justify-between gap-2 cursor-pointer ${
                                isSelected
                                  ? 'bg-purple-600 text-white font-semibold shadow-xs'
                                  : isAny
                                  ? 'bg-white border-2 border-purple-500 text-purple-700 font-bold hover:bg-purple-50/50'
                                  : 'bg-white border border-[#e5e5e5] text-[#121212] hover:border-[#121212]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                {isAny ? (
                                  <Globe
                                    className={`w-4 h-4 flex-shrink-0 ${
                                      isSelected ? 'text-white' : 'text-purple-600'
                                    }`}
                                  />
                                ) : (
                                  <img
                                    src={`https://flagcdn.com/w40/${flag?.code || 'un'}.png`}
                                    alt={`${country} flag`}
                                    className="w-5 h-3.5 object-cover rounded-none border border-black/10 shadow-2xs flex-shrink-0"
                                    loading="lazy"
                                  />
                                )}
                                <span className="truncate">{country}</span>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] flex-shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* ===================================================== */}
                  {/* SECTION 4: COMMERCIAL TERMS & TIMELINES               */}
                  {/* ===================================================== */}
                  <div className="space-y-6 pt-5 border-t border-[#e5e5e5]">
                    <span className="text-xs sm:text-sm uppercase tracking-luxury text-purple-700 block font-bold">
                      3. Commercials & Execution Terms
                    </span>

                    {/* Quantity / Volume (PRODUCT ONLY) */}
                    {sourcingType === 'product' && (
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          How much quantity / volume do you want? *
                        </label>
                        <input
                          type="text"
                          name="quantityVolume"
                          value={formData.quantityVolume}
                          onChange={handleInputChange}
                          required={sourcingType === 'product'}
                          placeholder="e.g. 500 units, 2,000 meters, 1 full container (FCL)"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Target Delivery Timeline */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Target Delivery / Completion Timeline *
                        </label>
                        <input
                          type="text"
                          name="targetTimeline"
                          value={formData.targetTimeline}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Within 45 days, Q4 2026, Immediate"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          What is your budget? *
                        </label>
                        <input
                          type="text"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. $25,000 - $50,000 USD / INR Equivalent"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Customisation & Branding (PRODUCT ONLY) */}
                    {sourcingType === 'product' && (
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-1">
                          Customisation & Branding Requirements
                        </label>
                        <span className="text-xs sm:text-sm text-[#666666] block mb-2 font-normal">
                          (OEM/ODM, private labeling, packaging or scope of work details)
                        </span>
                        <textarea
                          rows={3}
                          name="customisationBranding"
                          value={formData.customisationBranding}
                          onChange={handleInputChange}
                          placeholder="e.g. Custom embossed woven labels, bespoke dust bags, private hang tags..."
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 leading-relaxed transition-colors"
                        />
                      </div>
                    )}

                    {/* Sample / Trial Requirement Option (PRODUCT ONLY) */}
                    {sourcingType === 'product' && (
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-1">
                          Sample / Trial Requirement Option
                        </label>
                        <span className="text-xs sm:text-sm text-[#666666] block mb-2.5 font-normal">
                          (Yes/No for sample or trial run before final commitment)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { value: 'Yes', label: 'Yes (Require sample before bulk order)' },
                            { value: 'No', label: 'No (Direct production order)' }
                          ].map((item) => (
                            <label
                              key={item.value}
                              className={`p-3.5 sm:p-4 border text-sm cursor-pointer flex items-center gap-3 rounded-none transition-colors ${
                                formData.sampleTrialRequirement === item.value
                                  ? 'border-purple-600 bg-purple-50/70 font-semibold text-purple-900'
                                  : 'border-[#e5e5e5] bg-white text-[#121212] hover:border-[#121212]'
                              }`}
                            >
                              <input
                                type="radio"
                                name="sampleTrialRequirement"
                                value={item.value}
                                checked={formData.sampleTrialRequirement === item.value}
                                onChange={handleInputChange}
                                className="w-4 h-4 accent-purple-600"
                              />
                              <span>{item.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Supporting Document / File Upload (PRODUCT ONLY) */}
                    {sourcingType === 'product' && (
                      <div className="p-5 border border-[#e5e5e5] bg-[#faf9f6] space-y-2.5">
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-bold text-[#121212]">
                          Supporting Document / File Upload
                        </label>
                        <span className="text-xs sm:text-sm text-[#666666] block font-normal">
                          (Images, CAD files, tech specs, or RFQ/SOW documents)
                        </span>

                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <label className="cursor-pointer inline-flex items-center gap-2 py-3 px-5 bg-white border border-[#121212] hover:border-purple-600 text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] transition-colors rounded-none">
                            <FileText className="w-4 h-4 text-purple-600" />
                            <span>Upload Spec Document</span>
                            <input
                              type="file"
                              onChange={handleSupportingDocChange}
                              className="hidden"
                            />
                          </label>

                          {supportingDoc && (
                            <div className="flex items-center gap-2 text-sm text-[#121212] bg-white border border-purple-300 px-3.5 py-2">
                              <span className="truncate max-w-[200px] font-mono text-xs sm:text-sm">
                                {supportingDoc.name}
                              </span>
                              <span className="text-xs text-[#737373]">
                                ({supportingDoc.sizeKb} KB)
                              </span>
                              <button
                                type="button"
                                onClick={() => setSupportingDoc(null)}
                                className="text-red-500 hover:text-red-700 ml-1.5 p-1 cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Preferred Shipping / Execution Terms (PRODUCT ONLY) */}
                    {sourcingType === 'product' && (
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-1">
                          Preferred Shipping / Execution Terms
                        </label>
                        <span className="text-xs sm:text-sm text-[#666666] block mb-2.5 font-normal">
                          (EXW, FOB, CIF, DDP, or Service SLA terms)
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {['FOB', 'CIF', 'DDP', 'EXW'].map((term) => (
                            <label
                              key={term}
                              className={`p-3 sm:p-3.5 border text-center text-sm sm:text-base cursor-pointer rounded-none transition-colors ${
                                formData.shippingTerms === term
                                  ? 'border-purple-600 bg-purple-600 text-white font-bold'
                                  : 'border-[#e5e5e5] bg-white text-[#121212] hover:border-[#121212]'
                              }`}
                            >
                              <input
                                type="radio"
                                name="shippingTerms"
                                value={term}
                                checked={formData.shippingTerms === term}
                                onChange={handleInputChange}
                                className="hidden"
                              />
                              <span>{term}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ===================================================== */}
                  {/* SECTION 5: BUYER & COMPANY CONTACT INFORMATION        */}
                  {/* ===================================================== */}
                  <div className="space-y-6 pt-5 border-t border-[#e5e5e5]">
                    <span className="text-xs sm:text-sm uppercase tracking-luxury text-purple-700 block font-bold">
                      4. Buyer & Enterprise Credentials
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Lady Vivienne Vance"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* Business Email */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Business Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="procurement@luxuryhouse.com"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Mobile Number with country code */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Your Mobile Number with country code *
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              mobile: val,
                              whatsapp: prev.sameAsMobile ? val : prev.whatsapp
                            }));
                          }}
                          required
                          placeholder="+91 98765 43210 / +44 20 7946 0991"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* WhatsApp Number with country code */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212]">
                            Your WhatsApp Number with country code *
                          </label>
                          <label className="flex items-center gap-1.5 text-xs uppercase tracking-luxury text-purple-700 cursor-pointer font-semibold">
                            <input
                              type="checkbox"
                              checked={formData.sameAsMobile}
                              onChange={(e) => handleSameAsMobileToggle(e.target.checked)}
                              className="w-4 h-4 accent-purple-600"
                            />
                            <span>Same as Mobile</span>
                          </label>
                        </div>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          disabled={formData.sameAsMobile}
                          required
                          placeholder="+91 98765 43210"
                          className={`w-full p-4 border border-[#121212] text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors ${
                            formData.sameAsMobile ? 'bg-gray-100' : 'bg-white'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Full Address with Pin Code */}
                    <div>
                      <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                        Full Address with Pin Code *
                      </label>
                      <textarea
                        rows={2}
                        name="addressPin"
                        value={formData.addressPin}
                        onChange={handleInputChange}
                        required
                        placeholder="Street, Suite, City, State, Country, Postal PIN Code..."
                        className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 leading-relaxed transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Company Name */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-1">
                          Company Name *
                        </label>
                        <span className="text-xs sm:text-sm text-[#666666] block mb-2 font-normal">
                          (If don't have company then type "NA")
                        </span>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Vance Luxury Holdings Ltd or NA"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* Company Website */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-1">
                          Company Website *
                        </label>
                        <span className="text-xs sm:text-sm text-[#666666] block mb-2 font-normal">
                          (If don't have then type "N/A")
                        </span>
                        <input
                          type="text"
                          name="companyWebsite"
                          value={formData.companyWebsite}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. https://vanceholding.com or N/A"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON (PURPLE BORDER & WHITE BACKGROUND, LARGE) */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 sm:py-5 px-8 rounded-none border-2 border-purple-600 bg-white text-purple-600 hover:bg-purple-600 hover:text-white text-sm sm:text-base uppercase tracking-luxury font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
                    >
                      <span>Submit Buyer Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: PURPLE BORDER BUNNY + THOUGHT CLOUD BUBBLE   */}
          {/* STICKY BELOW FIXED HEADER (84px) SO ENTIRE PET IS VISIBLE  */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 relative">
            <div className="lg:sticky lg:top-[84px] flex flex-col items-center">
              {/* THOUGHT CLOUD */}
              <div className="w-full max-w-[300px] sm:max-w-[330px] flex flex-col items-center">
                <PurpleBorderCloud>
                  <h3 className="font-serif-luxury text-sm sm:text-base text-[#121212] font-medium leading-snug text-center">
                    Thanks for choosing to be our Buyer!
                  </h3>
                </PurpleBorderCloud>

                {/* Thought trail dots */}
                <div className="flex flex-col items-center gap-0.5 my-0.5">
                  <div className="w-2.5 h-2.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-2" />
                  <div className="w-1.5 h-1.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-4" />
                </div>
              </div>

              {/* PURPLE OUTLINE BUNNY - Prominent Large Mascot */}
              <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 max-h-[260px] sm:max-h-[285px] aspect-square bg-transparent flex items-center justify-center -mt-1 sm:-mt-2">
                <PurpleBorderBunny />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
