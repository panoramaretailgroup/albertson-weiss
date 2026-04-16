import type { Metadata } from "next";
import ComoFuncionaContent from "./_content";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "Descubre el proceso completo de inversión en vehículos premium: selección, compra en subasta, importación y cobro de rentabilidad del 25%.",
};

export default function ComoFuncionaPage() {
  return <ComoFuncionaContent />;
}
