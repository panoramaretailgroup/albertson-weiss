export interface VehicleDocument {
  id: string;
  name: string;
  description: string;
  size: string;
  url?: string;
}

interface Props {
  documents?: VehicleDocument[];
}

const DEFAULT_DOCS: VehicleDocument[] = [
  {
    id: "valoracion",
    name: "Informe de valoración independiente",
    description:
      "Tasación firmada por perito europeo acreditado con comparables de mercado.",
    size: "2,4 MB",
  },
  {
    id: "inspeccion",
    name: "Informe de inspección vehicular",
    description:
      "Pre-purchase inspection de 150 puntos con fotografías de detalle.",
    size: "1,8 MB",
  },
  {
    id: "carfax",
    name: "Historial Carfax y título",
    description:
      "Reporte Carfax completo y copia del título americano libre de gravámenes.",
    size: "480 KB",
  },
  {
    id: "memorandum",
    name: "Memorándum de inversión",
    description:
      "Estructura del deal, proyecciones, sensibilidades y escenarios de salida.",
    size: "3,1 MB",
  },
  {
    id: "import",
    name: "Documentos de importación y aduanas",
    description:
      "Bill of Lading, SAD, factura comercial y declaración aduanera EU.",
    size: "1,2 MB",
  },
  {
    id: "subscription",
    name: "Contrato de suscripción",
    description:
      "Borrador del contrato para inversores acreditados — sujeto a KYC/AML.",
    size: "640 KB",
  },
];

function DocIcon() {
  return (
    <svg
      className="w-5 h-6 text-muted"
      viewBox="0 0 14 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 1h7l3 3v11H2z M9 1v3h3"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M4 8h6M4 10.5h6M4 13h4"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function VehicleDocuments({ documents }: Props) {
  const docs = documents && documents.length > 0 ? documents : DEFAULT_DOCS;

  return (
    <section>
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-7 h-px bg-rule" aria-hidden="true" />
        <span className="font-sans text-[9.5px] uppercase tracking-[0.3em] text-muted font-normal">
          Due Diligence
        </span>
      </div>
      <h2 className="font-serif font-light text-[44px] leading-[1.05] tracking-[-0.015em] text-text mb-10">
        Documentos e <em className="italic">informes</em>
      </h2>

      <ul className="border border-rule">
        {docs.map((doc, i) => (
          <li
            key={doc.id}
            className={
              "flex items-center p-5 lg:px-7 gap-6 hover:bg-ivory-deep transition-colors cursor-pointer" +
              (i < docs.length - 1 ? " border-b border-[#dcd6cb]" : "")
            }
          >
            <div className="w-9 h-11 border border-rule flex items-center justify-center shrink-0">
              <DocIcon />
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-sans text-[13px] text-text font-normal tracking-[0.02em] mb-1 truncate">
                {doc.name}
              </div>
              <div className="font-sans text-[10.5px] text-muted font-light tracking-[0.02em]">
                {doc.description}
              </div>
            </div>

            <span className="num text-[10px] text-muted font-normal hidden sm:inline whitespace-nowrap">
              {doc.size}
            </span>

            <a
              href={doc.url ?? "#"}
              onClick={(e) => {
                if (!doc.url) e.preventDefault();
              }}
              className="inline-flex items-center gap-2 border border-rule text-muted font-sans text-[9.5px] uppercase tracking-[0.22em] font-normal px-4 py-2.5 hover:bg-text hover:text-ivory hover:border-text transition-all whitespace-nowrap"
              aria-label={`Descargar ${doc.name}`}
            >
              Descargar
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1v8M2.5 6L6 9.5 9.5 6M1 11h10"
                  stroke="currentColor"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>
        ))}
      </ul>

      <p className="font-sans text-[10px] text-muted font-light tracking-[0.04em] mt-5">
        Acceso completo a la sala de datos tras verificación como inversor
        acreditado.
      </p>
    </section>
  );
}
