"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isSupportedCountry, parsePhoneNumberFromString } from "libphonenumber-js/min";
import type { CountryCode } from "libphonenumber-js/min";
import { ChevronDown, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import StepTransitionLoader from "@/components/vendor/StepTransitionLoader";
import type { AppDispatch } from "@/store";
import {
  resetOtpState,
  sendEmailOtp,
  sendOtp,
  verifyEmailOtp,
  verifyOtp,
} from "@/store/slices/authSlice";

type RegistrationStage = "phone-entry" | "phone-otp" | "email-entry" | "email-otp";
type StepStatus = "complete" | "current" | "pending";

interface CountryOption {
  code: string;
  dialCode: string;
  flagUrl: string;
  name: string;
}

const mainSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "/";
const adminLoginUrl =
  process.env.NEXT_PUBLIC_ADMIN_APP_URL ?? "http://localhost:5173/sign-in?redirect=%2F";
const supportEmail = "support@sellerslogin.com";
const vendorOverviewUrl = "/vendor";
const privacyPolicyUrl = "/privacy";
const termsAndConditionsUrl = "/terms";
const newTabProps = {
  target: "_blank",
  rel: "noreferrer",
};
const emptyPhoneOtp = ["", "", "", "", "", ""];
const emptyEmailOtp = ["", "", "", "", "", ""];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VENDOR_REG_META_KEY = "vendor_registration_meta_v1";
const VENDOR_REG_DRAFT_KEY = "vendor_registration_draft_v1";

const isEmailStep = (stage: RegistrationStage) =>
  stage === "email-entry" || stage === "email-otp";

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

const validateWhatsAppNumber = (digits: string, country: CountryOption | null) => {
  if (!country) {
    return {
      isValid: false,
      message: "Select a country code to continue.",
    };
  }

  if (!digits) {
    return {
      isValid: false,
      message: "Enter your WhatsApp number to continue.",
    };
  }

  const normalizedDigits = digits.replace(/\D/g, "");
  const normalizedCountryCode = country.code.toUpperCase() as CountryCode;

  if (normalizedCountryCode === "IN") {
    if (!/^[6-9]\d{9}$/.test(normalizedDigits)) {
      return {
        isValid: false,
        message: "Enter a valid Indian WhatsApp mobile number.",
      };
    }

    return {
      isValid: true,
      message: "",
    };
  }

  if (isSupportedCountry(normalizedCountryCode)) {
    const parsedNumber = parsePhoneNumberFromString(
      normalizedDigits,
      normalizedCountryCode,
    );

    if (parsedNumber?.isValid()) {
      return {
        isValid: true,
        message: "",
      };
    }

    return {
      isValid: false,
      message: `Enter a valid WhatsApp number for ${country.name}.`,
    };
  }

  if (normalizedDigits.length < 6 || normalizedDigits.length > 15) {
    return {
      isValid: false,
      message: `Enter a valid WhatsApp number for ${country.name}.`,
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

export default function VendorRegistrationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [stage, setStage] = useState<RegistrationStage>("phone-entry");
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesError, setCountriesError] = useState<string | null>(null);
  const [countryRequestNonce, setCountryRequestNonce] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");

  const [phone, setPhone] = useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState<string[]>(emptyPhoneOtp);
  const [phoneTimer, setPhoneTimer] = useState(30);
  const [canResendPhoneOtp, setCanResendPhoneOtp] = useState(false);
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);

  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState<string[]>(emptyEmailOtp);
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false);
  const [isStepTransitioning, setIsStepTransitioning] = useState(false);
  const [stepTransitionText, setStepTransitionText] = useState("Loading next step...");

  const countryMenuRef = useRef<HTMLDivElement | null>(null);
  const countrySearchRef = useRef<HTMLInputElement | null>(null);
  const phoneOtpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const emailOtpRefs = useRef<(HTMLInputElement | null)[]>([]);

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

        const nextCountries = Array.isArray(payload) ? (payload as CountryOption[]) : [];
        const metaRaw =
          typeof window !== "undefined" ? localStorage.getItem(VENDOR_REG_META_KEY) : null;
        const meta = metaRaw
          ? (JSON.parse(metaRaw) as { countryCode?: string; phone?: string; email?: string })
          : null;
        const draftRaw =
          typeof window !== "undefined" ? localStorage.getItem(VENDOR_REG_DRAFT_KEY) : null;
        const draft = draftRaw
          ? (JSON.parse(draftRaw) as {
            stage?: RegistrationStage;
            countryCode?: string;
            phone?: string;
            email?: string;
            phoneOtp?: string[];
            emailOtp?: string[];
            phoneTimer?: number;
            canResendPhoneOtp?: boolean;
          })
          : null;

        const storedCountryCode =
          draft?.countryCode ??
          meta?.countryCode ??
          localStorage.getItem("vendor_country_code") ??
          sessionStorage.getItem("vendor_country_code") ??
          "";
        const storedPhone =
          draft?.phone ??
          meta?.phone ??
          localStorage.getItem("vendor_phone") ??
          sessionStorage.getItem("vendor_phone") ??
          "";
        const storedEmail =
          draft?.email ??
          meta?.email ??
          localStorage.getItem("vendor_email") ??
          sessionStorage.getItem("vendor_email") ??
          "";
        const storedStep =
          draft?.stage ??
          (localStorage.getItem("vendor_registration_step") as RegistrationStage | null) ??
          (sessionStorage.getItem("vendor_registration_step") as RegistrationStage | null);

        const initialCountry =
          nextCountries.find((country) => country.dialCode === storedCountryCode) ??
          nextCountries.find((country) => country.code === "IN") ??
          nextCountries[0] ??
          null;

        setCountries(nextCountries);
        setSelectedCountry(initialCountry);
        setEmail(storedEmail);
        if (draft?.phoneOtp?.length === 6) setPhoneOtp(draft.phoneOtp);
        if (draft?.emailOtp?.length === 6) setEmailOtp(draft.emailOtp);
        if (typeof draft?.phoneTimer === "number") setPhoneTimer(draft.phoneTimer);
        if (typeof draft?.canResendPhoneOtp === "boolean") {
          setCanResendPhoneOtp(draft.canResendPhoneOtp);
        }

        if (storedPhone) {
          const activeDialCode = storedCountryCode || initialCountry?.dialCode || "";
          const localPhone =
            activeDialCode && storedPhone.startsWith(activeDialCode)
              ? storedPhone.slice(activeDialCode.length)
              : storedPhone;
          setPhone(localPhone.replace(/\D/g, "").slice(0, 15));
        }

        if (
          (storedStep === "email-entry" || storedStep === "email-otp") &&
          storedPhone &&
          storedEmail
        ) {
          setStage(storedStep);
        } else if (storedStep === "email-entry" && storedPhone) {
          setStage("email-entry");
        }
      } catch (error) {
        if (!isMounted || controller.signal.aborted) return;
        setCountries([]);
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dialCode = selectedCountry?.dialCode ?? "";
    const fullPhone = dialCode ? `${dialCode}${phone}` : phone;

    const metaPayload = {
      countryCode: dialCode,
      phone: fullPhone,
      email: email.trim(),
    };
    const draftPayload = {
      stage,
      countryCode: dialCode,
      phone: fullPhone,
      email: email.trim(),
      phoneOtp,
      emailOtp,
      phoneTimer,
      canResendPhoneOtp,
    };

    localStorage.setItem(VENDOR_REG_META_KEY, JSON.stringify(metaPayload));
    localStorage.setItem(VENDOR_REG_DRAFT_KEY, JSON.stringify(draftPayload));

    if (dialCode) {
      localStorage.setItem("vendor_country_code", dialCode);
      sessionStorage.setItem("vendor_country_code", dialCode);
    }
    if (fullPhone.trim()) {
      localStorage.setItem("vendor_phone", fullPhone);
      sessionStorage.setItem("vendor_phone", fullPhone);
    }
    if (email.trim()) {
      localStorage.setItem("vendor_email", email.trim());
      sessionStorage.setItem("vendor_email", email.trim());
    }
    localStorage.setItem("vendor_registration_step", stage);

    sessionStorage.setItem("vendor_registration_step", stage);
  }, [selectedCountry, phone, email, stage, phoneOtp, emailOtp, phoneTimer, canResendPhoneOtp]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!countryMenuRef.current?.contains(event.target as Node)) {
        setIsCountryMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (isCountryMenuOpen) {
      countrySearchRef.current?.focus();
    }
  }, [isCountryMenuOpen]);

  useEffect(() => {
    if (stage === "phone-otp" && phoneTimer > 0) {
      const countdown = setInterval(() => setPhoneTimer((value) => value - 1), 1000);
      return () => clearInterval(countdown);
    }

    if (stage === "phone-otp" && phoneTimer === 0) {
      setCanResendPhoneOtp(true);
    }
  }, [stage, phoneTimer]);

  const filteredCountries = useMemo(() => {
    const query = countryQuery.trim().toLowerCase();

    if (!query) return countries;

    return countries.filter((country) =>
      `${country.name} ${country.dialCode} ${country.code}`.toLowerCase().includes(query),
    );
  }, [countries, countryQuery]);

  const phoneDigits = phone.replace(/\D/g, "");
  const phoneOtpValue = phoneOtp.join("");
  const emailOtpValue = emailOtp.join("");
  const phoneDialCode = selectedCountry?.dialCode ?? "";
  const phoneValidation = useMemo(
    () => validateWhatsAppNumber(phoneDigits, selectedCountry),
    [phoneDigits, selectedCountry],
  );
  const isPhoneValid = phoneValidation.isValid;
  const isEmailValid = emailPattern.test(email.trim());
  const currentEmailStep = isEmailStep(stage);

  const heroTitle = currentEmailStep
    ? "Verify your email address."
    : "Verify your WhatsApp number.";

  const heroDescription = currentEmailStep
    ? "Your WhatsApp number is verified. Stay on this same page and complete email verification before the business details step."
    : "Start with WhatsApp verification. International numbers are supported, then continue to email verification and business details.";

  const panelStepLabel = currentEmailStep ? "Step 2 of 3" : "Step 1 of 3";
  const panelTitle = currentEmailStep
    ? stage === "email-otp"
      ? "Enter email OTP"
      : "Email verification"
    : stage === "phone-otp"
      ? "Enter WhatsApp OTP"
      : "WhatsApp verification";

  const panelDescription = currentEmailStep
    ? "Use the inbox that should receive onboarding approvals, compliance follow-up, and account recovery messages."
    : "Use the number that should receive onboarding updates, login recovery, and registration support messages.";

  const stepItems = [
    {
      label: "Step 1",
      note: currentEmailStep ? "Completed" : "Current step",
      status: (currentEmailStep ? "complete" : "current") as StepStatus,
      title: currentEmailStep ? "WhatsApp number verified" : "Verify WhatsApp number with OTP",
    },
    {
      label: "Step 2",
      note: currentEmailStep ? "Current step" : "Next",
      status: (currentEmailStep ? "current" : "pending") as StepStatus,
      title:
        currentEmailStep && stage === "email-otp"
          ? "Confirm email OTP"
          : "Verify email address",
    },
    {
      label: "Step 3",
      note: "Next",
      status: "pending" as StepStatus,
      title: "Submit business and banking details",
    },
  ];

  const focusPhoneOtpInput = (index: number) => {
    const input = phoneOtpRefs.current[index];
    if (input) input.focus();
  };

  const resetPhoneOtpState = () => {
    setPhoneOtp([...emptyPhoneOtp]);
    setPhoneTimer(30);
    setCanResendPhoneOtp(false);
  };

  const resetEmailOtpState = () => {
    setEmailOtp([...emptyEmailOtp]);
  };

  const getFullPhoneDigits = () => {
    const dialCodeDigits = phoneDialCode.replace(/\D/g, "");
    return `${dialCodeDigits}${phoneDigits}`;
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    setPhone(value.slice(0, 15));
  };

  const handlePhoneOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const nextOtp = [...phoneOtp];
    nextOtp[index] = value;
    setPhoneOtp(nextOtp);

    if (value && index < phoneOtp.length - 1) {
      focusPhoneOtpInput(index + 1);
    }
  };

  const handlePhoneOtpKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === "Backspace" && !phoneOtp[index] && index > 0) {
      focusPhoneOtpInput(index - 1);
    }
  };

  const handlePhoneOtpPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedOtp = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

    if (!pastedOtp) return;

    const nextOtp = [...emptyPhoneOtp];
    pastedOtp.split("").forEach((digit, index) => {
      nextOtp[index] = digit;
    });
    setPhoneOtp(nextOtp);
    focusPhoneOtpInput(Math.min(pastedOtp.length, 6) - 1);
  };

  const focusEmailOtpInput = (index: number) => {
    const input = emailOtpRefs.current[index];
    if (input) input.focus();
  };

  const handleEmailOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const nextOtp = [...emailOtp];
    nextOtp[index] = value;
    setEmailOtp(nextOtp);

    if (value && index < emailOtp.length - 1) {
      focusEmailOtpInput(index + 1);
    }
  };

  const handleEmailOtpKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === "Backspace" && !emailOtp[index] && index > 0) {
      focusEmailOtpInput(index - 1);
    }
  };

  const handleEmailOtpPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedOtp = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

    if (!pastedOtp) return;

    const nextOtp = [...emptyEmailOtp];
    pastedOtp.split("").forEach((digit, index) => {
      nextOtp[index] = digit;
    });
    setEmailOtp(nextOtp);
    focusEmailOtpInput(Math.min(pastedOtp.length, 6) - 1);
  };

  const runStepTransition = async (
    nextText: string,
    action: () => void | Promise<void>,
    options?: { persistLoaderAfterAction?: boolean },
  ) => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    setStepTransitionText(nextText);
    setIsStepTransitioning(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 450));
      await action();
    } finally {
      if (!options?.persistLoaderAfterAction) {
        setIsStepTransitioning(false);
      }
    }
  };

  const sendPhoneOtpRequest = async () => {
    if (!selectedCountry || !isPhoneValid) {
      Swal.fire(
        "Warning",
        phoneValidation.message || "Please enter a valid WhatsApp number.",
        "warning",
      );
      return false;
    }

    setIsSendingPhoneOtp(true);

    try {
      const displayPhone = `${selectedCountry.dialCode}${phoneDigits}`;
      await dispatch(sendOtp({ phone: phoneDigits, countryCode: selectedCountry.dialCode })).unwrap();

      localStorage.setItem("vendor_phone", displayPhone);
      sessionStorage.setItem("vendor_phone", displayPhone);
      localStorage.setItem("vendor_country_code", selectedCountry.dialCode);
      sessionStorage.setItem("vendor_country_code", selectedCountry.dialCode);
      localStorage.setItem("vendor_registration_step", "phone-otp");
      sessionStorage.setItem("vendor_registration_step", "phone-otp");

      Swal.fire("Success", "OTP sent successfully to your whatsapp Number", "success");
      return true;
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : (error as { message?: string })?.message ?? "Failed to send OTP. Please try again.";
      Swal.fire("Error", message, "error");
      return false;
    } finally {
      setIsSendingPhoneOtp(false);
      dispatch(resetOtpState());
    }
  };

  const handleContinueToPhoneOtp = async () => {
    if (!hasAcceptedTerms) {
      Swal.fire(
        "Terms & Conditions required",
        "Please agree to the Terms & Conditions before continuing.",
        "warning",
      );
      return;
    }

    const sent = await sendPhoneOtpRequest();

    if (!sent) return;

    resetPhoneOtpState();
    await runStepTransition("Opening OTP step...", async () => {
      setStage("phone-otp");
    });
  };

  const handleResendPhoneOtp = async () => {
    resetPhoneOtpState();
    const sent = await sendPhoneOtpRequest();
    if (!sent) {
      setCanResendPhoneOtp(true);
    }
  };

  const handleVerifyPhoneOtp = async () => {
    if (!selectedCountry || !isPhoneValid || phoneOtpValue.length !== 6) {
      Swal.fire(
        "Warning",
        !isPhoneValid
          ? phoneValidation.message || "Please enter a valid WhatsApp number."
          : "Please enter the full 6-digit WhatsApp OTP.",
        "warning",
      );
      return;
    }

    setIsVerifyingPhoneOtp(true);

    try {
      await dispatch(
        verifyOtp({
          phone: getFullPhoneDigits(),
          otp: phoneOtpValue,
        }),
      ).unwrap();

      await runStepTransition("Opening email step...", async () => {
        localStorage.setItem("vendor_registration_step", "email-entry");
        sessionStorage.setItem("vendor_registration_step", "email-entry");
        setStage("email-entry");
        resetPhoneOtpState();
      });

      Swal.fire("Success", "WhatsApp number verified successfully.", "success");
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : (error as { message?: string })?.message ??
          "Something went wrong while verifying OTP. Please try again.";
      Swal.fire("Error", message, "error");
    } finally {
      setIsVerifyingPhoneOtp(false);
      dispatch(resetOtpState());
    }
  };

  const sendEmailOtpRequest = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!emailPattern.test(normalizedEmail)) {
      Swal.fire("Warning", "Please enter a valid email address.", "warning");
      return false;
    }

    setIsSendingEmailOtp(true);

    try {
      await dispatch(sendEmailOtp({ email: normalizedEmail })).unwrap();
      setEmail(normalizedEmail);
      localStorage.setItem("vendor_email", normalizedEmail);
      sessionStorage.setItem("vendor_email", normalizedEmail);
      localStorage.setItem("vendor_registration_step", "email-otp");
      sessionStorage.setItem("vendor_registration_step", "email-otp");
      await runStepTransition("Opening email OTP step...", async () => {
        setStage("email-otp");
        resetEmailOtpState();
      });

      Swal.fire("Success", "OTP sent to your email.", "success");
      return true;
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : (error as { message?: string })?.message ??
          "Something went wrong while sending email OTP.";
      Swal.fire("Error", message, "error");
      return false;
    } finally {
      setIsSendingEmailOtp(false);
      dispatch(resetOtpState());
    }
  };

  const handleVerifyEmailOtp = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedOtp = emailOtpValue.trim();

    if (!emailPattern.test(normalizedEmail)) {
      Swal.fire("Warning", "Please enter a valid email address.", "warning");
      return;
    }

    if (!normalizedOtp) {
      Swal.fire("Warning", "Please enter the email OTP.", "warning");
      return;
    }

    setIsVerifyingEmailOtp(true);

    try {
      await dispatch(
        verifyEmailOtp({
          email: normalizedEmail,
          otp: normalizedOtp,
        }),
      ).unwrap();

      localStorage.setItem("vendor_email", normalizedEmail);
      sessionStorage.setItem("vendor_email", normalizedEmail);
      localStorage.removeItem("vendor_registration_step");
      sessionStorage.removeItem("vendor_registration_step");
      localStorage.removeItem(VENDOR_REG_DRAFT_KEY);

      Swal.fire("Success", "Email verified successfully.", "success");
      await runStepTransition(
        "Preparing business details form...",
        async () => {
          router.push("/vendor/registration/business-details");
        },
        { persistLoaderAfterAction: true },
      );
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : (error as { message?: string })?.message ??
          "Something went wrong while verifying email OTP.";
      Swal.fire("Error", message, "error");
    } finally {
      setIsVerifyingEmailOtp(false);
      dispatch(resetOtpState());
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <StepTransitionLoader visible={isStepTransitioning} text={stepTransitionText} />
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
                Build your Dreams
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={vendorOverviewUrl}
              className="inline-flex min-h-12 items-center justify-center border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
              {...newTabProps}
            >
              All Features
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
            {panelStepLabel}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
            {panelTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            {panelDescription}
          </p>

          <div className="my-8 border-t border-slate-200" />

          {!currentEmailStep ? (
            stage === "phone-otp" ? (
              <div className="space-y-6">
                <div className="border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    OTP sent
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-base font-semibold text-slate-950">
                    <Image src="/whatsapp-icon.svg" alt="WhatsApp" width={18} height={18} />
                    <p>
                      {phoneDialCode} {phoneDigits}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-4 text-sm font-semibold text-violet-700 hover:text-violet-800"
                    onClick={() => {
                      setStage("phone-entry");
                      resetPhoneOtpState();
                      sessionStorage.setItem("vendor_registration_step", "phone-entry");
                    }}
                  >
                    Change number
                  </button>
                </div>

                <div>
                  <label className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Enter OTP
                  </label>

                  <div className="mt-3 flex flex-wrap gap-3">
                    {phoneOtp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(element) => {
                          phoneOtpRefs.current[index] = element;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(event) => handlePhoneOtpChange(event.target.value, index)}
                        onKeyDown={(event) => handlePhoneOtpKeyDown(event, index)}
                        onPaste={handlePhoneOtpPaste}
                        className="h-14 w-12 rounded-none border-slate-300 px-0 text-center text-xl font-semibold shadow-none"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-500">
                    {canResendPhoneOtp ? (
                      <button
                        type="button"
                        className="font-semibold text-violet-700 hover:text-violet-800"
                        onClick={handleResendPhoneOtp}
                        disabled={isSendingPhoneOtp}
                      >
                        {isSendingPhoneOtp ? "Sending OTP..." : "Resend OTP"}
                      </button>
                    ) : (
                      <p>Resend OTP in {phoneTimer}s</p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="inline-flex min-h-12 items-center justify-center border border-violet-700 bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                    disabled={phoneOtpValue.length !== 6 || isVerifyingPhoneOtp}
                    onClick={handleVerifyPhoneOtp}
                  >
                    {isVerifyingPhoneOtp ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {countriesError ? (
                  <div className="border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                    <p>{countriesError}</p>
                    <button
                      type="button"
                      className="mt-3 font-semibold text-red-700 underline-offset-4 hover:underline"
                      onClick={() => setCountryRequestNonce((value) => value + 1)}
                    >
                      Retry loading countries
                    </button>
                  </div>
                ) : null}

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <Image src="/whatsapp-icon.svg" alt="WhatsApp" width={16} height={16} />
                    WhatsApp number
                  </label>

                  <div className="mt-3 grid gap-3 sm:grid-cols-[260px_minmax(0,1fr)]">
                    <div className="relative" ref={countryMenuRef}>
                      <button
                        type="button"
                        className="flex h-12 w-full items-center justify-between border border-slate-300 bg-white px-3 text-left text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        onClick={() => setIsCountryMenuOpen((open) => !open)}
                        disabled={countriesLoading || !countries.length}
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          {selectedCountry?.flagUrl ? (
                            <img
                              src={selectedCountry.flagUrl}
                              alt=""
                              className="h-4 w-6 border border-slate-200 object-cover"
                            />
                          ) : (
                            <span className="h-4 w-6 border border-slate-200 bg-slate-100" />
                          )}

                          <span className="min-w-0 truncate">
                            {countriesLoading
                              ? "Loading countries..."
                              : selectedCountry
                                ? selectedCountry.name
                                : "Select country"}
                          </span>
                        </span>

                        <span className="ml-3 flex shrink-0 items-center gap-2 text-slate-500">
                          {selectedCountry?.dialCode ?? ""}
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </button>

                      {isCountryMenuOpen ? (
                        <div className="absolute left-0 top-full z-20 mt-1 w-full border border-slate-300 bg-white shadow-lg">
                          <div className="border-b border-slate-200 p-3">
                            <div className="relative">
                              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                              <Input
                                ref={countrySearchRef}
                                value={countryQuery}
                                onChange={(event) => setCountryQuery(event.target.value)}
                                placeholder="Search country or code"
                                className="h-11 rounded-none border-slate-300 pl-10 shadow-none"
                              />
                            </div>
                          </div>

                          <div className="max-h-72 overflow-y-auto">
                            {filteredCountries.length ? (
                              filteredCountries.map((country) => (
                                <button
                                  key={`${country.code}-${country.dialCode}`}
                                  type="button"
                                  className="flex w-full items-center justify-between border-b border-slate-200 px-3 py-3 text-left text-sm hover:bg-slate-50"
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setCountryQuery("");
                                    setIsCountryMenuOpen(false);
                                  }}
                                >
                                  <span className="flex min-w-0 items-center gap-3">
                                    {country.flagUrl ? (
                                      <img
                                        src={country.flagUrl}
                                        alt=""
                                        className="h-4 w-6 border border-slate-200 object-cover"
                                      />
                                    ) : (
                                      <span className="h-4 w-6 border border-slate-200 bg-slate-100" />
                                    )}
                                    <span className="truncate text-slate-950">{country.name}</span>
                                  </span>

                                  <span className="ml-4 shrink-0 font-semibold text-slate-500">
                                    {country.dialCode}
                                  </span>
                                </button>
                              ))
                            ) : (
                              <div className="px-3 py-4 text-sm text-slate-500">
                                No countries found for this search.
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <Input
                      type="tel"
                      placeholder="Enter WhatsApp number"
                      value={phoneDigits}
                      onChange={handlePhoneChange}
                      maxLength={15}
                      className="h-12 rounded-none border-slate-300 px-4 text-base shadow-none"
                    />
                  </div>
                  {phoneDigits && !isPhoneValid ? (
                    <p className="mt-2 text-sm text-red-600">{phoneValidation.message}</p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-md space-y-3">
                    <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                      <input
                        type="checkbox"
                        checked={hasAcceptedTerms}
                        onChange={(event) => setHasAcceptedTerms(event.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-700 focus:ring-violet-600"
                      />
                      <span>
                        I agree with the{" "}
                        <Link
                          href={termsAndConditionsUrl}
                          className="font-semibold text-violet-700 underline underline-offset-4 hover:text-violet-800"
                          {...newTabProps}
                        >
                          Terms &amp; Conditions and Privacy Policy 
                        </Link>
                        
                      </span>
                    </label>
                    <p className="text-sm leading-6 text-slate-500">
                      OTP is sent using the selected country code, so international WhatsApp
                      numbers continue through the same flow.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex min-h-12 items-center justify-center border border-violet-700 bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                    onClick={handleContinueToPhoneOtp}
                    disabled={
                      !isPhoneValid ||
                      countriesLoading ||
                      isSendingPhoneOtp ||
                      !hasAcceptedTerms
                    }
                  >
                    {isSendingPhoneOtp ? "Sending OTP..." : "Continue"}
                  </button>
                </div>
              </div>
            ) 
          ) : stage === "email-otp" ? (
            <div className="space-y-6">
              <div className="border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Email OTP sent
                </p>
                <p className="mt-3 text-base font-semibold text-slate-950">{email}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                  <button
                    type="button"
                    className="text-violet-700 hover:text-violet-800"
                    onClick={() => {
                      setStage("email-entry");
                      sessionStorage.setItem("vendor_registration_step", "email-entry");
                      resetEmailOtpState();
                    }}
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    className="text-violet-700 hover:text-violet-800"
                    onClick={sendEmailOtpRequest}
                    disabled={isSendingEmailOtp}
                  >
                    {isSendingEmailOtp ? "Sending OTP..." : "Resend OTP"}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Enter email OTP
                </label>
                <div className="mt-3 flex flex-wrap gap-3">
                  {emailOtp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(element) => {
                        emailOtpRefs.current[index] = element;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(event) => handleEmailOtpChange(event.target.value, index)}
                      onKeyDown={(event) => handleEmailOtpKeyDown(event, index)}
                      onPaste={handleEmailOtpPaste}
                      className="h-14 w-12 rounded-none border-slate-300 px-0 text-center text-xl font-semibold shadow-none"
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-sm leading-6 text-slate-500">
                  Once this OTP is verified, the business details form will open next.
                </p>

                <button
                  type="button"
                  className="inline-flex min-h-12 items-center justify-center border border-violet-700 bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                  onClick={handleVerifyEmailOtp}
                  disabled={emailOtpValue.length !== 6 || isVerifyingEmailOtp}
                >
                  {isVerifyingEmailOtp ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Email address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email address"
                  className="mt-3 h-12 rounded-none border-slate-300 px-4 text-base shadow-none"
                />
              </div>

              <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-sm leading-6 text-slate-500">
                  This inbox will receive registration updates, approval notifications,
                  and account recovery messages.
                </p>

                <button
                  type="button"
                  className="inline-flex min-h-12 items-center justify-center border border-violet-700 bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                  onClick={sendEmailOtpRequest}
                  disabled={!isEmailValid || isSendingEmailOtp}
                >
                  {isSendingEmailOtp ? "Sending OTP..." : "Send OTP"}
                </button>
              </div>
            </div>
          )}
        </section>

        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
            Registration
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl lg:leading-[0.92]">
            {heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {heroDescription}
          </p>

          <div className="mt-10 border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Registration Steps
            </p>

            <div className="mt-6 space-y-6">
              {stepItems.map((item, index) => {
                const tone = getStepTone(item.status);

                return (
                  <div
                    key={item.label}
                    className={`${index < stepItems.length - 1 ? "border-b border-slate-200 pb-6" : ""}`}
                  >
                    <div className={`border-l-2 ${tone.accent} pl-4`}>
                      <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${tone.label}`}>
                        {item.label}
                      </p>
                      <p className={`mt-2 text-base font-semibold ${tone.title}`}>{item.title}</p>
                      <p className={`mt-2 text-sm ${tone.note}`}>{item.note}</p>
                    </div>
                  </div>
                );
              })}
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
                    Build your Dreams
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-600">
                Seller registration now keeps WhatsApp verification and email verification
                inside one page before opening business details.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                Quick Links
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
                {/* <p>Office No 834, Gaur City Mall, Greater Noida</p>
                <p>Uttar Pradesh 201312, India</p> */}
              </div>
            </div>
          </div>

          <div className="border-x border-b border-slate-200 bg-white px-8 py-4 text-sm text-slate-500 justify-center lg:flex lg:items-center lg:justify-between-center">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <Link
                href={privacyPolicyUrl}
                className="font-semibold text-slate-700 transition hover:text-violet-700"
                {...newTabProps}
              >
                Privacy Policy
              </Link>
              <span className="hidden text-slate-300 sm:inline">|</span>
              <Link
                href={termsAndConditionsUrl}
                className="font-semibold text-slate-700 transition hover:text-violet-700"
                {...newTabProps}
              >
                Terms &amp; Conditions
              </Link>
              <span className="hidden text-slate-300 sm:inline">|</span>
              <span>Copyright {new Date().getFullYear()} SellersLogin. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
