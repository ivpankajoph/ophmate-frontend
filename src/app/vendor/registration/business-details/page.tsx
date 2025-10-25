"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CreditCard, ClipboardList, MapPin, PiggyBank } from "lucide-react";
import Swal from "sweetalert2";
import QuoteBlock from "@/components/quotes";
import { AppDispatch } from "@/store";
import { updateVendorBusiness } from "@/store/slices/vendorSlice";
import { Input } from "@/components/ui/input";

// Indian States
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep",
  "Delhi", "Puducherry", "Jammu and Kashmir", "Ladakh"
];

const BUSINESS_TYPES = [
  "Sole Proprietorship",
  "Partnership",
  "Limited Liability Partnership (LLP)",
  "Private Limited Company",
  "Public Limited Company",
  "One Person Company (OPC)",
  "Hindu Undivided Family (HUF)",
  "Others"
];

// Validation helpers
const isEmpty = (value: string) => !value.trim();
const validateGST = (gst: string) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);
const validatePAN = (pan: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
const validatePincode = (pin: string) => /^[1-9][0-9]{5}$/.test(pin);
const validateIFSC = (ifsc: string) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
const validateAccount = (acc: string) => /^\d{9,18}$/.test(acc);
const validateUPI = (upi: string) => upi.includes("@");

export default function Step3() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: any) => state.vendor);
  const token = useSelector((state: any) => state?.auth?.token);

  const [form, setForm] = useState({
    name: "",
    business_type: "",
    gst_number: "",
    pan_number: "",
    alternate_contact_name: "",
    alternate_contact_phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    bank_name: "",
    bank_account: "",
    ifsc_code: "", 
    branch: "",
    upi_id: "",
    categories: "",
    return_policy: "",
    operating_hours: "",
    gst_cert: null as File | null,
    pan_card: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle text input with optional paste prevention & auto-uppercase
  const handleTextInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    options?: { preventPaste?: boolean; toUpperCase?: boolean }
  ) => {
    let value = e.target.value;
    const { name } = e.target;

    if (options?.toUpperCase) {
      value = value.toUpperCase();
    }

    setForm({ ...form, [name]: value });

    if (touched[name] || isSubmitting) {
      validateField(name, value);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    if (touched[name] || isSubmitting) {
      validateField(name, value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const allowedTypes = ["application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, [name]: "Only PDF, JPG, or PNG allowed." }));
        return;
      }
      setForm({ ...form, [name]: file });
      if (touched[name] || isSubmitting) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, form[name as keyof typeof form] as string);
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
      case "alternate_contact_name":
      case "street":
      case "city":
      case "address":
      case "bank_name":
      case "branch":
      case "categories":
      case "return_policy":
      case "operating_hours":
        if (isEmpty(value)) error = `${name.replace(/_/g, " ")} is required.`;
        break;

      case "business_type":
      case "state":
        if (!value) error = `${name.replace(/_/g, " ")} is required.`;
        break;

      case "gst_number":
        if (isEmpty(value)) {
          error = "GST Number is required.";
        } else if (!validateGST(value)) {
          error = "Invalid GST format.";
        }
        break;

      case "pan_number":
        if (isEmpty(value)) {
          error = "PAN Number is required.";
        } else if (!validatePAN(value)) {
          error = "Invalid PAN format (e.g., ABCDE1234F).";
        }
        break;

      case "alternate_contact_phone":
        if (isEmpty(value)) {
          error = "Alternate Contact Phone is required.";
        } else if (!validatePhone(value)) {
          error = "Invalid 10-digit phone number.";
        }
        break;

      case "pincode":
        if (isEmpty(value)) {
          error = "Pincode is required.";
        } else if (!validatePincode(value)) {
          error = "Invalid pincode (6 digits, no leading zero).";
        }
        break;

      case "bank_account":
        if (isEmpty(value)) {
          error = "Account Number is required.";
        } else if (!validateAccount(value)) {
          error = "Account must be 9–18 digits.";
        }
        break;

      case "ifsc_code":
        if (isEmpty(value)) {
          error = "IFSC Code is required.";
        } else if (!validateIFSC(value)) {
          error = "Invalid IFSC code.";
        }
        break;

      case "upi_id":
        if (value && !validateUPI(value)) {
          error = "UPI ID must contain '@'.";
        }
        break;

      case "gst_cert":
        if (!form.gst_cert) error = "GST Certificate is required.";
        break;

      case "pan_card":
        if (!form.pan_card) error = "PAN Card is required.";
        break;

      default:
        break;
    }

    setErrors((prev) => {
      const updated = { ...prev };
      if (error) {
        updated[name] = error;
      } else {
        delete updated[name];
      }
      return updated;
    });
  };

  const validateForm = () => {
    setIsSubmitting(true);
    const newErrors: Record<string, string> = {};

    // Trigger validation for all fields
    Object.keys(form).forEach((key) => {
      if (key === "gst_cert" || key === "pan_card") return;
      validateField(key, form[key as keyof typeof form] as string);
    });

    // File fields
    if (!form.gst_cert) newErrors.gst_cert = "GST Certificate is required.";
    if (!form.pan_card) newErrors.pan_card = "PAN Card is required.";

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0 && Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "warning",
        title: "Please fix form errors",
        text: "Some fields are missing or invalid.",
      });
      return;
    }

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) data.append(key, value as any);
      });

      if (!token) {
        Swal.fire({ icon: "warning", title: "Unauthorized", text: "Please login first!" });
        return;
      }

      const result = await dispatch(updateVendorBusiness({ formData: data }));

      if (updateVendorBusiness.fulfilled.match(result)) {
        Swal.fire({
          icon: "success",
          title: "Business Updated!",
          text: "Your business details have been saved successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/vendor/registration/thankyou");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: (result.payload as string) || "Failed to update business details.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "Something went wrong while saving details.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reusable input with error display
  const renderTextInput = (
    name: string,
    label: string,
    icon?: React.ReactNode,
    placeholder?: string,
    options?: { preventPaste?: boolean; toUpperCase?: boolean }
  ) => (
    <div className="flex flex-col">
      <label className="mb-1 font-semibold text-sm">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <Input
          name={name}
          value={form[name as keyof typeof form] as string}
          onChange={(e:any) => handleTextInput(e, options)}
          onBlur={() => handleBlur(name)}
          onPaste={options?.preventPaste ? (e:any) => e.preventDefault() : undefined}
          placeholder={placeholder || label}
          className={icon ? "pl-10" : ""}
        />
        {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
      </div>
    </div>
  );

  const renderSelect = (name: string, label: string, options: string[]) => (
    <div className="flex flex-col">
      <label className="mb-1 font-semibold text-sm">{label}</label>
      <Select
        value={form[name as keyof typeof form] as string}
        onValueChange={(value) => handleSelectChange(name, value)}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  const renderFileInput = (name: string, label: string) => (
    <div className="flex flex-col">
      <label className="font-semibold mb-1">{label}</label>
      <Input type="file" name={name} accept=".pdf" onChange={handleFileChange}  />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

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
        <Card className="shadow-2xl border border-border bg-background/80 backdrop-blur-lg p-8 space-y-6">
          {/* Business Info */}
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold">Business Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderTextInput("name", "Business Name", )}
            {renderSelect("business_type", "Business Type", BUSINESS_TYPES)}
            {renderTextInput("gst_number", "GST Number", undefined, "e.g. 22AAAAA0000A1Z5", {
              preventPaste: false,
              toUpperCase: true,
            })}
            {renderTextInput("pan_number", "PAN Number", undefined, "e.g. ABCDE1234F", {
              preventPaste: true,
              toUpperCase: true,
            })}
            {renderTextInput("alternate_contact_name", "Alternate Contact Name")}
            {renderTextInput("alternate_contact_phone", "Alternate Contact Phone", undefined, "10-digit number")}
          </CardContent>

          {/* Address */}
          <CardHeader className="text-center pt-4 pb-2">
            <CardTitle className="text-2xl font-semibold">Address Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderTextInput("address", "Full Address")}
            {renderTextInput("street", "Street",)}
            {renderTextInput("city", "City")}
            {renderSelect("state", "State", INDIAN_STATES)}
            {renderTextInput("pincode", "Pincode", undefined, "6-digit code")}
          </CardContent>

          {/* Bank Details */}
          <CardHeader className="text-center pt-4 pb-2">
            <CardTitle className="text-2xl font-semibold">Bank Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderTextInput("bank_name", "Bank Name")}
            {renderTextInput("bank_account", "Account Number", undefined, "9–18 digits", {
              preventPaste: true,
            })}
            {renderTextInput("ifsc_code", "IFSC Code", undefined, "e.g. SBIN0002499", {
              preventPaste: true,
              toUpperCase: true,
            })}
            {renderTextInput("branch", "Branch Name")}
            {renderTextInput("upi_id", "UPI ID", undefined, "e.g. name@upi")}
          </CardContent>

          {/* Other Info */}
          <CardHeader className="text-center pt-4 pb-2">
            <CardTitle className="text-2xl font-semibold">Other Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderTextInput("categories", "Categories (comma separated)")}
            {renderTextInput("return_policy", "Return Policy")}
            {renderTextInput("operating_hours", "Operating Hours")}
          </CardContent>

          {/* Documents */}
          <CardHeader className="text-center pt-4 pb-2">
            <CardTitle className="text-2xl font-semibold">Documents</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderFileInput("gst_cert", "GST Certificate")}
            {renderFileInput("pan_card", "PAN Card")}
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