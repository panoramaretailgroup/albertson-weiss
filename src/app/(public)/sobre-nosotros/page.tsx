import type { Metadata } from "next";
import SobreNosotrosContent from "./_content";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Conoce al equipo de Albertson & Weiss Motors. Nuestra misión: democratizar la inversión en vehículos premium americanos.",
};

export default function SobreNosotrosPage() {
  return <SobreNosotrosContent />;
}
