import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TemplateThemeProvider } from "../components/TemplateThemeProvider";
import { TemplateDataLoader } from "../components/TemplateDataLoader";

export default async function VendorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ vendor_id: string }>;
}) {
  const { vendor_id } = await params;
  return (
    <TemplateThemeProvider>
      <div className="min-h-screen flex flex-col">
        <TemplateDataLoader vendorId={vendor_id} />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </TemplateThemeProvider>
  );
}
