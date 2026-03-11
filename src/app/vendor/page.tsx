"use client";

import { useRouter } from "next/navigation";
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

export default function VendorPage() {
  const router = useRouter();

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
            <h2 className="text-3xl md:text-4xl font-extrabold text-purple-700">
              Your Journey on SellersLogin
            </h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-3xl">
              Starting your online business with SellersLogin is easy. Thousands of
              sellers trust us to grow their business every day.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  title: "Create",
                  desc: "Register quickly with GST, address, and bank details.",
                  image:
                    "https://static-assets-web.flixcart.com/fk-sp-static/images/create-icon.svg",
                },
                {
                  title: "List",
                  desc: "Add your products and publish them in minutes.",
                  image:
                    "https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/icons/Group_2_1.svg",
                },
                {
                  title: "Orders",
                  desc: "Receive orders from customers across India.",
                  image:
                    "https://static-assets-web.flixcart.com/fk-sp-static/images/orders-icon.svg",
                },
                {
                  title: "Shipment",
                  desc: "We ensure smooth, reliable delivery of your products.",
                  image:
                    "https://static-assets-web.flixcart.com/fk-sp-static/images/shipment-icon.svg",
                },
                {
                  title: "Payment",
                  desc: "Get secure payouts with transparent settlement timelines.",
                  image:
                    "https://static-assets-web.flixcart.com/fk-sp-static/images/payment-icon.svg",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-white p-6 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)] hover:shadow-[0_18px_36px_-22px_rgba(15,23,42,0.4)] transition-shadow"
                >
                  <div className="h-36 rounded-2xl bg-purple-50 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={`${item.title} illustration`}
                      className="h-24 w-auto"
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl px-6 py-24 grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Expand Your Reach",
              desc: "Access customers from all over the world and grow your audience.",
            },
            {
              title: "Easy Store Management",
              desc: "Track orders, manage stock, and view analytics in real time.",
            },
            {
              title: "Boost Your Brand",
              desc: "Promote your products with our marketing and SEO tools.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group animate-in fade-in slide-in-from-bottom-6 duration-700"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <Card className="h-full rounded-2xl border border-purple-100/70 bg-gradient-to-br from-white to-purple-50/60 shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 h-11 w-11 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">
                      {index === 0
                        ? "public"
                        : index === 1
                        ? "inventory_2"
                        : "campaign"}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-semibold text-neutral-900">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </section>

        <section className="w-full py-24 flex flex-col items-center text-center bg-gradient-to-b from-background to-[#f6f0ff]">
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

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter Full Name *"
                  className="w-full rounded-lg border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                />
                <input
                  type="text"
                  placeholder="Enter Mobile Number / Email ID *"
                  className="w-full rounded-lg border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                />
                <select className="w-full rounded-lg border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200">
                  <option>Select A Topic</option>
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
                  className="w-full rounded-lg border border-purple-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
                <Button className="rounded-full bg-[rgb(147,51,234)] px-8 py-6 text-lg hover:bg-[rgb(126,34,206)]">
                  Send Query
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
