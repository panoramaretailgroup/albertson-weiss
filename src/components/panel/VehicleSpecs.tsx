import type { Car } from "@/lib/types";

interface Extras {
  /** Stock number / reference. */
  stockNumber?: string | null;
  origin?: string | null;
  horsepower?: string | null;
  torque?: string | null;
  transmission?: string | null;
  drivetrain?: string | null;
  interior?: string | null;
  wheels?: string | null;
  owners?: number | null;
  accidentHistory?: string | null;
  serviceHistory?: string | null;
}

interface Props {
  car: Car;
  extras?: Extras;
}

export default function VehicleSpecs({ car, extras }: Props) {
  const fmt = (v: string | number | null | undefined) =>
    v === null || v === undefined || v === "" ? "—" : String(v);

  const groups: { title: string; rows: [string, string][] }[] = [
    {
      title: "Identificación",
      rows: [
        ["VIN", fmt(car.vin)],
        ["Año", fmt(car.year)],
        ["Nº de stock", fmt(extras?.stockNumber)],
        ["Origen", fmt(extras?.origin)],
      ],
    },
    {
      title: "Motor y transmisión",
      rows: [
        ["Motor", fmt(car.engine)],
        ["Potencia", fmt(extras?.horsepower)],
        ["Par motor", fmt(extras?.torque)],
        ["Transmisión", fmt(extras?.transmission)],
        ["Tracción", fmt(extras?.drivetrain)],
      ],
    },
    {
      title: "Exterior e interior",
      rows: [
        ["Color exterior", fmt(car.color)],
        ["Interior", fmt(extras?.interior)],
        ["Llantas", fmt(extras?.wheels)],
        [
          "Equipamiento",
          car.equipment && car.equipment.length > 0
            ? car.equipment.join(" · ")
            : "—",
        ],
      ],
    },
    {
      title: "Estado",
      rows: [
        [
          "Kilometraje",
          car.mileage_km !== null && car.mileage_km !== undefined
            ? `${car.mileage_km.toLocaleString("es-ES")} km`
            : "—",
        ],
        ["Propietarios", fmt(extras?.owners)],
        ["Historial de accidentes", fmt(extras?.accidentHistory)],
        ["Service", fmt(extras?.serviceHistory)],
      ],
    },
  ];

  return (
    <section>
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-7 h-px bg-rule" aria-hidden="true" />
        <span className="font-sans text-[9.5px] uppercase tracking-[0.3em] text-muted font-normal">
          Especificaciones completas
        </span>
      </div>
      <h2 className="font-serif font-light text-[44px] leading-[1.05] tracking-[-0.015em] text-text mb-12">
        Ficha <em className="italic">técnica</em>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
        {groups.map((g) => (
          <div key={g.title}>
            <div className="font-sans text-[9px] uppercase tracking-[0.3em] text-text font-normal pb-3.5 border-b border-text mb-1">
              {g.title}
            </div>
            {g.rows.map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-6 py-3.5 border-b border-[#dcd6cb]"
              >
                <span className="font-sans text-[11px] text-muted font-light tracking-[0.04em] shrink-0">
                  {k}
                </span>
                <span className="num text-[11px] text-text font-normal tracking-[0.01em] text-right">
                  {v}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
