"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, MapPin, Home, Lock, Map, MapPinPlusInside, } from "lucide-react";
import QuoteBlock from "@/components/quotes";


export default function Step2() {
  const [form, setForm] = useState({
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { email, address, city, state, pincode, password } = form;
    if (!email || !address || !city || !state || !pincode || !password) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {

      router.push("/vendor/registration/business-details");
    } catch (err) {
      console.error(err);
      alert("Failed to save personal details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-background px-8 py-16 flex flex-col items-center justify-start">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 max-w-4xl"
      >
        <h1 className="text-6xl font-extrabold text-primary">Personal Details</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Fill in your personal information to continue the vendor registration process.
        </p>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        className="w-full max-w-6xl flex flex-wrap gap-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <Card className="flex-1 min-w-[250px] p-6 bg-primary/5 border border-primary/20 shadow-md">
          <CardTitle className="text-xl font-bold mb-2">Why Personal Info?</CardTitle>
          <CardContent className="text-sm text-muted-foreground">
            This helps us verify your identity and ensure smooth onboarding.
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[250px] p-6 bg-secondary/5 border border-secondary/20 shadow-md">
          <CardTitle className="text-xl font-bold mb-2">Privacy</CardTitle>
          <CardContent className="text-sm text-muted-foreground">
            Your details are safe and will never be shared without your consent.
          </CardContent>
        </Card>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full max-w-6xl"
      >
        <Card className="shadow-2xl border border-border bg-background/80 backdrop-blur-lg p-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold">Step 2 – Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Address</label>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street / House"
                  className="pl-10"
                />
              </div>
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">City</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="pl-10"
                />
              </div>
            </div>

            {/* State */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">State</label>
              <div className="relative">
                <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Pincode */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Pincode</label>
              <div className="relative">
                <MapPinPlusInside className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>

          <div className="mt-8 text-center">
            <Button size="lg" onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Continue to Business Details"}
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Bottom Quote */}
      <QuoteBlock />
    </div>
  );
}
