"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    } catch (error:any) {
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
        {/* Header Quote */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Join India’s Fastest-Growing Marketplace 🚀
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            “Empowering small businesses with big technology.”
          </p>
        </motion.div>

        {/* Main Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border border-border bg-background/80 backdrop-blur-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-4xl md:text-5xl font-bold">
                Vendor Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-8 space-y-8">
              {!showOtp ? (
                <>
                  {/* Phone Input */}
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
                  {/* OTP Section */}
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

                  {/* OTP Boxes */}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center max-w-3xl space-y-6"
        >
          <h3 className="text-3xl font-bold">Why Join Us?</h3>
          <p className="text-muted-foreground text-lg">
            We help vendors reach customers across India with zero setup hassle.
            Our platform offers advanced analytics, easy payment settlements,
            and a powerful dashboard to track growth.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "0% Listing Fee",
                desc: "Start your online store instantly without hidden charges.",
              },
              {
                title: "24/7 Support",
                desc: "Our vendor success team is always available to assist you.",
              },
              {
                title: "Sell Anywhere",
                desc: "Expand beyond borders and reach new markets with one click.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-card border border-border rounded-2xl shadow-md p-6"
              >
                <h4 className="text-xl font-semibold text-primary mb-2">
                  {item.title}
                </h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-12 text-lg italic text-muted-foreground">
            “Your journey to success begins with a single registration.”
          </p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
