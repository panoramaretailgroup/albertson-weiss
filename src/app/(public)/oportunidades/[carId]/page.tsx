import type { Metadata } from "next";
import VehicleDetailContent from "./_content";

export const metadata: Metadata = {
  title: "Detalle del vehículo",
  description:
    "Datos completos del vehículo, fotos, especificaciones y proyección financiera. Inversión privada regulada por ley española.",
};

export default function VehicleDetailPage({
  params,
}: {
  params: { carId: string };
}) {
  return <VehicleDetailContent carId={params.carId} />;
}
