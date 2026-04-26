"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import FadeIn from "@/components/public/FadeIn";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ── Inline SVG icons ───────────────────────────────────────────────────

const ICON_PROPS = {
  className: "w-10 h-10 text-amber",
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: "1",
  "aria-hidden": true,
};

const EyeIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M2 20 C7.5 11 13.5 6.5 20 6.5 C26.5 6.5 32.5 11 38 20 C32.5 29 26.5 33.5 20 33.5 C13.5 33.5 7.5 29 2 20 Z" />
    <circle cx="20" cy="20" r="5" />
    <circle cx="20" cy="20" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M20 4 L33 8 V20 C33 28 27 34 20 36 C13 34 7 28 7 20 V8 Z" />
    <path d="M13.5 20 L18 24.5 L26.5 16" />
  </svg>
);

const TrendBarsIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M5 35 V5" />
    <path d="M5 35 H37" />
    <rect x="10" y="26" width="4" height="9" />
    <rect x="18" y="20" width="4" height="15" />
    <rect x="26" y="13" width="4" height="22" />
    <path d="M12 23 L20 17 L28 11 L34 6" strokeWidth="0.9" />
    <path d="M30 6 L34 6 L34 10" strokeWidth="0.9" />
  </svg>
);

const MedalIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M13 4 V16 L20 13 L27 16 V4" />
    <circle cx="20" cy="25" r="10" />
    <circle cx="20" cy="25" r="5" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: <EyeIcon />,
    title: "Transparencia",
    description:
      "Cada operación es visible en tiempo real. Desde la compra en subasta hasta la venta final, nuestros inversores tienen acceso completo a toda la información, fotos y documentación.",
  },
  {
    icon: <ShieldCheckIcon />,
    title: "Seguridad jurídica",
    description:
      "Todas las operaciones se formalizan mediante contratos de préstamo privado regulados por la legislación española. Cada inversión está respaldada por el valor del activo.",
  },
  {
    icon: <TrendBarsIcon />,
    title: "Rentabilidad",
    description:
      "Nuestro modelo de negocio aprovecha la diferencia de precio entre el mercado americano y europeo de vehículos premium, generando rentabilidades atractivas para nuestros inversores.",
  },
  {
    icon: <MedalIcon />,
    title: "Profesionalidad",
    description:
      "Años de experiencia en el sector de importación de vehículos, con una red consolidada de proveedores, transportistas y canales de venta en Europa.",
  },
];

