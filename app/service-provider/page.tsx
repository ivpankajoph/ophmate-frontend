'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ArrowRight,
  Check,
  Building2,
  Globe,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  FileText,
  Upload,
  Layers,
  Package,
  Truck,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  Search,
  Plus,
  Trash2,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

// Purple Border Owl (Stroke only, fill none)
const PurpleBorderOwl: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full text-purple-600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Ear Tuft */}
      <path
        d="M 68 60 L 52 28 L 78 48"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Ear Tuft */}
      <path
        d="M 132 60 L 148 28 L 122 48"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Crown */}
      <path
        d="M 78 48 Q 100 54 122 48"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Owl Head Contour */}
      <path
        d="M 68 60 C 52 75 52 105 68 118 C 78 126 122 126 132 118 C 148 105 148 75 132 60"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Large Left Owl Eye Circle */}
      <circle
        cx="82"
        cy="88"
        r="16"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      {/* Inner Pupil Left */}
      <circle
        cx="82"
        cy="88"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Large Right Owl Eye Circle */}
      <circle
        cx="118"
        cy="88"
        r="16"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      {/* Inner Pupil Right */}
      <circle
        cx="118"
        cy="88"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Small Sharp Beak */}
      <path
        d="M 97 96 L 103 96 L 100 106 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Rounded Owl Body */}
      <path
        d="M 68 118 C 58 135 60 168 76 176 C 90 182 110 182 124 176 C 140 168 142 135 132 118"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left Folded Wing */}
      <path
        d="M 66 122 C 54 138 56 160 68 168"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Right Folded Wing */}
      <path
        d="M 134 122 C 146 138 144 160 132 168"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Cute Chest Feathers U-marks */}
      <path
        d="M 92 130 Q 100 135 108 130"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 88 142 Q 100 148 112 142"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 94 154 Q 100 158 106 154"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Perch / Little Feet */}
      <path
        d="M 86 176 L 86 182 M 90 176 L 90 182 M 94 176 L 94 182"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 106 176 L 106 182 M 110 176 L 110 182 M 114 176 L 114 182"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Wooden Perch Line */}
      <path
        d="M 62 182 L 138 182"
        stroke="currentColor"
        strokeWidth="2.5"
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

// Comprehensive Country Code Mapping for FlagCDN
const COUNTRY_CODES: Record<string, string> = {
  'India': 'in',
  'UAE': 'ae',
  'United Arab Emirates': 'ae',
  'Saudi Arabia': 'sa',
  'Bangladesh': 'bd',
  'Singapore': 'sg',
  'China': 'cn',
  'Japan': 'jp',
  'South Korea': 'kr',
  'Vietnam': 'vn',
  'Indonesia': 'id',
  'Germany': 'de',
  'France': 'fr',
  'Italy': 'it',
  'UK': 'gb',
  'United Kingdom': 'gb',
  'Spain': 'es',
  'Netherlands': 'nl',
  'Switzerland': 'ch',
  'USA': 'us',
  'United States': 'us',
  'Canada': 'ca',
  'Mexico': 'mx',
  'Australia': 'au',
  'South Africa': 'za',
  'Brazil': 'br',
  'Turkey': 'tr',
  'Thailand': 'th',
  'Malaysia': 'my',
  'Taiwan': 'tw',
  'Pakistan': 'pk',
  'Cambodia': 'kh',
  'Poland': 'pl',
  'Colombia': 'co',
  'Philippines': 'ph',
  'Belgium': 'be',
  'Sweden': 'se',
  'Denmark': 'dk',
  'Portugal': 'pt',
  'Austria': 'at',
  'Norway': 'no',
  'Hong Kong': 'hk',
  'New Zealand': 'nz',
  'Qatar': 'qa',
  'Kuwait': 'kw',
  'Oman': 'om',
  'Bahrain': 'bh',
  'Egypt': 'eg',
  'Sri Lanka': 'lk'
};

const getCountryCode = (countryName: string): string => {
  if (!countryName) return 'un';
  const clean = countryName.trim();
  return COUNTRY_CODES[clean] || 'un';
};

// Dedicated Country Flag Component utilizing high-res FlagCDN images
const CountryFlag: React.FC<{
  country: string;
  code?: string;
  className?: string;
}> = ({ country, code, className = 'w-5 h-3.5' }) => {
  const cCode = (code || getCountryCode(country)).toLowerCase();
  return (
    <img
      src={`https://flagcdn.com/w40/${cCode}.png`}
      alt={country || code || 'Flag'}
      className={`inline-block object-cover rounded-2xs border border-gray-200 shrink-0 shadow-2xs ${className}`}
      loading="lazy"
    />
  );
};

// All Recognized Standard Countries
const ALL_COUNTRIES_LIST = [
  { name: 'India', code: 'in' },
  { name: 'UAE', code: 'ae' },
  { name: 'USA', code: 'us' },
  { name: 'UK', code: 'gb' },
  { name: 'Germany', code: 'de' },
  { name: 'France', code: 'fr' },
  { name: 'Italy', code: 'it' },
  { name: 'Saudi Arabia', code: 'sa' },
  { name: 'Singapore', code: 'sg' },
  { name: 'China', code: 'cn' },
  { name: 'Japan', code: 'jp' },
  { name: 'South Korea', code: 'kr' },
  { name: 'Canada', code: 'ca' },
  { name: 'Spain', code: 'es' },
  { name: 'Netherlands', code: 'nl' },
  { name: 'Switzerland', code: 'ch' },
  { name: 'Australia', code: 'au' },
  { name: 'Bangladesh', code: 'bd' },
  { name: 'Vietnam', code: 'vn' },
  { name: 'Indonesia', code: 'id' },
  { name: 'Mexico', code: 'mx' },
  { name: 'Brazil', code: 'br' },
  { name: 'South Africa', code: 'za' },
  { name: 'Turkey', code: 'tr' },
  { name: 'Thailand', code: 'th' },
  { name: 'Malaysia', code: 'my' }
];

// Supply Coverage Regions & Countries with Flag Codes
const SUPPLY_REGIONS: Record<string, { name: string; code: string }[]> = {
  Asia: [
    { name: 'India', code: 'in' },
    { name: 'UAE', code: 'ae' },
    { name: 'Saudi Arabia', code: 'sa' },
    { name: 'Bangladesh', code: 'bd' },
    { name: 'Singapore', code: 'sg' },
    { name: 'China', code: 'cn' },
    { name: 'Japan', code: 'jp' },
    { name: 'South Korea', code: 'kr' },
    { name: 'Vietnam', code: 'vn' },
    { name: 'Indonesia', code: 'id' }
  ],
  Europe: [
    { name: 'Germany', code: 'de' },
    { name: 'France', code: 'fr' },
    { name: 'Italy', code: 'it' },
    { name: 'UK', code: 'gb' },
    { name: 'Spain', code: 'es' },
    { name: 'Netherlands', code: 'nl' },
    { name: 'Switzerland', code: 'ch' }
  ],
  'North America': [
    { name: 'USA', code: 'us' },
    { name: 'Canada', code: 'ca' },
    { name: 'Mexico', code: 'mx' }
  ]
};

// City-level coverage data
const COUNTRY_CITIES: Record<string, string[]> = {
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'],
  India: ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Surat', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Tirupur'],
  USA: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Dallas', 'San Francisco', 'Seattle', 'Atlanta'],
  UK: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
  Germany: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Düsseldorf'],
  France: ['Paris', 'Lyon', 'Marseille', 'Bordeaux'],
  Italy: ['Milan', 'Rome', 'Florence', 'Naples', 'Turin']
};

