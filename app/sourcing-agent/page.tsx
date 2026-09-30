'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ArrowRight,
  Check,
  Building,
  ShieldCheck,
  Phone,
  Compass,
  Briefcase,
  Users,
  Award,
  CreditCard,
  Upload,
  Globe,
  FileText,
  X
} from 'lucide-react';

// Purple Border Fox
const PurpleBorderFox: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full text-purple-600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pointed Left Ear */}
      <path
        d="M 62 62 L 36 16 L 82 36"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 58 50 L 46 28 L 74 38"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Pointed Right Ear */}
      <path
        d="M 118 36 L 164 16 L 138 62"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 126 38 L 154 28 L 142 50"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Forehead */}
      <path
        d="M 82 36 Q 100 40 118 36"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Cheek Tuft Left */}
      <path
        d="M 62 62 C 40 78 44 94 62 102"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cheek Tuft Right */}
      <path
        d="M 138 62 C 160 78 156 94 138 102"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Chin Point */}
      <path
        d="M 62 102 C 80 116 92 122 100 122 C 108 122 120 116 138 102"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Eyes */}
      <path
        d="M 72 78 Q 80 70 88 78"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 112 78 Q 120 70 128 78"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Cute Fox Nose */}
      <path
        d="M 96 98 L 104 98 L 100 102 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Smile */}
      <path
        d="M 100 102 L 100 105 M 100 105 Q 94 110 88 106 M 100 105 Q 106 110 112 106"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Body */}
      <path
        d="M 78 122 C 74 140 70 156 66 174"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 122 122 C 126 140 130 156 134 174"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Paws */}
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

      {/* Back Paws */}
      <path
        d="M 66 174 C 60 176 60 180 72 180 C 78 180 80 178 80 176"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 134 174 C 140 176 140 180 128 180 C 122 180 120 178 120 176"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Big Fluffy Bushy Tail */}
      <path
        d="M 132 165 C 160 160 180 144 178 120 C 176 102 158 96 148 106 C 140 114 144 128 154 126"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tail Tip */}
      <path
        d="M 166 112 Q 170 122 162 128"
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

type KycRegion = 'india' | 'us' | 'uk' | 'eu' | 'china' | 'other';

