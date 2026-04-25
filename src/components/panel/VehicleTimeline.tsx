import { cn } from "@/lib/utils";

interface Props {
  /** Current phase (1–8). Phases strictly before are "done"; equal is "active"; after is "todo". */
  currentPhase: number;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Subasta / Adquisición",
    description:
      "Selección del lote y puja en subasta americana o compra directa a concesionario.",
  },
  {
    number: "02",
    title: "Recogida",
    description:
      "Retirada del vehículo desde el vendedor por transportista local verificado.",
  },
  {
    number: "03",
    title: "Almacén USA",
    description:
      "Entrada al almacén bonded en origen. Inspección, fotos y reporte de estado.",
  },
  {
    number: "04",
    title: "Embarque",
    description:
      "Carga en contenedor marítimo y emisión del Bill of Lading (B/L).",
  },
  {
    number: "05",
    title: "Tránsito marítimo",
    description:
      "Travesía transatlántica con tracking de contenedor y ETA al puerto de destino.",
  },
  {
    number: "06",
    title: "Aduana UE",
    description:
      "Despacho aduanero, pago de aranceles e IVA, y homologación según mercado.",
  },
  {
    number: "07",
    title: "Preparación / ITV",
    description:
      "Adaptación europea, ITV, detailing y fotos profesionales para listado.",
  },
  {
    number: "08",
    title: "Venta / Entrega",
    description:
      "Publicación, cierre de venta, entrega al comprador y liquidación al fondo.",
  },
];

export default function VehicleTimeline({ currentPhase }: Props) {
  const clampedPhase = Math.min(Math.max(currentPhase, 1), STEPS.length);

  return (
    <section>
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-7 h-px bg-rule" aria-hidden="true" />
        <span className="font-sans text-[9.5px] uppercase tracking-[0.3em] text-muted font-normal">
          Proceso · Tiempo real
        </span>
      </div>
      <h2 className="font-serif font-light text-[44px] leading-[1.05] tracking-[-0.015em] text-text mb-12">
        Dónde <em className="italic">estamos</em>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-10 gap-x-0">
        {STEPS.map((step, i) => {
          const idx = i + 1;
          const status: "done" | "active" | "todo" =
            idx < clampedPhase ? "done" : idx === clampedPhase ? "active" : "todo";
          const nextDone = idx < clampedPhase;
          const isLast = i === STEPS.length - 1;

          return (
            <div key={step.number} className="relative pt-11 pr-4">
              {/* Horizontal connector line */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute top-2 left-4 right-0 h-px",
                    nextDone ? "bg-text" : "bg-rule"
                  )}
                  aria-hidden="true"
                />
              )}

              {/* Square marker */}
              <div
                className={cn(
                  "absolute top-0 left-0 w-4 h-4 border flex items-center justify-center bg-ivory",
                  status === "done"
                    ? "border-text"
                    : status === "active"
                      ? "border-amber"
                      : "border-rule"
                )}
                aria-hidden="true"
              >
                {status === "done" && (
                  <svg
                    className="w-2.5 h-2.5 text-text"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M1.5 5L4 7.5L8.5 2.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {status === "active" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                )}
              </div>

              {/* Number */}
              <div className="num text-[11px] font-normal tracking-[0.12em] text-text mb-2.5">
                {step.number}
              </div>

              {/* Title */}
              <div className="font-sans text-[12px] text-text font-normal tracking-[0.04em] leading-[1.4] mb-2 min-h-[32px]">
                {step.title}
              </div>

              {/* Status label */}
              <div
                className={cn(
                  "text-[9px] uppercase tracking-[0.18em] font-normal mb-2.5",
                  status === "active" ? "text-amber" : "text-muted"
                )}
              >
                {status === "done"
                  ? "Completado"
                  : status === "active"
                    ? "En curso"
                    : "Programado"}
              </div>

              {/* Description */}
              <p className="font-sans text-[10.5px] text-muted font-light leading-[1.7] tracking-[0.02em] pr-2">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
