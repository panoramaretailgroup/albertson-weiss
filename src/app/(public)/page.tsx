import type { Metadata } from "next";
import Hero from "@/components/public/sections/Hero";
import HowItWorks from "@/components/public/sections/HowItWorks";
import FeaturedOpportunity from "@/components/public/sections/FeaturedOpportunity";
import Stats from "@/components/public/sections/Stats";
import Trust from "@/components/public/sections/Trust";
import CTAFinal from "@/components/public/sections/CTAFinal";

export const metadata: Metadata = {
  title: "Inversiones en vehículos premium desde USA",
  description:
    "Invierte en vehículos premium americanos importados a Europa. Rentabilidad del 25% anualizado con contratos de préstamo privado regulados por ley española.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <FeaturedOpportunity />
      <Stats />
      <Trust />
      <CTAFinal />
    </main>
  );
}
