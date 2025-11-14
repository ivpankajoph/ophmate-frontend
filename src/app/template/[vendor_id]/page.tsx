import React from "react";
import LandingPageDev from "../components/HeroSection";
import Hero2 from "../components/Hero2";
import TrendingProducts from "../components/TrendingProducts";
import OurCategories from "../components/Category";
import PopularProducts from "../components/PopularProducts";
import CustomerTestimonials from "../components/Testimonials";
import FaqsDev from "../components/Faqs";

const page = () => {
  return (
    <div>
      <LandingPageDev />
      <Hero2 />
      <TrendingProducts />
      <OurCategories />
      <PopularProducts/>
      <CustomerTestimonials/>
      <FaqsDev/>
    </div>
  );
};

export default page;
