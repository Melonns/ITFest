import HeroSection from "./components/HeroSection";
import BenefitSection from "./components/BenefitSection";
import CateringBenefits from "./components/CateringBenefits";
import FaqSection from "./components/FaqSection";

export default function LandingPage() {
  return (
    <main className="space-y-16">
      <HeroSection />
      <BenefitSection />
      <CateringBenefits />
      <FaqSection />
    </main>
  );
}
