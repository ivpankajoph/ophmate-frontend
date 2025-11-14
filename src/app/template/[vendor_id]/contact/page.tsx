"use client";
import React, { useState } from "react";

import dynamic from "next/dynamic";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useSelector } from "react-redux";


const DynamicMap = dynamic(() => import("@/app/template/components/MapComponent"), { ssr: false });

export default function ContactPage() {
  const contactData = useSelector((state: any) => state?.vendorprofilepage?.vendor);
  const templateData = useSelector(
    (state: any) => state?.alltemplatepage?.data?.components?.contact_page
  );

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

  return (
    <>


      <div className="min-h-screen bg-white">

        {/* Hero */}
        <div
          className="relative h-96 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),
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
            />

            {/* Phone */}
            <InfoCard Icon={Phone} title="Call Us" details={contactData?.phone} />

            {/* Email */}
            <InfoCard Icon={Mail} title="Email" details={contactData?.email} />

            {/* Hours */}
            <InfoCard Icon={Clock} title="Working Hours" details="Mon - Fri: 9AM - 6PM" />
          </div>

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">

            {/* Manual Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-3xl font-bold mb-4">Send us a message</h2>

              <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg" required />

              <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg" required />

              <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg" />

              <textarea name="message" placeholder="Message" rows={6}
                value={form.message} onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg" required />

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 text-lg"
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
function InfoCard({ Icon, title, details }: any) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md">
      <div className="w-14 h-14 mx-auto mb-3 bg-white rounded-full flex justify-center items-center shadow">
        <Icon size={22} className="text-green-600" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-700">{details}</p>
    </div>
  );
}
