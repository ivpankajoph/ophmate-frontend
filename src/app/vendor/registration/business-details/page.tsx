"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import StepTransitionLoader from "@/components/vendor/StepTransitionLoader";
import type { AppDispatch, RootState } from "@/store";
import { updateVendorBusiness } from "@/store/slices/vendorSlice";
import { uploadFileToCloudinary } from "@/lib/cloudinary-upload";
import {
  ANNUAL_TURNOVER,
  BANK_NAMES,
  BUSINESS_NATURES,
  BUSINESS_TYPES,
  CATEGORIES,
  INDIAN_STATES,
  NUMBER_OF_EMPLOYEES,
  RETURN_POLICY,
  validateAccount,
  validateGST,
  validateIFSC,
  validatePAN,
  validatePincode,
  validateUPI,
} from "@/lib/constants";

type BusinessStep = "address" | "profile" | "other";
type StepStatus = "complete" | "current" | "pending";

interface CountryOption {
  code: string;
  dialCode: string;
  flagUrl: string;
  name: string;
}

interface BankOption {
  name: string;
  logoUrl: string;
}

interface OperatingHourRow {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

interface BusinessForm {
  registrar_name: string;
  designation: string;
  email: string;
  phone_no: string;
  name: string;
  business_type: string;
  country: string;
  address_line_1: string;
  address_line_2: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  established_year: string;
  business_nature: string[];
  annual_turnover: string;
  office_employees: string;
  categories: string[];
  bank_name: string;
  bank_account: string;
  ifsc_code: string;
  branch: string;
  return_policy: string;
  dealing_area: string[];
  alternate_contact_name: string;
  alternate_contact_country_code: string;
  alternate_contact_phone: string;
  upi_id: string;
  gst_number: string;
  pan_number: string;
  business_license_number: string;
  avatar: File | null;
  avatar_url: string;
  gst_cert: File | null;
  gst_cert_url: string;
  pan_card: File | null;
  pan_card_url: string;
  business_proof_document_1: File | null;
  business_proof_document_1_url: string;
  business_proof_document_2: File | null;
  business_proof_document_2_url: string;
  operating_hours: OperatingHourRow[];
}

const mainSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "/";
const adminLoginUrl =
  process.env.NEXT_PUBLIC_ADMIN_APP_URL ?? "http://localhost:5173/sign-in?redirect=%2F";
const supportEmail = "support@sellerslogin.com";
const vendorOverviewUrl = "/vendor";
const newTabProps = {
  target: "_blank",
  rel: "noreferrer",
};

const STEP_ORDER: BusinessStep[] = ["address", "profile", "other"];
const OPERATING_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const DESIGNATION_OPTIONS = [
  "Owner",
  "Founder",
  "Co-Founder",
  "Proprietor",
  "Partner",
  "Director",
  "Manager",
  "Other",
];
const ESTABLISHMENT_YEAR_OPTIONS = Array.from({ length: 101 }, (_, index) =>
  String(1950 + index),
);
const MAX_CATEGORY_SELECTION = 10;
const DOCUMENT_FILE_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
];
const IMAGE_FILE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
];
const FALLBACK_COUNTRY: CountryOption = {
  code: "IN",
  dialCode: "+91",
  flagUrl: "https://flagcdn.com/w20/in.png",
  name: "India",
};
const VENDOR_REG_META_KEY = "vendor_registration_meta_v1";
const VENDOR_BUSINESS_DRAFT_KEY = "vendor_business_details_draft_v1";
const DEFAULT_BANK_ICON = "/bank-icon.svg";

const encodeBase64 = (value: string) => {
  if (typeof window === "undefined") return "";
  try {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
  } catch {
    return "";
  }
};

const resolveAdminLoginUrl = () => {
  const fallback = "http://localhost:5173/sign-in?redirect=%2F";
  const raw = (process.env.NEXT_PUBLIC_ADMIN_APP_URL ?? fallback).trim();

  try {
    return new URL(raw);
  } catch {
    const sanitized = raw.replace(/^\/+/, "");
    const looksLikeHostPath =
      sanitized.includes("localhost:") || /^[a-z0-9.-]+\.[a-z]{2,}/i.test(sanitized);
    if (looksLikeHostPath) {
      try {
        return new URL(`http://${sanitized}`);
      } catch {
        // Ignore and continue.
      }
    }

    if (typeof window !== "undefined") {
      try {
        return new URL(raw, window.location.origin);
      } catch {
        // Ignore and use fallback.
      }
    }

    try {
      return new URL(fallback);
    } catch {
      return null;
    }
  }
};

const buildAdminAutoLoginUrl = ({
  token,
  vendor,
}: {
  token: string;
  vendor: Record<string, unknown> | null;
}) => {
  const url = resolveAdminLoginUrl();
  if (!url) return adminLoginUrl;

  try {
    if (url.pathname === "/") {
      url.pathname = "/sign-in";
    }

    const safeVendor = vendor && typeof vendor === "object" ? vendor : {};
    const normalizedRole = String((safeVendor as { role?: string }).role || "vendor")
      .trim()
      .toLowerCase();
    const userPayload = {
      ...safeVendor,
      role: normalizedRole || "vendor",
    };
    const encodedUser = encodeBase64(JSON.stringify(userPayload));

    url.searchParams.set("redirect", "/");
    url.searchParams.set("autologin", "1");
    url.searchParams.set("authtoken", token);
    if (encodedUser) {
      url.searchParams.set("authuser", encodedUser);
    }

    return url.toString();
  } catch {
    return adminLoginUrl;
  }
};

const getBankLogo = (bankName: string) => {
  const normalized = bankName.toLowerCase();

  if (normalized.includes("state bank")) return "https://logo.clearbit.com/sbi.co.in";
  if (normalized.includes("hdfc")) return "https://logo.clearbit.com/hdfcbank.com";
  if (normalized.includes("icici")) return "https://logo.clearbit.com/icicibank.com";
  if (normalized.includes("axis")) return "https://logo.clearbit.com/axisbank.com";
  if (normalized.includes("kotak")) return "https://logo.clearbit.com/kotak.com";
  if (normalized.includes("yes bank")) return "https://logo.clearbit.com/yesbank.in";
  if (normalized.includes("idfc")) return "https://logo.clearbit.com/idfcfirstbank.com";
  if (normalized.includes("indusind")) return "https://logo.clearbit.com/indusind.com";
  if (normalized.includes("bank of baroda")) return "https://logo.clearbit.com/bobibanking.com";
  if (normalized.includes("punjab national")) return "https://logo.clearbit.com/pnbindia.in";
  if (normalized.includes("canara")) return "https://logo.clearbit.com/canarabank.com";
  if (normalized.includes("union bank")) return "https://logo.clearbit.com/unionbankofindia.co.in";
  if (normalized.includes("bank of india")) return "https://logo.clearbit.com/bankofindia.co.in";
  if (normalized.includes("chase")) return "https://logo.clearbit.com/chase.com";
  if (normalized.includes("bank of america")) return "https://logo.clearbit.com/bankofamerica.com";
  if (normalized.includes("wells fargo")) return "https://logo.clearbit.com/wellsfargo.com";
  if (normalized.includes("citibank")) return "https://logo.clearbit.com/citi.com";
  if (normalized.includes("us bank")) return "https://logo.clearbit.com/usbank.com";
  if (normalized.includes("hsbc")) return "https://logo.clearbit.com/hsbc.co.uk";
  if (normalized.includes("barclays")) return "https://logo.clearbit.com/barclays.co.uk";
  if (normalized.includes("lloyds")) return "https://logo.clearbit.com/lloydsbank.com";
  if (normalized.includes("natwest")) return "https://logo.clearbit.com/natwest.com";
  if (normalized.includes("santander")) return "https://logo.clearbit.com/santander.co.uk";
  if (normalized.includes("emirates nbd")) return "https://logo.clearbit.com/emiratesnbd.com";
  if (normalized.includes("adcb")) return "https://logo.clearbit.com/adcb.com";
  if (normalized.includes("fab")) return "https://logo.clearbit.com/bankfab.com";
  if (normalized.includes("mashreq")) return "https://logo.clearbit.com/mashreq.com";
  if (normalized.includes("dib")) return "https://logo.clearbit.com/dib.ae";
  if (normalized.includes("commonwealth")) return "https://logo.clearbit.com/commbank.com.au";
  if (normalized.includes("westpac")) return "https://logo.clearbit.com/westpac.com.au";
  if (normalized.includes("anz")) return "https://logo.clearbit.com/anz.com";
  if (normalized.includes("nab")) return "https://logo.clearbit.com/nab.com.au";
  if (normalized.includes("macquarie")) return "https://logo.clearbit.com/macquarie.com";
  if (normalized.includes("dbs")) return "https://logo.clearbit.com/dbs.com";
  if (normalized.includes("ocbc")) return "https://logo.clearbit.com/ocbc.com";
  if (normalized.includes("uob")) return "https://logo.clearbit.com/uobgroup.com";
  if (normalized.includes("standard chartered")) return "https://logo.clearbit.com/sc.com";

  return DEFAULT_BANK_ICON;
};

const BANKS_BY_COUNTRY: Record<string, string[]> = {
  India: BANK_NAMES,
  "United States": [
    "JPMorgan Chase",
    "Bank of America",
    "Wells Fargo",
    "Citibank",
    "U.S. Bank",
  ],
  "United Kingdom": ["HSBC", "Barclays", "Lloyds Bank", "NatWest", "Santander UK"],
  "United Arab Emirates": [
    "Emirates NBD",
    "ADCB",
    "First Abu Dhabi Bank (FAB)",
    "Mashreq Bank",
    "Dubai Islamic Bank (DIB)",
  ],
  Australia: [
    "Commonwealth Bank",
    "Westpac",
    "ANZ",
    "National Australia Bank (NAB)",
    "Macquarie Bank",
  ],
  Singapore: ["DBS Bank", "OCBC Bank", "UOB", "Standard Chartered", "Citibank Singapore"],
};

const getStepTone = (status: StepStatus) => {
  if (status === "complete") {
    return {
      accent: "border-slate-950",
      label: "text-slate-500",
      note: "text-slate-500",
      title: "text-slate-950",
    };
  }

  if (status === "current") {
    return {
      accent: "border-violet-700",
      label: "text-violet-700",
      note: "text-violet-700",
      title: "text-slate-950",
    };
  }

  return {
    accent: "border-slate-200",
    label: "text-slate-400",
    note: "text-slate-400",
    title: "text-slate-500",
  };
};

const createDefaultOperatingHours = (): OperatingHourRow[] =>
  OPERATING_DAYS.map((day) => ({
    day,
    open: "",
    close: "",
    closed: false,
  }));

const normalizeDigits = (value: string) => value.replace(/\D/g, "");

