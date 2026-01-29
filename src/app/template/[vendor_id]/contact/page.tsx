"use client";
import React, { useMemo, useState } from "react";

import dynamic from "next/dynamic";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTemplateVariant } from "@/app/template/components/useTemplateVariant";


const DynamicMap = dynamic(() => import("@/app/template/components/MapComponent"), { ssr: false });

export default function ContactPage() {
  const variant = useTemplateVariant();
  const contactData = useSelector((state: any) => state?.vendorprofilepage?.vendor);
  const products = useSelector((state: any) => state?.alltemplatepage?.products || []);
  const templateData = useSelector(
    (state: any) => state?.alltemplatepage?.data?.components?.contact_page
  );
  const params = useParams();
  const vendor_id = params.vendor_id as string;

  const categories = useMemo(() => {
    const map = new Map<
      string,
      { id: string; label: string; count: number }
    >();
    const normalizeLabel = (value: unknown) =>
      typeof value === "string" ? value.trim() : "";
    const normalizeId = (value: unknown) =>
      typeof value === "string" ? value.trim() : "";

    products.forEach((product: any) => {
      const rawCategory =
        product?.productCategory?._id ||
        product?.productCategory ||
        product?.productCategoryName ||
        product?.productCategory?.name ||
        product?.productCategory?.title ||
        product?.productCategory?.categoryName;

      const label =
        normalizeLabel(product?.productCategoryName) ||
        normalizeLabel(product?.productCategory?.name) ||
        normalizeLabel(product?.productCategory?.title) ||
        normalizeLabel(product?.productCategory?.categoryName) ||
        normalizeLabel(product?.productCategory);

      const id = normalizeId(rawCategory) || label;
      if (!id) return;

      const existing = map.get(id);
      if (existing) {
        existing.count += 1;
        if (!existing.label && label) existing.label = label;
      } else {
        map.set(id, {
          id,
          label: label || "Category",
          count: 1,
        });
      }
    });

    return Array.from(map.values()).sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  }, [products]);

  const toCategorySlug = (value: string) =>
    encodeURIComponent(value.toLowerCase().replace(/\s+/g, "-"));

    if (!contactData) {
      return <><h1>work in progress</h1></>;
    }
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
    alert("✅ Message sent!");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const isStudio = variant.key === "studio";
  const isMinimal = variant.key === "minimal";
  const pageClass = isStudio
    ? "min-h-screen bg-slate-950 text-slate-100"
    : isMinimal
      ? "min-h-screen bg-[#f5f5f7] text-slate-900"
      : "min-h-screen bg-white";
  const cardClass = isStudio
    ? "bg-slate-900/70 border border-slate-800 text-slate-100"
    : isMinimal
      ? "bg-white border border-slate-200"
      : "bg-gray-50";

  return (
    <>


      <div className={pageClass}>
        <div className="group fixed right-6 top-1/2 z-50 -translate-y-1/2">
          <button className={`rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition hover:shadow-xl template-accent ${isStudio ? "bg-slate-900 text-slate-100" : "bg-white"}`}>
            Browse Categories
          </button>
          <div className="pointer-events-none absolute right-full top-1/2 mr-4 w-64 -translate-y-1/2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
            <div className={`max-h-80 overflow-auto rounded-2xl border p-3 shadow-2xl ${isStudio ? "border-slate-800 bg-slate-900 text-slate-100" : "border-slate-200 bg-white"}`}>
              <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Browse
              </p>
              <div className="flex flex-col gap-2">
                {categories.length > 0 ? (
                  categories.map((category) => {
                    const isObjectId = /^[a-f\d]{24}$/i.test(category.id);
                    const categoryPath = isObjectId
                      ? category.id
                      : toCategorySlug(category.label);
                    return (
                      <Link
                        key={category.id}
                        href={`/template/${vendor_id}/category/${categoryPath}`}
                        className={`flex items-center justify-between rounded-xl border border-transparent px-3 py-2 text-sm transition ${isStudio ? "text-slate-200 hover:border-slate-700 hover:bg-slate-800/70" : "text-slate-700 hover:border-slate-200 hover:bg-slate-50"}`}
                      >
                        <span className="truncate">{category.label}</span>
                        <span className="text-xs text-slate-400">
                          {category.count}
                        </span>
                      </Link>
                    );
                  })
                ) : (
                  <div className={`rounded-xl border border-dashed px-3 py-6 text-center text-xs uppercase tracking-[0.3em] text-slate-400 ${isStudio ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-slate-50"}`}>
                    No categories
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div
          className={`relative ${isMinimal ? "h-72" : "h-96"} bg-cover bg-center`}
          style={{
            backgroundImage: `linear-gradient(color-mix(in srgb, var(--template-banner-color) 60%, transparent), color-mix(in srgb, var(--template-banner-color) 60%, transparent)),
             url('${templateData?.hero?.backgroundImage}')`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white text-center">
            <div>
              <h1 className="text-5xl font-bold">{templateData?.hero?.title}</h1>
              <p className="text-xl mt-2">{templateData?.hero?.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Visit */}
            <InfoCard
              Icon={MapPin}
              title="Visit Us"
              details={`${contactData?.street}, ${contactData?.city}, ${contactData?.state} - ${contactData?.pincode}`}
              className={cardClass}
            />

            {/* Phone */}
            <InfoCard Icon={Phone} title="Call Us" details={contactData?.phone} className={cardClass} />

            {/* Email */}
            <InfoCard Icon={Mail} title="Email" details={contactData?.email} className={cardClass} />

            {/* Hours */}
            <InfoCard Icon={Clock} title="Working Hours" details="Mon - Fri: 9AM - 6PM" className={cardClass} />
          </div>

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">

            {/* Manual Form */}
            <form onSubmit={handleSubmit} className={`space-y-5 rounded-3xl border p-6 ${isStudio ? "border-slate-800 bg-slate-900/70" : isMinimal ? "border-slate-200 bg-white" : "border-slate-200 bg-white"}`}>
              <h2 className="text-3xl font-bold mb-4">Send us a message</h2>

              <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg ${isStudio ? "border-slate-700 bg-slate-950 text-slate-100" : "border-slate-200"}`} required />

              <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg ${isStudio ? "border-slate-700 bg-slate-950 text-slate-100" : "border-slate-200"}`} required />

              <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg ${isStudio ? "border-slate-700 bg-slate-950 text-slate-100" : "border-slate-200"}`} />

              <textarea name="message" placeholder="Message" rows={6}
                value={form.message} onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg ${isStudio ? "border-slate-700 bg-slate-950 text-slate-100" : "border-slate-200"}`} required />

              <button
                type="submit"
                className="w-full text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 text-lg template-accent-bg template-accent-bg-hover"
              >
                <Send size={20} /> Send Message
              </button>
            </form>

            {/* Map */}
            <DynamicMap lat={templateData?.section_2?.lat} long={templateData?.section_2?.long} />
          </div>
        </div>
      </div>
    </>
  );
}

// Reusable Info Card component
function InfoCard({ Icon, title, details, className }: any) {
  const isDark = typeof className === "string" && className.includes("text-slate-100");
  return (
    <div className={`rounded-lg p-6 text-center shadow-md ${className || ""}`}>
      <div className="w-14 h-14 mx-auto mb-3 bg-white rounded-full flex justify-center items-center shadow">
        <Icon size={22} className="template-accent" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className={isDark ? "text-slate-200" : "text-gray-700"}>{details}</p>
    </div>
  );
}
