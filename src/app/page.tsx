import FullWidthBanner from "@/components/banner";
import Footer from "@/components/footer";
import EcommerceHeroPage from "@/components/main/Index";
import Navbar from "@/components/navbar/Navbar";
import PromotionalBanner from "@/components/promotional-banner";


export default function Home() {
  return (
    <>
           <PromotionalBanner />
        <Navbar />
      <FullWidthBanner />
      <EcommerceHeroPage />
            <Footer />
    </>
  );
}
