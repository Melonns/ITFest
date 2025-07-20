import NavbarLanding from "../components/NavbarLanding";
import HeroSection from "./components/HeroSection";
import BenefitSection from "./components/BenefitSection";
import CateringBenefits from "./components/CateringBenefits";
import FaqSection from "./components/FaqSection";
import Testimonial from "./components/Testimonial";

export default function LandingPage() {
  return (
    <>
      <NavbarLanding />
      <main className="space-y-16">
        <HeroSection />
        <BenefitSection />
        <CateringBenefits />
        <Testimonial />
        <FaqSection />
      </main>
    </>
  );
}
