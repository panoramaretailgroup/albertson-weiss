import type { Metadata } from "next";
import RegistroContent from "./_content";

export const metadata: Metadata = {
  title: "Registro de inversor",
  description:
    "Crea tu cuenta de inversor en Albertson & Weiss Motors o reserva una llamada con nuestro equipo.",
};

export default function RegistroPage() {
  return <RegistroContent />;
}
