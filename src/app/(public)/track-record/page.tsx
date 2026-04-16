import type { Metadata } from "next";
import TrackRecordContent from "./_content";

export const metadata: Metadata = {
  title: "Historial de operaciones",
  description:
    "Consulta el historial completo de operaciones de Albertson & Weiss Motors. Cifras reales y resultados verificables.",
};

export default function TrackRecordPage() {
  return <TrackRecordContent />;
}
