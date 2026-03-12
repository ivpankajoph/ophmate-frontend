"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer";
import PromotionalBanner from "@/components/promotional-banner";
import userApi from "@/lib/userApi";
import Swal from "sweetalert2";

export default function VendorPage() {
  const router = useRouter();
  const [queryForm, setQueryForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [isSubmittingQuery, setIsSubmittingQuery] = useState(false);

  const handleQueryChange = (
    field: keyof typeof queryForm,
    value: string,
  ) => {
    setQueryForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleVendorQuerySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !queryForm.fullName.trim() ||
      !queryForm.email.trim() ||
      !queryForm.phone.trim() ||
      !queryForm.topic.trim() ||
      !queryForm.message.trim()
    ) {
      Swal.fire("Missing details", "Please fill in all required fields.", "warning");
      return;
    }

    setIsSubmittingQuery(true);
    try {
      const payload = {
        fullName: queryForm.fullName.trim(),
        email: queryForm.email.trim(),
        phone: queryForm.phone.trim(),
        issueType: queryForm.topic.trim(),
        message: queryForm.message.trim(),
      };

      const response = await userApi.post(
        "/support/queries/vendor-onboarding/submit",
        payload,
      );

      if (response.data?.success) {
        Swal.fire(
          "Query Submitted",
          "Thanks for reaching out. Our team will contact you soon.",
          "success",
        );
        setQueryForm({
          fullName: "",
          email: "",
          phone: "",
          topic: "",
          message: "",
        });
      }
    } catch (error: any) {
      console.error("Vendor query submission failed:", error);
      Swal.fire(
        "Submission Failed",
        error?.response?.data?.message ||
        "Something went wrong. Please try again later.",
        "error",
      );
    } finally {
      setIsSubmittingQuery(false);
    }
  };

  return (
    <>
      <PromotionalBanner />
      <Navbar />

      <div className="min-h-screen flex flex-col items-center bg-background text-foreground overflow-hidden">
        <section className="w-full bg-[#f7f2ff]">
          <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight animate-in fade-in slide-in-from-left-8 duration-500">
                Launch your business
                <br /> 
                & get benefits up to
                <span className="block text-purple-600">₹41,000*</span>

              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-in fade-in slide-in-from-left-8 duration-500 delay-150">
                Register with a valid GSTIN and an active bank account to become
                a SellersLogin seller.
              </p>
              <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-8 duration-500 delay-200">

                {/* <Button
                  size="lg"
                  onClick={() => router.push("/vendor/registration")}
                  className="text-lg px-8 py-6 rounded-full bg-[#f36a1a] hover:bg-[#e45f14]"
                >
                  Start Selling
                </Button> */}

                <Button
                  size="lg"
                  onClick={() => router.push("/vendor/registration")}
                  className="text-lg px-8 py-6 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors duration-300 shadow-md hover:shadow-purple-300/50"
                >
                  Start Selling
                </Button>
                <span className="text-xs text-muted-foreground">*T&C apply</span>
              </div>
            </div>

            <div className="relative animate-in fade-in zoom-in-95 duration-500">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop"
                  alt="Vendor holding package"
                  className="h-[320px] w-full object-cover"
                />
              </div>
              <div className="absolute -left-6 top-6 bg-white/95 text-xs md:text-sm font-semibold rounded-full px-4 py-2 shadow-md animate-in fade-in slide-in-from-left-6 duration-500">
                ₹26,000 worth of Ad Credits
              </div>
              <div className="absolute -right-6 top-24 bg-white/95 text-xs md:text-sm font-semibold rounded-full px-4 py-2 shadow-md animate-in fade-in slide-in-from-right-6 duration-500 delay-100">
                ₹5,000 worth of Selection Incentives
              </div>
              <div className="absolute -left-4 bottom-6 bg-white/95 text-xs md:text-sm font-semibold rounded-full px-4 py-2 shadow-md animate-in fade-in slide-in-from-left-6 duration-500 delay-150">
                ₹10,000 worth of FBA Fee Waiver
              </div>
            </div>
          </div>
        </section>

        {/* <section className="w-full flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-b from-primary/10 to-background">

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6">
           
            <span className="inline-block animate-in fade-in slide-in-from-left-8 duration-700 fill-mode-both">
              Become a&nbsp;
            </span>

            
            <span className="inline-block text-[rgb(147,51,234)] animate-in fade-in slide-in-from-left-8 duration-700 delay-400 fill-mode-both">
              Vendor
            </span>
          </h1>

          <p className="max-w-3xl text-lg md:text-2xl text-muted-foreground animate-in fade-in slide-in-from-bottom-6 duration-500">
            Start selling your products to thousands of customers with our trusted platform. Manage everything with ease and grow your business faster.
            Our platform gives you the tools you need to manage inventory, process orders, and connect with a wider audience. Focus on growing your business while we handle the technology.
          </p>
          <div className="mt-10 animate-in fade-in zoom-in-95 duration-500">
            <Button
              size="lg"
              onClick={() => router.push("/vendor/registration")}
              className="text-lg px-8 py-6 rounded-full"
            >
              Join as Vendor
            </Button>
          </div>
        </section> */}

        <section className="relative w-full flex flex-col items-center justify-center text-center py-32 px-6 overflow-hidden bg-gradient-to-b from-purple-900/5 via-background to-background">

          {/* 1. Animated Background Orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[520px] h-[520px] bg-purple-600/20 rounded-full blur-[140px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[420px] h-[420px] bg-purple-500/15 rounded-full blur-[120px] animate-bounce [animation-duration:10s]" />
          </div>

          {/* 2. Content Wrapper (to stay above orbs) */}
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">

            {/* Heading */}
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 text-neutral-900">
              <span className="inline-block animate-in fade-in slide-in-from-left-8 duration-700 fill-mode-both text-neutral-900">
                Become a&nbsp;
              </span>
              <span className="inline-block text-[rgb(147,51,234)] animate-in fade-in slide-in-from-left-8 duration-700 delay-500 fill-mode-both">
                Vendor
              </span>
            </h1>

            {/* Paragraph with better readability */}
            <p className="max-w-2xl text-lg md:text-xl text-neutral-500 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-700 fill-mode-both">
              Start selling your products to thousands of customers with our trusted platform.
              <span className="hidden md:inline"> Manage everything with ease and grow your business faster.
                Focus on scaling while we handle the heavy lifting.</span>
            </p>

            {/* Action Area */}
            <div className="mt-12 animate-in fade-in zoom-in-95 duration-700 delay-1000 fill-mode-both">
              <Button
                size="lg"
                onClick={() => router.push("/vendor/registration")}
                className="text-lg px-10 py-7 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_22px_rgba(147,51,234,0.35)] transition-all hover:scale-105 active:scale-95"
              >
                Start Selling Today
              </Button>

              {/* Social Proof / Trust Badge */}
              <p className="mt-6 text-sm text-neutral-500 font-medium tracking-wide uppercase">
                Join 5,000+ Active Sellers India-wide
              </p>
            </div>
          </div>

          {/* 3. Subtle Bottom Fade */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-50/70 to-transparent" />
        </section>

        <section className="w-full bg-[#f7f3ff]">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="text-purple-700">Your Journey</span>{" "}
              <span className="text-neutral-900">on SellersLogin</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-neutral-500 max-w-4xl leading-relaxed">
              Starting your online business with SellersLogin is straightforward. Build your store,
              list products, manage incoming orders, dispatch shipments, and track payouts from one
              composed working surface.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  title: "Create",
                  desc:
                    "Register in minutes with your GST details, business address, and payout account from one guided onboarding flow.",
                  image:
                    "https://static-assets-web.flixcart.com/fk-sp-static/images/create-icon.svg",
                },
                {
                  title: "List",
                  desc:
                    "Add products, pricing, and category data through a clean catalog workspace built for real teams and large assortments.",
                  image:
                    "https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/icons/Group_2_1.svg",
                },
                {
                  title: "Orders",
                  desc:
                    "Receive storefront orders in one operational view, with queue visibility for packing, approvals, and dispatch.",
                  image:
                    "https://static-assets-web.flixcart.com/fk-sp-static/images/orders-icon.svg",
                },
                {
                  title: "Shipment",
                  desc:
                    "Move shipments forward with tracking checkpoints, delivery coordination, and courier visibility that stays readable.",
                  image:
                    "https://static-assets-web.flixcart.com/fk-sp-static/images/shipment-icon.svg",
                },
                {
                  title: "Payments",
                  desc:
                    "Monitor settlements, payout status, and reconciliation without bouncing between payment dashboards and reports.",
                  image:
                    "https://static-assets-web.flixcart.com/fk-sp-static/images/payment-icon.svg",
                },
              ].map((item) => (
                <div key={item.title} className="text-left">
                  <div className="h-28 w-28 rounded-3xl bg-gradient-to-br from-purple-50 to-white shadow-[0_12px_30px_-24px_rgba(76,29,149,0.45)] flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={`${item.title} illustration`}
                      className="h-16 w-auto"
                    />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-[#f7f3ed]">
          <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
                From home-grown
                <br />
                to well-known
                <span className="block text-purple-600"> with SellersLogin</span>
              </h2>
              <p className="text-base md:text-lg text-neutral-700 max-w-xl">
                Register with a valid GSTIN and an active bank account to become a
                SellersLogin seller.
              </p>
              <Button
                size="lg"
                onClick={() => router.push("/vendor/registration")}
                className="rounded-full bg-purple-600 px-8 py-6 text-lg hover:bg-purple-700"
              >
                Start selling
              </Button>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl bg-white">
                <img
                  src="/shipping.avif"
                  alt="Seller working with products"
                  className="h-[260px] w-full object-cover sm:h-[320px]"
                />
                <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-5 py-1.5 text-xs font-semibold text-purple-700 shadow-md">
                  SellersLogin
                </div>
                <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-20 rounded-full bg-white/95 shadow-md" />
              </div>
              <div className="absolute -left-6 bottom-6 rounded-2xl bg-white/95 px-4 py-2 text-xs font-semibold text-purple-700 shadow-md">
                PRODUCT LISTED
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="mx-auto max-w-7xl px-6 pb-10">
              <div className="h-5 w-full rounded-full bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 shadow-inner" />
            </div>
          </div>
        </section>

      

        <section className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="rounded-2xl bg-neutral-900 text-white px-6 py-4 text-center shadow-lg">
              <p className="text-sm sm:text-base font-semibold">
                ✨ 5 Steps to increase your chances of earning ₹ 1 Lakh or more within 60 days of
                launch*
              </p>
              <p className="mt-1 text-xs sm:text-sm text-white/80 underline underline-offset-4">
                Learn how you can grow your business
              </p>
            </div>

            <h2 className="mt-12 text-3xl md:text-4xl font-extrabold text-neutral-900 text-center">
              Get a head-start to selling with us
            </h2>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {[
                {
                  tag: "New Seller Incentives",
                  title: "Special offer for new sellers",
                  points: [
                    "Up to ₹ 26,000 worth promotional ad credits in SellersLogin Ads account + free 2-month ad account management support",
                    "Up to ₹ 5,000 in potential rewards for adding more listings",
                    "Up to ₹ 5,000 in potential rewards for adding more listings",
                  ],
                },
                {
                  tag: "Selling Fee Drop",
                  title: "Earn more, with lesser selling fee",
                  points: [
                    "0% referral fees on products under ₹300",
                    "₹65 national shipping rates now, from ₹77",
                    "Up to 90% savings in selling fees on the sale of second unit",
                  ],
                },
                {
                  tag: "Hassle-Free Payments",
                  title: "Pricing and 7-day payment cycle",
                  points: [
                    "Start with fees from 2% with clear category-based pricing",
                    "Get automatic secure payments directly to your bank account",
                    "Receive payments every 7 days, 6x faster than traditional retail",
                  ],
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.35)]"
                >
                  <span className="inline-flex items-center rounded-full bg-purple-100 px-4 py-1 text-xs font-semibold text-purple-700">
                    {card.tag}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-neutral-900">
                    {card.title}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-purple-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button
                size="lg"
                onClick={() => router.push("/vendor/registration")}
                className="rounded-full bg-purple-600 px-8 py-6 text-lg hover:bg-purple-700"
              >
                Create your seller account
              </Button>
            </div>
          </div>
        </section>

        <section className="relative w-full py-24 flex flex-col items-center text-center overflow-hidden bg-gradient-to-b from-[#fdfbff] via-[#f8f3ff] to-[#efe6ff]">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-purple-300/30 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-purple-200/40 blur-[110px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.08),transparent_55%)]" />
          {/* <h3 className="text-5xl font-bold mb-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
            Ready to Join the Marketplace?
          </h3> */}
          <h3 className="text-4xl  md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 text-neutral-900 whitespace-nowrap">
            {/* Part 1 */}
            <span className="inline-block animate-in fade-in slide-in-from-left-6 duration-700 fill-mode-both text-neutral-900">
              Ready to Join the&nbsp;
            </span>

            {/* Part 2 - Purple with Glow */}
            <span className="inline-block text-[rgb(168,85,247)] animate-in fade-in slide-in-from-left-6 duration-700 delay-300 fill-mode-both drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              Marketplace?
            </span>
          </h3>
          <Button
            size="lg"
            className="mt-10 text-lg px-10 py-6 rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
            onClick={() => router.push("/vendor/registration")}
          >
            Become a Vendor Today
          </Button>
        </section>

        <section className="w-full bg-[#f7f3ff]">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="rounded-[32px] border border-purple-200/70 bg-white/90 p-8 md:p-12 shadow-[0_14px_36px_-28px_rgba(88,28,135,0.45)]">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
                <div className="space-y-12">
                  <h3 className="text-3xl md:text-4xl font-normal text-neutral-900">
                    Start your online selling journey here and enjoy benefits like
                  </h3>
                  <div className="grid gap-8 sm:grid-cols-3">
                    {[
                      {
                        label: "0 Returns*",
                        icon: "https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/icons/zero_returns_revamp.svg",
                      },
                      {
                        label: "Access to budget-friendly customers",
                        icon: "https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/icons/budget_cost_revamp.svg",
                      },
                      {
                        label: "Lowest cost of doing business",
                        icon: "https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/icons/low_cost_revamp.svg",
                      },
                    ].map((item) => (
                      <div key={item.label} className="space-y-4">
                        <div className="h-24 w-24 rounded-full bg-purple-100 flex items-center justify-center">
                          <img
                            src={item.icon}
                            alt=""
                            className="h-16 w-16"
                          />
                        </div>
                        <p className="text-sm text-neutral-700">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <img
                    src="https://img.freepik.com/free-photo/latin-confident-professionals-suit-standing-against-isolated-background_662251-330.jpg?semt=ais_rp_50_assets&w=740&q=80"
                    alt="Successful sellers"
                    className="w-full max-w-md rounded-3xl object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#f7f3ff]">
          <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
                We are happy to help you{" "}
                <span className="text-[rgb(147,51,234)]">SellersLogin</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Still have questions or queries that are left unanswered? Share
                your thoughts below and we will help you improve your business
                journey.
              </p>

              <form className="space-y-4" onSubmit={handleVendorQuerySubmit}>
                <input
                  type="text"
                  placeholder="Enter Full Name *"
                  value={queryForm.fullName}
                  onChange={(event) => handleQueryChange("fullName", event.target.value)}
                  className="w-full rounded-lg border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                />
                <input
                  type="tel"
                  placeholder="Enter Mobile Number *"
                  value={queryForm.phone}
                  onChange={(event) => handleQueryChange("phone", event.target.value)}
                  className="w-full rounded-lg border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                />
                <input
                  type="email"
                  placeholder="Enter Email ID *"
                  value={queryForm.email}
                  onChange={(event) => handleQueryChange("email", event.target.value)}
                  className="w-full rounded-lg border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                />
                <select
                  value={queryForm.topic}
                  onChange={(event) => handleQueryChange("topic", event.target.value)}
                  className="w-full rounded-lg border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                >
                  <option value="">Select A Topic</option>
                  <option>Account Creation</option>
                  <option>Fee Structure</option>
                  <option>What Can I Sell?</option>
                  <option>Account Management</option>
                  <option>How To Run Ads?</option>
                  <option>Shipping</option>
                  <option>Others</option>
                </select>
                <textarea
                  rows={4}
                  placeholder="Type your message *"
                  value={queryForm.message}
                  onChange={(event) => handleQueryChange("message", event.target.value)}
                  className="w-full rounded-lg border border-purple-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
                <Button
                  type="submit"
                  disabled={isSubmittingQuery}
                  className="rounded-full bg-[rgb(147,51,234)] px-8 py-6 text-lg hover:bg-[rgb(126,34,206)]"
                >
                  {isSubmittingQuery ? "Submitting..." : "Send Query"}
                </Button>
              </form>
            </div>

            <div className="flex justify-center">
              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <img
                  src="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/images/call_center.webp"
                  alt="Support agent illustration"
                  className="w-full max-w-md object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
