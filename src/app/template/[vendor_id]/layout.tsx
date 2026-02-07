import React from "react";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TemplateThemeProvider } from "../components/TemplateThemeProvider";
import { TemplateDataLoader } from "../components/TemplateDataLoader";
import { buildTemplateMetadata } from "@/lib/template-metadata";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ vendor_id: string }>;
};

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { vendor_id } = await params;
  return buildTemplateMetadata({ vendorId: vendor_id, page: "home" });
}

export default async function VendorLayout({
  children,
  params,
}: LayoutProps) {
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
