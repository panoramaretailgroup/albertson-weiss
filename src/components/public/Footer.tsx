import { ROUTES } from "@/lib/constants";
import Link from "next/link";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const platformLinks = [
  { label: "Cómo funciona", href: ROUTES.comoFunciona },
  { label: "Oportunidades", href: ROUTES.oportunidades },
  { label: "Track Record", href: ROUTES.trackRecord },
  { label: "Sobre nosotros", href: ROUTES.sobreNosotros },
  { label: "FAQ", href: ROUTES.faq },
];

const legalLinks = [
  { label: "Aviso legal", href: "#" },
  { label: "Política de privacidad", href: "#" },
  { label: "Cookies", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl font-light tracking-[0.2em] text-cream">
                ALBERTSON & WEISS
              </span>
              <span className="font-serif text-[10px] font-light tracking-[0.35em] text-gold">
                MOTORS
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cream/50">
              Inversiones en vehículos premium desde USA. Rentabilidades
              estimadas del 20-30% por operación.
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold">
              Plataforma
            </h4>
            <ul className="mt-4 space-y-3">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/50 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold">
              Legal
            </h4>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/50 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold">
              Contacto
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:info@albertsonweiss.com"
                  className="text-sm text-cream/50 transition-colors hover:text-cream"
                >
                  info@albertsonweiss.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+34600000000"
                  className="text-sm text-cream/50 transition-colors hover:text-cream"
                >
                  +34 600 000 000
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="rounded-lg border border-gold/20 p-2 text-cream/50 transition-colors hover:border-gold/50 hover:text-cream"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-lg border border-gold/20 p-2 text-cream/50 transition-colors hover:border-gold/50 hover:text-cream"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 border-t border-gold/10 pt-8">
          <p className="text-xs leading-relaxed text-cream/30">
            Las inversiones conllevan riesgo. Rentabilidades pasadas no
            garantizan resultados futuros. Los contratos de préstamo privado se
            rigen por la legislación española. Albertson & Weiss Motors no es una
            entidad financiera regulada. Cada operación se formaliza mediante un
            contrato de préstamo privado bilateral entre las partes.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-cream/30">
            &copy; {new Date().getFullYear()} Albertson & Weiss Motors. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
