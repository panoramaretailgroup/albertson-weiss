import Logo from "@/components/ui/Logo";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

const columns: Array<{ title: string; links: Array<[string, string]> }> = [
  {
    title: "Plataforma",
    links: [
      ["Ver inversiones", ROUTES.oportunidades],
      ["Panel del inversor", ROUTES.panel],
      ["Cómo funciona", ROUTES.comoFunciona],
      ["FAQ", ROUTES.faq],
    ],
  },
  {
    title: "Compañía",
    links: [
      ["Sobre nosotros", ROUTES.sobreNosotros],
      ["Nuestro proceso", ROUTES.comoFunciona],
      ["Contacto", ROUTES.registro],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Términos del servicio", "#"],
      ["Política de privacidad", "#"],
      ["Divulgación de riesgos", "#"],
      ["Política de cookies", "#"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06] px-6 pt-[72px] pb-10 sm:px-10 lg:px-[88px]">
      <div className="mx-auto max-w-shell">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          {/* Brand block — alineado a la izquierda */}
          <div className="max-w-[320px] flex flex-col items-center">
            <Logo variant="dark" />
            <p className="mt-6 font-sans font-light text-[12px] leading-[1.8] tracking-[0.02em] text-muted text-center">
              Plataforma privada de inversión en vehículos de lujo entre los
              mercados estadounidense y europeo.
            </p>
          </div>

          {/* Columns */}
          <div className="flex flex-wrap gap-12 lg:gap-20">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="font-sans font-normal text-[9px] uppercase tracking-[0.25em] text-muted mb-5">
                  {col.title}
                </div>
                {col.links.map(([label, href]) => (
                  <div key={label} className="mb-3">
                    <Link
                      href={href}
                      className="font-sans font-light text-[12px] tracking-[0.04em] text-white/35 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-7 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="font-sans font-light text-[10px] tracking-[0.14em] text-white/20">
            © 2026 Albertson &amp; Weiss Motors. Todos los derechos reservados.
          </span>
          <span className="font-sans font-light text-[10px] tracking-[0.14em] text-white/20">
            Madrid · Barcelona
          </span>
        </div>
      </div>
    </footer>
  );
}
