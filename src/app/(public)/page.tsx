import type { Metadata } from "next";
import Hero from "@/components/public/sections/Hero";
import Stats from "@/components/public/sections/Stats";
import Investments from "@/components/public/sections/Investments";
import HowItWorks from "@/components/public/sections/HowItWorks";
import Trust from "@/components/public/sections/Trust";
import CTABanner from "@/components/public/sections/CTABanner";

export const metadata: Metadata = {
  title: "Inversiones en vehículos premium desde USA",
  description:
    "Invierte en vehículos de lujo seleccionados a mano, importados desde el mercado estadounidense y vendidos en Europa. Rentabilidad del 25% anualizado.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Investments />
      <HowItWorks />
      <Trust />
      <CTABanner />
    </main>
  );
}