// Categories Tree Example
const CATEGORY_TREE = [
  {
    category: 'Textiles & Garments',
    subcategories: [
      { name: 'Garments', products: ['T-Shirts', 'Shirts', 'Hoodies', 'Jackets', 'Trousers', 'Dresses'] },
      { name: 'Fabrics & Yarns', products: ['Silk', 'Cashmere', 'Organic Cotton', 'Virgin Wool', 'Linen Blend'] },
      { name: 'Fashion Accessories', products: ['Scarves', 'Leather Belts', 'Hats', 'Luxury Gloves'] }
    ]
  },
  {
    category: 'Quality Inspection & Lab Testing',
    subcategories: [
      { name: 'Material & Fabric Testing', products: ['Tensile Strength Assay', 'Colorfastness Test', 'Pilling Resistance', 'Chemical & REACH Compliance'] },
      { name: 'Precious Metals & Horology', products: ['Gold Hallmark Assay', 'Diamond Authentication', 'Chronometer Calibration'] },
      { name: 'Factory & Ethical Audits', products: ['SMETA Sedex Audit', 'ISO 9001 Facility Audit', 'Environmental Compliance'] }
    ]
  },
  {
    category: 'Logistics, Freight & Customs',
    subcategories: [
      { name: 'Freight Forwarding', products: ['Air Express Charter', 'Ocean FCL / LCL', 'Cross-border Bonded Trucking', 'Rail Cargo'] },
      { name: 'Customs Brokerage', products: ['Duty Drawback Advisory', 'Import Export Clearance', 'Bonded Warehousing', 'Luxury Escrow Storage'] }
    ]
  },
  {
    category: 'Leather Goods & Luxury Footwear',
    subcategories: [
      { name: 'Handbags & Luggage', products: ['Tote Bags', 'Duffel Bags', 'Leather Trunks', 'Wallets & Cardholders'] },
      { name: 'Footwear Atelier', products: ['Dress Shoes', 'Handcrafted Sneakers', 'Leather Boots', 'Artisanal Loafers'] }
    ]
  }
];

// Document Types with suggested defaults
const DOCUMENT_TYPES = [
  { id: 'company_reg', label: 'Company Registration Certificate', defaultVisibility: 'Verified' },
  { id: 'gst_tax', label: 'GST / Tax Certificate / EIN', defaultVisibility: 'Private' },
  { id: 'trade_license', label: 'Trade License', defaultVisibility: 'Verified' },
  { id: 'export_license', label: 'Export License / IEC', defaultVisibility: 'Verified' },
  { id: 'factory_license', label: 'Factory / Facility License', defaultVisibility: 'Verified' },
  { id: 'iso_cert', label: 'ISO Certificate', defaultVisibility: 'Visible to Buyers' },
  { id: 'product_cert', label: 'Product Certificates', defaultVisibility: 'Visible to Buyers' },
  { id: 'quality_reports', label: 'Quality Certificates & Test Reports', defaultVisibility: 'Visible to Buyers' },
  { id: 'previous_export_docs', label: 'Previous Export Documents', defaultVisibility: 'Private' },
  { id: 'previous_pos', label: 'Previous Purchase Orders', defaultVisibility: 'Private' },
  { id: 'previous_invoices', label: 'Previous Invoices', defaultVisibility: 'Private' },
  { id: 'client_refs', label: 'Client References', defaultVisibility: 'Visible only after inquiry' },
  { id: 'factory_photos', label: 'Factory / Facility Photos', defaultVisibility: 'Public' },
  { id: 'product_catalog', label: 'Product / Service Catalog', defaultVisibility: 'Public' },
  { id: 'company_brochure', label: 'Company Brochure', defaultVisibility: 'Public' },
  { id: 'other_docs', label: 'Other Regulatory Documents', defaultVisibility: 'Private' }
];

