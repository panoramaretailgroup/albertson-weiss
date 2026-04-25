import type { Metadata } from "next";
import OportunidadesContent from "./_content";

export const metadata: Metadata = {
  title: "Vehículos disponibles",
  description:
    "Explora nuestra selección curada de vehículos premium abiertos a inversión. Inventario completo con rentabilidades estimadas del 15-25%.",
};

export default function OportunidadesPage() {
  return <OportunidadesContent />;
}
