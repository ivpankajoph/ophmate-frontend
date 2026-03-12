"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { resetOtpState, sendOtp, verifyOtp } from "@/store/slices/authSlice";
import Swal from "sweetalert2";
import PromotionalBanner from "@/components/promotional-banner";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer";

const COUNTRY_CODES = [
  {
    label: "India",
    dialCode: "+91",
    minLength: 10,
    maxLength: 10,
    flagUrl: "https://flagcdn.com/w20/in.png",
  },
  {
    label: "United States",
    dialCode: "+1",
    minLength: 10,
    maxLength: 10,
    flagUrl: "https://flagcdn.com/w20/us.png",
  },
  {
    label: "United Kingdom",
    dialCode: "+44",
    minLength: 10,
    maxLength: 10,
    flagUrl: "https://flagcdn.com/w20/gb.png",
  },
  {
    label: "United Arab Emirates",
    dialCode: "+971",
    minLength: 8,
    maxLength: 9,
    flagUrl: "https://flagcdn.com/w20/ae.png",
  },
  {
    label: "Australia",
    dialCode: "+61",
    minLength: 9,
    maxLength: 9,
    flagUrl: "https://flagcdn.com/w20/au.png",
  },
  {
    label: "Singapore",
    dialCode: "+65",
    minLength: 8,
    maxLength: 8,
    flagUrl: "https://flagcdn.com/w20/sg.png",
  },
];

