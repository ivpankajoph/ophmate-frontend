"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import QuoteBlock from "@/components/quotes";
import { AppDispatch } from "@/store";
import { updateVendorBusiness } from "@/store/slices/vendorSlice";
import {
  BUSINESS_NATURES,
  BUSINESS_TYPES,
  COUNTRIES,
  INDIAN_STATES,
  validateGST,
  validatePAN,
  validatePhone,
  validatePincode,
  validateIFSC,
  validateAccount,
  validateUPI,
} from "@/lib/constants";

export default function BusinessDetails() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: any) => state.vendor);
  const token = useSelector((state: any) => state?.auth?.token);

  const [form, setForm] = useState({
    registrar_name: "",
    email: "",
    phone_no: "",
    name: "",
    business_type: "",
    gst_number: "",
    pan_number: "",
    alternate_contact_name: "",
    alternate_contact_phone: "",
    address_line_1: "",
    address_line_2: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    bank_name: "",
    bank_account: "",
    ifsc_code: "",
    branch: "",
    upi_id: "",
    categories: "",
    return_policy: "",
    operating_hours: "",
    established_year: "",
    business_nature: "",
    annual_turnover: "",
    dealing_area: "",
    office_employees: "",
    gst_cert: null as File | null,
    pan_card: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle text inputs
  const handleTextInput = (
    e: ChangeEvent<HTMLInputElement>,
    options?: { preventPaste?: boolean; toUpperCase?: boolean }
  ) => {
    const { name, value } = e.target;
    let newValue = value;

    if (options?.toUpperCase) newValue = newValue.toUpperCase();
    if (options?.preventPaste && e.nativeEvent instanceof ClipboardEvent)
      return;

    setForm((prev) => ({ ...prev, [name]: newValue }));

    if (touched[name] || isSubmitting) {
      validateField(name, newValue);
    }
  };
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("vendor_email") || "";
    const storedPhone = sessionStorage.getItem("vendor_phone") || "";
    console.log("asdsad",storedEmail,storedPhone)
    setForm((prev) => ({
      ...prev,
      email: storedEmail,
      phone_no: storedPhone,
    }));
  }, []);

  const handleSelectChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name] || isSubmitting) {
      validateField(name, value);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Only PDF, JPG, or PNG allowed.",
        }));
        return;
      }
      setForm((prev) => ({ ...prev, [name]: file }));
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, form[name as keyof typeof form] as string);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "gst_number":
        if (value && !validateGST(value)) error = "Invalid GST format";
        break;
      case "pan_number":
        if (value && !validatePAN(value)) error = "Invalid PAN format";
        break;
      case "phone_no":
      case "alternate_contact_phone":
        if (value && !validatePhone(value)) error = "Invalid phone number";
        break;
      case "pincode":
        if (value && !validatePincode(value)) error = "Invalid pincode";
        break;
      case "ifsc_code":
        if (value && !validateIFSC(value)) error = "Invalid IFSC code";
        break;
      case "bank_account":
        if (value && !validateAccount(value)) error = "Invalid account number";
        break;
      case "upi_id":
        if (value && !validateUPI(value)) error = "Invalid UPI ID";
        break;
      case "email":
        if (value && !/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email";
        break;
      default:
        if (!value && name !== "address_line_2")
          error = "This field is required";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    Object.keys(form).forEach((key) => {
      if (
        key !== "address_line_2" &&
        key !== "gst_cert" &&
        key !== "pan_card" &&
        !form[key as keyof typeof form]
      ) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "Please login first!",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) data.append(key, value as any);
      });

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
          text:
            (result.payload as string) || "Failed to update business details.",
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

  // Reusable input
  const renderTextInput = (
    name: string,
    label: string,
    placeholder?: string,
    disabled?: boolean,
    options?: { preventPaste?: boolean; toUpperCase?: boolean }
  ) => (
    <div className="flex flex-col">
      <label className="mb-1 font-semibold text-sm">{label}</label>
      <Input
        name={name}
        disabled={disabled}
        value={form[name as keyof typeof form] as string}
        onChange={(e) => handleTextInput(e, options)}
        onBlur={() => handleBlur(name)}
        onPaste={options?.preventPaste ? (e) => e.preventDefault() : undefined}
        placeholder={placeholder || label}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
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
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  const renderFileInput = (name: string, label: string) => (
    <div className="flex flex-col">
      <label className="font-semibold mb-1">{label}</label>
      <Input
        type="file"
        name={name}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-background px-4 sm:px-8 py-12 flex flex-col items-center justify-start">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 max-w-4xl"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary">
          Business Details
        </h1>
        <p className="text-muted-foreground mt-3 text-base sm:text-lg">
          Fill in your business information to complete registration.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-6xl space-y-8"
      >
        {/* Your Information */}
        {/* Your Information */}
        <Card className="shadow-xl border border-border bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">
              Your Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Editable Name */}
            {renderTextInput("registrar_name", "Your Name")}

            {/* Read-only Email */}
            <div className="relative">
              {renderTextInput("email", "Email", form.email, true)}
              <p className="text-xs text-muted-foreground absolute right-2 top-2 italic">
                Can’t edit
              </p>
            </div>

            {/* Read-only Phone */}
            <div className="relative">
              {renderTextInput("phone_no", "Phone No", "10-digit number", true)}
              <p className="text-xs text-muted-foreground absolute right-2 top-2 italic">
                Can’t edit
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card className="shadow-xl border border-border bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderTextInput("name", "Business Name")}
            {renderSelect("business_type", "Business Type", BUSINESS_TYPES)}
            {renderTextInput(
              "gst_number",
              "GST Number",
              "e.g. 22AAAAA0000A1Z5",
              false,
              { toUpperCase: true }
            )}
            {renderTextInput("pan_number", "PAN Number", "e.g. ABCDE1234F", false,{
              preventPaste: true,
              toUpperCase: true,
            })}
            {renderTextInput(
              "alternate_contact_name",
              "Alternate Contact Name"
            )}
            {renderTextInput(
              "alternate_contact_phone",
              "Alternate Contact Phone",
              "10-digit number"
            )}
          </CardContent>
        </Card>

        {/* Business Profile */}
        <Card className="shadow-xl border border-border bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">
              Business Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderTextInput(
              "established_year",
              "Established Year",
              "e.g. 2015"
            )}
            {renderSelect(
              "business_nature",
              "Business Nature",
              BUSINESS_NATURES
            )}
            {renderTextInput(
              "annual_turnover",
              "Annual Turnover",
              "e.g. ₹10 Lakhs - ₹1 Crore"
            )}
            {renderTextInput(
              "dealing_area",
              "Dealing Area",
              "e.g. Pan-India, Local, Global"
            )}
            {renderTextInput(
              "office_employees",
              "Number of Office Employees",
              "e.g. 15"
            )}
          </CardContent>
        </Card>

        {/* Address Details */}
        <Card className="shadow-xl border border-border bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">
              Address Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderTextInput("address_line_1", "Address Line 1")}
            {renderTextInput("address_line_2", "Address Line 2 (Optional)")}
            {renderTextInput("street", "Street")}
            {renderTextInput("city", "City")}
            {renderSelect("state", "State", INDIAN_STATES)}
            {renderTextInput("pincode", "Pincode", "6-digit code")}
            {renderSelect("country", "Country", COUNTRIES)}
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card className="shadow-xl border border-border bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">Bank Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderTextInput("bank_name", "Bank Name")}
            {renderTextInput("bank_account", "Account Number", "9–18 digits",false, {
              preventPaste: true,
            })}
            {renderTextInput("ifsc_code", "IFSC Code", "e.g. SBIN0002499",false, {
              preventPaste: true,
              toUpperCase: true,
            })}
            {renderTextInput("branch", "Branch Name")}
            {renderTextInput("upi_id", "UPI ID", "e.g. name@upi")}
          </CardContent>
        </Card>

        {/* Other Information */}
        <Card className="shadow-xl border border-border bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">
              Other Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderTextInput("categories", "Categories (comma separated)")}
            {renderTextInput("return_policy", "Return Policy")}
            {renderTextInput("operating_hours", "Operating Hours")}
          </CardContent>
        </Card>

        {/* Documents */}
        <Card className="shadow-xl border border-border bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">Documents</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderFileInput("gst_cert", "GST Certificate (PDF/JPG/PNG)")}
            {renderFileInput("pan_card", "PAN Card (PDF/JPG/PNG)")}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={loading || isSubmitting}
          >
            {loading || isSubmitting ? "Saving..." : "Complete Registration"}
          </Button>
        </div>
      </motion.div>

      <QuoteBlock />
    </div>
  );
}