export default function ServiceProviderPage() {
  const [activeTab, setActiveTab] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Tab 1: Basic Information & Address
  const [companyName, setCompanyName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [website, setWebsite] = useState('');
  const [yearEstablished, setYearEstablished] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState('11-50 employees');
  const [companyDescription, setCompanyDescription] = useState('');
  
  // Address
  const [country, setCountry] = useState('India');
  const [stateProvince, setStateProvince] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Tab 2: About Company & Capabilities
  const [companyIntro, setCompanyIntro] = useState('');
  const [companyHistory, setCompanyHistory] = useState('');
  const [coreBusiness, setCoreBusiness] = useState('');
  const [manufacturingCapability, setManufacturingCapability] = useState('');
  const [tradingCapability, setTradingCapability] = useState('');
  const [exportExperience, setExportExperience] = useState('');
  const [mainIndustries, setMainIndustries] = useState(['Luxury Fashion', 'Testing & Inspection', 'Logistics']);
  const [mainMarkets, setMainMarkets] = useState(['Europe', 'North America', 'Middle East']);
  const [certifications, setCertifications] = useState(['ISO 9001', 'ISO 17025']);
  const [infrastructure, setInfrastructure] = useState('');

  // Tab 3: Products & Categories
  const [selectedCategory, setSelectedCategory] = useState('Quality Inspection & Lab Testing');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(['Material & Fabric Testing']);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['Tensile Strength Assay', 'Colorfastness Test']);

  // Tab 4: Product / Service Listing
  const [listingName, setListingName] = useState('');
  const [listingCategory, setListingCategory] = useState('Quality Inspection & Lab Testing');
  const [listingSubcategory, setListingSubcategory] = useState('Material & Fabric Testing');
  const [listingDescription, setListingDescription] = useState('');
  const [listingSku, setListingSku] = useState('');
  const [listingMoq, setListingMoq] = useState('1 Batch / Lot');
  const [listingPrice, setListingPrice] = useState('');
  const [listingPriceRange, setListingPriceRange] = useState('$500 - $2,500');
  const [listingCurrency, setListingCurrency] = useState('USD');
  const [supplyCapacity, setSupplyCapacity] = useState('100,000 units/month');
  const [productionCapacity, setProductionCapacity] = useState('5,000 audits/month');
  const [leadTime, setLeadTime] = useState('3-7 Business Days');
  const [packaging, setPackaging] = useState('Tamper-evident luxury sealed pack');
  const [paymentTerms, setPaymentTerms] = useState('Escrow / Letter of Credit / Net 30');
  const [hsCode, setHsCode] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('India');
  const [portOfLoading, setPortOfLoading] = useState('JNPT Mumbai / Dubai JAFZA');

  // Tab 5: Markets & Supply Coverage
  const [canSupplyDomestically, setCanSupplyDomestically] = useState(true);
  const [supplyCountries, setSupplyCountries] = useState<string[]>(['India', 'UAE', 'USA', 'UK', 'Germany']);
  const [countrySearch, setCountrySearch] = useState('');
  const [selectedCountryForCities, setSelectedCountryForCities] = useState('UAE');
  const [cityCoverageMode, setCityCoverageMode] = useState<Record<string, 'all' | 'selected'>>({
    UAE: 'selected',
    India: 'all'
  });
  const [selectedCitiesByCountry, setSelectedCitiesByCountry] = useState<Record<string, string[]>>({
    UAE: ['Dubai', 'Abu Dhabi', 'Sharjah']
  });

  // Tab 6: Supply & Export Capability
  const [supplyTypes, setSupplyTypes] = useState<string[]>([
    'Custom Manufacturing',
    'OEM',
    'Bulk Supply'
  ]);
  const [capacityFrequency, setCapacityFrequency] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Annual'>('Monthly');
  const [capacityUnits, setCapacityUnits] = useState('100,000 units');
  const [exportingSince, setExportingSince] = useState('2018');
  const [exportCountries, setExportCountries] = useState<string[]>(['USA', 'UK', 'Germany', 'UAE']);
  const [majorExportMarkets, setMajorExportMarkets] = useState('North America, European Union, GCC');
  const [exportVolume, setExportVolume] = useState('$5M - $10M Annual');
  const [majorPorts, setMajorPorts] = useState('JNPT Mumbai, Port of Rotterdam, Jebel Ali Dubai');
  const [shippingModes, setShippingModes] = useState<string[]>(['Air', 'Sea', 'Courier']);

  // Tab 7: Documents & Visibility
  const [docUploads, setDocUploads] = useState<Record<string, { uploaded: boolean; fileName?: string; visibility: string }>>(
    DOCUMENT_TYPES.reduce((acc, doc) => {
      acc[doc.id] = { uploaded: false, visibility: doc.defaultVisibility };
      return acc;
    }, {} as Record<string, { uploaded: boolean; fileName?: string; visibility: string }>)
  );

  // Toggle helper for arrays
  const toggleArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const handleDocumentVisibilityChange = (docId: string, visibility: string) => {
    setDocUploads((prev) => ({
      ...prev,
      [docId]: {
        ...(prev[docId] || { uploaded: false }),
        visibility
      }
    }));
  };

  const handleMockDocUpload = (docId: string, docLabel: string) => {
    setDocUploads((prev) => ({
      ...prev,
      [docId]: {
        ...(prev[docId] || { visibility: 'Private' }),
        uploaded: true,
        fileName: `${docLabel.toLowerCase().replace(/[^a-z0-9]/g, '_')}_verified.pdf`
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 7 Structured Tabs List
  const TABS = [
    { id: 1, title: 'Basic & Address', icon: Building2 },
    { id: 2, title: 'About Company', icon: FileText },
    { id: 3, title: 'Categories & Offerings', icon: Layers },
    { id: 4, title: 'Listing & Commercials', icon: Package },
    { id: 5, title: 'Markets & Supply Coverage', icon: Globe },
    { id: 6, title: 'Supply & Export Capability', icon: Truck },
    { id: 7, title: 'Documents & Visibility', icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen bg-white text-[#121212] pt-1 sm:pt-2 pb-20 px-3 sm:px-6 md:px-10 lg:px-12">
      <div className="max-w-[1520px] mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-2 sm:mb-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury font-medium text-[#737373] hover:text-purple-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Return to Store
          </Link>
          <div className="text-[11px] uppercase tracking-luxury text-[#999999] hidden sm:block">
            Public Profile Preview:{' '}
            <span className="font-mono text-purple-600">
              /supplier/{brandName ? brandName.toLowerCase().replace(/\s+/g, '-') : 'abc-industries'}
            </span>
          </div>
        </div>

        {/* Minimalist Editorial Title */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#121212] font-normal tracking-wide">
            Service Provider Accreditation
          </h1>
          <div className="w-12 h-[2px] bg-purple-600 mx-auto mt-2" />
        </div>

        {/* ========================================================== */}
        {/* 2-COLUMN LAYOUT: 7 TABS ON LEFT, STICKY MASCOT ON RIGHT    */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ========================================================== */}
          {/* LEFT COLUMN: 7 STRUCTURED TABS (BALANCED WIDTH)            */}
          {/* ========================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1 space-y-6">
            {submitted ? (
              <div className="border border-[#e5e5e5] p-8 sm:p-12 text-center bg-white space-y-4">
                <div className="w-14 h-14 border border-purple-600 rounded-none flex items-center justify-center mx-auto text-purple-600">
                  <Check className="w-7 h-7 stroke-[2.2]" />
                </div>
                <h3 className="font-serif-luxury text-2xl text-[#121212]">
                  Service Provider Accreditation Dossier Transmitted
                </h3>
                <p className="text-xs text-[#575757] font-light max-w-md mx-auto leading-relaxed">
                  Thank you for submitting your detailed credentials for{' '}
                  <span className="font-semibold text-[#121212]">
                    {companyName || 'Your Enterprise'}
                  </span>
                  . Registered Location:{' '}
                  <span className="inline-flex items-center gap-1 font-medium text-[#121212]">
                    <CountryFlag country={country} className="w-4 h-3 inline-block" />
                    {city}, {country}
                  </span>
                  . Dedicated profile will be generated at{' '}
                  <span className="font-mono text-purple-600">
                    /supplier/{brandName ? brandName.toLowerCase().replace(/\s+/g, '-') : 'abc-industries'}
                  </span>{' '}
                  following institutional verification.
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="py-3 px-6 border-2 border-purple-600 bg-white text-purple-600 hover:bg-purple-600 hover:text-white text-xs uppercase tracking-luxury font-medium transition-colors cursor-pointer"
                  >
                    Edit Dossier
                  </button>
                  <Link
                    href="/"
                    className="py-3 px-6 border border-[#e5e5e5] bg-white text-[#121212] hover:border-purple-600 hover:text-purple-600 text-xs uppercase tracking-luxury font-medium transition-colors"
                  >
                    Return to Maison
                  </Link>
                </div>
              </div>
            ) : (
              <div className="border border-[#e5e5e5] bg-white">
                {/* 7 Tabs Horizontal Navigation Bar */}
                <div className="border-b border-[#e5e5e5] bg-[#faf9f6] overflow-x-auto scrollbar-none">
                  <div className="flex items-center min-w-max p-1">
                    {TABS.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-luxury font-medium transition-colors border-b-2 cursor-pointer ${
                            isActive
                              ? 'border-purple-600 text-purple-600 bg-white shadow-xs'
                              : 'border-transparent text-[#737373] hover:text-[#121212]'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                              isActive ? 'bg-purple-600 text-white' : 'bg-[#e5e5e5] text-[#575757]'
                            }`}
                          >
                            {tab.id}
                          </span>
                          <span className="whitespace-nowrap">{tab.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Body for Current Tab */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                  {/* ======================================================== */}
                  {/* TAB 1: BASIC INFORMATION & ADDRESS                      */}
                  {/* ======================================================== */}
                  {activeTab === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <span className="text-[11px] uppercase tracking-luxury text-[#c5a880] block font-semibold mb-1">
                          SECTION 1 OF 7
                        </span>
                        <h2 className="font-serif-luxury text-xl text-[#121212]">
                          Basic Information & Business Address
                        </h2>
                        <p className="text-xs text-[#737373] mt-1 font-light">
                          Legal corporate identity and registered operating office details.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. Apex Luxury Logistics & QC Ltd"
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Brand Name
                          </label>
                          <input
                            type="text"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            placeholder="e.g. Apex Global Trade Services"
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={businessEmail}
                            onChange={(e) => setBusinessEmail(e.target.value)}
                            placeholder="accreditation@apexlogistics.com"
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (212) 555-0198"
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            WhatsApp
                          </label>
                          <input
                            type="tel"
                            value={whatsApp}
                            onChange={(e) => setWhatsApp(e.target.value)}
                            placeholder="+1 (212) 555-0199"
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Website
                          </label>
                          <input
                            type="url"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="https://www.apexlogistics.com"
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Year Established *
                          </label>
                          <input
                            type="number"
                            required
                            min="1800"
                            max="2026"
                            value={yearEstablished}
                            onChange={(e) => setYearEstablished(e.target.value)}
                            placeholder="e.g. 2014"
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Number of Employees
                          </label>
                          <select
                            value={numberOfEmployees}
                            onChange={(e) => setNumberOfEmployees(e.target.value)}
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none bg-white transition-colors cursor-pointer"
                          >
                            <option value="1-10 employees">1 - 10 employees</option>
                            <option value="11-50 employees">11 - 50 employees</option>
                            <option value="51-200 employees">51 - 200 employees</option>
                            <option value="201-500 employees">201 - 500 employees</option>
                            <option value="500+ employees">500+ employees</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                          Company Description *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={companyDescription}
                          onChange={(e) => setCompanyDescription(e.target.value)}
                          placeholder="Comprehensive summary of your service capabilities, laboratory testing, logistics hubs, or manufacturing background..."
                          className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                        />
                      </div>

                      {/* Business Address with Flag Display */}
                      <div className="pt-2 border-t border-[#e5e5e5] space-y-4">
                        <h3 className="font-serif-luxury text-base text-[#121212]">
                          Business Address
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                              Country *
                            </label>
                            <div className="relative flex items-center">
                              <div className="absolute left-3 flex items-center pointer-events-none z-10">
                                <CountryFlag country={country} className="w-5 h-3.5" />
                              </div>
                              <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full text-xs p-3 pl-11 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none bg-white transition-colors cursor-pointer"
                              >
                                {ALL_COUNTRIES_LIST.map((c) => (
                                  <option key={c.name} value={c.name}>
                                    {c.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                              State / Province *
                            </label>
                            <input
                              type="text"
                              required
                              value={stateProvince}
                              onChange={(e) => setStateProvince(e.target.value)}
                              placeholder="e.g. Maharashtra / Dubai / NY"
                              className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                              City *
                            </label>
                            <input
                              type="text"
                              required
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              placeholder="e.g. Mumbai / Dubai / New York"
                              className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                              Postal Code *
                            </label>
                            <input
                              type="text"
                              required
                              value={postalCode}
                              onChange={(e) => setPostalCode(e.target.value)}
                              placeholder="e.g. 400001 / 10001"
                              className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Public Profile Structure Preview Box */}
                      <div className="bg-[#faf9f6] border border-[#e5e5e5] p-4 text-xs space-y-2">
                        <span className="text-[10px] uppercase tracking-luxury font-bold text-purple-600 block">
                          Seller Individual Public Profile Preview
                        </span>
                        <div className="flex flex-wrap items-center gap-4 text-[#575757] text-[11px]">
                          <span>• Header: Company Logo & Name</span>
                          <span>• Verified Badge</span>
                          <span className="inline-flex items-center gap-1.5">
                            • Base:{' '}
                            <CountryFlag country={country} className="w-4 h-3 inline-block" />
                            {country}
                          </span>
                          <span>• Response Rate: 98%</span>
                          <span>• Profile Completion: 85%</span>
                          <span>• Inquiries & Quote Request Enabled</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* TAB 2: ABOUT COMPANY & CAPABILITIES                     */}
                  {/* ======================================================== */}
                  {activeTab === 2 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <span className="text-[11px] uppercase tracking-luxury text-[#c5a880] block font-semibold mb-1">
                          SECTION 2 OF 7
                        </span>
                        <h2 className="font-serif-luxury text-xl text-[#121212]">
                          About Company & Operations
                        </h2>
                        <p className="text-xs text-[#737373] mt-1 font-light">
                          Institutional background, manufacturing or service infrastructure, and certifications.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Company Introduction
                          </label>
                          <textarea
                            rows={3}
                            value={companyIntro}
                            onChange={(e) => setCompanyIntro(e.target.value)}
                            placeholder="Detailed narrative of your company's founding, mission, and luxury sector positioning..."
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Company History
                          </label>
                          <textarea
                            rows={2}
                            value={companyHistory}
                            onChange={(e) => setCompanyHistory(e.target.value)}
                            placeholder="Milestones, expansion into international hubs, laboratory accreditations..."
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                              Core Business
                            </label>
                            <input
                              type="text"
                              value={coreBusiness}
                              onChange={(e) => setCoreBusiness(e.target.value)}
                              placeholder="e.g. Luxury QC & Third-Party Lab Testing"
                              className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                              Manufacturing / Service Capability
                            </label>
                            <input
                              type="text"
                              value={manufacturingCapability}
                              onChange={(e) => setManufacturingCapability(e.target.value)}
                              placeholder="e.g. 5,000 lab assays per week"
                              className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                              Trading & Brokerage Capability
                            </label>
                            <input
                              type="text"
                              value={tradingCapability}
                              onChange={(e) => setTradingCapability(e.target.value)}
                              placeholder="e.g. Direct customs clearance at 14 ports"
                              className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Export Experience
                          </label>
                          <input
                            type="text"
                            value={exportExperience}
                            onChange={(e) => setExportExperience(e.target.value)}
                            placeholder="e.g. Over 8 years serving luxury houses across Paris, Milan, and New York"
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-2">
                            Main Industries Served
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              'Luxury Fashion',
                              'Textiles & Garments',
                              'Fine Horology',
                              'Jewelry & Gemology',
                              'Leather Goods',
                              'Quality Inspection & QC',
                              'Testing & Calibration Labs',
                              'Customs & Freight Logistics'
                            ].map((ind) => (
                              <button
                                key={ind}
                                type="button"
                                onClick={() => toggleArrayItem(setMainIndustries, ind)}
                                className={`px-3 py-1.5 text-xs rounded-none border transition-colors cursor-pointer ${
                                  mainIndustries.includes(ind)
                                    ? 'border-purple-600 bg-purple-50 text-purple-700 font-medium'
                                    : 'border-[#e5e5e5] text-[#575757] hover:border-purple-600'
                                }`}
                              >
                                {ind}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-2">
                            Institutional Certifications
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              'ISO 9001 (Quality)',
                              'ISO 17025 (Testing Labs)',
                              'SMETA / Sedex Ethical Audit',
                              'OEKO-TEX Standard 100',
                              'GOTS Organic Standard',
                              'AEO Customs Tier 2',
                              'RJC Responsible Jewellery'
                            ].map((cert) => (
                              <button
                                key={cert}
                                type="button"
                                onClick={() => toggleArrayItem(setCertifications, cert)}
                                className={`px-3 py-1.5 text-xs rounded-none border transition-colors cursor-pointer ${
                                  certifications.includes(cert)
                                    ? 'border-purple-600 bg-purple-50 text-purple-700 font-medium'
                                    : 'border-[#e5e5e5] text-[#575757] hover:border-purple-600'
                                }`}
                              >
                                {cert}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Infrastructure & Facilities
                          </label>
                          <textarea
                            rows={2}
                            value={infrastructure}
                            onChange={(e) => setInfrastructure(e.target.value)}
                            placeholder="Description of testing benches, clean rooms, bonded warehouse facilities, automated sorting hubs..."
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* TAB 3: PRODUCTS & CATEGORIES HIERARCHY                  */}
                  {/* ======================================================== */}
                  {activeTab === 3 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <span className="text-[11px] uppercase tracking-luxury text-[#c5a880] block font-semibold mb-1">
                          SECTION 3 OF 7
                        </span>
                        <h2 className="font-serif-luxury text-xl text-[#121212]">
                          Products & Categories Selection
                        </h2>
                        <p className="text-xs text-[#737373] mt-1 font-light">
                          Categorize your offerings across multiple tiers. This structured taxonomy powers your public showcase.
                        </p>
                      </div>

                      {/* Category Selection Tabs */}
                      <div className="space-y-4">
                        <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold">
                          Choose Main Business Categories
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {CATEGORY_TREE.map((cat) => (
                            <div
                              key={cat.category}
                              onClick={() => setSelectedCategory(cat.category)}
                              className={`p-4 border rounded-none cursor-pointer transition-colors ${
                                selectedCategory === cat.category
                                  ? 'border-purple-600 bg-purple-50/40 ring-1 ring-purple-600'
                                  : 'border-[#e5e5e5] hover:border-purple-600'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="font-serif-luxury text-sm font-medium text-[#121212]">
                                  {cat.category}
                                </h4>
                                {selectedCategory === cat.category && (
                                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                                )}
                              </div>
                              <span className="text-[11px] text-[#737373] mt-1 block">
                                {cat.subcategories.length} subcategories available
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Hierarchical Subcategories & Products */}
                        {selectedCategory && (
                          <div className="border border-[#e5e5e5] p-5 bg-[#faf9f6] space-y-4 mt-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-serif-luxury text-sm text-[#121212] font-medium">
                                Subcategories & Offerings under:{' '}
                                <span className="text-purple-600">{selectedCategory}</span>
                              </h3>
                              <span className="text-[10px] uppercase tracking-luxury text-[#8c8c8c]">
                                Multi-select enabled
                              </span>
                            </div>

                            {CATEGORY_TREE.find((c) => c.category === selectedCategory)?.subcategories.map(
                              (sub) => (
                                <div key={sub.name} className="border-t border-[#e5e5e5] pt-3 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      id={`sub-${sub.name}`}
                                      checked={selectedSubcategories.includes(sub.name)}
                                      onChange={() => toggleArrayItem(setSelectedSubcategories, sub.name)}
                                      className="rounded-none text-purple-600 focus:ring-purple-500 w-3.5 h-3.5 cursor-pointer"
                                    />
                                    <label
                                      htmlFor={`sub-${sub.name}`}
                                      className="text-xs font-semibold text-[#121212] cursor-pointer"
                                    >
                                      {sub.name}
                                    </label>
                                  </div>

                                  {/* Products under this subcategory */}
                                  <div className="pl-6 flex flex-wrap gap-2 pt-1">
                                    {sub.products.map((prod) => (
                                      <button
                                        key={prod}
                                        type="button"
                                        onClick={() => toggleArrayItem(setSelectedProducts, prod)}
                                        className={`px-2.5 py-1 text-[11px] rounded-none border transition-colors cursor-pointer ${
                                          selectedProducts.includes(prod)
                                            ? 'border-purple-600 bg-purple-600 text-white font-medium'
                                            : 'border-[#d4d4d4] bg-white text-[#575757] hover:border-purple-600'
                                        }`}
                                      >
                                        {prod}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}

                        <div className="p-3 bg-white border border-[#e5e5e5] flex items-center justify-between text-xs">
                          <span className="text-[#575757]">
                            Selected Items for Public Dossier:
                          </span>
                          <span className="font-semibold text-purple-600">
                            {selectedSubcategories.length} Subcategories • {selectedProducts.length} Offerings
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* TAB 4: SELLER PRODUCT / SERVICE LISTING                 */}
                  {/* ======================================================== */}
                  {activeTab === 4 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <span className="text-[11px] uppercase tracking-luxury text-[#c5a880] block font-semibold mb-1">
                          SECTION 4 OF 7
                        </span>
                        <h2 className="font-serif-luxury text-xl text-[#121212]">
                          Product & Service Listing Details
                        </h2>
                        <p className="text-xs text-[#737373] mt-1 font-light">
                          Commercial metrics, lead times, MOQ, specifications, and trade compliance.
                        </p>
                      </div>

                      {/* Basic Listing Data */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                              Product / Service Name *
                            </label>
                            <input
                              type="text"
                              value={listingName}
                              onChange={(e) => setListingName(e.target.value)}
                              placeholder="e.g. Luxury Virgin Wool Tailored Blazer / Fabric Lab Audit"
                              className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                              SKU / Service Code
                            </label>
                            <input
                              type="text"
                              value={listingSku}
                              onChange={(e) => setListingSku(e.target.value)}
                              placeholder="e.g. OPH-SRV-2026-X9"
                              className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Product Description
                          </label>
                          <textarea
                            rows={3}
                            value={listingDescription}
                            onChange={(e) => setListingDescription(e.target.value)}
                            placeholder="Full editorial description, finishing techniques, turnaround SLA, and warranty guarantees..."
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>

                        {/* Media Upload Mock */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="border border-dashed border-[#e5e5e5] p-4 text-center bg-[#faf9f6]">
                            <Upload className="w-5 h-5 mx-auto text-[#737373] mb-1.5" />
                            <span className="text-xs uppercase tracking-luxury font-medium text-[#121212] block">
                              Product / Service Images
                            </span>
                            <span className="text-[10px] text-[#8c8c8c]">
                              High-resolution studio photography or lab photos
                            </span>
                          </div>

                          <div className="border border-dashed border-[#e5e5e5] p-4 text-center bg-[#faf9f6]">
                            <ExternalLink className="w-5 h-5 mx-auto text-[#737373] mb-1.5" />
                            <span className="text-xs uppercase tracking-luxury font-medium text-[#121212] block">
                              Video / Walkthrough URL
                            </span>
                            <span className="text-[10px] text-[#8c8c8c]">
                              Vimeo / YouTube link of showroom or facility
                            </span>
                          </div>
                        </div>

                        {/* Commercial Terms */}
                        <div className="pt-2 border-t border-[#e5e5e5] space-y-4">
                          <h3 className="font-serif-luxury text-base text-[#121212]">
                            Commercial & Production Metrics
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                                Minimum Order (MOQ)
                              </label>
                              <input
                                type="text"
                                value={listingMoq}
                                onChange={(e) => setListingMoq(e.target.value)}
                                placeholder="e.g. 50 units / 1 Batch"
                                className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                                Price / Price Range
                              </label>
                              <input
                                type="text"
                                value={listingPriceRange}
                                onChange={(e) => setListingPriceRange(e.target.value)}
                                placeholder="e.g. $450 - $1,200"
                                className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                                Currency
                              </label>
                              <select
                                value={listingCurrency}
                                onChange={(e) => setListingCurrency(e.target.value)}
                                className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none bg-white transition-colors cursor-pointer"
                              >
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                                <option value="INR">INR (₹)</option>
                                <option value="AED">AED (د.إ)</option>
                                <option value="SGD">SGD (S$)</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                                Lead Time
                              </label>
                              <input
                                type="text"
                                value={leadTime}
                                onChange={(e) => setLeadTime(e.target.value)}
                                placeholder="e.g. 7-14 Business Days"
                                className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                                Supply & Production Capacity
                              </label>
                              <input
                                type="text"
                                value={supplyCapacity}
                                onChange={(e) => setSupplyCapacity(e.target.value)}
                                placeholder="e.g. 100,000 units/month"
                                className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                                Payment Terms
                              </label>
                              <input
                                type="text"
                                value={paymentTerms}
                                onChange={(e) => setPaymentTerms(e.target.value)}
                                placeholder="e.g. Escrow / LC / Net 30 / Advance Wire"
                                className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Trade & Customization with Flag of Origin */}
                        <div className="pt-2 border-t border-[#e5e5e5] space-y-4">
                          <h3 className="font-serif-luxury text-base text-[#121212]">
                            Specifications & Cross-Border Trade
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                                HS Code
                              </label>
                              <input
                                type="text"
                                value={hsCode}
                                onChange={(e) => setHsCode(e.target.value)}
                                placeholder="e.g. 6203.11.00"
                                className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                                Country of Origin
                              </label>
                              <div className="relative flex items-center">
                                <div className="absolute left-3 flex items-center pointer-events-none z-10">
                                  <CountryFlag country={countryOfOrigin} className="w-5 h-3.5" />
                                </div>
                                <select
                                  value={countryOfOrigin}
                                  onChange={(e) => setCountryOfOrigin(e.target.value)}
                                  className="w-full text-xs p-3 pl-11 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none bg-white transition-colors cursor-pointer"
                                >
                                  {ALL_COUNTRIES_LIST.map((c) => (
                                    <option key={c.name} value={c.name}>
                                      {c.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                                Port of Loading
                              </label>
                              <input
                                type="text"
                                value={portOfLoading}
                                onChange={(e) => setPortOfLoading(e.target.value)}
                                placeholder="e.g. JNPT Mumbai / Genoa Italy"
                                className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* TAB 5: MARKETS & SUPPLY COVERAGE ("WHERE CAN YOU SUPPLY")*/}
                  {/* ======================================================== */}
                  {activeTab === 5 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <span className="text-[11px] uppercase tracking-luxury text-[#c5a880] block font-semibold mb-1">
                          SECTION 5 OF 7 • VERY IMPORTANT
                        </span>
                        <h2 className="font-serif-luxury text-xl text-[#121212]">
                          Where Can You Supply?
                        </h2>
                        <p className="text-xs text-[#737373] mt-1 font-light">
                          Configure your geographic coverage at both national and city levels with verified cross-border logistics.
                        </p>
                      </div>

                      {/* Domestic Supply Toggle */}
                      <div className="p-4 border border-[#e5e5e5] bg-[#faf9f6] flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <CountryFlag country={country} className="w-5 h-3.5" />
                            <h4 className="text-xs font-semibold text-[#121212] uppercase tracking-luxury">
                              Can You Supply Domestically in {country}?
                            </h4>
                          </div>
                          <span className="text-[11px] text-[#737373] font-light mt-0.5 block">
                            Enable domestic order fulfillment inside your home country.
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setCanSupplyDomestically(true)}
                            className={`px-4 py-2 text-xs uppercase tracking-luxury font-medium border cursor-pointer ${
                              canSupplyDomestically
                                ? 'border-purple-600 bg-purple-600 text-white'
                                : 'border-[#e5e5e5] bg-white text-[#575757]'
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setCanSupplyDomestically(false)}
                            className={`px-4 py-2 text-xs uppercase tracking-luxury font-medium border cursor-pointer ${
                              !canSupplyDomestically
                                ? 'border-purple-600 bg-purple-600 text-white'
                                : 'border-[#e5e5e5] bg-white text-[#575757]'
                            }`}
                          >
                            No
                          </button>
                        </div>
                      </div>

                      {/* Multi-Select Countries by Region with Flags & Search */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold">
                            Countries You Supply To (Searchable Multi-Select)
                          </label>
                          {/* Live Search Input */}
                          <div className="relative w-full sm:w-64">
                            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8c8c8c]" />
                            <input
                              type="text"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              placeholder="Search country (e.g. India, USA)..."
                              className="w-full text-xs pl-8 pr-3 py-1.5 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none bg-white transition-colors"
                            />
                          </div>
                        </div>

                        {/* Selected Countries Badges Bar */}
                        {supplyCountries.length > 0 && (
                          <div className="p-3 bg-[#faf9f6] border border-[#e5e5e5] space-y-2">
                            <span className="text-[10px] uppercase tracking-luxury font-bold text-purple-600 block">
                              Active Supply Destinations ({supplyCountries.length} Countries Selected)
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {supplyCountries.map((c) => (
                                <span
                                  key={c}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white border border-purple-300 text-[#121212] rounded-none shadow-2xs"
                                >
                                  <CountryFlag country={c} className="w-4 h-2.5" />
                                  <span className="font-medium text-[11px]">{c}</span>
                                  <button
                                    type="button"
                                    onClick={() => toggleArrayItem(setSupplyCountries, c)}
                                    className="text-[#8c8c8c] hover:text-purple-600 ml-1 font-bold cursor-pointer text-xs"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Regional Country Grid with Flags */}
                        {Object.entries(SUPPLY_REGIONS).map(([region, countriesList]) => {
                          const filtered = countriesList.filter((c) =>
                            c.name.toLowerCase().includes(countrySearch.toLowerCase())
                          );
                          if (filtered.length === 0) return null;

                          return (
                            <div key={region} className="border border-[#e5e5e5] p-4 bg-white space-y-2">
                              <span className="text-[11px] uppercase tracking-luxury font-bold text-purple-600 block">
                                {region}
                              </span>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-1">
                                {filtered.map((cntry) => {
                                  const isSelected = supplyCountries.includes(cntry.name);
                                  return (
                                    <button
                                      key={cntry.name}
                                      type="button"
                                      onClick={() => toggleArrayItem(setSupplyCountries, cntry.name)}
                                      className={`p-2.5 text-xs text-left border rounded-none flex items-center justify-between cursor-pointer transition-colors ${
                                        isSelected
                                          ? 'border-purple-600 bg-purple-50 text-purple-700 font-medium ring-1 ring-purple-600'
                                          : 'border-[#e5e5e5] text-[#575757] hover:border-purple-600 bg-white'
                                      }`}
                                    >
                                      <span className="flex items-center gap-2 min-w-0">
                                        <CountryFlag
                                          country={cntry.name}
                                          code={cntry.code}
                                          className="w-5 h-3.5"
                                        />
                                        <span className="truncate">{cntry.name}</span>
                                      </span>
                                      {isSelected && (
                                        <Check className="w-3.5 h-3.5 text-purple-600 shrink-0 ml-1" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* City-Level Supply Coverage */}
                      <div className="pt-4 border-t border-[#e5e5e5] space-y-4">
                        <div>
                          <h3 className="font-serif-luxury text-base text-[#121212]">
                            City-Level Supply Coverage
                          </h3>
                          <p className="text-xs text-[#737373] font-light">
                            Select specific metropolitan centers or declare nationwide coverage for selected logistics territories.
                          </p>
                        </div>

                        {/* Country Selector for City Drilldown with Flags */}
                        <div className="flex flex-wrap items-center gap-2">
                          {supplyCountries.filter((c) => COUNTRY_CITIES[c]).map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setSelectedCountryForCities(c)}
                              className={`px-3 py-1.5 text-xs uppercase tracking-luxury font-medium border cursor-pointer flex items-center gap-2 transition-colors ${
                                selectedCountryForCities === c
                                  ? 'border-purple-600 bg-purple-600 text-white'
                                  : 'border-[#e5e5e5] text-[#575757] hover:border-purple-600 bg-white'
                              }`}
                            >
                              <CountryFlag country={c} className="w-4 h-3" />
                              <span>{c}</span>
                            </button>
                          ))}
                        </div>

                        {/* Drilldown Box for Selected Country */}
                        {selectedCountryForCities && COUNTRY_CITIES[selectedCountryForCities] && (
                          <div className="border border-[#e5e5e5] p-5 bg-[#faf9f6] space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <CountryFlag
                                  country={selectedCountryForCities}
                                  className="w-5 h-3.5"
                                />
                                <h4 className="text-xs font-semibold text-[#121212] uppercase tracking-luxury">
                                  Cities in {selectedCountryForCities}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setCityCoverageMode((prev) => ({
                                      ...prev,
                                      [selectedCountryForCities]: 'all'
                                    }))
                                  }
                                  className={`px-3 py-1 text-xs uppercase tracking-luxury font-medium border cursor-pointer ${
                                    (cityCoverageMode[selectedCountryForCities] || 'all') === 'all'
                                      ? 'border-purple-600 bg-purple-600 text-white'
                                      : 'border-[#e5e5e5] bg-white text-[#575757]'
                                  }`}
                                >
                                  All Cities
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setCityCoverageMode((prev) => ({
                                      ...prev,
                                      [selectedCountryForCities]: 'selected'
                                    }))
                                  }
                                  className={`px-3 py-1 text-xs uppercase tracking-luxury font-medium border cursor-pointer ${
                                    cityCoverageMode[selectedCountryForCities] === 'selected'
                                      ? 'border-purple-600 bg-purple-600 text-white'
                                      : 'border-[#e5e5e5] bg-white text-[#575757]'
                                  }`}
                                >
                                  Selected Cities
                                </button>
                              </div>
                            </div>

                            {cityCoverageMode[selectedCountryForCities] === 'selected' ? (
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                                {COUNTRY_CITIES[selectedCountryForCities].map((cityName) => {
                                  const activeCities =
                                    selectedCitiesByCountry[selectedCountryForCities] || [];
                                  const isChecked = activeCities.includes(cityName);
                                  return (
                                    <button
                                      key={cityName}
                                      type="button"
                                      onClick={() => {
                                        setSelectedCitiesByCountry((prev) => {
                                          const cur = prev[selectedCountryForCities] || [];
                                          const next = cur.includes(cityName)
                                            ? cur.filter((x) => x !== cityName)
                                            : [...cur, cityName];
                                          return { ...prev, [selectedCountryForCities]: next };
                                        });
                                      }}
                                      className={`p-2 text-xs border rounded-none flex items-center justify-between cursor-pointer transition-colors ${
                                        isChecked
                                          ? 'border-purple-600 bg-purple-50 text-purple-700 font-medium ring-1 ring-purple-600'
                                          : 'border-[#e5e5e5] bg-white text-[#575757] hover:border-purple-600'
                                      }`}
                                    >
                                      <span>{cityName}</span>
                                      {isChecked && <Check className="w-3 h-3 text-purple-600" />}
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="text-xs text-[#737373] italic flex items-center gap-1.5">
                                <CountryFlag
                                  country={selectedCountryForCities}
                                  className="w-4 h-3 inline-block"
                                />
                                Active Coverage: Full territory access across all metropolitan zones in{' '}
                                {selectedCountryForCities}.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* TAB 6: SUPPLY & EXPORT CAPABILITY                       */}
                  {/* ======================================================== */}
                  {activeTab === 6 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <span className="text-[11px] uppercase tracking-luxury text-[#c5a880] block font-semibold mb-1">
                          SECTION 6 OF 7
                        </span>
                        <h2 className="font-serif-luxury text-xl text-[#121212]">
                          Supply & Export Capability
                        </h2>
                        <p className="text-xs text-[#737373] mt-1 font-light">
                          Define manufacturing models, volume capacities, and international freight modalities.
                        </p>
                      </div>

                      {/* Supply Type Tags */}
                      <div className="space-y-3">
                        <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold">
                          Supply / Engagement Type (Multi-Select)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'Ready Stock',
                            'Made to Order',
                            'Custom Manufacturing',
                            'OEM',
                            'ODM',
                            'Private Label',
                            'Bulk Supply',
                            'Wholesale'
                          ].map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => toggleArrayItem(setSupplyTypes, st)}
                              className={`p-2.5 text-xs text-center border rounded-none cursor-pointer transition-colors ${
                                supplyTypes.includes(st)
                                  ? 'border-purple-600 bg-purple-50 text-purple-700 font-medium ring-1 ring-purple-600'
                                  : 'border-[#e5e5e5] text-[#575757] hover:border-purple-600'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Capacity Metrics */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Capacity Frequency
                          </label>
                          <div className="grid grid-cols-4 gap-1">
                            {(['Daily', 'Weekly', 'Monthly', 'Annual'] as const).map((freq) => (
                              <button
                                key={freq}
                                type="button"
                                onClick={() => setCapacityFrequency(freq)}
                                className={`py-2 text-xs border rounded-none uppercase tracking-luxury font-medium cursor-pointer ${
                                  capacityFrequency === freq
                                    ? 'border-purple-600 bg-purple-600 text-white'
                                    : 'border-[#e5e5e5] text-[#575757] hover:border-purple-600'
                                }`}
                              >
                                {freq}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Volume Metric
                          </label>
                          <input
                            type="text"
                            value={capacityUnits}
                            onChange={(e) => setCapacityUnits(e.target.value)}
                            placeholder="e.g. 100,000 units / 500 audit reports"
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Export Capability with Flags */}
                      <div className="pt-2 border-t border-[#e5e5e5] space-y-4">
                        <h3 className="font-serif-luxury text-base text-[#121212]">
                          Cross-Border Export Operations
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                              Exporting Since
                            </label>
                            <input
                              type="number"
                              min="1950"
                              max="2026"
                              value={exportingSince}
                              onChange={(e) => setExportingSince(e.target.value)}
                              placeholder="e.g. 2016"
                              className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                              Export Volume (Optional)
                            </label>
                            <input
                              type="text"
                              value={exportVolume}
                              onChange={(e) => setExportVolume(e.target.value)}
                              placeholder="e.g. $5M - $10M"
                              className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                            />
                          </div>
                        </div>

                        {/* Export Destination Countries with Flags */}
                        <div className="space-y-2">
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold">
                            Primary Export Countries (Click to Toggle)
                          </label>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {[
                              'USA',
                              'UK',
                              'Germany',
                              'France',
                              'Italy',
                              'UAE',
                              'Saudi Arabia',
                              'Singapore',
                              'Japan',
                              'Australia',
                              'Canada',
                              'Spain',
                              'China',
                              'India'
                            ].map((c) => {
                              const isSelected = exportCountries.includes(c);
                              return (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => toggleArrayItem(setExportCountries, c)}
                                  className={`px-3 py-1.5 text-xs border rounded-none flex items-center gap-2 cursor-pointer transition-colors ${
                                    isSelected
                                      ? 'border-purple-600 bg-purple-50 text-purple-700 font-medium ring-1 ring-purple-600'
                                      : 'border-[#e5e5e5] bg-white text-[#575757] hover:border-purple-600'
                                  }`}
                                >
                                  <CountryFlag country={c} className="w-4 h-3" />
                                  <span>{c}</span>
                                  {isSelected && <Check className="w-3 h-3 text-purple-600" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-1">
                            Major Shipping Ports & Freight Hubs
                          </label>
                          <input
                            type="text"
                            value={majorPorts}
                            onChange={(e) => setMajorPorts(e.target.value)}
                            placeholder="e.g. JNPT Mumbai, Port of Hamburg, Dubai Jebel Ali"
                            className="w-full text-xs p-3 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-luxury text-[#121212] font-semibold mb-2">
                            Shipping & Transit Modes
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {['Sea', 'Air', 'Road', 'Rail', 'Courier'].map((mode) => (
                              <button
                                key={mode}
                                type="button"
                                onClick={() => toggleArrayItem(setShippingModes, mode)}
                                className={`px-4 py-2 text-xs rounded-none border uppercase tracking-luxury font-medium cursor-pointer transition-colors ${
                                  shippingModes.includes(mode)
                                    ? 'border-purple-600 bg-purple-50 text-purple-700 ring-1 ring-purple-600'
                                    : 'border-[#e5e5e5] text-[#575757] hover:border-purple-600 bg-white'
                                }`}
                              >
                                {mode}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* TAB 7: DOCUMENTS & INDIVIDUAL VISIBILITY                */}
                  {/* ======================================================== */}
                  {activeTab === 7 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <span className="text-[11px] uppercase tracking-luxury text-[#c5a880] block font-semibold mb-1">
                          SECTION 7 OF 7 • CRITICAL
                        </span>
                        <h2 className="font-serif-luxury text-xl text-[#121212]">
                          Seller Documents, Records & Visibility
                        </h2>
                        <p className="text-xs text-[#737373] mt-1 font-light">
                          Upload institutional credentials and set privacy controls for each document.
                        </p>
                      </div>

                      {/* Security Notice */}
                      <div className="p-3.5 border border-[#e5e5e5] bg-[#faf9f6] flex items-start gap-2.5 text-xs text-[#575757]">
                        <Lock className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-[#121212] uppercase tracking-luxury">
                            Commercial Data Protection:
                          </span>{' '}
                          Sensitive financial documents (Tax, Invoices, Purchase Orders) default to{' '}
                          <span className="font-semibold text-purple-600">Private (Admin only)</span> and are never shared publicly.
                        </div>
                      </div>

                      {/* Documents List with Upload & Visibility Dropdown */}
                      <div className="space-y-3">
                        {DOCUMENT_TYPES.map((doc) => {
                          const state = docUploads[doc.id] || {
                            uploaded: false,
                            visibility: doc.defaultVisibility
                          };
                          return (
                            <div
                              key={doc.id}
                              className="p-3.5 border border-[#e5e5e5] rounded-none bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-600/60 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-8 h-8 rounded-none border flex items-center justify-center ${
                                    state.uploaded
                                      ? 'border-purple-600 bg-purple-50 text-purple-600'
                                      : 'border-[#e5e5e5] bg-[#faf9f6] text-[#8c8c8c]'
                                  }`}
                                >
                                  {state.uploaded ? (
                                    <Check className="w-4 h-4 stroke-[2.5]" />
                                  ) : (
                                    <FileText className="w-4 h-4" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-xs font-semibold text-[#121212]">
                                    {doc.label}
                                  </h4>
                                  <span className="text-[10px] text-[#737373]">
                                    {state.uploaded ? (
                                      <span className="text-purple-600 font-mono">
                                        {state.fileName}
                                      </span>
                                    ) : (
                                      'PDF / JPG / PNG up to 15MB'
                                    )}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Upload Trigger Button */}
                                {!state.uploaded ? (
                                  <button
                                    type="button"
                                    onClick={() => handleMockDocUpload(doc.id, doc.label)}
                                    className="px-3 py-1.5 border border-[#e5e5e5] hover:border-purple-600 hover:text-purple-600 text-[11px] uppercase tracking-luxury font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                                  >
                                    <Upload className="w-3 h-3" />
                                    <span>Upload</span>
                                  </button>
                                ) : (
                                  <span className="text-[10px] uppercase tracking-luxury text-emerald-600 font-semibold px-2 py-1 bg-emerald-50 border border-emerald-200">
                                    Attached
                                  </span>
                                )}

                                {/* Visibility Selector */}
                                <select
                                  value={state.visibility}
                                  onChange={(e) =>
                                    handleDocumentVisibilityChange(doc.id, e.target.value)
                                  }
                                  className="text-[11px] p-1.5 border border-[#e5e5e5] focus:border-purple-600 outline-none rounded-none bg-white font-medium text-[#121212] cursor-pointer"
                                >
                                  <option value="Private">Private — Admin only</option>
                                  <option value="Verified">Verified Badge</option>
                                  <option value="Visible to Buyers">Visible to Buyers</option>
                                  <option value="Visible only after inquiry">
                                    Visible only after inquiry
                                  </option>
                                  <option value="Public">Public</option>
                                </select>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Final Submit Block */}
                      <div className="pt-4 border-t border-[#e5e5e5] space-y-3">
                        <button
                          type="submit"
                          className="w-full py-4 px-6 rounded-none border-2 border-purple-600 bg-white text-purple-600 hover:bg-purple-600 hover:text-white text-xs uppercase tracking-luxury font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          <span>Transmit Service Provider Accreditation Dossier</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <p className="text-[10px] text-[#8c8c8c] text-center font-light">
                          By transmitting, you confirm that corporate credentials and documentation are accurate and authentic under international trade standards.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Previous / Next Tab Controls */}
                  <div className="pt-4 border-t border-[#e5e5e5] flex items-center justify-between">
                    {activeTab > 1 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab((prev) => Math.max(1, prev - 1));
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="py-2.5 px-5 border border-[#e5e5e5] hover:border-purple-600 hover:text-purple-600 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Previous Section</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {activeTab < 7 && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab((prev) => Math.min(7, prev + 1));
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="py-2.5 px-6 border-2 border-purple-600 bg-white text-purple-600 hover:bg-purple-600 hover:text-white text-xs uppercase tracking-luxury font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Next: {TABS[activeTab].title}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: PURPLE BORDER OWL + THOUGHT CLOUD BUBBLE     */}
          {/* STICKY BELOW FIXED HEADER (84px) SO ENTIRE PET IS VISIBLE  */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 relative">
            <div className="lg:sticky lg:top-[84px] flex flex-col items-center">
              {/* THOUGHT CLOUD */}
              <div className="w-full max-w-[380px] sm:max-w-[420px] flex flex-col items-center">
                <PurpleBorderCloud>
                  <h3 className="font-serif-luxury text-base sm:text-lg md:text-xl text-[#121212] font-medium leading-snug text-center">
                    Thanks for choosing to be our Service Provider!
                  </h3>
                </PurpleBorderCloud>

                {/* Thought trail dots */}
                <div className="flex flex-col items-center gap-0.5 my-0.5">
                  <div className="w-2.5 h-2.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-2" />
                  <div className="w-1.5 h-1.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-4" />
                </div>
              </div>

              {/* PURPLE OUTLINE OWL - Prominent Large Mascot */}
              <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 max-h-[260px] sm:max-h-[285px] aspect-square bg-transparent flex items-center justify-center -mt-1 sm:-mt-2">
                <PurpleBorderOwl />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