export default function VendorRegistrationPage() {
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { success, error } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (showOtp && timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [showOtp, timer]);

  const selectedCountry =
    COUNTRY_CODES.find((country) => country.dialCode === countryCode) ?? COUNTRY_CODES[0];

  const phonePlaceholder =
    selectedCountry.minLength === selectedCountry.maxLength
      ? `Enter ${selectedCountry.maxLength}-digit mobile number`
      : "Enter mobile number";

  const isPhoneValid =
    phone.length >= selectedCountry.minLength &&
    phone.length <= selectedCountry.maxLength;

  const getFullPhone = () => {
    const dialCodeDigits = countryCode.replace(/\D/g, "");
    return `${dialCodeDigits}${phone}`;
  };

  const focusOtpInput = (index: number) => {
    const input = otpRefs.current[index];
    if (input) input.focus();
  };

  const handleCountryCodeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newCode = e.target.value;
    const nextCountry =
      COUNTRY_CODES.find((country) => country.dialCode === newCode) ??
      COUNTRY_CODES[0];
    setCountryCode(newCode);
    setPhone((prev) => prev.slice(0, nextCountry.maxLength));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= selectedCountry.maxLength) setPhone(value);
  };

  const handleContinue = async () => {
    if (!isPhoneValid) return;

    const sent = await handleSubmit();
    if (!sent) return;

    setShowOtp(true);
    setTimer(30);
    setCanResend(false);
  };

  const handleEditNumber = () => {
    setShowOtp(false);
    setOtp(["", "", "", "", "", ""]);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) focusOtpInput(index + 1);
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusOtpInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = ["", "", "", "", "", ""];
      pasteData.split("").forEach((digit, index) => {
        newOtp[index] = digit;
      });
      setOtp(newOtp);
      focusOtpInput(Math.min(pasteData.length, 6) - 1);
    }
  };
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    if (!isPhoneValid) {
      Swal.fire(
        "Warning",
        `Please enter a valid mobile number for ${selectedCountry.label}`,
        "warning",
      );
      return false;
    }

    try {
      const displayPhone = `${countryCode}${phone}`;
      await dispatch(sendOtp({ phone, countryCode })).unwrap();
      sessionStorage.setItem("vendor_phone", displayPhone);
      sessionStorage.setItem("vendor_country_code", countryCode);
      Swal.fire("Success", "OTP sent successfully", "success");
      return true;
    } catch (err: any) {
      console.error(err, "error");
      const message =
        typeof err === "string"
          ? err
          : err?.message ?? "Failed to send OTP. Please try again.";
      Swal.fire("Error", message, "error");
      return false;
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(resetOtpState());
    }

    if (error) {
      dispatch(resetOtpState());
    }
  }, [success, error, dispatch]);
  const handleResend = async () => {
    setOtp(["", "", "", "", "", ""]);
    const sent = await handleSubmit();

    if (sent) {
      setTimer(30);
      setCanResend(false);
    } else {
      setCanResend(true);
    }
  };

  const handleVerifyOtp = async () => {
    // If OTP is an array, join it properly; otherwise safely convert to string
    const otpString: string = Array.isArray(otp)
      ? otp.join("")
      : String(otp).trim();
    const fullPhone = getFullPhone();

    if (!isPhoneValid || !otpString) {
      Swal.fire("Warning", "Please enter both phone number and OTP", "warning");
      return;
    }

    try {
      await dispatch(verifyOtp({ phone: fullPhone, otp: otpString })).unwrap();
      Swal.fire("Success", "OTP verified successfully", "success");

      router.push("/vendor/registration/personal-details");
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      const message =
        typeof error === "string"
          ? error
          : error?.message ??
          "Something went wrong while verifying OTP. Please try again.";
      Swal.fire("Error", message, "error");
    }
  };

  const isOtpComplete = otp.join("").length === 6;
  return (
    <>
      <PromotionalBanner />
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background px-6 py-20 text-foreground">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          {/* Heading with Purple Gradient */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Join India’s
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              {" "}Fastest-Growing{" "}
            </span>
            Marketplace <span className="inline-block drop-shadow-md"></span>
          </h1>

          {/* Subtext with soft purple/slate mix */}
          <p className="text-lg md:text-2xl font-medium text-purple-900/70 leading-relaxed">
            <span className="text-purple-500 font-serif">“</span>
            Empowering small businesses with big technology
            <span className="text-purple-500 font-serif">”</span>
          </p>

          {/* Optional: Simple purple underline accent */}
          <div className="mt-6 h-1 w-20 bg-purple-600 mx-auto rounded-full opacity-20" />
        </motion.div>

        {/* Main Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md">

          <Card className="shadow-xl border border-border bg-background/80 backdrop-blur-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-4xl md:text-5xl font-bold">
                Vendor Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-8 space-y-8">
              {!showOtp ? (
                <>

                  <div className="flex items-center gap-3 border rounded-lg px-3 py-2">
                    <div className="h-10 shrink-0 rounded-md border border-input bg-background px-2 flex items-center gap-1">
                      <img
                        src={selectedCountry.flagUrl}
                        alt={`${selectedCountry.label} flag`}
                        width={18}
                        height={14}
                        className="rounded-[2px] object-cover"
                      />
                      <select
                        value={countryCode}
                        onChange={handleCountryCodeChange}
                        className="h-full w-16 bg-transparent text-sm outline-none"
                        aria-label="Country code"
                      >
                        {COUNTRY_CODES.map((country) => (
                          <option key={country.dialCode} value={country.dialCode}>
                            {country.dialCode}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      type="tel"
                      placeholder={phonePlaceholder}
                      value={phone}
                      onChange={handlePhoneChange}
                      maxLength={selectedCountry.maxLength}
                      className="flex-1 border-none focus-visible:ring-0 text-lg"
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      size="lg"
                      className="w-full text-lg mt-4"
                      onClick={handleContinue}
                      disabled={!isPhoneValid}
                    >
                      Continue
                    </Button>
                  </div>
                </>
              ) : (
                <>

                  <div className="text-center space-y-3">
                    <p className="text-lg text-muted-foreground">
                      OTP sent to{" "}
                      <span className="font-semibold">
                        {countryCode} {phone}
                      </span>
                    </p>
                    <Button
                      variant="link"
                      className="text-sm text-primary"
                      onClick={handleEditNumber}
                    >
                      Edit number
                    </Button>
                  </div>


                  <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => {
                          otpRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        onPaste={handlePaste}
                        className="w-12 h-12 text-center text-2xl font-semibold border border-border rounded-lg focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    ))}
                  </div>

                  {/* Resend Timer */}
                  <div className="text-center mt-6 text-sm text-muted-foreground">
                    {canResend ? (
                      <Button
                        variant="link"
                        className="text-primary text-base"
                        onClick={handleResend}
                      >
                        Resend OTP 🔁
                      </Button>
                    ) : (
                      <p>Resend OTP in {timer}s</p>
                    )}
                  </div>

                  <div className="text-center mt-8">
                    <Button
                      size="lg"
                      className="w-full text-lg"
                      disabled={!isOtpComplete}
                      onClick={() => handleVerifyOtp()}
                    >
                      Verify OTP
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Divider */}
        <Separator className="my-16 w-3/4 max-w-xl" />

        {/* Extra Info Section */}
        {/* <section className="w-full max-w-6xl mx-auto">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-start">
            <div className="space-y-4">
              <h2 className="text-3xl pt-35 md:text-4xl font-extrabold text-neutral-900">
                Why Sellers Love SellersLogin
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                All the benefits that come with selling on SellersLogin are designed
                to help you sell more, and make it easier to grow your business.
              </p>
            </div>

            <div className="rounded-3xl border border-purple-100 bg-white shadow-[0_20px_40px_-28px_rgba(88,28,135,0.45)] divide-y divide-purple-100">
              {[
                {
                  title: "0% Commission Fee",
                  desc:
                    "Suppliers selling on SellersLogin keep 100% of their profit by not paying any commission.",
                },
                {
                  title: "0 Penalty Charges",
                  desc:
                    "Sell online without the fear of order cancellation charges with 0 penalty for late dispatch or order cancellations.",
                },
                {
                  title: "Growth for Every Supplier",
                  desc:
                    "From small to large and unbranded to branded, SellersLogin fuels growth for all suppliers.",
                },
                {
                  title: "Ease of Doing Business",
                  desc:
                    "Easy product listing, lowest cost shipping, and 7-day payment cycle from the delivery date.",
                },
              ].map((item) => (
                <div key={item.title} className="p-6 flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    %
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        <section className="w-full max-w-6xl mx-auto px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center">

            {/* Left Side: Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-bold tracking-wide uppercase">
                Seller Benefits
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Why Sellers Love <span className="text-purple-600">SellersLogin</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                All the benefits that come with selling on SellersLogin are designed
                to help you sell more, and make it easier to grow your business.
              </p>

              {/* Decorative background element */}
              <div className="hidden lg:block h-1 w-20 bg-gradient-to-r from-purple-600 to-transparent rounded-full" />
            </div>

            {/* Right Side: Feature Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "0% Commission",
                  desc: "Keep 100% of your profit. No hidden charges or commissions.",
                  icon: "💰",
                  color: "bg-blue-50 text-blue-600"
                },
                {
                  title: "0 Penalty Charges",
                  desc: "No fear of cancellation charges or late dispatch penalties.",
                  icon: "🛡️",
                  color: "bg-green-50 text-green-600"
                },
                {
                  title: "Growth Driven",
                  desc: "From small to large brands, we fuel growth for everyone.",
                  icon: "📈",
                  color: "bg-purple-50 text-purple-600"
                },
                {
                  title: "7-Day Payments",
                  desc: "Fastest payment cycle in the industry from delivery date.",
                  icon: "⚡",
                  color: "bg-orange-50 text-orange-600"
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`h-12 w-12 rounded-2xl ${item.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>



        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-24 w-full max-w-6xl mx-auto px-6 mb-20"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 shadow-2xl">
            {/* Animated Background Glows */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full" />

            <div className="grid md:grid-cols-2 items-center relative z-10">
              {/* Content Side */}
              <div className="p-10 md:p-16 space-y-6 text-center md:text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">
                  Limited Time Offer
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white leading-[1.1]">
                  Ready to grow <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                    your business?
                  </span>
                </h3>
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-md">
                  Join thousands of successful sellers and put your products in front of millions of shoppers today.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button
                    size="lg"
                    className="h-14 px-10 text-lg font-bold rounded-2xl bg-purple-600 hover:bg-purple-500 text-white shadow-[0_10px_20px_-10px_rgba(147,51,234,0.6)] transition-all hover:scale-105 active:scale-95"
                    asChild
                  >
                    <Link href="/vendor/registration">Start selling today →</Link>
                  </Button>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-4 text-slate-500 text-sm font-medium">
                  <span className="flex items-center gap-1">✅ 0% Commission</span>
                  <span className="flex items-center gap-1">✅ Quick Setup</span>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative h-[350px] md:h-full min-h-[450px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop"
                  alt="Vendor packing products"
                  className="absolute inset-0 h-full w-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                />
                {/* Gradient Blending */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent md:hidden" />
              </div>
            </div>
          </div>
        </motion.div>
        <footer className="mt-20 w-full bg-white border-t border-purple-100">
          <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
            {/* Upper Section: Brand & Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="space-y-4">
                {/* Logo with Purple Accent */}
                <div className="text-2xl font-black text-slate-900 tracking-tighter">
                  Sellers<span className="text-purple-600">Login</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
                  Empowering Indian sellers with 0% commission and world-class technology to scale businesses globally.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 md:col-span-2 md:justify-items-end">
                {/* Column 1 */}
                <div className="space-y-4">
                  <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest">Platform</h4>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li><Link href="/sell" className="hover:text-purple-600 hover:translate-x-1 transition-all inline-block">Start Selling</Link></li>
                    <li><Link href="/pricing" className="hover:text-purple-600 hover:translate-x-1 transition-all inline-block">Pricing</Link></li>
                    <li><Link href="/success-stories" className="hover:text-purple-600 hover:translate-x-1 transition-all inline-block">Success Stories</Link></li>
                  </ul>
                </div>
                {/* Column 2 */}
                <div className="space-y-4">
                  <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest">Support</h4>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li><Link href="/help" className="hover:text-purple-600 hover:translate-x-1 transition-all inline-block">Help Center</Link></li>
                    <li><Link href="/contact" className="hover:text-purple-600 hover:translate-x-1 transition-all inline-block">Contact Us</Link></li>
                    <li><Link href="/shipping" className="hover:text-purple-600 hover:translate-x-1 transition-all inline-block">Shipping Policy</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Elegant Divider: Soft purple gradient */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-100 to-transparent mb-8" />

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-400">
                <Link href="/privacy" className="hover:text-purple-600 transition-colors">Confidentiality Policy</Link>
                <Link href="/terms" className="hover:text-purple-600 transition-colors">Terms of Use</Link>
                <Link href="/cookies" className="hover:text-purple-600 transition-colors">Cookies</Link>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                &copy; 2026 <span className="text-slate-900">SellersLogin</span>. Made for India 🇮🇳
              </div>
            </div>
          </div>
        </footer>

      </div>
      <Footer />
    </>
  );
}