export default function SourcingAgentPage() {
  const [submitted, setSubmitted] = useState(false);

  // KYC Region selection
  const [kycRegion, setKycRegion] = useState<KycRegion>('india');

  // Form State
  const [formData, setFormData] = useState({
    // 1. Basic Info
    legalBusinessName: '',
    tradingBrandName: '',
    businessRole: 'Sourcing Agent',
    yearOfEstablishment: '',
    registeredAddress: '',

    // 2. KYC Fields
    // India
    pan: '',
    gstin: '',
    msmeUdyam: '',
    cinLlpin: '',
    iecCode: '',
    // US
    einNumber: '',
    stateLicense: '',
    resaleCertificate: '',
    // UK
    companiesHouseNo: '',
    vatNoUk: '',
    utrNumber: '',
    // EU
    vatNoEu: '',
    eoriNumber: '',
    commercialRegisterExtract: '',
    // China
    usccCode: '',
    chinaBusinessLicense: '',
    customsRegCode: '',
    // Other
    localTaxId: '',
    incorporationCertNo: '',

    // 3. Contact & Communication
    primaryContactPerson: '',
    primaryContactTitle: '',
    businessEmail: '',
    phoneNumber: '',
    officialWebsite: '',
    linkedinUrl: '',

    // 4. Operational & Sourcing Capabilities
    primaryCategories: '',
    targetRegions: '',
    moqCapabilities: '',
    averageTurnaroundTime: '',
    incoterms: ['FOB', 'CIF'] as string[],

    // 5. Catalog & Portfolio
    productCatalogDetails: '',
    sourcingPortfolioDetails: '',
    servicePortfolioDetails: '',

    // 6. Infrastructure & Team
    teamSize: '11-50',
    qcStaffCount: '',
    facilityDetails: '',
    softwareSystems: '',

    // 7. Certifications & Standards
    internationalCertifications: '',
    regionalCompliance: '',
    inspectionPartnerApprovals: [] as string[],

    // 8. Banking & International Payout
    bankAccountHolderName: '',
    accountNumberIban: '',
    swiftBicCode: '',
    supportedCurrencies: ['USD', 'EUR'] as string[],
    taxResidencyDocDetails: ''
  });

  // Attached files
  const [uploadedFiles, setUploadedFiles] = useState<{
    catalogFile?: string;
    kycDoc?: string;
    taxDoc?: string;
  }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleIncoterm = (term: string) => {
    setFormData((prev) => ({
      ...prev,
      incoterms: prev.incoterms.includes(term)
        ? prev.incoterms.filter((t) => t !== term)
        : [...prev.incoterms, term]
    }));
  };

  const toggleCurrency = (currency: string) => {
    setFormData((prev) => ({
      ...prev,
      supportedCurrencies: prev.supportedCurrencies.includes(currency)
        ? prev.supportedCurrencies.filter((c) => c !== currency)
        : [...prev.supportedCurrencies, currency]
    }));
  };

  const toggleInspection = (partner: string) => {
    setFormData((prev) => ({
      ...prev,
      inspectionPartnerApprovals: prev.inspectionPartnerApprovals.includes(partner)
        ? prev.inspectionPartnerApprovals.filter((p) => p !== partner)
        : [...prev.inspectionPartnerApprovals, partner]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'ophmart_sourcing_agent_application',
        JSON.stringify({
          ...formData,
          kycRegion,
          uploadedFiles,
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
            Sourcing Agent Accreditation
          </h1>
          <div className="w-12 h-[2px] bg-purple-600 mx-auto mt-2" />
        </div>

        {/* 2-Column Layout with STICKY RIGHT COLUMN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ========================================================== */}
          {/* LEFT COLUMN: SOURCING AGENT ONBOARDING FORM (BALANCED)    */}
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
                    Agent Accreditation Dossier Transmitted
                  </h4>
                  <p className="text-sm text-[#575757] font-light max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="font-semibold text-purple-700">{formData.legalBusinessName || 'Partner'}</strong>. Our global trade desk will review your KYC, operational audit, and compliance filings within 48 business hours.
                  </p>

                  <div className="border border-[#e5e5e5] p-5 text-left max-w-md mx-auto bg-[#faf9f6] text-sm space-y-2">
                    <div>
                      <strong className="text-[#121212]">Entity:</strong> {formData.legalBusinessName}
                    </div>
                    <div>
                      <strong className="text-[#121212]">Role:</strong> {formData.businessRole}
                    </div>
                    <div>
                      <strong className="text-[#121212]">Email:</strong> {formData.businessEmail}
                    </div>
                    <div>
                      <strong className="text-[#121212]">Phone:</strong> {formData.phoneNumber}
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
                <form onSubmit={handleSubmit} className="space-y-9">
                  {/* ===================================================== */}
                  {/* 1. BASIC INFORMATION & IDENTIFICATION                 */}
                  {/* ===================================================== */}
                  <div className="space-y-5 pb-6 border-b border-[#e5e5e5]">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-purple-600" />
                      <span className="text-xs sm:text-sm uppercase tracking-luxury text-purple-700 font-bold">
                        1. Basic Information & Identification (Global Standard)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Legal Business Name */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Legal Business Name *
                        </label>
                        <input
                          type="text"
                          name="legalBusinessName"
                          value={formData.legalBusinessName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Vance Global Sourcing Private Ltd"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* Trading / Brand Name */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Trading / Brand Name
                        </label>
                        <input
                          type="text"
                          name="tradingBrandName"
                          value={formData.tradingBrandName}
                          onChange={handleInputChange}
                          placeholder="e.g. Vance Luxury Liaison"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Business Role */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Business Role *
                        </label>
                        <select
                          name="businessRole"
                          value={formData.businessRole}
                          onChange={handleInputChange}
                          required
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        >
                          <option value="Sourcing Agent">Sourcing Agent</option>
                          <option value="Manufacturer">Manufacturer</option>
                          <option value="Supplier">Supplier</option>
                          <option value="Service Provider">Service Provider</option>
                        </select>
                      </div>

                      {/* Year of Establishment */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Year of Establishment *
                        </label>
                        <input
                          type="text"
                          name="yearOfEstablishment"
                          value={formData.yearOfEstablishment}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. 2016"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Registered Office Address & Operating Locations */}
                    <div>
                      <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                        Registered Office Address & Operating Locations *
                      </label>
                      <textarea
                        rows={2}
                        name="registeredAddress"
                        value={formData.registeredAddress}
                        onChange={handleInputChange}
                        required
                        placeholder="Headquarters address, branch offices, liaison centers, and warehouse hubs..."
                        className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 leading-relaxed transition-colors"
                      />
                    </div>
                  </div>

                  {/* ===================================================== */}
                  {/* 2. COUNTRY-SPECIFIC LEGAL, TAX & COMPLIANCE (KYC)     */}
                  {/* ===================================================== */}
                  <div className="space-y-5 pb-6 border-b border-[#e5e5e5]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                        <span className="text-xs sm:text-sm uppercase tracking-luxury text-purple-700 font-bold">
                          2. Country-Specific Legal, Tax & Compliance (KYC)
                        </span>
                      </div>
                    </div>

                    {/* Region Selector Pills */}
                    <div>
                      <label className="block text-xs uppercase tracking-luxury font-semibold text-[#575757] mb-2">
                        Select Primary Tax Jurisdiction:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'india', label: 'India', flagCode: 'in' },
                          { id: 'us', label: 'United States', flagCode: 'us' },
                          { id: 'uk', label: 'United Kingdom', flagCode: 'gb' },
                          { id: 'eu', label: 'European Union', flagCode: 'eu' },
                          { id: 'china', label: 'China', flagCode: 'cn' },
                          { id: 'other', label: 'Other Regions', flagCode: null }
                        ].map((reg) => (
                          <button
                            key={reg.id}
                            type="button"
                            onClick={() => setKycRegion(reg.id as KycRegion)}
                            className={`p-3 text-xs sm:text-sm font-semibold rounded-none border-2 flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                              kycRegion === reg.id
                                ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-xs font-bold'
                                : 'border-[#e5e5e5] bg-white text-[#121212] hover:border-[#121212]'
                            }`}
                          >
                            {reg.flagCode ? (
                              <img
                                src={`https://flagcdn.com/w40/${reg.flagCode}.png`}
                                alt={`${reg.label} flag`}
                                className="w-5 h-3.5 object-cover rounded-none border border-black/15 shadow-2xs flex-shrink-0"
                                loading="lazy"
                              />
                            ) : (
                              <Globe className="w-4 h-4 text-purple-600 flex-shrink-0" />
                            )}
                            <span>{reg.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic KYC Fields Based on Selected Region */}
                    <div className="p-4 sm:p-5 border border-[#e5e5e5] bg-[#faf9f6] space-y-4">
                      {kycRegion === 'india' && (
                        <div className="space-y-4">
                          <span className="flex items-center gap-2 text-xs uppercase tracking-luxury font-bold text-purple-700">
                            <img
                              src="https://flagcdn.com/w40/in.png"
                              alt="India flag"
                              className="w-4 h-3 object-cover rounded-none border border-black/15 flex-shrink-0"
                            />
                            <span>India Statutory Filings</span>
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                PAN (Permanent Account Number) *
                              </label>
                              <input
                                type="text"
                                name="pan"
                                value={formData.pan}
                                onChange={handleInputChange}
                                placeholder="ABCDE1234F"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm uppercase rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                GSTIN *
                              </label>
                              <input
                                type="text"
                                name="gstin"
                                value={formData.gstin}
                                onChange={handleInputChange}
                                placeholder="22AAAAA0000A1Z5"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm uppercase rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                IEC (Import Export Code) *
                              </label>
                              <input
                                type="text"
                                name="iecCode"
                                value={formData.iecCode}
                                onChange={handleInputChange}
                                placeholder="0123456789"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                CIN / LLPIN
                              </label>
                              <input
                                type="text"
                                name="cinLlpin"
                                value={formData.cinLlpin}
                                onChange={handleInputChange}
                                placeholder="U12345DL2018PTC123456"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                MSME / Udyam
                              </label>
                              <input
                                type="text"
                                name="msmeUdyam"
                                value={formData.msmeUdyam}
                                onChange={handleInputChange}
                                placeholder="UDYAM-XX-00-0000000"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {kycRegion === 'us' && (
                        <div className="space-y-4">
                          <span className="flex items-center gap-2 text-xs uppercase tracking-luxury font-bold text-purple-700">
                            <img
                              src="https://flagcdn.com/w40/us.png"
                              alt="US flag"
                              className="w-4 h-3 object-cover rounded-none border border-black/15 flex-shrink-0"
                            />
                            <span>United States Federal & State Compliance</span>
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                EIN (Employer Identification Number) *
                              </label>
                              <input
                                type="text"
                                name="einNumber"
                                value={formData.einNumber}
                                onChange={handleInputChange}
                                placeholder="12-3456789"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                State Business License *
                              </label>
                              <input
                                type="text"
                                name="stateLicense"
                                value={formData.stateLicense}
                                onChange={handleInputChange}
                                placeholder="e.g. Delaware Entity #1234567"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                              Resale Certificate / Sales Tax Permit
                            </label>
                            <input
                              type="text"
                              name="resaleCertificate"
                              value={formData.resaleCertificate}
                              onChange={handleInputChange}
                              placeholder="Certificate Number or State Exemption ID"
                              className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                            />
                          </div>
                        </div>
                      )}

                      {kycRegion === 'uk' && (
                        <div className="space-y-4">
                          <span className="flex items-center gap-2 text-xs uppercase tracking-luxury font-bold text-purple-700">
                            <img
                              src="https://flagcdn.com/w40/gb.png"
                              alt="UK flag"
                              className="w-4 h-3 object-cover rounded-none border border-black/15 flex-shrink-0"
                            />
                            <span>United Kingdom Corporate Compliance</span>
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                Companies House Reg No *
                              </label>
                              <input
                                type="text"
                                name="companiesHouseNo"
                                value={formData.companiesHouseNo}
                                onChange={handleInputChange}
                                placeholder="01234567"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                VAT Registration No *
                              </label>
                              <input
                                type="text"
                                name="vatNoUk"
                                value={formData.vatNoUk}
                                onChange={handleInputChange}
                                placeholder="GB 123 4567 89"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                UTR (Unique Taxpayer Ref)
                              </label>
                              <input
                                type="text"
                                name="utrNumber"
                                value={formData.utrNumber}
                                onChange={handleInputChange}
                                placeholder="10-digit UTR"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {kycRegion === 'eu' && (
                        <div className="space-y-4">
                          <span className="flex items-center gap-2 text-xs uppercase tracking-luxury font-bold text-purple-700">
                            <img
                              src="https://flagcdn.com/w40/eu.png"
                              alt="EU flag"
                              className="w-4 h-3 object-cover rounded-none border border-black/15 flex-shrink-0"
                            />
                            <span>European Union (EU) Commercial Verification</span>
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                EU VAT ID Number *
                              </label>
                              <input
                                type="text"
                                name="vatNoEu"
                                value={formData.vatNoEu}
                                onChange={handleInputChange}
                                placeholder="FR 12 345678901 / DE 123456789"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                EORI Number *
                              </label>
                              <input
                                type="text"
                                name="eoriNumber"
                                value={formData.eoriNumber}
                                onChange={handleInputChange}
                                placeholder="FR12345678901234"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                Commercial Register Extract
                              </label>
                              <input
                                type="text"
                                name="commercialRegisterExtract"
                                value={formData.commercialRegisterExtract}
                                onChange={handleInputChange}
                                placeholder="RCS Paris / HRB Frankfurt"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {kycRegion === 'china' && (
                        <div className="space-y-4">
                          <span className="flex items-center gap-2 text-xs uppercase tracking-luxury font-bold text-purple-700">
                            <img
                              src="https://flagcdn.com/w40/cn.png"
                              alt="China flag"
                              className="w-4 h-3 object-cover rounded-none border border-black/15 flex-shrink-0"
                            />
                            <span>China Enterprise Accreditation (中国企业认证)</span>
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                USCC (统一社会信用代码) *
                              </label>
                              <input
                                type="text"
                                name="usccCode"
                                value={formData.usccCode}
                                onChange={handleInputChange}
                                placeholder="91310000XXXXXXXXXX"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                Business License (营业执照) *
                              </label>
                              <input
                                type="text"
                                name="chinaBusinessLicense"
                                value={formData.chinaBusinessLicense}
                                onChange={handleInputChange}
                                placeholder="License Registration #"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                Customs Reg Code (海关编码) *
                              </label>
                              <input
                                type="text"
                                name="customsRegCode"
                                value={formData.customsRegCode}
                                onChange={handleInputChange}
                                placeholder="10-digit Customs Code"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {kycRegion === 'other' && (
                        <div className="space-y-4">
                          <span className="flex items-center gap-2 text-xs uppercase tracking-luxury font-bold text-purple-700">
                            <Globe className="w-4 h-4 text-purple-600 flex-shrink-0" />
                            <span>Global Regional Incorporation & Tax</span>
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                Local Corporate Tax ID (TIN) *
                              </label>
                              <input
                                type="text"
                                name="localTaxId"
                                value={formData.localTaxId}
                                onChange={handleInputChange}
                                placeholder="Official Tax Identification"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] mb-1.5">
                                Business Registration / Incorporation Cert *
                              </label>
                              <input
                                type="text"
                                name="incorporationCertNo"
                                value={formData.incorporationCertNo}
                                onChange={handleInputChange}
                                placeholder="Certificate / Registry Filing #"
                                className="w-full p-3.5 border border-[#121212] bg-white text-sm rounded-none focus:outline-none focus:border-purple-600"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ===================================================== */}
                  {/* 3. CONTACT & COMMUNICATION DETAILS                    */}
                  {/* ===================================================== */}
                  <div className="space-y-5 pb-6 border-b border-[#e5e5e5]">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-600" />
                      <span className="text-xs sm:text-sm uppercase tracking-luxury text-purple-700 font-bold">
                        3. Contact & Communication Details
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Primary Contact Person */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Primary Contact Person Name & Title *
                        </label>
                        <input
                          type="text"
                          name="primaryContactPerson"
                          value={formData.primaryContactPerson}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Laurent Moretti - Head of Sourcing"
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
                          name="businessEmail"
                          value={formData.businessEmail}
                          onChange={handleInputChange}
                          required
                          placeholder="liaison@vance-sourcing.com"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Phone Number with Country Code */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Phone with Country Code *
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="+33 1 42 68 00 00"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* Official Website */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Official Website & Domain *
                        </label>
                        <input
                          type="text"
                          name="officialWebsite"
                          value={formData.officialWebsite}
                          onChange={handleInputChange}
                          required
                          placeholder="https://vance-sourcing.com"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* LinkedIn Profile */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          LinkedIn Company Profile
                        </label>
                        <input
                          type="text"
                          name="linkedinUrl"
                          value={formData.linkedinUrl}
                          onChange={handleInputChange}
                          placeholder="linkedin.com/company/vance"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ===================================================== */}
                  {/* 4. OPERATIONAL & SOURCING CAPABILITIES                */}
                  {/* ===================================================== */}
                  <div className="space-y-5 pb-6 border-b border-[#e5e5e5]">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-purple-600" />
                      <span className="text-xs sm:text-sm uppercase tracking-luxury text-purple-700 font-bold">
                        4. Operational & Sourcing Capabilities
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Primary Categories Handled */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Primary Categories & Subcategories Handled *
                        </label>
                        <input
                          type="text"
                          name="primaryCategories"
                          value={formData.primaryCategories}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Silk Textiles, Luxury Outerwear, Fine Leather Goods"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* Target Export / Import Countries */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Target Export / Import Countries Served *
                        </label>
                        <input
                          type="text"
                          name="targetRegions"
                          value={formData.targetRegions}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Italy, France, Japan, USA, UAE, India"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Minimum Order Quantity (MOQ) Capabilities */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Minimum Order Quantity (MOQ) Capabilities *
                        </label>
                        <input
                          type="text"
                          name="moqCapabilities"
                          value={formData.moqCapabilities}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Low MOQ (50-200 pcs) & Bulk (5,000+ pcs)"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* Average Turnaround Time (TAT) */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Average Turnaround Time (TAT) for Sourcing *
                        </label>
                        <input
                          type="text"
                          name="averageTurnaroundTime"
                          value={formData.averageTurnaroundTime}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. 7-14 Days Sampling, 30-45 Days Bulk"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Logistics & Shipping Terms Handled (Incoterms) */}
                    <div>
                      <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                        Logistics & Shipping Terms Handled (Incoterms) *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {['FOB', 'CIF', 'EXW', 'DDP'].map((term) => {
                          const isSelected = formData.incoterms.includes(term);
                          return (
                            <button
                              key={term}
                              type="button"
                              onClick={() => toggleIncoterm(term)}
                              className={`p-3 text-center text-sm font-bold border-2 rounded-none transition-colors cursor-pointer ${
                                isSelected
                                  ? 'border-purple-600 bg-purple-600 text-white shadow-xs'
                                  : 'border-[#e5e5e5] bg-white text-[#121212] hover:border-[#121212]'
                              }`}
                            >
                              {term}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* ===================================================== */}
                  {/* 5. CATALOG, PORTFOLIO & SERVICE OFFERINGS             */}
                  {/* ===================================================== */}
                  <div className="space-y-5 pb-6 border-b border-[#e5e5e5]">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                      <span className="text-xs sm:text-sm uppercase tracking-luxury text-purple-700 font-bold">
                        5. Catalog, Portfolio & Service Offerings
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-1">
                        Sourcing Agent Portfolio & Factory Audit Expertise *
                      </label>
                      <span className="text-xs sm:text-sm text-[#666666] block mb-2 font-normal">
                        (Sourcing regions covered, factory auditing expertise, and verified manufacturer network size)
                      </span>
                      <textarea
                        rows={3}
                        name="sourcingPortfolioDetails"
                        value={formData.sourcingPortfolioDetails}
                        onChange={handleInputChange}
                        required
                        placeholder="Detail the number of audited manufacturing partners, specialized production capabilities, and past procurement projects..."
                        className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 leading-relaxed transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-1">
                        Product Catalog & Technical Specs Overview
                      </label>
                      <span className="text-xs sm:text-sm text-[#666666] block mb-2 font-normal">
                        (High-resolution product lines, technical specifications, and physical sample availability)
                      </span>
                      <textarea
                        rows={2}
                        name="productCatalogDetails"
                        value={formData.productCatalogDetails}
                        onChange={handleInputChange}
                        placeholder="Summarize product lines or provide online portfolio links..."
                        className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 leading-relaxed transition-colors"
                      />
                    </div>

                    {/* Catalog / Portfolio File Upload */}
                    <div className="p-4 border border-[#e5e5e5] bg-[#faf9f6]">
                      <label className="cursor-pointer inline-flex items-center gap-2 py-3 px-5 bg-white border border-[#121212] hover:border-purple-600 text-xs sm:text-sm uppercase tracking-luxury font-semibold text-[#121212] transition-colors rounded-none">
                        <Upload className="w-4 h-4 text-purple-600" />
                        <span>Upload Portfolio / Presentation Dossier</span>
                        <input
                          type="file"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) setUploadedFiles((p) => ({ ...p, catalogFile: f.name }));
                          }}
                          className="hidden"
                        />
                      </label>
                      {uploadedFiles.catalogFile && (
                        <span className="text-xs sm:text-sm text-purple-700 ml-3 font-semibold">
                          ✓ {uploadedFiles.catalogFile}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ===================================================== */}
                  {/* 6. INFRASTRUCTURE, CAPACITY & TEAM                    */}
                  {/* ===================================================== */}
                  <div className="space-y-5 pb-6 border-b border-[#e5e5e5]">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-xs sm:text-sm uppercase tracking-luxury text-purple-700 font-bold">
                        6. Infrastructure, Capacity & Team
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Total Team Size */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Total Team Size & Workforce Strength *
                        </label>
                        <select
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleInputChange}
                          required
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        >
                          <option value="1-10">1 - 10 Specialists</option>
                          <option value="11-50">11 - 50 Personnel</option>
                          <option value="51-200">51 - 200 Personnel</option>
                          <option value="200+">200+ Enterprise Workforce</option>
                        </select>
                      </div>

                      {/* Dedicated QC Staff */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Dedicated QC & Sourcing Staff Count *
                        </label>
                        <input
                          type="text"
                          name="qcStaffCount"
                          value={formData.qcStaffCount}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. 8 On-Site Quality Auditors"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Facility Details */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Facility Details *
                        </label>
                        <input
                          type="text"
                          name="facilityDetails"
                          value={formData.facilityDetails}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. 20,000 sq ft warehouse, Milan liaison office"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* Software & Systems */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Software and Systems Used (ERP/CRM)
                        </label>
                        <input
                          type="text"
                          name="softwareSystems"
                          value={formData.softwareSystems}
                          onChange={handleInputChange}
                          placeholder="e.g. SAP, TradeGecko, Salesforce, Custom ERP"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ===================================================== */}
                  {/* 7. CERTIFICATIONS & QUALITY STANDARDS                 */}
                  {/* ===================================================== */}
                  <div className="space-y-5 pb-6 border-b border-[#e5e5e5]">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span className="text-xs sm:text-sm uppercase tracking-luxury text-purple-700 font-bold">
                        7. Certifications & Quality Standards
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* International Quality Certifications */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          International Quality Certifications
                        </label>
                        <input
                          type="text"
                          name="internationalCertifications"
                          value={formData.internationalCertifications}
                          onChange={handleInputChange}
                          placeholder="e.g. ISO 9001, CE, RoHS, FDA, GMP, GOTS"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* Regional Compliance Certifications */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Regional Compliance Certifications
                        </label>
                        <input
                          type="text"
                          name="regionalCompliance"
                          value={formData.regionalCompliance}
                          onChange={handleInputChange}
                          placeholder="e.g. BIS (India), UL / FCC (US), CE (EU)"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Third-Party Inspection Partner Approvals */}
                    <div>
                      <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                        Third-Party Inspection Partner Approvals
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {['SGS', 'Intertek', 'TÜV Rheinland', 'Bureau Veritas'].map((partner) => {
                          const isSelected = formData.inspectionPartnerApprovals.includes(partner);
                          return (
                            <button
                              key={partner}
                              type="button"
                              onClick={() => toggleInspection(partner)}
                              className={`p-3 text-center text-xs sm:text-sm font-semibold border-2 rounded-none transition-colors cursor-pointer ${
                                isSelected
                                  ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                                  : 'border-[#e5e5e5] bg-white text-[#121212] hover:border-[#121212]'
                              }`}
                            >
                              {partner}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* ===================================================== */}
                  {/* 8. BANKING & INTERNATIONAL PAYOUT SETUP               */}
                  {/* ===================================================== */}
                  <div className="space-y-5 pb-6 border-b border-[#e5e5e5]">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-purple-600" />
                      <span className="text-xs sm:text-sm uppercase tracking-luxury text-purple-700 font-bold">
                        8. Banking & International Payout Setup
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Bank Account Holder Name */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-1">
                          Bank Account Holder Name *
                        </label>
                        <span className="text-xs text-[#666666] block mb-2">
                          (Must match legal entity name exactly)
                        </span>
                        <input
                          type="text"
                          name="bankAccountHolderName"
                          value={formData.bankAccountHolderName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Vance Global Sourcing Private Ltd"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* Account Number / IBAN */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-1">
                          Account Number / IBAN *
                        </label>
                        <span className="text-xs text-[#666666] block mb-2">
                          (Standard domestic or international format)
                        </span>
                        <input
                          type="text"
                          name="accountNumberIban"
                          value={formData.accountNumberIban}
                          onChange={handleInputChange}
                          required
                          placeholder="GB82 WEST 1234 5678 9012 34"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Routing / SWIFT / BIC */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Routing / SWIFT / BIC Code *
                        </label>
                        <input
                          type="text"
                          name="swiftBicCode"
                          value={formData.swiftBicCode}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. CHASUS33XXX"
                          className="w-full p-4 border border-[#121212] bg-white text-sm sm:text-base text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* Currency Support */}
                      <div>
                        <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-2">
                          Settlement Currency Support *
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {['USD', 'EUR', 'INR', 'GBP', 'JPY', 'AED'].map((curr) => {
                            const isSelected = formData.supportedCurrencies.includes(curr);
                            return (
                              <button
                                key={curr}
                                type="button"
                                onClick={() => toggleCurrency(curr)}
                                className={`py-2 px-3 text-xs font-bold border-2 rounded-none transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'border-purple-600 bg-purple-600 text-white'
                                    : 'border-[#e5e5e5] bg-white text-[#121212] hover:border-[#121212]'
                                }`}
                              >
                                {curr}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Tax Residency Documents */}
                    <div>
                      <label className="block text-sm sm:text-base uppercase tracking-luxury font-semibold text-[#121212] mb-1">
                        Tax Residency / Withholding Tax Filings
                      </label>
                      <span className="text-xs text-[#666666] block mb-2">
                        (e.g., W-8BEN / W-9 for US, Form 10F, or local Tax Residency Certificate)
                      </span>
                      <div className="p-4 border border-[#e5e5e5] bg-[#faf9f6] flex items-center gap-3">
                        <label className="cursor-pointer inline-flex items-center gap-2 py-2.5 px-4 bg-white border border-[#121212] hover:border-purple-600 text-xs uppercase tracking-luxury font-semibold text-[#121212] transition-colors rounded-none">
                          <FileText className="w-4 h-4 text-purple-600" />
                          <span>Upload Tax Certificate / W-8BEN</span>
                          <input
                            type="file"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) setUploadedFiles((p) => ({ ...p, taxDoc: f.name }));
                            }}
                            className="hidden"
                          />
                        </label>
                        {uploadedFiles.taxDoc && (
                          <span className="text-xs text-purple-700 font-semibold">
                            ✓ {uploadedFiles.taxDoc}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON (PURPLE BORDER & WHITE BACKGROUND, LARGE) */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 sm:py-5 px-8 rounded-none border-2 border-purple-600 bg-white text-purple-600 hover:bg-purple-600 hover:text-white text-sm sm:text-base uppercase tracking-luxury font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
                    >
                      <span>Submit Sourcing Agent Accreditation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: PURPLE BORDER FOX + THOUGHT CLOUD BUBBLE     */}
          {/* STICKY BELOW FIXED HEADER (84px) SO ENTIRE PET IS VISIBLE  */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 relative">
            <div className="lg:sticky lg:top-[84px] flex flex-col items-center">
              {/* THOUGHT CLOUD */}
              <div className="w-full max-w-[380px] sm:max-w-[420px] flex flex-col items-center">
                <PurpleBorderCloud>
                  <h3 className="font-serif-luxury text-base sm:text-lg md:text-xl text-[#121212] font-medium leading-snug text-center">
                    Thanks for choosing to be our Sourcing Agent!
                  </h3>
                </PurpleBorderCloud>

                {/* Thought trail dots */}
                <div className="flex flex-col items-center gap-0.5 my-0.5">
                  <div className="w-2.5 h-2.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-2" />
                  <div className="w-1.5 h-1.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-4" />
                </div>
              </div>

              {/* PURPLE OUTLINE FOX - Prominent Large Mascot */}
              <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 max-h-[260px] sm:max-h-[285px] aspect-square bg-transparent flex items-center justify-center -mt-1 sm:-mt-2">
                <PurpleBorderFox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