const team = [
  {
    name: "Nombre del Fundador",
    role: "CEO & Co-Fundador",
    bio: "Más de 10 años de experiencia en el sector de importación de vehículos premium. Especialista en el mercado americano de subastas.",
  },
  {
    name: "Nombre del Socio",
    role: "COO & Co-Fundador",
    bio: "Experto en logística internacional y homologación de vehículos. Responsable de todas las operaciones de importación y venta.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// ── Page ───────────────────────────────────────────────────────────────

export default function SobreNosotrosContent() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-ivory pt-40 pb-24 px-6 sm:px-10 lg:px-[88px]">
        <div className="mx-auto max-w-shell text-center">
          <FadeIn>
            <div className="flex justify-center mb-5">
              <SectionLabel>Sobre nosotros</SectionLabel>
            </div>
            <h1 className="font-serif font-light text-[48px] sm:text-[64px] lg:text-[76px] leading-[1.05] tracking-[-0.01em] text-text">
              Albertson &amp; Weiss
              <br />
              <em className="italic text-amber">Motors</em>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl font-sans font-light text-[15px] leading-[1.85] text-muted">
              Democratizamos el acceso a inversiones en vehículos premium desde
              Estados Unidos.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-ivory pb-24 px-6 sm:px-10 lg:px-[88px]">
        <div className="mx-auto max-w-shell">
          <div className="max-w-3xl">
            <FadeIn>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-7 h-px bg-rule" aria-hidden="true" />
                <span className="font-sans text-[9.5px] uppercase tracking-[0.3em] text-muted font-normal">
                  Nuestra misión
                </span>
              </div>

              <p className="font-sans font-light text-[16px] leading-[1.9] text-text/70">
                Albertson &amp; Weiss Motors nace con una misión clara:{" "}
                <span className="text-text font-normal">
                  hacer accesible la inversión en vehículos premium americanos
                </span>{" "}
                a cualquier persona. Aprovechamos la diferencia de precio entre
                el mercado de subastas de EE.UU. y el mercado europeo para
                generar operaciones rentables y seguras.
              </p>
              <p className="mt-6 font-sans font-light text-[16px] leading-[1.9] text-text/70">
                Cada operación es{" "}
                <span className="text-text font-normal">
                  transparente, legal y trazable
                </span>
                . Nuestros inversores no solo obtienen rentabilidad: tienen
                visibilidad completa sobre dónde está su dinero y qué está
                ocurriendo con él en cada momento.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-black py-24 px-6 sm:px-10 lg:px-[88px]">
        <div className="mx-auto max-w-shell">
          <FadeIn>
            <div className="text-center mb-24">
              <div className="flex justify-center mb-5">
                <SectionLabel variant="dark">Principios</SectionLabel>
              </div>
              <h2 className="font-serif font-light text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.01em] text-white">
                Nuestros <em className="italic text-amber">valores</em>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-12 lg:gap-0">
            {values.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div
                  className={cn(
                    "relative px-0 sm:px-10 lg:px-10 py-2",
                    index !== values.length - 1 &&
                      "pb-10 mb-10 border-b border-white/10 sm:pb-2 sm:mb-0 sm:border-b-0"
                  )}
                >
                  {index > 0 && (
                    <div
                      className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-white/10"
                      aria-hidden="true"
                    />
                  )}

                  <div className="mb-8">{item.icon}</div>

                  <div className="num text-[11px] text-white/20 font-light tracking-[0.15em] mb-4">
                    0{index + 1}
                  </div>

                  <h3 className="font-serif font-light text-[20px] leading-tight text-white mb-4">
                    {item.title}
                  </h3>

                  <p className="font-sans font-light text-[12.5px] leading-[1.9] text-white/50">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-ivory py-24 px-6 sm:px-10 lg:px-[88px]">
        <div className="mx-auto max-w-shell">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="flex justify-center mb-5">
                <SectionLabel>El equipo</SectionLabel>
              </div>
              <h2 className="font-serif font-light text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.01em] text-text">
                Detrás de la <em className="italic">marca</em>
              </h2>
            </div>
          </FadeIn>

          <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <div className="border border-rule bg-[#f8f5ef] p-10 text-center h-full">
                  <div className="mx-auto w-20 h-20 bg-ivory-deep border border-rule flex items-center justify-center">
                    <span className="font-serif font-light text-[24px] text-muted">
                      {initials(member.name)}
                    </span>
                  </div>
                  <h3 className="font-serif font-light text-[22px] text-text mt-6">
                    {member.name}
                  </h3>
                  <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-amber font-normal mt-2">
                    {member.role}
                  </p>
                  <p className="font-sans font-light text-[13px] leading-[1.85] text-muted mt-4">
                    {member.bio}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24 px-6 sm:px-10 lg:px-[88px]">
        <div className="mx-auto max-w-xl text-center">
          <FadeIn>
            <h2 className="font-serif font-light text-[40px] sm:text-[48px] leading-[1.05] tracking-[-0.01em] text-white">
              Contacta con <em className="italic text-amber">nosotros</em>
            </h2>
            <p className="mt-6 font-sans font-light text-[14px] leading-[1.85] text-white/50">
              ¿Quieres saber más? Estamos encantados de resolver cualquier
              duda.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={ROUTES.registro}
                className="bg-amber text-black font-sans text-[10px] uppercase tracking-[0.26em] font-normal px-9 py-4 hover:opacity-85 transition-opacity"
              >
                Reservar una llamada
              </Link>
              <a
                href="mailto:info@albertsonweiss.com"
                className="border border-white/30 text-white/70 font-sans text-[10px] uppercase tracking-[0.26em] font-normal px-9 py-4 hover:border-white hover:text-white transition-colors"
              >
                info@albertsonweiss.com
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
