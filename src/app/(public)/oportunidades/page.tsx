import type { Metadata } from "next";
import OportunidadesContent from "./_content";

export const metadata: Metadata = {
  title: "Oportunidades de inversión",
  description:
    "Explora los vehículos premium disponibles para inversión. Coches americanos con rentabilidad estimada del 20-30%.",
};

export default function OportunidadesPage() {
  return <OportunidadesContent />;
}
