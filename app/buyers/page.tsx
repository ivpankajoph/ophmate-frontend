'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  X,
  CheckCircle2,
  Loader2,
  Search,
  ChevronDown,
  MapPin
} from 'lucide-react';

import {
  ALL_SOURCING_COUNTRIES,
  COUNTRY_FLAGS,
  COUNTRIES,
  type SourcingCountry
} from '@/data/countries';
export { ALL_SOURCING_COUNTRIES, COUNTRY_FLAGS, COUNTRIES, type SourcingCountry };

// Target Delivery Timeline Dropdown Options
const TIMELINE_OPTIONS = [
  'Within 15 days',
  'Within 30 days',
  'Within 45 days',
  '60 - 90 days',
  'Immediate / Ready Stock',
  'Custom / Flexible'
];

// Budget Options in USD with corresponding clean INR approximate value
const BUDGET_OPTIONS = [
  {
    value: 'Under $5,000 USD',
    label: 'Under $5,000 USD',
    approxInr: '₹4.25 Lakh'
  },
  {
    value: '$5,000 - $10,000 USD',
    label: '$5,000 - $10,000 USD',
    approxInr: '₹4.25 Lakh – ₹8.50 Lakh'
  },
  {
    value: '$10,000 - $25,000 USD',
    label: '$10,000 - $25,000 USD',
    approxInr: '₹8.50 Lakh – ₹21.25 Lakh'
  },
  {
    value: '$25,000 - $50,000 USD',
    label: '$25,000 - $50,000 USD',
    approxInr: '₹21.25 Lakh – ₹42.50 Lakh'
  },
  {
    value: '$50,000 - $100,000 USD',
    label: '$50,000 - $100,000 USD',
    approxInr: '₹42.50 Lakh – ₹85.00 Lakh'
  },
  {
    value: '$100,000 - $250,000 USD',
    label: '$100,000 - $250,000 USD',
    approxInr: '₹85.00 Lakh – ₹2.12 Crore'
  },
  {
    value: '$250,000+ USD',
    label: '$250,000+ USD',
    approxInr: '₹2.12 Crore+'
  }
];

// Indian States and Union Territories list for the state dropdown
const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
  'Other / Outside India'
];

// Helper to get Backend Base URL
const getBackendBase = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';
  return envUrl.replace(/\/api\/ophmart\/?$/, '').replace(/\/api\/?$/, '');
};

// Purple Border Bunny Mascot
const PurpleBorderBunny: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full text-purple-600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
      <path
        d="M 86 64 Q 100 66 114 64"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 76 68 C 58 78 52 102 70 118 C 86 128 114 128 130 118 C 148 102 142 78 124 68"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      <path
        d="M 97 92 L 103 92 L 100 96 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M 100 96 L 100 99 M 100 99 Q 94 104 89 100 M 100 99 Q 106 104 111 100"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
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

// Thought Cloud
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

export interface SampleImageItem {
  id: string;
  name: string;
  sizeKb: number;
  preview: string;
  url?: string;
  isUploading: boolean;
  error?: string;
}