const normalizeFileName = (file: File) => file.name.toLowerCase();

const isAllowedDocumentFile = (file: File) => {
  const hasValidMimeType = DOCUMENT_FILE_MIME_TYPES.includes(file.type);
  const hasValidExtension = [".pdf", ".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"].some(
    (extension) => normalizeFileName(file).endsWith(extension),
  );

  return hasValidMimeType || hasValidExtension;
};

const isAllowedImageFile = (file: File) => {
  const hasValidMimeType = IMAGE_FILE_MIME_TYPES.includes(file.type);
  const hasValidExtension = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"].some(
    (extension) => normalizeFileName(file).endsWith(extension),
  );

  return hasValidMimeType || hasValidExtension;
};

const serializeOperatingHours = (schedule: OperatingHourRow[]) =>
  schedule
    .map((row) =>
      row.closed ? `${row.day}: Closed` : `${row.day}: ${row.open} - ${row.close}`,
    )
    .join(" | ");

function FieldLabel({
  label,
  required = false,
  note,
}: {
  label: string;
  required?: boolean;
  note?: string;
}) {
  return (
    <label className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
      {label}
      {required ? <span className="ml-1 text-red-500">*</span> : null}
      {note ? <span className="ml-2 text-[11px] text-slate-400 normal-case">{note}</span> : null}
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  type = "text",
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <Input
        type={type}
        value={value}
        disabled={disabled}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-3 h-12 rounded-none border-slate-300 px-4 text-base shadow-none disabled:bg-slate-100 disabled:text-slate-500"
      />
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  placeholder,
  required = false,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 h-12 w-full border border-slate-300 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
      >
        <option value="">{placeholder ?? `Select ${label.toLowerCase()}`}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

function FileField({
  label,
  onChange,
  error,
  required = false,
  fileName,
  helperText,
}: {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  fileName?: string;
  helperText?: string;
}) {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <input
        type="file"
        onChange={onChange}
        accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.avif"
        className="mt-3 block h-12 w-full border border-slate-300 bg-white px-3 py-3 text-sm text-slate-700 file:mr-4 file:border-0 file:bg-slate-950 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
      />
      {fileName ? <p className="mt-2 text-sm text-slate-600">{fileName}</p> : null}
      {helperText ? <p className="mt-2 text-sm text-slate-500">{helperText}</p> : null}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

function CountrySelectField({
  label,
  value,
  onChange,
  options,
  error,
  placeholder,
  required = false,
  disabled = false,
  showDialCode = true,
}: {
  label: string;
  value: CountryOption | null;
  onChange: (option: CountryOption) => void;
  options: CountryOption[];
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  showDialCode?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return options;

    return options.filter((option) =>
      `${option.name} ${option.dialCode} ${option.code}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [options, query]);

  return (
    <div className="relative" ref={containerRef}>
      <FieldLabel label={label} required={required} />
      <button
        type="button"
        disabled={disabled}
        className="mt-3 flex h-12 w-full items-center justify-between border border-slate-300 bg-white px-3 text-left text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="flex min-w-0 items-center gap-3">
          {value?.flagUrl ? (
            <img src={value.flagUrl} alt="" className="h-4 w-6 border border-slate-200 object-cover" />
          ) : (
            <span className="h-4 w-6 border border-slate-200 bg-slate-100" />
          )}
          <span className="truncate">{value?.name ?? placeholder ?? "Select country"}</span>
        </span>
        <span className="ml-3 flex shrink-0 items-center gap-2 text-slate-500">
          {showDialCode ? value?.dialCode ?? "" : null}
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-20 mt-1 w-full border border-slate-300 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Select country
            </p>
            <button
              type="button"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="border-b border-slate-200 p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search country or code"
                className="h-11 rounded-none border-slate-300 pl-10 shadow-none"
              />
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto">
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <button
                  key={`${option.code}-${option.dialCode}`}
                  type="button"
                  className="flex w-full items-center justify-between border-b border-slate-200 px-3 py-3 text-left text-sm hover:bg-slate-50"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    {option.flagUrl ? (
                      <img
                        src={option.flagUrl}
                        alt=""
                        className="h-4 w-6 border border-slate-200 object-cover"
                      />
                    ) : (
                      <span className="h-4 w-6 border border-slate-200 bg-slate-100" />
                    )}
                    <span className="truncate text-slate-950">{option.name}</span>
                  </span>
                  {showDialCode ? (
                    <span className="ml-4 shrink-0 font-semibold text-slate-500">
                      {option.dialCode}
                    </span>
                  ) : null}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-slate-500">No countries found.</div>
            )}
          </div>
        </div>
      ) : null}

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

function BankSelectField({
  label,
  value,
  onChange,
  options,
  error,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: BankOption[];
  error?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return options;
    return options.filter((option) => option.name.toLowerCase().includes(normalizedQuery));
  }, [options, query]);

  const selectedBank = options.find((option) => option.name === value) ?? null;

  return (
    <div className="relative" ref={containerRef}>
      <FieldLabel label={label} required={required} />
      <button
        type="button"
        className="mt-3 flex h-12 w-full items-center justify-between border border-slate-300 bg-white px-3 text-left text-sm font-semibold text-slate-950"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="flex min-w-0 items-center gap-3">
          <img
            src={selectedBank?.logoUrl ?? DEFAULT_BANK_ICON}
            alt=""
            className="h-6 w-6 border border-slate-200 bg-white object-contain p-0.5"
            onError={(event) => {
              event.currentTarget.src = DEFAULT_BANK_ICON;
            }}
          />
          <span className="truncate">{selectedBank?.name ?? placeholder ?? "Select bank name"}</span>
        </span>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-20 mt-1 w-full border border-slate-300 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Select bank
            </p>
            <button
              type="button"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="border-b border-slate-200 p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search bank name"
                className="h-11 rounded-none border-slate-300 pl-10 shadow-none"
              />
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto">
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  className="flex w-full items-center justify-between border-b border-slate-200 px-3 py-3 text-left text-sm hover:bg-slate-50"
                  onClick={() => {
                    onChange(option.name);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <img
                      src={option.logoUrl}
                      alt=""
                      className="h-6 w-6 border border-slate-200 bg-white object-contain p-0.5"
                      onError={(event) => {
                        event.currentTarget.src = DEFAULT_BANK_ICON;
                      }}
                    />
                    <span className="truncate text-slate-950">{option.name}</span>
                  </span>
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                      option.name === value ? "text-violet-700" : "text-slate-400"
                    }`}
                  >
                    {option.name === value ? "Selected" : "Select"}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-slate-500">No banks found.</div>
            )}
          </div>
        </div>
      ) : null}

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

function SearchableMultiSelectField({
  label,
  values,
  onChange,
  options,
  error,
  required = false,
  placeholder,
  maxSelections,
  onLimitReached,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: string[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  maxSelections?: number;
  onLimitReached?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return options;

    return options.filter((option) => option.toLowerCase().includes(normalizedQuery));
  }, [options, query]);

  const toggleOption = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((current) => current !== option));
      return;
    }

    if (maxSelections && values.length >= maxSelections) {
      onLimitReached?.();
      return;
    }

    onChange([...values, option]);
  };

  return (
    <div className="relative" ref={containerRef}>
      <FieldLabel label={label} required={required} />
      <button
        type="button"
        className="mt-3 flex h-12 w-full items-center justify-between border border-slate-300 bg-white px-4 text-left text-sm font-semibold text-slate-950"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="truncate">
          {values.length
            ? `${values.length} selected`
            : placeholder ?? `Select ${label.toLowerCase()}`}
        </span>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-20 mt-1 w-full border border-slate-300 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Select option
            </p>
            <button
              type="button"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="border-b border-slate-200 p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${label.toLowerCase()}`}
                className="h-11 rounded-none border-slate-300 pl-10 shadow-none"
              />
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto">
            {filteredOptions.length ? (
              filteredOptions.map((option) => {
                const selected = values.includes(option);

                return (
                  <button
                    key={option}
                    type="button"
                    className="flex w-full items-center justify-between border-b border-slate-200 px-3 py-3 text-left text-sm hover:bg-slate-50"
                    onClick={() => toggleOption(option)}
                  >
                    <span className="text-slate-950">{option}</span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                        selected ? "text-violet-700" : "text-slate-400"
                      }`}
                    >
                      {selected ? "Selected" : "Add"}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-4 text-sm text-slate-500">No matching options.</div>
            )}
          </div>
        </div>
      ) : null}

      {values.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {values.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleOption(value)}
              className="border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              {value} x
            </button>
          ))}
        </div>
      ) : null}

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

export default function VendorBusinessDetailsPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => (state as any).vendor?.loading ?? false);
  const token = useSelector((state: RootState) => (state as any).auth?.token ?? "");
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const [currentStep, setCurrentStep] = useState<BusinessStep>("address");
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesError, setCountriesError] = useState<string | null>(null);
  const [countryRequestNonce, setCountryRequestNonce] = useState(0);
  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [statesError, setStatesError] = useState<string | null>(null);
  const [isManualStateEntry, setIsManualStateEntry] = useState(false);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState<string | null>(null);
  const [isManualCityEntry, setIsManualCityEntry] = useState(true);
  const [businessNatureOtherInput, setBusinessNatureOtherInput] = useState("");
  const [designationOtherInput, setDesignationOtherInput] = useState("");
  const [dealingAreaOtherInput, setDealingAreaOtherInput] = useState("");
  const [bankOtherInput, setBankOtherInput] = useState("");
  const [applyAllDays, setApplyAllDays] = useState(false);
  const [bulkOpenTime, setBulkOpenTime] = useState("");
  const [bulkCloseTime, setBulkCloseTime] = useState("");
  const [uploadingAssets, setUploadingAssets] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStepTransitioning, setIsStepTransitioning] = useState(false);
  const [stepTransitionText, setStepTransitionText] = useState("Loading next step...");
  const [showRedirectPopup, setShowRedirectPopup] = useState(false);
  const [redirectProgress, setRedirectProgress] = useState(0);
  const [redirectTargetUrl, setRedirectTargetUrl] = useState("");
  const [redirectMessage, setRedirectMessage] = useState("Data submitted successfully.");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState("");
  const [lockedPhone, setLockedPhone] = useState("");
  const [lockedEmail, setLockedEmail] = useState("");
  const redirectTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearInterval(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
    };
  }, []);

  const urlFieldByFileField: Record<
    "avatar" | "gst_cert" | "pan_card" | "business_proof_document_1" | "business_proof_document_2",
    "avatar_url" | "gst_cert_url" | "pan_card_url" | "business_proof_document_1_url" | "business_proof_document_2_url"
  > = {
    avatar: "avatar_url",
    gst_cert: "gst_cert_url",
    pan_card: "pan_card_url",
    business_proof_document_1: "business_proof_document_1_url",
    business_proof_document_2: "business_proof_document_2_url",
  };

  const cloudinaryFolderByField: Record<string, string> = {
    avatar: "ophmate/vendors/avatars",
    gst_cert: "ophmate/vendors/documents",
    pan_card: "ophmate/vendors/documents",
    business_proof_document_1: "ophmate/vendors/documents",
    business_proof_document_2: "ophmate/vendors/documents",
  };

  const [form, setForm] = useState<BusinessForm>({
    registrar_name: "",
    designation: "",
    email: "",
    phone_no: "",
    name: "",
    business_type: "",
    country: "India",
    address_line_1: "",
    address_line_2: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    established_year: "",
    business_nature: [],
    annual_turnover: "",
    office_employees: "",
    categories: [],
    bank_name: "",
    bank_account: "",
    ifsc_code: "",
    branch: "",
    return_policy: "",
    dealing_area: [],
    alternate_contact_name: "",
    alternate_contact_country_code: FALLBACK_COUNTRY.dialCode,
    alternate_contact_phone: "",
    upi_id: "",
    gst_number: "",
    pan_number: "",
    business_license_number: "",
    avatar: null,
    avatar_url: "",
    gst_cert: null,
    gst_cert_url: "",
    pan_card: null,
    pan_card_url: "",
    business_proof_document_1: null,
    business_proof_document_1_url: "",
    business_proof_document_2: null,
    business_proof_document_2_url: "",
    operating_hours: createDefaultOperatingHours(),
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const registrationMetaRaw = localStorage.getItem(VENDOR_REG_META_KEY);
    const registrationMeta = registrationMetaRaw
      ? (JSON.parse(registrationMetaRaw) as { email?: string; phone?: string; countryCode?: string })
      : null;

    const storedEmail =
      registrationMeta?.email ??
      localStorage.getItem("vendor_email") ??
      sessionStorage.getItem("vendor_email") ??
      "";
    const storedPhone =
      registrationMeta?.phone ??
      localStorage.getItem("vendor_phone") ??
      sessionStorage.getItem("vendor_phone") ??
      "";
    const storedCountryCode =
      registrationMeta?.countryCode ??
      localStorage.getItem("vendor_country_code") ??
      sessionStorage.getItem("vendor_country_code") ??
      FALLBACK_COUNTRY.dialCode;

    const draftRaw = localStorage.getItem(VENDOR_BUSINESS_DRAFT_KEY);
    const draft = draftRaw
      ? (JSON.parse(draftRaw) as Partial<BusinessForm> & {
          currentStep?: BusinessStep;
          businessNatureOtherInput?: string;
          designationOtherInput?: string;
          dealingAreaOtherInput?: string;
          bankOtherInput?: string;
          applyAllDays?: boolean;
          bulkOpenTime?: string;
          bulkCloseTime?: string;
        })
      : null;

    setCurrentStep(draft?.currentStep ?? "address");
    setLockedEmail(storedEmail);
    setLockedPhone(storedPhone);
    setBusinessNatureOtherInput(draft?.businessNatureOtherInput ?? "");
    setDesignationOtherInput(draft?.designationOtherInput ?? "");
    setDealingAreaOtherInput(draft?.dealingAreaOtherInput ?? "");
    setBankOtherInput(draft?.bankOtherInput ?? "");
    setApplyAllDays(Boolean(draft?.applyAllDays));
    setBulkOpenTime(draft?.bulkOpenTime ?? "");
    setBulkCloseTime(draft?.bulkCloseTime ?? "");
    setForm((previous) => ({
      ...previous,
      ...draft,
      email: draft?.email ?? storedEmail,
      phone_no: draft?.phone_no ?? storedPhone,
      alternate_contact_country_code:
        draft?.alternate_contact_country_code || storedCountryCode || FALLBACK_COUNTRY.dialCode,
      avatar: null,
      gst_cert: null,
      pan_card: null,
      business_proof_document_1: null,
      business_proof_document_2: null,
      operating_hours:
        draft?.operating_hours?.length === OPERATING_DAYS.length
          ? draft.operating_hours
          : previous.operating_hours,
    }));
  }, []);

  useEffect(() => {
    if (form.phone_no.trim()) {
      setLockedPhone(form.phone_no.trim());
    }
    if (form.email.trim()) {
      setLockedEmail(form.email.trim());
    }
  }, [form.phone_no, form.email]);

  useEffect(() => {
    return () => {
      if (avatarPreviewUrl) {
        URL.revokeObjectURL(avatarPreviewUrl);
      }
    };
  }, [avatarPreviewUrl]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadCountries = async () => {
      setCountriesLoading(true);
      setCountriesError(null);

      try {
        const response = await fetch("/api/countries", {
          signal: controller.signal,
        });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message ?? "Unable to load countries right now.");
        }

        if (!isMounted) return;

        const nextCountries =
          Array.isArray(payload) && payload.length ? payload : [FALLBACK_COUNTRY];
        const registrationMetaRaw =
          typeof window !== "undefined" ? localStorage.getItem(VENDOR_REG_META_KEY) : null;
        const registrationMeta = registrationMetaRaw
          ? (JSON.parse(registrationMetaRaw) as { countryCode?: string })
          : null;
        const storedCountryCode =
          registrationMeta?.countryCode ??
          (typeof window !== "undefined"
            ? localStorage.getItem("vendor_country_code")
            : null) ??
          sessionStorage.getItem("vendor_country_code") ??
          "";
        const matchedCountry =
          nextCountries.find((country) => country.dialCode === storedCountryCode) ??
          nextCountries.find((country) => country.name === "India") ??
          nextCountries[0];

        setCountryOptions(nextCountries);
        setForm((previous) => ({
          ...previous,
          country:
            previous.country && previous.country !== "India"
              ? previous.country
              : matchedCountry?.name ?? previous.country,
          alternate_contact_country_code:
            previous.alternate_contact_country_code ||
            matchedCountry?.dialCode ||
            FALLBACK_COUNTRY.dialCode,
        }));
      } catch (error) {
        if (!isMounted || controller.signal.aborted) return;
        setCountryOptions([FALLBACK_COUNTRY]);
        setCountriesError(
          error instanceof Error ? error.message : "Unable to load countries right now.",
        );
      } finally {
        if (isMounted && !controller.signal.aborted) {
          setCountriesLoading(false);
        }
      }
    };

    void loadCountries();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [countryRequestNonce]);

  const sortedIndianStates = useMemo(
    () => [...INDIAN_STATES].sort((left, right) => left.localeCompare(right)),
    [],
  );
  const businessNatureOptions = useMemo(
    () => Array.from(new Set([...BUSINESS_NATURES, "Other"])),
    [],
  );
  const designationOptions = useMemo(() => {
    const baseOptions = [...DESIGNATION_OPTIONS];

    if (
      form.designation.trim() &&
      !baseOptions.some((option) => option.toLowerCase() === form.designation.toLowerCase())
    ) {
      return [form.designation, ...baseOptions];
    }

    return baseOptions;
  }, [form.designation]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const selectedCountryName = form.country.trim();

    if (!selectedCountryName) {
      setStateOptions([]);
      setStatesError(null);
      setStatesLoading(false);
      setIsManualStateEntry(true);
      return () => {
        isMounted = false;
        controller.abort();
      };
    }

    const loadStates = async () => {
      setStatesLoading(true);
      setStatesError(null);

      try {
        const response = await fetch(
          `/api/countries/states?country=${encodeURIComponent(selectedCountryName)}`,
          {
            signal: controller.signal,
          },
        );
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message ?? "Unable to load states right now.");
        }

        if (!isMounted || controller.signal.aborted) return;

        const fetchedStates = Array.isArray(payload?.states)
          ? payload.states
              .map((item: string) => item.trim())
              .filter((item: string) => Boolean(item))
          : [];
        const fallbackStates =
          selectedCountryName.toLowerCase() === "india" ? sortedIndianStates : [];
        const uniqueSortedStates: string[] = Array.from(
          new Set<string>(fetchedStates.length ? fetchedStates : fallbackStates),
        ).sort((left, right) => left.localeCompare(right));

        setStateOptions(uniqueSortedStates);
        setIsManualStateEntry(
          selectedCountryName.toLowerCase() === "india" ? false : uniqueSortedStates.length === 0,
        );
      } catch (error) {
        if (!isMounted || controller.signal.aborted) return;

        const fallbackStates =
          selectedCountryName.toLowerCase() === "india" ? sortedIndianStates : [];
        setStateOptions(fallbackStates);
        setIsManualStateEntry(
          selectedCountryName.toLowerCase() === "india" ? false : fallbackStates.length === 0,
        );
        setStatesError(
          error instanceof Error ? error.message : "Unable to load states right now.",
        );
      } finally {
        if (isMounted && !controller.signal.aborted) {
          setStatesLoading(false);
        }
      }
    };

    void loadStates();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [form.country, sortedIndianStates]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const selectedCountryName = form.country.trim();
    const selectedStateName = form.state.trim();

    if (!selectedCountryName || !selectedStateName) {
      setCityOptions([]);
      setCitiesLoading(false);
      setCitiesError(null);
      setIsManualCityEntry(true);
      return () => {
        isMounted = false;
        controller.abort();
      };
    }

    const loadCities = async () => {
      setCitiesLoading(true);
      setCitiesError(null);

      try {
        const response = await fetch(
          `/api/countries/cities?country=${encodeURIComponent(
            selectedCountryName,
          )}&state=${encodeURIComponent(selectedStateName)}`,
          {
            signal: controller.signal,
          },
        );
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message ?? "Unable to load cities right now.");
        }

        if (!isMounted || controller.signal.aborted) return;

        const fetchedCities = Array.isArray(payload?.cities)
          ? payload.cities
              .map((item: string) => item.trim())
              .filter((item: string) => Boolean(item))
          : [];
        const uniqueSortedCities: string[] = Array.from(new Set<string>(fetchedCities)).sort((a, b) =>
          a.localeCompare(b),
        );

        setCityOptions(uniqueSortedCities);
        setIsManualCityEntry(uniqueSortedCities.length === 0);
      } catch (error) {
        if (!isMounted || controller.signal.aborted) return;

        setCityOptions([]);
        setIsManualCityEntry(true);
        setCitiesError(error instanceof Error ? error.message : "Unable to load cities right now.");
      } finally {
        if (isMounted && !controller.signal.aborted) {
          setCitiesLoading(false);
        }
      }
    };

    void loadCities();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [form.country, form.state]);

  const availableCountries = countryOptions.length ? countryOptions : [FALLBACK_COUNTRY];
  const selectedBusinessCountry =
    availableCountries.find((country) => country.name === form.country) ?? FALLBACK_COUNTRY;
  const selectedAlternateCountry =
    availableCountries.find((country) => country.dialCode === form.alternate_contact_country_code) ??
    FALLBACK_COUNTRY;
  const dealingAreaOptions = useMemo(
    () =>
      Array.from(new Set(availableCountries.map((country) => country.name))).sort((left, right) =>
        left.localeCompare(right),
      ),
    [availableCountries],
  );
  const dealingAreaSelectableOptions = useMemo(
    () => Array.from(new Set([...dealingAreaOptions, "Other"])),
    [dealingAreaOptions],
  );
  const bankOptions = useMemo(() => {
    const allBanks = Array.from(new Set(Object.values(BANKS_BY_COUNTRY).flat()));
    const withOther = Array.from(new Set([...allBanks, "Other"]));

    if (form.bank_name && !withOther.includes(form.bank_name)) {
      withOther.unshift(form.bank_name);
    }

    return withOther.map((name) => ({
      name,
      logoUrl: name === "Other" ? DEFAULT_BANK_ICON : getBankLogo(name),
    }));
  }, [form.bank_name]);

  const currentStepIndex = STEP_ORDER.indexOf(currentStep);
  const currentStepLabel = `Step ${currentStepIndex + 1} of 3`;
  const canGoBack = currentStepIndex > 0;
  const isIndianBusiness = form.country === "India";
  const postalCodeLabel = isIndianBusiness ? "Pincode" : "Postal code";
  const stateLabel = isIndianBusiness ? "State" : "State / Province / Region";
  const bankCodeLabel = isIndianBusiness ? "IFSC code" : "Bank code / Routing code";
  const bankAccountLabel = isIndianBusiness ? "Account number" : "Account / IBAN number";
  const isAnyAssetUploading = useMemo(
    () => Object.values(uploadingAssets).some(Boolean),
    [uploadingAssets],
  );

  const stepItems = [
    {
      id: "address" as BusinessStep,
      label: "Step 1",
      title: "Business address",
    },
    {
      id: "profile" as BusinessStep,
      label: "Step 2",
      title: "Information and profile",
    },
    {
      id: "other" as BusinessStep,
      label: "Step 3",
      title: "Other information and documents",
    },
  ].map((item, index) => {
    const status: StepStatus =
      index < currentStepIndex ? "complete" : index === currentStepIndex ? "current" : "pending";

    return {
      ...item,
      status,
      note:
        status === "complete"
          ? "Completed"
          : status === "current"
            ? "Current step"
            : "Next",
    };
  });

  const stepContent = {
    address: {
      title: "Business address",
      description:
        "Start with the registered business location. This step sets the country-specific compliance fields that appear later.",
    },
    profile: {
      title: "Information and profile",
      description:
        "Add business identity, designation, establishment year, profile selections, and categories.",
    },
    other: {
      title: "Other information and documents",
      description:
        "Finish banking, operating hours, dealing area, and compliance documents in the last step.",
    },
  }[currentStep];

  const clearErrors = (fieldNames: string[]) => {
    setErrors((previous) => {
      const next = { ...previous };
      fieldNames.forEach((fieldName) => {
        delete next[fieldName];
      });
      return next;
    });
  };

  const updateTextField = <K extends keyof BusinessForm>(name: K, value: BusinessForm[K]) => {
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
    clearErrors([name as string]);
  };

  const updateCountry = (country: CountryOption) => {
    setForm((previous) => ({
      ...previous,
      country: country.name,
      state: "",
      city: "",
    }));
    setIsManualStateEntry(false);
    setIsManualCityEntry(true);
    setCityOptions([]);
    setStatesError(null);
    setCitiesError(null);
    clearErrors([
      "country",
      "state",
      "pincode",
      "gst_number",
      "pan_number",
      "gst_cert",
      "pan_card",
      "business_license_number",
      "business_proof_document_1",
      "business_proof_document_2",
    ]);
  };

  const updateState = (value: string) => {
    setForm((previous) => ({
      ...previous,
      state: value,
      city: "",
    }));
    setIsManualCityEntry(true);
    setCitiesError(null);
    clearErrors(["state", "city"]);
  };

  const updateAlternateCountry = (country: CountryOption) => {
    setForm((previous) => ({
      ...previous,
      alternate_contact_country_code: country.dialCode,
    }));
    clearErrors(["alternate_contact_country_code", "alternate_contact_phone"]);
  };

  const updateArrayField = (
    name: "business_nature" | "categories" | "dealing_area",
    values: string[],
  ) => {
    setForm((previous) => ({
      ...previous,
      [name]: values,
    }));
    clearErrors([name]);
  };

  const addCustomBusinessNature = () => {
    const customBusinessNature = businessNatureOtherInput.trim();

    if (!customBusinessNature) {
      setErrors((previous) => ({
        ...previous,
        business_nature: "Enter business nature name for Other.",
      }));
      return;
    }

    const hasExistingValue = form.business_nature.some(
      (value) => value.toLowerCase() === customBusinessNature.toLowerCase(),
    );
    const nextValues = form.business_nature.filter((value) => value !== "Other");

    if (!hasExistingValue) {
      nextValues.push(customBusinessNature);
    }

    updateArrayField("business_nature", nextValues);
    setBusinessNatureOtherInput("");
  };

  const addCustomDesignation = () => {
    const customDesignation = designationOtherInput.trim();

    if (!customDesignation) {
      setErrors((previous) => ({
        ...previous,
        designation: "Enter designation name for Other.",
      }));
      return;
    }

    updateTextField("designation", customDesignation);
    setDesignationOtherInput("");
  };

  const addCustomDealingArea = () => {
    const customDealingArea = dealingAreaOtherInput.trim();

    if (!customDealingArea) {
      setErrors((previous) => ({
        ...previous,
        dealing_area: "Enter dealing area name for Other.",
      }));
      return;
    }

    const hasExistingValue = form.dealing_area.some(
      (value) => value.toLowerCase() === customDealingArea.toLowerCase(),
    );
    const nextValues = form.dealing_area.filter((value) => value !== "Other");

    if (!hasExistingValue) {
      nextValues.push(customDealingArea);
    }

    updateArrayField("dealing_area", nextValues);
    setDealingAreaOtherInput("");
  };

  const addCustomBank = () => {
    const customBank = bankOtherInput.trim();

    if (!customBank) {
      setErrors((previous) => ({
        ...previous,
        bank_name: "Enter bank name for Other.",
      }));
      return;
    }

    updateTextField("bank_name", customBank);
    setBankOtherInput("");
  };

  useEffect(() => {
    if (!form.business_nature.includes("Other")) {
      setBusinessNatureOtherInput("");
    }
  }, [form.business_nature]);

  useEffect(() => {
    if (form.designation !== "Other") {
      setDesignationOtherInput("");
    }
  }, [form.designation]);

  useEffect(() => {
    if (!form.dealing_area.includes("Other")) {
      setDealingAreaOtherInput("");
    }
  }, [form.dealing_area]);

  useEffect(() => {
    if (form.bank_name !== "Other") {
      setBankOtherInput("");
    }
  }, [form.bank_name]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const draftPayload = {
      currentStep,
      registrar_name: form.registrar_name,
      designation: form.designation,
      email: form.email,
      phone_no: form.phone_no,
      name: form.name,
      business_type: form.business_type,
      country: form.country,
      address_line_1: form.address_line_1,
      address_line_2: form.address_line_2,
      street: form.street,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      established_year: form.established_year,
      business_nature: form.business_nature,
      annual_turnover: form.annual_turnover,
      office_employees: form.office_employees,
      categories: form.categories,
      bank_name: form.bank_name,
      bank_account: form.bank_account,
      ifsc_code: form.ifsc_code,
      branch: form.branch,
      return_policy: form.return_policy,
      dealing_area: form.dealing_area,
      alternate_contact_name: form.alternate_contact_name,
      alternate_contact_country_code: form.alternate_contact_country_code,
      alternate_contact_phone: form.alternate_contact_phone,
      upi_id: form.upi_id,
      gst_number: form.gst_number,
      pan_number: form.pan_number,
      business_license_number: form.business_license_number,
      operating_hours: form.operating_hours,
      businessNatureOtherInput,
      designationOtherInput,
      dealingAreaOtherInput,
      bankOtherInput,
      applyAllDays,
      bulkOpenTime,
      bulkCloseTime,
    };

    localStorage.setItem(VENDOR_BUSINESS_DRAFT_KEY, JSON.stringify(draftPayload));
  }, [
    currentStep,
    form,
    businessNatureOtherInput,
    designationOtherInput,
    dealingAreaOtherInput,
    bankOtherInput,
    applyAllDays,
    bulkOpenTime,
    bulkCloseTime,
  ]);

  const updateFileField = async (
    name: "gst_cert" | "pan_card" | "business_proof_document_1" | "business_proof_document_2",
    file: File | null,
  ) => {
    const urlFieldName = urlFieldByFileField[name];

    if (!file) {
      setForm((previous) => ({
        ...previous,
        [name]: null,
        [urlFieldName]: "",
      }));
      clearErrors([name as string]);
      return;
    }

    if (file && !isAllowedDocumentFile(file)) {
      setErrors((previous) => ({
        ...previous,
        [name]: "Only PDF or image files (JPG, PNG, GIF, WEBP, AVIF) are allowed.",
      }));
      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: file,
      [urlFieldName]: "",
    }));
    clearErrors([name as string]);
  };

  const updateAvatarFile = async (file: File | null) => {
    if (!file) {
      setForm((previous) => ({
        ...previous,
        avatar: null,
        avatar_url: "",
      }));
      setAvatarPreviewUrl((previous) => {
        if (previous) {
          URL.revokeObjectURL(previous);
        }
        return "";
      });
      clearErrors(["avatar"]);
      if (avatarInputRef.current) {
        avatarInputRef.current.value = "";
      }
      return;
    }

    if (!isAllowedImageFile(file)) {
      setErrors((previous) => ({
        ...previous,
        avatar: "Only image files (JPG, PNG, GIF, WEBP, AVIF) are allowed.",
      }));
      if (avatarInputRef.current) {
        avatarInputRef.current.value = "";
      }
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    setAvatarPreviewUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return nextPreviewUrl;
    });
    setForm((previous) => ({
      ...previous,
      avatar: file,
      avatar_url: previous.avatar_url || "",
    }));
    clearErrors(["avatar"]);

    setUploadingAssets((previous) => ({ ...previous, avatar: true }));
    try {
      const upload = await uploadFileToCloudinary(file, cloudinaryFolderByField.avatar);
      setForm((previous) => ({
        ...previous,
        avatar_url: upload.url,
      }));
    } catch {
      setErrors((previous) => ({
        ...previous,
        avatar: "Upload failed. Image will be sent during final submit.",
      }));
    } finally {
      setUploadingAssets((previous) => ({ ...previous, avatar: false }));
    }
  };

  const openAvatarPicker = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.value = "";
      avatarInputRef.current.click();
    }
  };

  const updateOperatingHours = (
    index: number,
    field: keyof OperatingHourRow,
    value: string | boolean,
  ) => {
    setForm((previous) => ({
      ...previous,
      operating_hours: previous.operating_hours.map((row, rowIndex) => {
        if (rowIndex !== index) return row;

        if (field === "closed") {
          return {
            ...row,
            closed: Boolean(value),
            open: value ? "" : row.open,
            close: value ? "" : row.close,
          };
        }

        return {
          ...row,
          [field]: value,
        };
      }),
    }));
    clearErrors(["operating_hours"]);
  };

  const applyOperatingHoursToAllDays = () => {
    if (!bulkOpenTime || !bulkCloseTime) {
      setErrors((previous) => ({
        ...previous,
        operating_hours: "Set both open and close time before applying to all days.",
      }));
      return;
    }

    setForm((previous) => ({
      ...previous,
      operating_hours: previous.operating_hours.map((row) => ({
        ...row,
        closed: false,
        open: bulkOpenTime,
        close: bulkCloseTime,
      })),
    }));
    clearErrors(["operating_hours"]);
  };

  const setAllDaysTwentyFourHours = () => {
    setBulkOpenTime("00:00");
    setBulkCloseTime("23:59");
    setForm((previous) => ({
      ...previous,
      operating_hours: previous.operating_hours.map((row) => ({
        ...row,
        closed: false,
        open: "00:00",
        close: "23:59",
      })),
    }));
    clearErrors(["operating_hours"]);
  };

  const getStepErrors = (step: BusinessStep) => {
    const nextErrors: Record<string, string> = {};

    if (step === "address") {
      if (!form.country.trim()) {
        nextErrors.country = "Business country is required.";
      }
      if (!form.address_line_1.trim()) {
        nextErrors.address_line_1 = "Address line 1 is required.";
      }
      if (!form.street.trim()) {
        nextErrors.street = "Street is required.";
      }
      if (!form.city.trim()) {
        nextErrors.city = "City is required.";
      }
      if (!form.state.trim()) {
        nextErrors.state = `${stateLabel} is required.`;
      }
      if (!form.pincode.trim()) {
        nextErrors.pincode = `${postalCodeLabel} is required.`;
      } else if (isIndianBusiness && !validatePincode(normalizeDigits(form.pincode))) {
        nextErrors.pincode = "Enter a valid 6-digit pincode.";
      }
    }

    if (step === "profile") {
      if (!form.registrar_name.trim()) {
        nextErrors.registrar_name = "Registrar name is required.";
      }
      if (!form.designation.trim()) {
        nextErrors.designation = "Designation is required.";
      } else if (form.designation === "Other") {
        nextErrors.designation = "Select Other ke liye custom designation add karein.";
      }
      if (!form.name.trim()) {
        nextErrors.name = "Business name is required.";
      }
      if (!form.business_type) {
        nextErrors.business_type = "Business type is required.";
      }
      if (!form.established_year) {
        nextErrors.established_year = "Establishment year is required.";
      }
      if (!form.business_nature.length) {
        nextErrors.business_nature = "Select at least one business nature.";
      } else if (form.business_nature.includes("Other")) {
        nextErrors.business_nature = "Select Other ke liye custom business nature add karein.";
      }
      if (!form.annual_turnover) {
        nextErrors.annual_turnover = "Annual turnover is required.";
      }
      if (!form.office_employees) {
        nextErrors.office_employees = "Number of employees is required.";
      }
      if (!form.categories.length) {
        nextErrors.categories = "Select at least one category.";
      } else if (form.categories.length > MAX_CATEGORY_SELECTION) {
        nextErrors.categories = `Select up to ${MAX_CATEGORY_SELECTION} categories.`;
      }
    }

    if (step === "other") {
      if (!form.bank_name) {
        nextErrors.bank_name = "Bank name is required.";
      } else if (form.bank_name === "Other") {
        nextErrors.bank_name = "Select Other ke liye custom bank add karein.";
      }
      if (!form.bank_account.trim()) {
        nextErrors.bank_account = `${bankAccountLabel} is required.`;
      } else if (
        isIndianBusiness
          ? !validateAccount(normalizeDigits(form.bank_account))
          : !/^[A-Za-z0-9 -]{8,34}$/.test(form.bank_account.trim())
      ) {
        nextErrors.bank_account = isIndianBusiness
          ? "Enter a valid account number."
          : "Enter a valid account or IBAN number.";
      }
      if (!form.ifsc_code.trim()) {
        nextErrors.ifsc_code = `${bankCodeLabel} is required.`;
      } else if (
        isIndianBusiness
          ? !validateIFSC(form.ifsc_code.trim().toUpperCase())
          : !/^[A-Za-z0-9-]{4,20}$/.test(form.ifsc_code.trim())
      ) {
        nextErrors.ifsc_code = isIndianBusiness
          ? "Enter a valid IFSC code."
          : "Enter a valid bank or routing code.";
      }
      if (!form.branch.trim()) {
        nextErrors.branch = "Branch name is required.";
      }
      if (!form.return_policy) {
        nextErrors.return_policy = "Return policy is required.";
      }
      if (!form.dealing_area.length) {
        nextErrors.dealing_area = "Select at least one dealing area.";
      } else if (form.dealing_area.includes("Other")) {
        nextErrors.dealing_area = "Select Other ke liye custom dealing area add karein.";
      }

      const invalidOperatingDay = form.operating_hours.find((row) => {
        if (row.closed) return false;
        if (!row.open || !row.close) return true;
        return row.open >= row.close;
      });

      if (invalidOperatingDay) {
        nextErrors.operating_hours =
          invalidOperatingDay.open && invalidOperatingDay.close
            ? `Close time must be later than open time for ${invalidOperatingDay.day}.`
            : `Set open and close time for ${invalidOperatingDay.day}, or mark it closed.`;
      }

      if (form.alternate_contact_phone.trim()) {
        const alternateDigits = normalizeDigits(form.alternate_contact_phone);
        if (alternateDigits.length < 6 || alternateDigits.length > 15) {
          nextErrors.alternate_contact_phone = "Enter a valid alternate mobile number.";
        }
        if (!form.alternate_contact_country_code) {
          nextErrors.alternate_contact_country_code = "Select a country code for alternate number.";
        }
      }

      if (form.upi_id.trim() && !validateUPI(form.upi_id.trim())) {
        nextErrors.upi_id = "Enter a valid UPI ID.";
      }

      if (isIndianBusiness) {
        if (!form.gst_number.trim()) {
          nextErrors.gst_number = "GST number is required.";
        } else if (!validateGST(form.gst_number.trim().toUpperCase())) {
          nextErrors.gst_number = "Enter a valid GST number.";
        }
        if (!form.pan_number.trim()) {
          nextErrors.pan_number = "PAN number is required.";
        } else if (!validatePAN(form.pan_number.trim().toUpperCase())) {
          nextErrors.pan_number = "Enter a valid PAN number.";
        }
      } else {
        if (!form.business_license_number.trim()) {
          nextErrors.business_license_number = "Business license number is required.";
        }
        if (!form.business_proof_document_1) {
          nextErrors.business_proof_document_1 = "Business proof document 1 is required.";
        }
        if (!form.business_proof_document_2) {
          nextErrors.business_proof_document_2 = "Business proof document 2 is required.";
        }
      }
    }

    return nextErrors;
  };

  const applyStepErrors = (step: BusinessStep, stepErrors: Record<string, string>) => {
    const stepFieldMap: Record<BusinessStep, string[]> = {
      address: ["country", "address_line_1", "street", "city", "state", "pincode"],
      profile: [
        "registrar_name",
        "designation",
        "name",
        "business_type",
        "established_year",
        "business_nature",
        "annual_turnover",
        "office_employees",
        "categories",
      ],
      other: [
        "bank_name",
        "bank_account",
        "ifsc_code",
        "branch",
        "return_policy",
        "dealing_area",
        "alternate_contact_country_code",
        "alternate_contact_phone",
        "upi_id",
        "operating_hours",
        "gst_number",
        "pan_number",
        "gst_cert",
        "pan_card",
        "business_license_number",
        "business_proof_document_1",
        "business_proof_document_2",
      ],
    };

    setErrors((previous) => {
      const next = { ...previous };
      stepFieldMap[step].forEach((fieldName) => {
        delete next[fieldName];
      });
      return {
        ...next,
        ...stepErrors,
      };
    });
  };

  const moveToStep = async (step: BusinessStep, message = "Loading next step...") => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    setStepTransitionText(message);
    setIsStepTransitioning(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 450));
      setCurrentStep(step);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    } finally {
      setIsStepTransitioning(false);
    }
  };

  const handleNext = () => {
    const stepErrors = getStepErrors(currentStep);
    applyStepErrors(currentStep, stepErrors);

    if (Object.keys(stepErrors).length) {
      return;
    }

    const nextStep = STEP_ORDER[currentStepIndex + 1];
    if (nextStep) {
      void moveToStep(nextStep, "Opening next step...");
    }
  };

  const handleBack = () => {
    const previousStep = STEP_ORDER[currentStepIndex - 1];
    if (previousStep) {
      void moveToStep(previousStep, "Opening previous step...");
    }
  };

  const handleSubmit = async () => {
    const addressErrors = getStepErrors("address");
    const profileErrors = getStepErrors("profile");
    const otherErrors = getStepErrors("other");
    const mergedErrors = {
      ...addressErrors,
      ...profileErrors,
      ...otherErrors,
    };

    setErrors(mergedErrors);

    if (Object.keys(mergedErrors).length) {
      if (Object.keys(addressErrors).length) {
        void moveToStep("address", "Opening address step...");
      } else if (Object.keys(profileErrors).length) {
        void moveToStep("profile", "Opening profile step...");
      } else {
        void moveToStep("other", "Opening document step...");
      }
      return;
    }

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "Please login first.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("registrar_name", form.registrar_name.trim());
      formData.append("designation", form.designation.trim());
      formData.append("email", form.email.trim());
      formData.append("phone_no", form.phone_no.trim());
      formData.append("name", form.name.trim());
      formData.append("business_type", form.business_type);
      formData.append("country", form.country);
      formData.append("address_line_1", form.address_line_1.trim());
      if (form.address_line_2.trim()) {
        formData.append("address_line_2", form.address_line_2.trim());
      }
      formData.append("street", form.street.trim());
      formData.append("city", form.city.trim());
      formData.append("state", form.state.trim());
      formData.append("pincode", form.pincode.trim());
      formData.append("established_year", form.established_year);
      formData.append("business_nature", JSON.stringify(form.business_nature));
      formData.append("annual_turnover", form.annual_turnover);
      formData.append("office_employees", form.office_employees);
      formData.append("categories", JSON.stringify(form.categories));
      formData.append("bank_name", form.bank_name);
      formData.append("bank_account", form.bank_account.trim());
      formData.append("ifsc_code", form.ifsc_code.trim().toUpperCase());
      formData.append("branch", form.branch.trim());
      formData.append("return_policy", form.return_policy);
      formData.append("dealing_area", JSON.stringify(form.dealing_area));
      formData.append("operating_hours", serializeOperatingHours(form.operating_hours));
      if (form.avatar_url) {
        formData.append("avatar_url", form.avatar_url);
      }
      if (form.alternate_contact_name.trim()) {
        formData.append("alternate_contact_name", form.alternate_contact_name.trim());
      }
      if (form.alternate_contact_country_code.trim()) {
        formData.append(
          "alternate_contact_country_code",
          form.alternate_contact_country_code.trim(),
        );
      }
      if (form.alternate_contact_phone.trim()) {
        const alternateDigits = normalizeDigits(form.alternate_contact_phone);
        const dialCodeDigits = normalizeDigits(form.alternate_contact_country_code);
        formData.append(
          "alternate_contact_phone",
          dialCodeDigits ? `${dialCodeDigits}${alternateDigits}` : alternateDigits,
        );
      }
      if (form.upi_id.trim()) {
        formData.append("upi_id", form.upi_id.trim());
      }
      if (form.avatar && !form.avatar_url) {
        formData.append("avatar", form.avatar);
      }

      const adminAutoLoginUrl = buildAdminAutoLoginUrl({
        token,
        vendor: {
          role: "vendor",
          email: lockedEmail || form.email || "",
          phone: lockedPhone || form.phone_no || "",
        },
      });
      if (adminAutoLoginUrl) {
        formData.append("admin_auto_login_url", adminAutoLoginUrl);
      }

      if (isIndianBusiness) {
        formData.append("gst_number", form.gst_number.trim().toUpperCase());
        formData.append("pan_number", form.pan_number.trim().toUpperCase());
        if (form.gst_cert) {
          formData.append("gst_cert", form.gst_cert);
        }
        if (form.pan_card) {
          formData.append("pan_card", form.pan_card);
        }
      } else {
        formData.append("business_license_number", form.business_license_number.trim());
        if (form.business_proof_document_1) {
          formData.append("business_proof_document_1", form.business_proof_document_1);
        }
        if (form.business_proof_document_2) {
          formData.append("business_proof_document_2", form.business_proof_document_2);
        }
      }

      const result = await dispatch(updateVendorBusiness({ formData }));

      if (updateVendorBusiness.fulfilled.match(result)) {
        const successMessage =
          (result.payload as { message?: string })?.message ??
          "Your business details have been saved successfully.";
        const vendorData =
          (result.payload as { vendor?: Record<string, unknown> })?.vendor ?? null;
        const adminRedirectUrl = buildAdminAutoLoginUrl({
          token,
          vendor: vendorData,
        });

        if (typeof window !== "undefined") {
          localStorage.removeItem(VENDOR_BUSINESS_DRAFT_KEY);
          localStorage.removeItem(VENDOR_REG_META_KEY);
          localStorage.removeItem("vendor_phone");
          localStorage.removeItem("vendor_country_code");
          localStorage.removeItem("vendor_email");
          localStorage.removeItem("vendor_registration_step");
          sessionStorage.removeItem("vendor_phone");
          sessionStorage.removeItem("vendor_country_code");
          sessionStorage.removeItem("vendor_email");
          sessionStorage.removeItem("vendor_registration_step");
        }

        if (typeof window !== "undefined") {
          if (redirectTimerRef.current) {
            clearInterval(redirectTimerRef.current);
            redirectTimerRef.current = null;
          }

          window.scrollTo({ top: 0, behavior: "auto" });
          setRedirectMessage(successMessage);
          setRedirectTargetUrl(adminRedirectUrl);
          setRedirectProgress(0);
          setShowRedirectPopup(true);

          redirectTimerRef.current = setInterval(() => {
            setRedirectProgress((previous) => {
              const next = Math.min(previous + 4, 100);
              if (next >= 100) {
                if (redirectTimerRef.current) {
                  clearInterval(redirectTimerRef.current);
                  redirectTimerRef.current = null;
                }
                window.location.replace(adminRedirectUrl);
              }
              return next;
            });
          }, 120);
        } else {
          router.push("/sign-in");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            (result.payload as string) ?? "Failed to update business details. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "Something went wrong while submitting the business details.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <StepTransitionLoader visible={isStepTransitioning} text={stepTransitionText} />
      {showRedirectPopup ? (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/55 p-5">
          <div className="w-full max-w-md border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <Image
                src="/sellerslogin-logo.svg"
                alt="SellersLogin"
                width={44}
                height={44}
                className="h-11 w-11"
              />
              <div>
                <p className="text-lg font-bold text-slate-950">Submission Successful</p>
                <p className="text-sm text-slate-600">{redirectMessage}</p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Redirecting to dashboard...
              </p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded bg-slate-200">
                <div
                  className="h-full bg-violet-700 transition-all duration-150"
                  style={{ width: `${redirectProgress}%` }}
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-700">{redirectProgress}%</p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (redirectTimerRef.current) {
                  clearInterval(redirectTimerRef.current);
                  redirectTimerRef.current = null;
                }
                if (redirectTargetUrl) {
                  window.location.replace(redirectTargetUrl);
                }
              }}
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center border border-violet-700 bg-violet-700 px-4 text-sm font-semibold text-white transition hover:bg-violet-800"
            >
              Go to dashboard now
            </button>
          </div>
        </div>
      ) : null}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <Link href={mainSiteUrl} className="flex min-w-0 items-center gap-3" {...newTabProps}>
            <Image
              src="/sellerslogin-logo.svg"
              alt="SellersLogin logo"
              width={48}
              height={48}
              priority
              className="h-12 w-12 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-2xl font-bold tracking-tight text-slate-950">SellersLogin</p>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Build for your all e-commerce needs
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={vendorOverviewUrl}
              className="inline-flex min-h-12 items-center justify-center border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
              {...newTabProps}
            >
              Vendor Access
            </Link>
            <a
              href={adminLoginUrl}
              className="inline-flex min-h-12 items-center justify-center border border-violet-700 bg-violet-700 px-5 text-sm font-semibold text-white transition hover:bg-violet-800"
              {...newTabProps}
            >
              Login
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <section className="border border-slate-200 bg-white p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
            {currentStepLabel}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
            {stepContent.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            {stepContent.description}
          </p>

          {canGoBack ? (
            <button
              type="button"
              onClick={handleBack}
              className="mt-6 inline-flex min-h-11 items-center justify-center border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
            >
              Go back to previous step
            </button>
          ) : null}

          {countriesError ? (
            <div className="mt-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p>{countriesError}</p>
              <button
                type="button"
                className="mt-3 font-semibold underline-offset-4 hover:underline"
                onClick={() => setCountryRequestNonce((value) => value + 1)}
              >
                Retry loading countries
              </button>
            </div>
          ) : null}

          <div className="my-8 border-t border-slate-200" />

          {currentStep === "address" ? (
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <CountrySelectField
                  label="Business country"
                  required
                  value={selectedBusinessCountry}
                  options={availableCountries}
                  onChange={updateCountry}
                  error={errors.country}
                  disabled={countriesLoading}
                  showDialCode={false}
                />

                <TextField
                  label="Address line 1"
                  required
                  value={form.address_line_1}
                  onChange={(value) => updateTextField("address_line_1", value)}
                  error={errors.address_line_1}
                  placeholder="Registered office or warehouse address"
                />

                <TextField
                  label="Address line 2"
                  value={form.address_line_2}
                  onChange={(value) => updateTextField("address_line_2", value)}
                  placeholder="Suite, floor, landmark"
                />

                <TextField
                  label="Street"
                  required
                  value={form.street}
                  onChange={(value) => updateTextField("street", value)}
                  error={errors.street}
                  placeholder="Street or locality"
                />

                <div>
                  {!isManualCityEntry && cityOptions.length ? (
                    <SelectField
                      label="City"
                      required
                      value={form.city}
                      onChange={(value) => updateTextField("city", value)}
                      options={cityOptions}
                      error={errors.city}
                      placeholder="Select city"
                      disabled={citiesLoading || !form.state.trim()}
                    />
                  ) : (
                    <TextField
                      label="City"
                      required
                      value={form.city}
                      onChange={(value) => updateTextField("city", value)}
                      error={errors.city}
                      placeholder="City"
                    />
                  )}

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                    {citiesLoading ? <p className="text-slate-500">Loading cities...</p> : null}
                    {citiesError ? <p className="text-amber-700">{citiesError}</p> : null}
                    {!isManualCityEntry && cityOptions.length ? (
                      <button
                        type="button"
                        className="font-semibold text-violet-700 hover:text-violet-800"
                        onClick={() => setIsManualCityEntry(true)}
                        disabled={citiesLoading}
                      >
                        Enter manually
                      </button>
                    ) : null}
                    {isManualCityEntry && cityOptions.length ? (
                      <button
                        type="button"
                        className="font-semibold text-violet-700 hover:text-violet-800"
                        onClick={() => setIsManualCityEntry(false)}
                        disabled={citiesLoading}
                      >
                        Choose from list
                      </button>
                    ) : null}
                  </div>
                </div>

                <div>
                  {!isManualStateEntry && stateOptions.length ? (
                    <SelectField
                      label={stateLabel}
                      required
                      value={form.state}
                      onChange={updateState}
                      options={stateOptions}
                      error={errors.state}
                      placeholder={`Select ${stateLabel.toLowerCase()}`}
                      disabled={statesLoading}
                    />
                  ) : (
                    <TextField
                      label={stateLabel}
                      required
                      value={form.state}
                      onChange={updateState}
                      error={errors.state}
                      placeholder="Province or region"
                    />
                  )}

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                    {statesLoading ? <p className="text-slate-500">Loading states...</p> : null}
                    {statesError ? <p className="text-amber-700">{statesError}</p> : null}
                    {!isIndianBusiness && !isManualStateEntry && stateOptions.length ? (
                      <button
                        type="button"
                        className="font-semibold text-violet-700 hover:text-violet-800"
                        onClick={() => setIsManualStateEntry(true)}
                        disabled={statesLoading}
                      >
                        Enter manually
                      </button>
                    ) : null}
                    {!isIndianBusiness && isManualStateEntry && stateOptions.length ? (
                      <button
                        type="button"
                        className="font-semibold text-violet-700 hover:text-violet-800"
                        onClick={() => setIsManualStateEntry(false)}
                        disabled={statesLoading}
                      >
                        Choose from list
                      </button>
                    ) : null}
                  </div>
                </div>

                <TextField
                  label={postalCodeLabel}
                  required
                  value={form.pincode}
                  onChange={(value) => updateTextField("pincode", value)}
                  error={errors.pincode}
                  placeholder={isIndianBusiness ? "6-digit pincode" : "Postal or ZIP code"}
                  inputMode="numeric"
                />
              </div>
            </div>
          ) : null}

          {currentStep === "profile" ? (
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <TextField
                  label="Registrar name"
                  required
                  value={form.registrar_name}
                  onChange={(value) => updateTextField("registrar_name", value)}
                  error={errors.registrar_name}
                  placeholder="Your full name"
                />

                <SelectField
                  label="Designation"
                  required
                  value={form.designation}
                  onChange={(value) => updateTextField("designation", value)}
                  options={designationOptions}
                  error={errors.designation}
                  placeholder="Select designation"
                />

                {form.designation === "Other" ? (
                  <div className="md:col-span-2">
                    <FieldLabel label="Other designation" required />
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <Input
                        value={designationOtherInput}
                        onChange={(event) => setDesignationOtherInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            addCustomDesignation();
                          }
                        }}
                        placeholder="Enter designation name"
                        className="h-12 rounded-none border-slate-300 px-4 text-base shadow-none"
                      />
                      <button
                        type="button"
                        onClick={addCustomDesignation}
                        className="inline-flex min-h-12 items-center justify-center border border-violet-700 bg-violet-700 px-5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                        disabled={!designationOtherInput.trim()}
                      >
                        Add
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      Type your custom designation and click Add.
                    </p>
                  </div>
                ) : null}

                <TextField
                  label="Business name"
                  required
                  value={form.name}
                  onChange={(value) => updateTextField("name", value)}
                  error={errors.name}
                  placeholder="Registered business name"
                />

                <SelectField
                  label="Business type"
                  required
                  value={form.business_type}
                  onChange={(value) => updateTextField("business_type", value)}
                  options={BUSINESS_TYPES}
                  error={errors.business_type}
                  placeholder="Select business type"
                />

                <SelectField
                  label="Establishment year"
                  required
                  value={form.established_year}
                  onChange={(value) => updateTextField("established_year", value)}
                  options={ESTABLISHMENT_YEAR_OPTIONS}
                  error={errors.established_year}
                  placeholder="Select year"
                />

                <SearchableMultiSelectField
                  label="Business nature"
                  required
                  values={form.business_nature}
                  onChange={(values) => updateArrayField("business_nature", values)}
                  options={businessNatureOptions}
                  error={errors.business_nature}
                  placeholder="Select one or more business natures"
                />

                {form.business_nature.includes("Other") ? (
                  <div className="md:col-span-2">
                    <FieldLabel label="Other business nature" required />
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <Input
                        value={businessNatureOtherInput}
                        onChange={(event) => setBusinessNatureOtherInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            addCustomBusinessNature();
                          }
                        }}
                        placeholder="Enter business nature name"
                        className="h-12 rounded-none border-slate-300 px-4 text-base shadow-none"
                      />
                      <button
                        type="button"
                        onClick={addCustomBusinessNature}
                        className="inline-flex min-h-12 items-center justify-center border border-violet-700 bg-violet-700 px-5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                        disabled={!businessNatureOtherInput.trim()}
                      >
                        Add
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      Type your custom business nature and click Add.
                    </p>
                  </div>
                ) : null}

                <SelectField
                  label="Annual turnover"
                  required
                  value={form.annual_turnover}
                  onChange={(value) => updateTextField("annual_turnover", value)}
                  options={ANNUAL_TURNOVER}
                  error={errors.annual_turnover}
                  placeholder="Select annual turnover"
                />

                <SelectField
                  label="Number of office employees"
                  required
                  value={form.office_employees}
                  onChange={(value) => updateTextField("office_employees", value)}
                  options={NUMBER_OF_EMPLOYEES}
                  error={errors.office_employees}
                  placeholder="Select employee range"
                />

                <div className="md:col-span-2">
                  <FieldLabel label="Company Profile Photo" />
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*,.jpg,.jpeg,.png,.gif,.webp,.avif"
                    onChange={(event) => updateAvatarFile(event.target.files?.[0] ?? null)}
                    className="hidden"
                  />

                  {form.avatar && avatarPreviewUrl ? (
                    <div className="mt-3 border border-slate-300 bg-slate-50 p-5">
                      <div className="grid gap-5 sm:grid-cols-[112px_minmax(0,1fr)] sm:items-start">
                        <img
                          src={avatarPreviewUrl}
                          alt="Profile preview"
                          className="h-28 w-28 border border-slate-300 object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p
                            className="truncate text-base font-semibold text-slate-950"
                            title={form.avatar.name}
                          >
                            {form.avatar.name}
                          </p>
                          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                            Only image files from your computer are allowed for profile photo.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={openAvatarPicker}
                          className="inline-flex min-h-12 w-full items-center justify-center border border-violet-700 bg-violet-700 px-5 text-sm font-semibold text-white transition hover:bg-violet-800 sm:flex-1"
                        >
                          Change image
                        </button>
                        <button
                          type="button"
                          onClick={() => updateAvatarFile(null)}
                          className="inline-flex min-h-12 w-full items-center justify-center border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 sm:flex-1"
                        >
                          Remove image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 border border-slate-300 bg-slate-50 p-5">
                      <p className="max-w-lg text-sm leading-6 text-slate-600">
                        Optional. Upload a profile or business image.
                      </p>
                      <button
                        type="button"
                        onClick={openAvatarPicker}
                        className="mt-4 inline-flex min-h-12 w-full items-center justify-center border border-violet-700 bg-violet-700 px-5 text-sm font-semibold text-white transition hover:bg-violet-800 sm:w-auto"
                      >
                        Choose image
                      </button>
                      <p className="mt-3 text-sm text-slate-500">
                        Allowed from PC: JPG, PNG, GIF, WEBP, AVIF.
                      </p>
                    </div>
                  )}

                  {errors.avatar ? <p className="mt-2 text-sm text-red-600">{errors.avatar}</p> : null}
                </div>

                <div className="md:col-span-2">
                  <SearchableMultiSelectField
                    label="Category (Select up to 10)"
                    required
                    values={form.categories}
                    onChange={(values) => updateArrayField("categories", values)}
                    options={CATEGORIES}
                    error={errors.categories}
                    placeholder="Select categories"
                    maxSelections={MAX_CATEGORY_SELECTION}
                    onLimitReached={() =>
                      setErrors((previous) => ({
                        ...previous,
                        categories: `Select up to ${MAX_CATEGORY_SELECTION} categories.`,
                      }))
                    }
                  />
                </div>

              </div>
            </div>
          ) : null}

          {currentStep === "other" ? (
            <div className="space-y-10">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <BankSelectField
                    label="Bank name"
                    required
                    value={form.bank_name}
                    onChange={(value) => updateTextField("bank_name", value)}
                    options={bankOptions}
                    error={errors.bank_name}
                    placeholder="Select bank name"
                  />
                </div>

                {form.bank_name === "Other" ? (
                  <div>
                    <FieldLabel label="Other bank name" required />
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <Input
                        value={bankOtherInput}
                        onChange={(event) => setBankOtherInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            addCustomBank();
                          }
                        }}
                        placeholder="Enter bank name"
                        className="h-12 rounded-none border-slate-300 px-4 text-base shadow-none"
                      />
                      <button
                        type="button"
                        onClick={addCustomBank}
                        className="inline-flex min-h-12 items-center justify-center border border-violet-700 bg-violet-700 px-5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                        disabled={!bankOtherInput.trim()}
                      >
                        Add
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      Type your custom bank name and click Add.
                    </p>
                </div>
                ) : null}

                <TextField
                  label={bankAccountLabel}
                  required
                  value={form.bank_account}
                  onChange={(value) => updateTextField("bank_account", value)}
                  error={errors.bank_account}
                  placeholder={isIndianBusiness ? "9 to 18 digits" : "Account or IBAN number"}
                />

                <TextField
                  label={bankCodeLabel}
                  required
                  value={form.ifsc_code}
                  onChange={(value) => updateTextField("ifsc_code", value.toUpperCase())}
                  error={errors.ifsc_code}
                  placeholder={isIndianBusiness ? "Example: SBIN0002499" : "Routing or SWIFT code"}
                />

                <TextField
                  label="Branch name"
                  required
                  value={form.branch}
                  onChange={(value) => updateTextField("branch", value)}
                  error={errors.branch}
                  placeholder="Branch or bank location"
                />

                <TextField
                  label="Alternate contact name"
                  value={form.alternate_contact_name}
                  onChange={(value) => updateTextField("alternate_contact_name", value)}
                  placeholder="Optional alternate contact"
                />

                <div>
                  <FieldLabel label="Alternate number" />
                  <div className="mt-3 grid grid-cols-1 gap-3">
                    <CountrySelectField
                      label="Country code"
                      value={selectedAlternateCountry}
                      options={availableCountries}
                      onChange={updateAlternateCountry}
                      error={errors.alternate_contact_country_code}
                      disabled={countriesLoading}
                    />
                    <div>
                      <Input
                        type="tel"
                        value={form.alternate_contact_phone}
                        onChange={(event) =>
                          updateTextField(
                            "alternate_contact_phone",
                            normalizeDigits(event.target.value).slice(0, 15),
                          )
                        }
                        placeholder="Optional alternate mobile number"
                        className="h-12 rounded-none border-slate-300 px-4 text-base shadow-none"
                      />
                      {errors.alternate_contact_phone ? (
                        <p className="mt-2 text-sm text-red-600">{errors.alternate_contact_phone}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <TextField
                  label="UPI ID"
                  value={form.upi_id}
                  onChange={(value) => updateTextField("upi_id", value)}
                  error={errors.upi_id}
                  placeholder="Optional. Example: name@upi"
                />

                <SelectField
                  label="Return policy"
                  required
                  value={form.return_policy}
                  onChange={(value) => updateTextField("return_policy", value)}
                  options={RETURN_POLICY}
                  error={errors.return_policy}
                  placeholder="Select return policy"
                />

                <div className="md:col-span-2">
                  <SearchableMultiSelectField
                    label="Dealing area"
                    required
                    values={form.dealing_area}
                    onChange={(values) => updateArrayField("dealing_area", values)}
                    options={dealingAreaSelectableOptions}
                    error={errors.dealing_area}
                    placeholder="Select countries where you deal"
                  />
                </div>

                {form.dealing_area.includes("Other") ? (
                  <div className="md:col-span-2">
                    <FieldLabel label="Other dealing area" required />
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <Input
                        value={dealingAreaOtherInput}
                        onChange={(event) => setDealingAreaOtherInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            addCustomDealingArea();
                          }
                        }}
                        placeholder="Enter dealing area name"
                        className="h-12 rounded-none border-slate-300 px-4 text-base shadow-none"
                      />
                      <button
                        type="button"
                        onClick={addCustomDealingArea}
                        className="inline-flex min-h-12 items-center justify-center border border-violet-700 bg-violet-700 px-5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                        disabled={!dealingAreaOtherInput.trim()}
                      >
                        Add
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      Type your custom dealing area and click Add.
                    </p>
                  </div>
                ) : null}

                <div className="md:col-span-2 border border-slate-200 bg-slate-50 p-6">
                  <FieldLabel label="Operating hours" required />
                  <div className="mt-4 border border-slate-200 bg-white p-4">
                    <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={applyAllDays}
                        onChange={(event) => setApplyAllDays(event.target.checked)}
                        className="h-4 w-4"
                      />
                      Select all days
                    </label>

                    {applyAllDays ? (
                      <div className="mt-4 space-y-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                              Open time
                            </p>
                            <Input
                              type="time"
                              value={bulkOpenTime}
                              onChange={(event) => setBulkOpenTime(event.target.value)}
                              className="h-12 rounded-none border-slate-300 px-4 text-base shadow-none"
                            />
                          </div>
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                              Close time
                            </p>
                            <Input
                              type="time"
                              value={bulkCloseTime}
                              onChange={(event) => setBulkCloseTime(event.target.value)}
                              className="h-12 rounded-none border-slate-300 px-4 text-base shadow-none"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                          <button
                            type="button"
                            onClick={applyOperatingHoursToAllDays}
                            className="inline-flex min-h-11 items-center justify-center border border-violet-700 bg-violet-700 px-4 text-sm font-semibold text-white transition hover:bg-violet-800"
                          >
                            Apply to all days
                          </button>
                          <button
                            type="button"
                            onClick={setAllDaysTwentyFourHours}
                            className="inline-flex min-h-11 items-center justify-center border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                          >
                            Set all 24 hours
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-4 space-y-4">
                    {form.operating_hours.map((row, index) => (
                      <div
                        key={row.day}
                        className="grid gap-3 border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-center"
                      >
                        <p className="text-sm font-semibold text-slate-950 sm:col-span-2 lg:col-span-1">
                          {row.day}
                        </p>

                        <div className="min-w-0">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                            Open time
                          </p>
                          <Input
                            type="time"
                            value={row.open}
                            disabled={row.closed}
                            onChange={(event) =>
                              updateOperatingHours(index, "open", event.target.value)
                            }
                            className="h-12 w-full min-w-0 rounded-none border-slate-300 px-3 text-base shadow-none disabled:bg-slate-100"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                            Close time
                          </p>
                          <Input
                            type="time"
                            value={row.close}
                            disabled={row.closed}
                            onChange={(event) =>
                              updateOperatingHours(index, "close", event.target.value)
                            }
                            className="h-12 w-full min-w-0 rounded-none border-slate-300 px-3 text-base shadow-none disabled:bg-slate-100"
                          />
                        </div>

                        <label className="flex min-h-12 items-center gap-3 border border-slate-300 px-4 py-3 text-sm text-slate-700 lg:w-fit">
                          <input
                            type="checkbox"
                            checked={row.closed}
                            onChange={(event) =>
                              updateOperatingHours(index, "closed", event.target.checked)
                            }
                            className="h-4 w-4"
                          />
                          Closed
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.operating_hours ? (
                    <p className="mt-3 text-sm text-red-600">{errors.operating_hours}</p>
                  ) : null}
                </div>

                {isIndianBusiness ? (
                  <>
                    <TextField
                      label="GST number"
                      required
                      value={form.gst_number}
                      onChange={(value) => updateTextField("gst_number", value.toUpperCase())}
                      error={errors.gst_number}
                      placeholder="Example: 22AAAAA0000A1Z5"
                    />

                    <TextField
                      label="PAN number"
                      required
                      value={form.pan_number}
                      onChange={(value) => updateTextField("pan_number", value.toUpperCase())}
                      error={errors.pan_number}
                      placeholder="Example: ABCDE1234F"
                    />

                    <FileField
                      label="GST certificate"
                      onChange={(event) => updateFileField("gst_cert", event.target.files?.[0] ?? null)}
                      fileName={form.gst_cert?.name}
                      helperText="Optional. Upload GST certificate in PDF or image format."
                      error={errors.gst_cert}
                    />

                    <FileField
                      label="PAN card document"
                      onChange={(event) => updateFileField("pan_card", event.target.files?.[0] ?? null)}
                      fileName={form.pan_card?.name}
                      helperText="Optional. Upload PAN card in PDF or image format."
                      error={errors.pan_card}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      label="Business license number"
                      required
                      value={form.business_license_number}
                      onChange={(value) => updateTextField("business_license_number", value)}
                      error={errors.business_license_number}
                      placeholder="Enter registration or business license number"
                    />

                    <FileField
                      label="Business proof document 1"
                      required
                      onChange={(event) =>
                        updateFileField("business_proof_document_1", event.target.files?.[0] ?? null)
                      }
                      fileName={form.business_proof_document_1?.name}
                      helperText="Required for businesses outside India."
                      error={errors.business_proof_document_1}
                    />

                    <FileField
                      label="Business proof document 2"
                      required
                      onChange={(event) =>
                        updateFileField("business_proof_document_2", event.target.files?.[0] ?? null)
                      }
                      fileName={form.business_proof_document_2?.name}
                      helperText="Upload a second business proof document."
                      error={errors.business_proof_document_2}
                    />
                  </>
                )}
              </div>
            </div>
          ) : null}

          <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-500">
              {currentStep === "other"
                ? "Review all required fields before submitting the final business registration."
                : "The right side stays fixed while the left form changes from step to step."}
              {currentStep === "other" && isAnyAssetUploading ? (
                <p className="mt-2 text-amber-700">
                  File upload in progress. Please wait before final submit.
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {currentStep !== "address" ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex min-h-12 items-center justify-center border border-slate-300 px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
                >
                  Back
                </button>
              ) : null}

              {currentStep === "other" ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || isSubmitting || isAnyAssetUploading}
                  className="inline-flex min-h-12 items-center justify-center border border-violet-700 bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  {loading || isSubmitting
                    ? "Submitting..."
                    : isAnyAssetUploading
                      ? "Uploading files..."
                      : "Complete registration"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex min-h-12 items-center justify-center border border-violet-700 bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-800"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="lg:sticky lg:top-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
            {currentStepLabel}
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl lg:leading-[0.92]">
            Complete your business registration.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Stay on this page and move through address, profile, and final documents.
            The right side remains fixed and keeps the full registration map visible.
          </p>

          <div className="mt-10 border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Registration steps
            </p>

            <div className="mt-6 space-y-6">
              {stepItems.map((item, index) => {
                const tone = getStepTone(item.status);
                const isClickable = index < currentStepIndex;

                return (
                  <div
                    key={item.id}
                    className={index < stepItems.length - 1 ? "border-b border-slate-200 pb-6" : ""}
                  >
                    {isClickable ? (
                      <button
                        type="button"
                        onClick={() => {
                          void moveToStep(item.id);
                        }}
                        className="block w-full text-left"
                      >
                        <div
                          className={`border-l-2 ${tone.accent} pl-4 transition hover:border-slate-950`}
                        >
                          <p
                            className={`text-xs font-semibold uppercase tracking-[0.22em] ${tone.label}`}
                          >
                            {item.label}
                          </p>
                          <p className={`mt-2 text-base font-semibold ${tone.title}`}>
                            {item.title}
                          </p>
                          <p className={`mt-2 text-sm ${tone.note}`}>Click to edit</p>
                        </div>
                      </button>
                    ) : (
                      <div className={`border-l-2 ${tone.accent} pl-4`}>
                        <p
                          className={`text-xs font-semibold uppercase tracking-[0.22em] ${tone.label}`}
                        >
                          {item.label}
                        </p>
                        <p className={`mt-2 text-base font-semibold ${tone.title}`}>
                          {item.title}
                        </p>
                        <p className={`mt-2 text-sm ${tone.note}`}>{item.note}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
              Locked details
            </p>
            <div className="mt-5 space-y-4 text-sm">
              <div className="border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Verified mobile
                </p>
                <p className="mt-2 text-base font-semibold text-slate-950">
                  {lockedPhone || "Not available"}
                </p>
              </div>

              <div className="border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Verified email
                </p>
                <p className="mt-2 text-base font-semibold text-slate-950">
                  {lockedEmail || "Not available"}
                </p>
              </div>

              <p className="text-sm leading-6 text-slate-500">
                These details come from the phone and email verification step and are not edited here.
              </p>

              <Link
                href="/vendor/registration"
                className="inline-flex min-h-12 items-center justify-center border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
                {...newTabProps}
              >
                Open verification page
              </Link>
            </div>
          </div>

          <div className="mt-8 border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
              Compliance note
            </p>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              <p>India businesses submit GST and PAN with their documents.</p>
              <p>Businesses outside India submit a business license number and 2 proof documents.</p>
              <p>
                Add registrar details, designation, and business profile correctly
                before moving to the final documents step.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 border border-slate-200 bg-white p-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/sellerslogin-logo.svg"
                  alt="SellersLogin logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0"
                />
                <div>
                  <p className="text-2xl font-bold tracking-tight text-slate-950">SellersLogin</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Build for your all e-commerce needs
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-600">
                Business registration now stays inside one flat step flow that matches the
                phone and email verification screens.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                Quick links
              </p>
              <div className="mt-5 space-y-3 text-sm font-semibold text-slate-700">
                <Link href={vendorOverviewUrl} className="block hover:text-violet-700" {...newTabProps}>
                  Vendor Access
                </Link>
                <Link href={mainSiteUrl} className="block hover:text-violet-700" {...newTabProps}>
                  Main Site
                </Link>
                <a href={adminLoginUrl} className="block hover:text-violet-700" {...newTabProps}>
                  Login to dashboard
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                Contact
              </p>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <a
                  href={`mailto:${supportEmail}`}
                  className="block font-semibold text-slate-950 hover:text-violet-700"
                  {...newTabProps}
                >
                  {supportEmail}
                </a>
                <p>Office No 834, Gaur City Mall, Greater Noida</p>
                <p>Uttar Pradesh 201312, India</p>
              </div>
            </div>
          </div>

          <div className="border-x border-b border-slate-200 bg-white px-8 py-4 text-sm text-slate-500">
            Copyright {new Date().getFullYear()} SellersLogin. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
