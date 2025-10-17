"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import {  CreditCard, MapPin, Mail, Phone, ClipboardList, FileText, PiggyBank } from "lucide-react";
import QuoteBlock from "@/components/quotes";


export default function Step3() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    business_type: "",
    gst_number: "",
    pan_number: "",
    email: "",
    phone: "",
    alternate_contact_name: "",
    alternate_contact_phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    bank_name: "",
    bank_account: "",
    ifsc: "",
    branch: "",
    upi_id: "",
    categories: "",
    return_policy: "",
    operating_hours: "",
    gst_cert: null as File | null,
    pan_card: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]: any) => {
        if (value !== null) data.append(key, value);
      });

  
      router.push("/vendor/registration/thankyou");
    } catch (err) {
      console.error(err);
      alert("Failed to save business details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-background px-8 py-16 flex flex-col items-center justify-start">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 max-w-4xl"
      >
        <h1 className="text-6xl font-extrabold text-primary">Business Details</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Fill in your business information to complete registration.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-6xl"
      >
        <Card className="shadow-2xl border border-border bg-background/80 backdrop-blur-lg p-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold">Step 3 – Business Information</CardTitle>
          </CardHeader>
          <CardContent className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Business Info */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Business Name</label>
              <div className="relative">
                <ClipboardList className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Business Name" className="pl-10" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Business Type</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input name="business_type" value={form.business_type} onChange={handleChange} placeholder="Private Limited / LLP" className="pl-10" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">GST Number</label>
              <Input name="gst_number" value={form.gst_number} onChange={handleChange} placeholder="GST Number" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">PAN Number</label>
              <Input name="pan_number" value={form.pan_number} onChange={handleChange} placeholder="PAN Number" />
            </div>

            {/* Contact */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input name="email" value={form.email} onChange={handleChange} placeholder="Business Email" className="pl-10" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="pl-10" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Alternate Contact Name</label>
              <Input name="alternate_contact_name" value={form.alternate_contact_name} onChange={handleChange} placeholder="Alternate Contact Name" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Alternate Contact Phone</label>
              <Input name="alternate_contact_phone" value={form.alternate_contact_phone} onChange={handleChange} placeholder="Alternate Phone" />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Street</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input name="street" value={form.street} onChange={handleChange} placeholder="Street / House" className="pl-10" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">City</label>
              <Input name="city" value={form.city} onChange={handleChange} placeholder="City" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">State</label>
              <Input name="state" value={form.state} onChange={handleChange} placeholder="State" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Pincode</label>
              <Input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" />
            </div>

            {/* Bank Details */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Bank Name</label>
              <div className="relative">
                <PiggyBank className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input name="bank_name" value={form.bank_name} onChange={handleChange} placeholder="Bank Name" className="pl-10" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Bank Account</label>
              <Input name="bank_account" value={form.bank_account} onChange={handleChange} placeholder="Account Number" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">IFSC Code</label>
              <Input name="ifsc" value={form.ifsc} onChange={handleChange} placeholder="IFSC Code" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Branch</label>
              <Input name="branch" value={form.branch} onChange={handleChange} placeholder="Branch Name" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">UPI ID</label>
              <Input name="upi_id" value={form.upi_id} onChange={handleChange} placeholder="UPI ID" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Categories (comma separated)</label>
              <Input name="categories" value={form.categories} onChange={handleChange} placeholder="Electronics, Mobile Accessories" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Return Policy</label>
              <Input name="return_policy" value={form.return_policy} onChange={handleChange} placeholder="7 days" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Operating Hours</label>
              <Input name="operating_hours" value={form.operating_hours} onChange={handleChange} placeholder="9 AM - 7 PM" />
            </div>

            {/* Documents */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">GST Certificate</label>
              <Input type="file" name="gst_cert" onChange={handleFileChange} />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">PAN Card</label>
              <Input type="file" name="pan_card" onChange={handleFileChange} />
            </div>
          </CardContent>

          <div className="mt-8 text-center">
            <Button size="lg" onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Complete Registration"}
            </Button>
          </div>
        </Card>
      </motion.div>

      <QuoteBlock />
    </div>
  );
}