export default function BuyersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    budgetInrApprox: '',
    customisationBranding: '',
    sampleTrialRequirement: 'Yes',
    fullName: '',
    email: '',
    mobile: '',
    whatsapp: '',
    sameAsMobile: false,
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    companyName: '',
    companyWebsite: ''
  });

  // Multiple Sample Images Upload State (Limit: 500 KB per image)
  const [sampleImages, setSampleImages] = useState<SampleImageItem[]>([]);
  const [sampleImagesError, setSampleImagesError] = useState<string | null>(null);

  // Supporting Document Upload State (Limit: 500 KB)
  const [supportingDoc, setSupportingDoc] = useState<{
    name: string;
    sizeKb: number;
    url?: string;
  } | null>(null);
  const [supportingDocError, setSupportingDocError] = useState<string | null>(null);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);

  // Contextual OTP Verification: Email
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [emailOtpCode, setEmailOtpCode] = useState('');
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailOtpError, setEmailOtpError] = useState<string | null>(null);
  const [emailResendTimer, setEmailResendTimer] = useState(0);

  // Contextual OTP Verification: Number (WhatsApp / Mobile)
  const [isPhoneOtpSent, setIsPhoneOtpSent] = useState(false);
  const [phoneOtpCode, setPhoneOtpCode] = useState('');
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneOtpError, setPhoneOtpError] = useState<string | null>(null);
  const [phoneResendTimer, setPhoneResendTimer] = useState(0);

  // Free OpenStreetMap / Photon Address & City Autocomplete State
  interface AddressSuggestionItem {
    id: string;
    primary: string;
    secondary: string;
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  }

  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestionItem[]>([]);
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const addressContainerRef = useRef<HTMLDivElement | null>(null);
  const justSelectedAddressRef = useRef(false);

  const [citySuggestions, setCitySuggestions] = useState<AddressSuggestionItem[]>([]);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const cityContainerRef = useRef<HTMLDivElement | null>(null);
  const justSelectedCityRef = useRef(false);

  // Searchable Multi-Select Country Dropdown State
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const countryDropdownRef = useRef<HTMLDivElement | null>(null);

  // Match raw state name to INDIAN_STATES list (or return raw)
  const matchIndianState = (rawState: string) => {
    if (!rawState) return '';
    const clean = rawState.toLowerCase().trim();
    const directMatch = INDIAN_STATES.find((s) => s.toLowerCase() === clean);
    if (directMatch) return directMatch;
    const partialMatch = INDIAN_STATES.find(
      (s) => clean.includes(s.toLowerCase()) || s.toLowerCase().includes(clean)
    );
    if (partialMatch) return partialMatch;
    return rawState;
  };

  // Close address / city / country dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
      }
      if (
        addressContainerRef.current &&
        !addressContainerRef.current.contains(e.target as Node)
      ) {
        setIsAddressDropdownOpen(false);
      }
      if (
        cityContainerRef.current &&
        !cityContainerRef.current.contains(e.target as Node)
      ) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Free OpenStreetMap / Photon Autocomplete for Address Line 1
  useEffect(() => {
    if (justSelectedAddressRef.current) {
      justSelectedAddressRef.current = false;
      return;
    }

    const query = formData.addressLine1?.trim();
    if (!query || query.length < 3) {
      setAddressSuggestions([]);
      setIsAddressDropdownOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoadingAddress(true);
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lang=en&limit=5`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data && Array.isArray(data.features)) {
          const items: AddressSuggestionItem[] = data.features.map((f: any, idx: number) => {
            const p = f.properties || {};
            const primary =
              [p.housenumber, p.street || p.name].filter(Boolean).join(' ') ||
              p.name ||
              p.city ||
              query;
            const secondaryParts = [p.district, p.city, p.state, p.country].filter(Boolean);
            const uniqueSecondary = secondaryParts.filter(
              (v: string, i: number, a: string[]) => a.indexOf(v) === i && v !== primary
            );
            return {
              id: `${p.osm_id || idx}-${idx}`,
              primary,
              secondary: uniqueSecondary.join(', '),
              addressLine1: primary,
              city: p.city || p.district || p.name || '',
              state: matchIndianState(p.state || ''),
              pincode: p.postcode || '',
              country: p.country || ''
            };
          });
          setAddressSuggestions(items);
          setIsAddressDropdownOpen(items.length > 0);
        }
      } catch (err) {
        console.warn('Address autocomplete error:', err);
      } finally {
        setIsLoadingAddress(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [formData.addressLine1]);

  // Free OpenStreetMap / Photon Autocomplete for City
  useEffect(() => {
    if (justSelectedCityRef.current) {
      justSelectedCityRef.current = false;
      return;
    }

    const query = formData.city?.trim();
    if (!query || query.length < 2) {
      setCitySuggestions([]);
      setIsCityDropdownOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoadingCity(true);
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lang=en&limit=5`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data && Array.isArray(data.features)) {
          const items: AddressSuggestionItem[] = data.features
            .filter((f: any) => {
              const p = f.properties || {};
              return (
                p.city ||
                p.name ||
                p.type === 'city' ||
                p.osm_value === 'city' ||
                p.osm_value === 'town'
              );
            })
            .map((f: any, idx: number) => {
              const p = f.properties || {};
              const cityVal = p.city || p.name || query;
              const secondary = [p.state, p.country].filter(Boolean).join(', ');
              return {
                id: `city-${p.osm_id || idx}-${idx}`,
                primary: cityVal,
                secondary,
                addressLine1: '',
                city: cityVal,
                state: matchIndianState(p.state || ''),
                pincode: p.postcode || '',
                country: p.country || ''
              };
            });
          setCitySuggestions(items);
          setIsCityDropdownOpen(items.length > 0);
        }
      } catch (err) {
        console.warn('City autocomplete error:', err);
      } finally {
        setIsLoadingCity(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [formData.city]);

  // Automatic City & State lookup from 6-digit PIN code (India)
  useEffect(() => {
    const pin = formData.pincode?.trim();
    if (pin && /^\d{6}$/.test(pin)) {
      fetch(`https://api.postalpincode.in/pincode/${pin}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data[0]?.Status === 'Success') {
            const postOffices = data[0].PostOffice;
            if (Array.isArray(postOffices) && postOffices.length > 0) {
              const po = postOffices[0];
              const detectedCity = po.District || po.Block || po.Circle;
              const detectedState = matchIndianState(po.State || '');
              setFormData((prev) => ({
                ...prev,
                city: prev.city || detectedCity || '',
                state: detectedState || prev.state
              }));
            }
          }
        })
        .catch((err) => console.warn('Pincode lookup error:', err));
    }
  }, [formData.pincode]);

  const handleSelectAddressSuggestion = (item: AddressSuggestionItem) => {
    justSelectedAddressRef.current = true;
    setFormData((prev) => ({
      ...prev,
      addressLine1: item.addressLine1 || prev.addressLine1,
      city: item.city || prev.city,
      state: item.state || prev.state,
      pincode: item.pincode || prev.pincode
    }));
    setIsAddressDropdownOpen(false);
  };

  const handleSelectCitySuggestion = (item: AddressSuggestionItem) => {
    justSelectedCityRef.current = true;
    setFormData((prev) => ({
      ...prev,
      city: item.city || prev.city,
      state: item.state || prev.state
    }));
    setIsCityDropdownOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Budget Selection & Auto Approximate INR calculation
  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const matchedOption = BUDGET_OPTIONS.find((b) => b.value === selectedValue);
    setFormData((prev) => ({
      ...prev,
      budget: selectedValue,
      budgetInrApprox: matchedOption ? matchedOption.approxInr : ''
    }));
  };

  // Handle WhatsApp "Same as Mobile" Toggle
  const handleSameAsMobileToggle = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      sameAsMobile: checked,
      whatsapp: checked ? prev.mobile : prev.whatsapp
    }));
    if (phoneVerified) {
      setPhoneVerified(false);
      setIsPhoneOtpSent(false);
    }
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

  // Upload file via backend media API
  const uploadToMedia = async (file: File, folder = 'ophmate/uploads') => {
    const backendBase = getBackendBase();
    const data = new FormData();
    data.append('file', file);
    data.append('folder', folder);
    const resourceType = file.type.startsWith('image/')
      ? 'image'
      : file.type.startsWith('video/')
        ? 'video'
        : 'raw';
    data.append('resourceType', resourceType);

    const uploadRes = await fetch(`${backendBase}/api/v1/public/media/upload`, {
      method: 'POST',
      body: data
    });

    if (!uploadRes.ok) {
      const errPayload = await uploadRes.json().catch(() => null);
      throw new Error(errPayload?.message || 'File upload failed');
    }

    const resJson = await uploadRes.json();
    const fileUrl =
      resJson.url || resJson.data?.secure_url || resJson.data?.url || '';
    if (!fileUrl) {
      throw new Error('Upload succeeded but no file URL was returned');
    }
    return fileUrl;
  };

  // Handle Multiple Sample Images Upload (Limit: 500 KB per file)
  const handleSampleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setSampleImagesError(null);

    const MAX_KB = 500;
    const newItems: SampleImageItem[] = [];
    const filesToUpload: { item: SampleImageItem; file: File }[] = [];

    for (const file of files) {
      const sizeInKb = Math.round(file.size / 1024);
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const exceeds = file.size > MAX_KB * 1024;

      const item: SampleImageItem = {
        id,
        name: file.name,
        sizeKb: sizeInKb,
        preview: '',
        isUploading: !exceeds,
        error: exceeds ? `File exceeds 500 KB limit (${sizeInKb} KB)` : undefined
      };

      newItems.push(item);
      if (!exceeds) {
        filesToUpload.push({ item, file });
      }
    }

    setSampleImages((prev) => [...prev, ...newItems]);
    e.target.value = '';

    filesToUpload.forEach(({ item, file }) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const localPreview = reader.result as string;
        setSampleImages((prev) =>
          prev.map((img) => (img.id === item.id ? { ...img, preview: localPreview } : img))
        );

        try {
          const fileUrl = await uploadToMedia(file, 'ophmate/uploads');
          setSampleImages((prev) =>
            prev.map((img) =>
              img.id === item.id
                ? { ...img, url: fileUrl, isUploading: false, error: undefined }
                : img
            )
          );
        } catch (err: any) {
          setSampleImages((prev) =>
            prev.map((img) =>
              img.id === item.id
                ? { ...img, isUploading: false, error: err?.message || 'Upload failed' }
                : img
            )
          );
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeSampleImage = (id: string) => {
    setSampleImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Handle Supporting Document File Upload (Limit: 500 KB)
  const handleSupportingDocChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSupportingDocError(null);

    if (!file) return;

    const sizeInKb = Math.round(file.size / 1024);
    const MAX_KB = 500;

    if (file.size > MAX_KB * 1024) {
      setSupportingDocError(
        `File size (${sizeInKb} KB) exceeds the 500 KB limit. Please upload a file under 500 KB.`
      );
      e.target.value = '';
      return;
    }

    setSupportingDoc({
      name: file.name,
      sizeKb: sizeInKb
    });

    try {
      setIsUploadingDoc(true);
      const fileUrl = await uploadToMedia(file, 'ophmate/uploads');
      setSupportingDoc({
        name: file.name,
        sizeKb: sizeInKb,
        url: fileUrl
      });
    } catch (err: any) {
      setSupportingDocError(`Document upload failed: ${err?.message || 'Server error'}`);
    } finally {
      setIsUploadingDoc(false);
    }
  };

  // Get active phone to verify (WhatsApp preferred, fallback to Mobile)
  const getActivePhoneToVerify = () => {
    const raw = formData.whatsapp || formData.mobile;
    return raw.replace(/[^0-9]/g, '');
  };

  // 1. Send Phone OTP
  const handleSendPhoneOtp = async () => {
    setPhoneOtpError(null);
    const cleanPhone = getActivePhoneToVerify();

    if (!cleanPhone || cleanPhone.length < 8) {
      setPhoneOtpError('Please enter a valid phone number with country code first.');
      return;
    }

    try {
      setIsSendingPhoneOtp(true);
      const backendBase = getBackendBase();
      const res = await fetch(`${backendBase}/api/v1/live-chat/whatsapp/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsappNumber: cleanPhone })
      });

      const resData = await res.json().catch(() => null);

      if (!res.ok || !resData?.success) {
        throw new Error(resData?.message || 'Failed to send OTP');
      }

      setIsPhoneOtpSent(true);
      setPhoneResendTimer(resData?.resendAfter || 30);
    } catch (err: any) {
      setPhoneOtpError(err?.message || 'Could not send OTP');
    } finally {
      setIsSendingPhoneOtp(false);
    }
  };

  // 1. Verify Phone OTP
  const handleVerifyPhoneOtp = async () => {
    setPhoneOtpError(null);
    const cleanPhone = getActivePhoneToVerify();

    if (!phoneOtpCode || phoneOtpCode.trim().length < 4) {
      setPhoneOtpError('Please enter the 6-digit OTP code.');
      return;
    }

    try {
      setIsVerifyingPhoneOtp(true);
      const backendBase = getBackendBase();
      const res = await fetch(`${backendBase}/api/v1/live-chat/whatsapp/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsappNumber: cleanPhone,
          otp: phoneOtpCode.trim()
        })
      });

      const resData = await res.json().catch(() => null);

      if (!res.ok || !resData?.success) {
        throw new Error(resData?.message || 'Invalid or expired OTP');
      }

      setPhoneVerified(true);
      setIsPhoneOtpSent(false);
      setPhoneOtpError(null);
    } catch (err: any) {
      setPhoneOtpError(err?.message || 'Verification failed');
    } finally {
      setIsVerifyingPhoneOtp(false);
    }
  };

  // 2. Send Email OTP
  const handleSendEmailOtp = async () => {
    setEmailOtpError(null);
    const emailAddr = formData.email.trim();

    if (!emailAddr || !emailAddr.includes('@')) {
      setEmailOtpError('Please enter a valid email address first.');
      return;
    }

    try {
      setIsSendingEmailOtp(true);
      const backendBase = getBackendBase();
      const res = await fetch(`${backendBase}/api/v1/live-chat/email/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailAddr })
      });

      const resData = await res.json().catch(() => null);

      if (!res.ok || !resData?.success) {
        throw new Error(resData?.message || 'Failed to send OTP to email');
      }

      setIsEmailOtpSent(true);
      setEmailResendTimer(resData?.resendAfter || 30);
    } catch (err: any) {
      setEmailOtpError(err?.message || 'Could not send email OTP');
    } finally {
      setIsSendingEmailOtp(false);
    }
  };

  // 2. Verify Email OTP
  const handleVerifyEmailOtp = async () => {
    setEmailOtpError(null);
    const emailAddr = formData.email.trim();

    if (!emailOtpCode || emailOtpCode.trim().length < 4) {
      setEmailOtpError('Please enter the 6-digit OTP code.');
      return;
    }

    try {
      setIsVerifyingEmailOtp(true);
      const backendBase = getBackendBase();
      const res = await fetch(`${backendBase}/api/v1/live-chat/email/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailAddr,
          otp: emailOtpCode.trim()
        })
      });

      const resData = await res.json().catch(() => null);

      if (!res.ok || !resData?.success) {
        throw new Error(resData?.message || 'Invalid or expired OTP');
      }

      setEmailVerified(true);
      setIsEmailOtpSent(false);
      setEmailOtpError(null);
    } catch (err: any) {
      setEmailOtpError(err?.message || 'Verification failed');
    } finally {
      setIsVerifyingEmailOtp(false);
    }
  };

  // Validation checks for enabling submission
  const isAllInputsFilled = Boolean(
    formData.titleName.trim() &&
    formData.brief.trim() &&
    formData.specification.trim() &&
    (sourcingType === 'product' ? formData.quantityVolume.trim() : true) &&
    formData.targetTimeline.trim() &&
    formData.budget.trim() &&
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.email.includes('@') &&
    formData.mobile.trim() &&
    (formData.sameAsMobile ? formData.mobile.trim() : formData.whatsapp.trim()) &&
    formData.addressLine1.trim() &&
    formData.city.trim() &&
    formData.state.trim() &&
    formData.pincode.trim() &&
    formData.companyName.trim() &&
    formData.companyWebsite.trim()
  );

  const isAllVerified = emailVerified && phoneVerified;
  const isFormComplete = isAllInputsFilled && isAllVerified;

  // Submit Buyer Registration Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!isAllInputsFilled) {
      setSubmitError('Please complete all required fields (*) before submitting.');
      return;
    }

    if (!emailVerified || !phoneVerified) {
      setSubmitError('Please complete both Email and Mobile / WhatsApp OTP verification before submitting.');
      return;
    }

    const isUploadingAny = sampleImages.some((img) => img.isUploading);
    if (isUploadingAny || isUploadingDoc) {
      setSubmitError('Please wait for all sample images and documents to finish uploading before submitting.');
      return;
    }

    const validSampleImages = sampleImages
      .filter((img) => img.url)
      .map((img) => ({
        url: img.url as string,
        name: img.name,
        sizeKb: img.sizeKb
      }));

    const payload = {
      sourcingType,
      titleName: formData.titleName,
      brief: formData.brief,
      specification: formData.specification,
      sampleImageUrl: validSampleImages[0]?.url || '',
      sampleImageName: validSampleImages[0]?.name || '',
      sampleImages: validSampleImages,
      supportingDocUrl: supportingDoc?.url || '',
      supportingDocName: supportingDoc?.name || '',
      currentDealing: formData.currentDealing,
      currentDealingOther: formData.currentDealingOther,
      sourcedBefore: formData.sourcedBefore,
      sourceCountries: formData.sourceCountries,
      quantityVolume: formData.quantityVolume,
      targetTimeline: formData.targetTimeline,
      budget: formData.budget,
      budgetInrApprox: formData.budgetInrApprox,
      customisationBranding: formData.customisationBranding,
      sampleTrialRequirement: formData.sampleTrialRequirement,
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      whatsapp: formData.whatsapp || formData.mobile,
      isVerified: Boolean(phoneVerified && emailVerified),
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      companyName: formData.companyName,
      companyWebsite: formData.companyWebsite
    };

    try {
      setIsSubmitting(true);
      const backendBase = getBackendBase();
      const res = await fetch(`${backendBase}/api/v1/vendors/buyer-register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await res.json().catch(() => null);

      if (!res.ok || !resData?.success) {
        throw new Error(resData?.message || 'Failed to submit buyer registration');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'ophmart_buyer_registration',
          JSON.stringify({
            ...payload,
            submittedAt: new Date().toISOString()
          })
        );
      }

      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err?.message || 'Server error while submitting application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] pt-1 sm:pt-2 pb-16 px-4 sm:px-6 md:px-10 lg:px-12">
      <div className="max-w-[1480px] mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-2 sm:mb-3">
          <Link
            href="/sellers"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury font-medium text-[#737373] hover:text-purple-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Partner Selection
          </Link>
        </div>

        {/* Main Two-Column Layout with Sticky Mascot Right Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ========================================================== */}
          {/* LEFT COLUMN: THE SOURCING APPLICATION FORM                */}
          {/* ========================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
            <div className="border border-[#121212] bg-white p-5 sm:p-7 md:p-8 shadow-xs">
              {/* Header Title Section */}
              <div className="border-b border-[#e5e5e5] pb-4 mb-5">

                <h1 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-[#121212] font-semibold tracking-tight">
                  Buyer Procurement Registration
                </h1>

              </div>

              {submitted ? (
                /* SUCCESS CONFIRMATION VIEW */
                <div className="p-6 sm:p-8 bg-[#faf9f6] border border-purple-200 text-center space-y-4">
                  <div className="w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#121212] font-medium">
                      Inquiry Registered Successfully!
                    </h2>
                    <p className="text-xs sm:text-sm text-[#555555] mt-1 max-w-lg mx-auto">
                      Thank you for choosing Ophmart. Our sourcing desk and matching team have received your request for{' '}
                      <strong>{formData.titleName}</strong>. Our VIP account manager will reach out to you within 24 business hours.
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-[#e5e5e5] max-w-md mx-auto text-left text-xs space-y-2">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Buyer Name:</span>
                      <span className="font-semibold">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Mobile & WhatsApp:</span>
                      <span className="font-mono">{formData.mobile} {phoneVerified && '✓ Verified'}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{formData.email} {emailVerified && '✓ Verified'}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="font-semibold text-purple-700">{formData.budget}</span>
                    </div>
                    {formData.budgetInrApprox && (
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-muted-foreground">Approx Rs:</span>
                        <span className="font-medium text-emerald-700">{formData.budgetInrApprox}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Target Timeline:</span>
                      <span>{formData.targetTimeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery City & State:</span>
                      <span>{formData.city}, {formData.state}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-block text-xs uppercase tracking-luxury text-[#121212] underline hover:text-purple-600 cursor-pointer pt-3 font-semibold"
                  >
                    Submit Another Inquiry or Edit Details
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* ===================================================== */}
                  {/* SECTION 1: SOURCING FOR (PRODUCT VS SERVICES)         */}
                  {/* ===================================================== */}
                  <div className="space-y-3 pb-5 border-b border-[#e5e5e5]">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs sm:text-[13px] uppercase tracking-wider font-bold text-[#121212]">
                        Sourcing For:
                      </label>
                      <span className="text-[10px] sm:text-xs uppercase tracking-luxury text-purple-600 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                        Dynamic Branching Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Product Option Card */}
                      <button
                        type="button"
                        onClick={() => setSourcingType('product')}
                        className={`p-3.5 sm:p-4 border-2 text-left transition-all rounded-none cursor-pointer flex items-start gap-3 ${sourcingType === 'product'
                            ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                            : 'border-[#e5e5e5] hover:border-[#121212] bg-white'
                          }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${sourcingType === 'product'
                              ? 'border-purple-600 bg-purple-600'
                              : 'border-[#a3a3a3]'
                            }`}
                        >
                          {sourcingType === 'product' && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-purple-600" />
                            <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#121212]">
                              Product
                            </span>
                          </div>
                          <span className="text-[11px] sm:text-xs text-[#575757] block mt-0.5 font-light">
                            Physical Goods, Apparel, Materials
                          </span>
                        </div>
                      </button>

                      {/* Services Option Card */}
                      <button
                        type="button"
                        onClick={() => setSourcingType('services')}
                        className={`p-3.5 sm:p-4 border-2 text-left transition-all rounded-none cursor-pointer flex items-start gap-3 ${sourcingType === 'services'
                            ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                            : 'border-[#e5e5e5] hover:border-[#121212] bg-white'
                          }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${sourcingType === 'services'
                              ? 'border-purple-600 bg-purple-600'
                              : 'border-[#a3a3a3]'
                            }`}
                        >
                          {sourcingType === 'services' && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-purple-600" />
                            <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#121212]">
                              Services
                            </span>
                          </div>
                          <span className="text-[11px] sm:text-xs text-[#575757] block mt-0.5 font-light">
                            Professional & Business Services
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* ===================================================== */}
                  {/* SECTION 2: PRODUCT / SERVICE CORE DETAILS             */}
                  {/* ===================================================== */}
                  <div className="space-y-4 sm:space-y-5">
                    <span className="text-xs uppercase tracking-luxury text-purple-700 block font-bold">
                      1. Specification & Scope
                    </span>

                    {/* Product / Service Title */}
                    <div>
                      <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212] mb-1.5">
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
                        className="w-full h-11 px-3.5 py-2.5 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                      />
                    </div>

                    {/* Product / Service Brief */}
                    <div>
                      <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212] mb-1.5">
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
                        className="w-full p-3 sm:p-3.5 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 leading-relaxed transition-colors"
                      />
                    </div>

                    {/* Detailed Specifications */}
                    <div>
                      <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212] mb-0.5">
                        What {sourcingType === 'product' ? 'product' : 'service'} you want, tell us with some specification? *
                      </label>
                      <span className="text-[11px] sm:text-xs text-[#666666] block mb-1.5 font-normal">
                        (If you want more than 1, list your primary ones)
                      </span>
                      <textarea
                        rows={3}
                        name="specification"
                        value={formData.specification}
                        onChange={handleInputChange}
                        required
                        placeholder={
                          sourcingType === 'product'
                            ? 'Detail fabric GSM, color pantone, hardware finish, sizing range, stitching quality standards...'
                            : 'Specify required certifications, service SLAs, turnaround requirements, and compliance standards...'
                        }
                        className="w-full p-3 sm:p-3.5 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 leading-relaxed transition-colors"
                      />
                    </div>

                    {/* SAMPLE IMAGES UPLOAD (PRODUCT ONLY, STRICTLY <= 500 KB PER IMAGE) */}
                    {sourcingType === 'product' && (
                      <div className="p-4 sm:p-5 border border-[#e5e5e5] bg-[#faf9f6] space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div>
                            <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-bold text-[#121212]">
                              Any Product Sample Images
                            </label>
                            <span className="text-[11px] sm:text-xs text-purple-700 block font-semibold mt-0.5">
                              Attachment option below 500 KB only (multiple images allowed).
                            </span>
                          </div>
                          {sampleImages.length > 0 && (
                            <span className="text-xs text-[#737373] font-mono">
                              {sampleImages.length} {sampleImages.length === 1 ? 'image' : 'images'} selected
                            </span>
                          )}
                        </div>

                        {/* Image Gallery Grid */}
                        {sampleImages.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
                            {sampleImages.map((img) => (
                              <div
                                key={img.id}
                                className={`relative group bg-white border p-2 flex flex-col justify-between transition-all ${img.error
                                    ? 'border-red-300 bg-red-50/30'
                                    : img.url
                                      ? 'border-purple-300 shadow-sm'
                                      : 'border-[#e5e5e5]'
                                  }`}
                              >
                                {/* Delete / Remove Button */}
                                <button
                                  type="button"
                                  onClick={() => removeSampleImage(img.id)}
                                  className="absolute -top-2 -right-2 z-10 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 rounded-full p-1 border border-red-200 shadow-sm transition-colors cursor-pointer"
                                  title="Remove image"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>

                                {/* Thumbnail */}
                                <div className="w-full aspect-square bg-[#f5f5f5] overflow-hidden flex items-center justify-center border border-[#ececec] mb-2">
                                  {img.preview ? (
                                    <img
                                      src={img.preview}
                                      alt={img.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                                  )}
                                </div>

                                {/* Name & Size */}
                                <div className="space-y-1">
                                  <p className="text-[11px] font-medium text-[#121212] truncate" title={img.name}>
                                    {img.name}
                                  </p>
                                  <div className="flex items-center justify-between text-[10px]">
                                    <span className="text-[#737373] font-mono">{img.sizeKb} KB</span>
                                    {img.isUploading ? (
                                      <span className="text-purple-600 font-semibold flex items-center gap-1 animate-pulse">
                                        <Loader2 className="w-2.5 h-2.5 animate-spin" /> Uploading
                                      </span>
                                    ) : img.url ? (
                                      <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                                        <Check className="w-2.5 h-2.5" /> Attached
                                      </span>
                                    ) : img.error ? (
                                      <span className="text-red-600 font-semibold truncate max-w-[90px]" title={img.error}>
                                        Failed
                                      </span>
                                    ) : null}
                                  </div>
                                  {img.error && (
                                    <p className="text-[10px] text-red-600 font-medium leading-tight pt-0.5">
                                      {img.error}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Upload / Add More Button */}
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <label className="cursor-pointer inline-flex items-center gap-2 py-2.5 px-4 bg-white border border-[#121212] hover:border-purple-600 hover:text-purple-700 text-xs uppercase tracking-luxury font-semibold text-[#121212] transition-colors rounded-none shadow-sm">
                            <Upload className="w-3.5 h-3.5 text-purple-600" />
                            <span>{sampleImages.length > 0 ? '+ Add More Images' : 'Select Sample Images'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleSampleImagesChange}
                              className="hidden"
                            />
                          </label>

                          {sampleImages.length > 0 && (
                            <span className="text-[11px] text-[#737373]">
                              You can select multiple images at once or add more anytime.
                            </span>
                          )}
                        </div>

                        {sampleImagesError && (
                          <div className="flex items-center gap-2 text-xs text-red-600 pt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{sampleImagesError}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ===================================================== */}
                  {/* SECTION 3: SOURCING HISTORY & ORIGINS                 */}
                  {/* ===================================================== */}
                  <div className="space-y-4 sm:space-y-5 pt-5 border-t border-[#e5e5e5]">
                    <span className="text-xs uppercase tracking-luxury text-purple-700 block font-bold">
                      2. Market Experience & Origins
                    </span>

                    {/* Are you currently dealing in these products / services? */}
                    <div>
                      <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212] mb-2">
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
                            className={`p-3 border text-xs sm:text-sm cursor-pointer flex items-center gap-2.5 transition-colors rounded-none ${formData.currentDealing === option
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
                              className="w-3.5 h-3.5 accent-purple-600"
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
                          className="mt-2 w-full h-11 px-3.5 py-2.5 border border-[#121212] text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600"
                        />
                      )}
                    </div>

                    {/* Have you sourced this product before? */}
                    <div>
                      <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212] mb-2">
                        Have you sourced this {sourcingType === 'product' ? 'product' : 'service'} before?
                      </label>
                      <div className="flex gap-3">
                        {['Yes', 'No'].map((option) => (
                          <label
                            key={option}
                            className={`py-2 px-6 border text-xs sm:text-sm cursor-pointer flex items-center gap-2 transition-colors rounded-none ${formData.sourcedBefore === option
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
                              className="w-3.5 h-3.5 accent-purple-600"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Where would you like to source/import from? Searchable Multi-Select Dropdown */}
                    <div className="relative" ref={countryDropdownRef}>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212]">
                          Where would you like to source/import from?
                        </label>
                        {formData.sourceCountries.length > 0 && (
                          <span className="text-[10px] sm:text-xs uppercase tracking-luxury text-purple-700 font-bold bg-purple-50 px-2 py-0.5 border border-purple-200">
                            {formData.sourceCountries.includes('Any of the above')
                              ? 'Global (Any of above)'
                              : `${formData.sourceCountries.length} Selected`}
                          </span>
                        )}
                      </div>

                      {/* Dropdown Trigger Box */}
                      <div
                        onClick={() => setIsCountryDropdownOpen((prev) => !prev)}
                        className={`w-full min-h-[44px] px-3.5 py-2 border transition-all cursor-pointer bg-white flex items-center justify-between gap-2 rounded-none ${
                          isCountryDropdownOpen
                            ? 'border-purple-600 ring-1 ring-purple-600'
                            : 'border-[#121212] hover:border-purple-600'
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                          {formData.sourceCountries.length === 0 ? (
                            <span className="text-[#8c8c8c] text-xs sm:text-sm select-none">
                              Select target sourcing countries or &quot;Any of the above&quot;...
                            </span>
                          ) : formData.sourceCountries.includes('Any of the above') ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold">
                              <Globe className="w-3.5 h-3.5 text-purple-600" />
                              <span>Any of the above (Global)</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCountryToggle('Any of the above');
                                }}
                                className="text-purple-600 hover:text-purple-900 ml-0.5 cursor-pointer"
                                title="Remove"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ) : (
                            formData.sourceCountries.slice(0, 4).map((countryName) => {
                              const flag = COUNTRY_FLAGS[countryName];
                              return (
                                <span
                                  key={countryName}
                                  className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#f5f5f5] text-[#121212] border border-[#e5e5e5] text-xs font-medium"
                                >
                                  {flag?.code ? (
                                    <img
                                      src={`https://flagcdn.com/w40/${flag.code}.png`}
                                      alt={`${countryName} flag`}
                                      className="w-3.5 h-2.5 object-cover border border-black/10 flex-shrink-0"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <span>{flag?.emoji || '🌐'}</span>
                                  )}
                                  <span className="truncate max-w-[120px]">{countryName}</span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCountryToggle(countryName);
                                    }}
                                    className="text-[#737373] hover:text-red-600 ml-0.5 cursor-pointer"
                                    title="Remove"
                                  >
                                    <X className="w-2.5 h-2.5" />
                                  </button>
                                </span>
                              );
                            })
                          )}
                          {!formData.sourceCountries.includes('Any of the above') &&
                            formData.sourceCountries.length > 4 && (
                              <span className="text-[11px] text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.5 font-bold">
                                +{formData.sourceCountries.length - 4} more
                              </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {formData.sourceCountries.length > 0 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData((prev) => ({ ...prev, sourceCountries: [] }));
                              }}
                              className="text-[11px] text-[#737373] hover:text-red-600 font-semibold underline cursor-pointer"
                            >
                              Clear
                            </button>
                          )}
                          <ChevronDown
                            className={`w-4 h-4 text-[#737373] transition-transform duration-200 ${
                              isCountryDropdownOpen ? 'rotate-180 text-purple-600' : ''
                            }`}
                          />
                        </div>
                      </div>

                      {/* Dropdown Menu Panel */}
                      {isCountryDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#121212] shadow-2xl z-50 rounded-none animate-in fade-in duration-150">
                          {/* Search Input Box */}
                          <div className="p-2.5 border-b border-[#e5e5e5] bg-white sticky top-0 z-10 flex items-center gap-2">
                            <Search className="w-4 h-4 text-purple-600 flex-shrink-0" />
                            <input
                              type="text"
                              value={countrySearchQuery}
                              onChange={(e) => setCountrySearchQuery(e.target.value)}
                              placeholder="Search country (e.g. India, Vietnam, Italy)..."
                              className="w-full text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] bg-transparent focus:outline-none"
                              onClick={(e) => e.stopPropagation()}
                              autoFocus
                            />
                            {countrySearchQuery && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCountrySearchQuery('');
                                }}
                                className="text-[#737373] hover:text-[#121212] p-1 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          {/* "Any of the above" Featured Top Option */}
                          {(!countrySearchQuery ||
                            'any of the above'.includes(countrySearchQuery.toLowerCase()) ||
                            'global'.includes(countrySearchQuery.toLowerCase()) ||
                            'all'.includes(countrySearchQuery.toLowerCase())) && (
                            <div className="p-2 border-b border-[#f0f0f0] bg-purple-50/50">
                              <button
                                type="button"
                                onClick={() => handleCountryToggle('Any of the above')}
                                className={`w-full flex items-center justify-between p-2 text-xs transition-colors rounded-none cursor-pointer ${
                                  formData.sourceCountries.includes('Any of the above')
                                    ? 'bg-purple-600 text-white font-bold shadow-xs'
                                    : 'hover:bg-purple-100 text-[#121212] font-semibold'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <Globe
                                    className={`w-4 h-4 ${
                                      formData.sourceCountries.includes('Any of the above')
                                        ? 'text-white'
                                        : 'text-purple-600'
                                    }`}
                                  />
                                  <span>Any of the above (Global Sourcing)</span>
                                </div>
                                {formData.sourceCountries.includes('Any of the above') && (
                                  <Check className="w-4 h-4 stroke-[3]" />
                                )}
                              </button>
                            </div>
                          )}

                          {/* Filtered Countries List */}
                          <div className="max-h-60 overflow-y-auto divide-y divide-[#f5f5f5]">
                            {ALL_SOURCING_COUNTRIES.filter((c) =>
                              c.name.toLowerCase().includes(countrySearchQuery.toLowerCase())
                            ).map((c) => {
                              const isSelected = formData.sourceCountries.includes(c.name);
                              return (
                                <button
                                  key={c.name}
                                  type="button"
                                  onClick={() => handleCountryToggle(c.name)}
                                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors cursor-pointer text-left ${
                                    isSelected
                                      ? 'bg-purple-50 text-purple-900 font-semibold'
                                      : 'hover:bg-[#faf9f6] text-[#121212]'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      onChange={() => {}}
                                      className="w-3.5 h-3.5 accent-purple-600 rounded-none pointer-events-none"
                                    />
                                    <img
                                      src={`https://flagcdn.com/w40/${c.code}.png`}
                                      alt={`${c.name} flag`}
                                      className="w-4 h-3 object-cover border border-black/10 flex-shrink-0 shadow-2xs"
                                      loading="lazy"
                                    />
                                    <span className="truncate">{c.name}</span>
                                  </div>
                                  {isSelected && (
                                    <Check className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                                  )}
                                </button>
                              );
                            })}

                            {ALL_SOURCING_COUNTRIES.filter((c) =>
                              c.name.toLowerCase().includes(countrySearchQuery.toLowerCase())
                            ).length === 0 &&
                              !(
                                !countrySearchQuery ||
                                'any of the above'.includes(countrySearchQuery.toLowerCase()) ||
                                'global'.includes(countrySearchQuery.toLowerCase()) ||
                                'all'.includes(countrySearchQuery.toLowerCase())
                              ) && (
                                <div className="py-8 text-center text-xs text-[#737373]">
                                  No countries matching &quot;{countrySearchQuery}&quot;
                                </div>
                              )}
                          </div>

                          {/* Dropdown Footer Actions */}
                          <div className="p-2.5 border-t border-[#e5e5e5] bg-[#faf9f6] flex items-center justify-between text-xs">
                            <span className="text-[#737373] text-[11px] font-mono">
                              {formData.sourceCountries.length}{' '}
                              {formData.sourceCountries.length === 1 ? 'country' : 'countries'} selected
                            </span>
                            <div className="flex items-center gap-2">
                              {formData.sourceCountries.length > 0 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFormData((p) => ({ ...p, sourceCountries: [] }));
                                  }}
                                  className="text-[11px] text-[#737373] hover:text-red-600 underline font-medium cursor-pointer"
                                >
                                  Clear All
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsCountryDropdownOpen(false);
                                }}
                                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-[11px] uppercase tracking-luxury cursor-pointer shadow-xs"
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Display full tags below trigger if user selected more than 4 countries */}
                      {!formData.sourceCountries.includes('Any of the above') &&
                        formData.sourceCountries.length > 4 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-2">
                            {formData.sourceCountries.map((countryName) => {
                              const flag = COUNTRY_FLAGS[countryName];
                              return (
                                <span
                                  key={countryName}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#f5f5f5] text-[#121212] border border-[#e5e5e5] text-[11px] font-medium"
                                >
                                  {flag?.code ? (
                                    <img
                                      src={`https://flagcdn.com/w40/${flag.code}.png`}
                                      alt={`${countryName} flag`}
                                      className="w-3.5 h-2.5 object-cover border border-black/10 flex-shrink-0"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <span>{flag?.emoji || '🌐'}</span>
                                  )}
                                  <span>{countryName}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleCountryToggle(countryName)}
                                    className="text-[#737373] hover:text-red-600 ml-0.5 cursor-pointer"
                                    title="Remove"
                                  >
                                    <X className="w-2.5 h-2.5" />
                                  </button>
                                </span>
                              );
                            })}
                          </div>
                        )}
                    </div>
                  </div>

                  {/* ===================================================== */}
                  {/* SECTION 4: COMMERCIAL TERMS & TIMELINES               */}
                  {/* ===================================================== */}
                  <div className="space-y-4 sm:space-y-5 pt-5 border-t border-[#e5e5e5]">
                    <span className="text-xs uppercase tracking-luxury text-purple-700 block font-bold">
                      3. Commercials & Execution Terms
                    </span>

                    {/* Quantity / Volume (PRODUCT ONLY) */}
                    {sourcingType === 'product' && (
                      <div>
                        <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212] mb-1.5">
                          How much quantity / volume do you want? *
                        </label>
                        <input
                          type="text"
                          name="quantityVolume"
                          value={formData.quantityVolume}
                          onChange={handleInputChange}
                          required={sourcingType === 'product'}
                          placeholder="e.g. 500 units, 2,000 meters, 1 full container (FCL)"
                          className="w-full h-11 px-3.5 py-2.5 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    )}

                    {/* Target Timeline & Budget - Dropdown fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                      {/* Target Delivery Timeline Dropdown */}
                      <div>
                        <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212] mb-1.5 min-h-[18px]">
                          Target Delivery / Completion Timeline *
                        </label>
                        <select
                          name="targetTimeline"
                          value={formData.targetTimeline}
                          onChange={handleInputChange}
                          required
                          className="w-full h-11 px-3.5 py-2 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors cursor-pointer"
                        >
                          <option value="">Select Target Delivery Timeline</option>
                          {TIMELINE_OPTIONS.map((timeline) => (
                            <option key={timeline} value={timeline}>
                              {timeline}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Budget Dropdown in Dollars ($) */}
                      <div>
                        <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212] mb-1.5 min-h-[18px]">
                          What is your budget? (USD $) *
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleBudgetChange}
                          required
                          className="w-full h-11 px-3.5 py-2 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors cursor-pointer"
                        >
                          <option value="">Select Budget in USD ($)</option>
                          {BUDGET_OPTIONS.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                        {/* Clean subtle INR approximate text right below input at the bottom */}
                        {formData.budgetInrApprox && (
                          <span className="text-[11px] sm:text-xs text-[#555555] font-medium block mt-1.5">
                            Approx. {formData.budgetInrApprox}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Customisation & Branding (PRODUCT ONLY) */}
                    {sourcingType === 'product' && (
                      <div>
                        <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212] mb-0.5">
                          Customisation & Branding Requirements
                        </label>
                        <span className="text-[11px] sm:text-xs text-[#666666] block mb-1.5 font-normal">
                          (OEM/ODM, private labeling, packaging or scope of work details)
                        </span>
                        <textarea
                          rows={3}
                          name="customisationBranding"
                          value={formData.customisationBranding}
                          onChange={handleInputChange}
                          placeholder="e.g. Custom embossed woven labels, bespoke dust bags, private hang tags..."
                          className="w-full p-3 sm:p-3.5 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 leading-relaxed transition-colors"
                        />
                      </div>
                    )}

                    {/* Sample / Trial Requirement Option (PRODUCT ONLY) */}
                    {sourcingType === 'product' && (
                      <div>
                        <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212] mb-0.5">
                          Sample / Trial Requirement Option
                        </label>
                        <span className="text-[11px] sm:text-xs text-[#666666] block mb-2 font-normal">
                          (Yes/No for sample or trial run before final commitment)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {[
                            { value: 'Yes', label: 'Yes (Require sample before bulk order)' },
                            { value: 'No', label: 'No (Direct production order)' }
                          ].map((item) => (
                            <label
                              key={item.value}
                              className={`p-3 border text-xs sm:text-sm cursor-pointer flex items-center gap-2.5 rounded-none transition-colors ${formData.sampleTrialRequirement === item.value
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
                                className="w-3.5 h-3.5 accent-purple-600"
                              />
                              <span>{item.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Supporting Document / File Upload (PRODUCT ONLY, STRICTLY <= 500 KB) */}
                    {sourcingType === 'product' && (
                      <div className="p-4 sm:p-5 border border-[#e5e5e5] bg-[#faf9f6] space-y-2">
                        <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-bold text-[#121212]">
                          Supporting Document / File Upload
                        </label>
                        <span className="text-[11px] sm:text-xs text-[#666666] block font-normal">
                          (Images, CAD files, tech specs, or RFQ/SOW documents below 500 KB)
                        </span>

                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <label className="cursor-pointer inline-flex items-center gap-2 py-2.5 px-4 bg-white border border-[#121212] hover:border-purple-600 text-xs uppercase tracking-luxury font-semibold text-[#121212] transition-colors rounded-none">
                            {isUploadingDoc ? (
                              <Loader2 className="w-3.5 h-3.5 text-purple-600 animate-spin" />
                            ) : (
                              <FileText className="w-3.5 h-3.5 text-purple-600" />
                            )}
                            <span>{isUploadingDoc ? 'Uploading...' : 'Upload Spec Document'}</span>
                            <input
                              type="file"
                              disabled={isUploadingDoc}
                              onChange={handleSupportingDocChange}
                              className="hidden"
                            />
                          </label>

                          {supportingDoc && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#121212] bg-white border border-purple-300 px-3 py-1.5">
                              <span className="truncate max-w-[200px] font-mono text-xs">
                                {supportingDoc.name}
                              </span>
                              <span className="text-[11px] text-[#737373]">
                                ({supportingDoc.sizeKb} KB)
                              </span>
                              {supportingDoc.url ? (
                                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                                  <Check className="w-3 h-3" /> Attached
                                </span>
                              ) : isUploadingDoc ? (
                                <span className="text-[10px] text-purple-600 animate-pulse">Uploading...</span>
                              ) : null}
                              <button
                                type="button"
                                onClick={() => setSupportingDoc(null)}
                                className="text-red-500 hover:text-red-700 ml-1 p-1 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        {supportingDocError && (
                          <div className="flex items-center gap-2 text-xs text-red-600 pt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{supportingDocError}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ===================================================== */}
                  {/* SECTION 5: BUYER & COMPANY CONTACT INFORMATION        */}
                  {/* ===================================================== */}
                  <div className="space-y-4 sm:space-y-5 pt-5 border-t border-[#e5e5e5]">
                    <span className="text-xs uppercase tracking-luxury text-purple-700 block font-bold">
                      4. Buyer & Enterprise Credentials
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212] mb-1.5 min-h-[18px]">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Lady Vivienne Vance"
                          className="w-full h-11 px-3.5 py-2.5 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* Business Email with Contextual Verification */}
                      <div>
                        <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212] mb-1.5 min-h-[18px]">
                          Business Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => {
                            handleInputChange(e);
                            if (emailVerified) {
                              setEmailVerified(false);
                              setIsEmailOtpSent(false);
                            }
                          }}
                          required
                          placeholder="procurement@luxuryhouse.com"
                          className="w-full h-11 px-3.5 py-2.5 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />

                        {/* Contextual Verify Email Button (Shown below email input at the bottom) */}
                        {formData.email && formData.email.includes('@') && (
                          <div className="mt-1.5">
                            {emailVerified ? (
                              <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Email Verified</span>
                              </span>
                            ) : isEmailOtpSent ? (
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                <input
                                  type="text"
                                  maxLength={6}
                                  value={emailOtpCode}
                                  onChange={(e) => setEmailOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                                  placeholder="6-digit OTP"
                                  className="w-28 h-8 px-2 border border-[#121212] bg-white font-mono text-xs text-center focus:outline-none focus:border-purple-600"
                                />
                                <button
                                  type="button"
                                  onClick={handleVerifyEmailOtp}
                                  disabled={isVerifyingEmailOtp || !emailOtpCode}
                                  className="h-8 px-3 bg-[#121212] hover:bg-purple-600 text-white text-[10px] uppercase tracking-luxury font-bold transition-colors cursor-pointer"
                                >
                                  {isVerifyingEmailOtp ? 'Verifying...' : 'Submit OTP'}
                                </button>
                                <button
                                  type="button"
                                  onClick={handleSendEmailOtp}
                                  disabled={emailResendTimer > 0}
                                  className="text-[10px] text-purple-700 hover:underline disabled:text-gray-400"
                                >
                                  {emailResendTimer > 0 ? `Resend (${emailResendTimer}s)` : 'Resend'}
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={handleSendEmailOtp}
                                disabled={isSendingEmailOtp}
                                className="text-[11px] uppercase tracking-luxury text-purple-700 hover:text-purple-900 font-semibold underline cursor-pointer inline-flex items-center gap-1"
                              >
                                {isSendingEmailOtp ? 'Sending...' : 'Verify your email with OTP'}
                              </button>
                            )}

                            {emailOtpError && (
                              <span className="block text-[11px] text-red-600 mt-1">{emailOtpError}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                      {/* Mobile Number with country code */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5 min-h-[22px]">
                          <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212]">
                            Your Mobile Number with country code *
                          </label>
                        </div>
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
                            if (phoneVerified) {
                              setPhoneVerified(false);
                              setIsPhoneOtpSent(false);
                            }
                          }}
                          required
                          placeholder="+91 98765 43210 / +44 20 7946 0991"
                          className="w-full h-11 px-3.5 py-2.5 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* WhatsApp Number with Contextual Verification */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5 min-h-[22px] flex-wrap gap-1">
                          <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212]">
                            Your WhatsApp Number *
                          </label>
                          <label className="flex items-center gap-1 text-[11px] sm:text-xs uppercase tracking-wider text-purple-700 cursor-pointer font-semibold select-none">
                            <input
                              type="checkbox"
                              checked={formData.sameAsMobile}
                              onChange={(e) => handleSameAsMobileToggle(e.target.checked)}
                              className="w-3.5 h-3.5 accent-purple-600"
                            />
                            <span>Same as Mobile</span>
                          </label>
                        </div>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={(e) => {
                            handleInputChange(e);
                            if (phoneVerified) {
                              setPhoneVerified(false);
                              setIsPhoneOtpSent(false);
                            }
                          }}
                          disabled={formData.sameAsMobile}
                          required
                          placeholder="+91 98765 43210"
                          className={`w-full h-11 px-3.5 py-2.5 border border-[#121212] text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors ${formData.sameAsMobile ? 'bg-gray-100 text-gray-500' : 'bg-white'
                            }`}
                        />

                        {/* Contextual Verify Phone/WhatsApp Button (Shown below input at the bottom) */}
                        {getActivePhoneToVerify().length >= 8 && (
                          <div className="mt-1.5">
                            {phoneVerified ? (
                              <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Number Verified</span>
                              </span>
                            ) : isPhoneOtpSent ? (
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                <input
                                  type="text"
                                  maxLength={6}
                                  value={phoneOtpCode}
                                  onChange={(e) => setPhoneOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                                  placeholder="6-digit OTP"
                                  className="w-28 h-8 px-2 border border-[#121212] bg-white font-mono text-xs text-center focus:outline-none focus:border-purple-600"
                                />
                                <button
                                  type="button"
                                  onClick={handleVerifyPhoneOtp}
                                  disabled={isVerifyingPhoneOtp || !phoneOtpCode}
                                  className="h-8 px-3 bg-[#121212] hover:bg-purple-600 text-white text-[10px] uppercase tracking-luxury font-bold transition-colors cursor-pointer"
                                >
                                  {isVerifyingPhoneOtp ? 'Verifying...' : 'Submit OTP'}
                                </button>
                                <button
                                  type="button"
                                  onClick={handleSendPhoneOtp}
                                  disabled={phoneResendTimer > 0}
                                  className="text-[10px] text-purple-700 hover:underline disabled:text-gray-400"
                                >
                                  {phoneResendTimer > 0 ? `Resend (${phoneResendTimer}s)` : 'Resend'}
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={handleSendPhoneOtp}
                                disabled={isSendingPhoneOtp}
                                className="text-[11px] uppercase tracking-luxury text-purple-700 hover:text-purple-900 font-semibold underline cursor-pointer inline-flex items-center gap-1"
                              >
                                {isSendingPhoneOtp ? 'Sending...' : 'Verify your number with OTP'}
                              </button>
                            )}

                            {phoneOtpError && (
                              <span className="block text-[11px] text-red-600 mt-1">{phoneOtpError}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ===================================================== */}
                    {/* STRUCTURED ADDRESS WITH FREE ADDRESS AUTOCOMPLETE & STATE DROPDOWN */}
                    {/* ===================================================== */}
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="text-xs sm:text-[13px] uppercase tracking-wider font-bold text-[#121212] block">
                          Full Address & Delivery Destination *
                        </label>
                      </div>

                      {/* Address Line 1 with Free OpenStreetMap Autocomplete */}
                      <div ref={addressContainerRef} className="relative">
                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#555555] mb-1">
                          Address Line 1 (Flat, House No., Building Name, Street) *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            onFocus={() => {
                              if (addressSuggestions.length > 0) setIsAddressDropdownOpen(true);
                            }}
                            required
                            placeholder="e.g. Suite 402, Royal Boulevard, Industrial Area Phase 2"
                            className="w-full h-11 px-3.5 py-2 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors pr-9"
                          />
                          {isLoadingAddress && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 pointer-events-none">
                              <Loader2 className="w-4 h-4 animate-spin" />
                            </div>
                          )}
                        </div>

                        {/* Suggestions Dropdown */}
                        {isAddressDropdownOpen && addressSuggestions.length > 0 && (
                          <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-[#121212] shadow-xl max-h-60 overflow-y-auto divide-y divide-[#f0f0f0]">
                            {addressSuggestions.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  handleSelectAddressSuggestion(item);
                                }}
                                className="w-full flex items-start gap-2.5 px-3.5 py-2.5 text-left hover:bg-purple-50 transition-colors cursor-pointer group"
                              >
                                <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-semibold text-[#121212] truncate">
                                    {item.primary}
                                  </div>
                                  {item.secondary && (
                                    <div className="text-[11px] text-[#737373] truncate">
                                      {item.secondary}
                                    </div>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Address Line 2 */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#555555] mb-1">
                          Address Line 2 (Apartment, Suite, Landmark - Optional)
                        </label>
                        <input
                          type="text"
                          name="addressLine2"
                          value={formData.addressLine2}
                          onChange={handleInputChange}
                          placeholder="e.g. Near Trade Center Tower, Landmark Post"
                          className="w-full h-11 px-3.5 py-2 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* City, State Dropdown, Pincode in 3 Columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                        {/* City with Free Autocomplete */}
                        <div ref={cityContainerRef} className="relative">
                          <label className="block text-xs uppercase tracking-wider font-semibold text-[#555555] mb-1 min-h-[16px]">
                            City *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              onFocus={() => {
                                if (citySuggestions.length > 0) setIsCityDropdownOpen(true);
                              }}
                              required
                              placeholder="e.g. Mumbai"
                              className="w-full h-11 px-3.5 py-2 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors pr-9"
                            />
                            {isLoadingCity && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 pointer-events-none">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              </div>
                            )}
                          </div>

                          {/* City Suggestions Dropdown */}
                          {isCityDropdownOpen && citySuggestions.length > 0 && (
                            <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-[#121212] shadow-xl max-h-52 overflow-y-auto divide-y divide-[#f0f0f0]">
                              {citySuggestions.map((item) => (
                                <button
                                  key={item.id}
                                  type="button"
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    handleSelectCitySuggestion(item);
                                  }}
                                  className="w-full flex items-start gap-2.5 px-3 py-2 text-left hover:bg-purple-50 transition-colors cursor-pointer group"
                                >
                                  <MapPin className="w-3.5 h-3.5 text-purple-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                  <div className="min-w-0 flex-1">
                                    <div className="text-xs font-semibold text-[#121212] truncate">
                                      {item.primary}
                                    </div>
                                    {item.secondary && (
                                      <div className="text-[11px] text-[#737373] truncate">
                                        {item.secondary}
                                      </div>
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* State Dropdown */}
                        <div>
                          <label className="block text-xs uppercase tracking-wider font-semibold text-[#555555] mb-1 min-h-[16px]">
                            State / Province *
                          </label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full h-11 px-3.5 py-2 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors cursor-pointer"
                          >
                            <option value="">Select State</option>
                            {formData.state && !INDIAN_STATES.includes(formData.state) && (
                              <option value={formData.state}>{formData.state}</option>
                            )}
                            {INDIAN_STATES.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Pincode */}
                        <div>
                          <label className="block text-xs uppercase tracking-wider font-semibold text-[#555555] mb-1 min-h-[16px]">
                            Postal PIN / ZIP Code *
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g. 400001"
                            className="w-full h-11 px-3.5 py-2 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start pt-2">
                      {/* Company Name */}
                      <div>
                        <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212]">
                          Company Name *
                        </label>
                        <span className="text-[11px] text-[#737373] block mb-1.5 font-normal min-h-[16px]">
                          (If don't have company, type &quot;NA&quot;)
                        </span>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Vance Luxury Holdings Ltd or NA"
                          className="w-full h-11 px-3.5 py-2.5 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>

                      {/* Company Website */}
                      <div>
                        <label className="block text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#121212]">
                          Company Website *
                        </label>
                        <span className="text-[11px] text-[#737373] block mb-1.5 font-normal min-h-[16px]">
                          (If don't have website, type &quot;NA&quot;)
                        </span>
                        <input
                          type="text"
                          name="companyWebsite"
                          value={formData.companyWebsite}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. https://vanceholding.com or NA"
                          className="w-full h-11 px-3.5 py-2.5 border border-[#121212] bg-white text-xs sm:text-sm text-[#121212] placeholder-[#8c8c8c] rounded-none focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-4 border-t border-[#e5e5e5]">
                    <button
                      type="submit"
                      disabled={!isFormComplete || isSubmitting || sampleImages.some((img) => img.isUploading) || isUploadingDoc}
                      className="w-full py-3.5 sm:py-4 px-6 rounded-none border-2 border-purple-600 bg-white text-purple-600 hover:bg-purple-600 hover:text-white disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed text-xs sm:text-sm uppercase tracking-luxury font-bold transition-all flex items-center justify-center gap-2.5 shadow-xs cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                          <span>Submitting Application to Ophmart Desk...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Buyer Application</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-[#737373] text-center mt-2">
                      By submitting, you authorize Ophmart Sourcing Desk to verify credentials and contact matched manufacturers.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: PURPLE BORDER BUNNY + THOUGHT CLOUD BUBBLE   */}
          {/* STICKY BELOW FIXED HEADER (92px) - STAYS PINNED ON SCROLL  */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 relative h-full">
            <div className="sticky top-[92px] z-20 flex flex-col items-center">
              {/* THOUGHT CLOUD */}
              <div className="w-full max-w-[380px] sm:max-w-[420px] flex flex-col items-center">
                <PurpleBorderCloud>
                  <h3 className="font-serif-luxury text-base sm:text-lg md:text-xl text-[#121212] font-medium leading-snug text-center">
                    Thanks for choosing to be our Buyer!
                  </h3>
                </PurpleBorderCloud>

                {/* Thought trail dots */}
                <div className="flex flex-col items-center gap-0.5 my-0.5">
                  <div className="w-2.5 h-2.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-2" />
                  <div className="w-1.5 h-1.5 rounded-full border-[1.8px] border-purple-600 bg-white ml-4" />
                </div>
              </div>

              {/* PURPLE OUTLINE BUNNY - Prominent Mascot */}
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
