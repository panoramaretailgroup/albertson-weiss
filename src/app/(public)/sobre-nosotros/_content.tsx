"use client";

import PageHero from "@/components/public/PageHero";
import FadeIn from "@/components/public/FadeIn";
import { ROUTES } from "@/lib/constants";
import { Shield, Eye, TrendingUp, Award } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Eye,
    title: "Transparencia",
    description:
      "Cada operación es visible en tiempo real. Desde la compra en subasta hasta la venta final, nuestros inversores tienen acceso completo a toda la información, fotos y documentación.",
  },
  {
    icon: Shield,
    title: "Seguridad jurídica",
    description:
      "Todas las operaciones se formalizan mediante contratos de préstamo privado regulados por la legislación española. Cada inversión está respaldada por el valor del activo.",
  },
  {
    icon: TrendingUp,
    title: "Rentabilidad",
    description:
      "Nuestro modelo de negocio aprovecha la diferencia de precio entre el mercado americano y europeo de vehículos premium, generando rentabilidades atractivas para nuestros inversores.",
  },
  {
    icon: Award,
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

export default function SobreNosotrosContent() {
  return (
    <main>
      <PageHero
        title="Albertson & Weiss"
        highlight="Motors"
        subtitle="Democratizamos el acceso a inversiones en vehículos premium desde Estados Unidos."
      />

      {/* Mission */}
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <div className="rounded-2xl border border-gold/10 bg-white/[0.03] p-8 sm:p-12">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gold">
                Nuestra misión
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-cream/70">
                Albertson & Weiss Motors nace con una misión clara:{" "}
                <span className="text-cream">
                  hacer accesible la inversión en vehículos premium americanos
                </span>{" "}
                a cualquier persona. Aprovechamos la diferencia de precio entre
                el mercado de subastas de EE.UU. y el mercado europeo para
                generar operaciones rentables y seguras.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-cream/70">
                Cada operación es{" "}
                <span className="text-cream">transparente, legal y trazable</span>.
                Nuestros inversores no solo obtienen rentabilidad: tienen
                visibilidad completa sobre dónde está su dinero y qué está
                ocurriendo con él en cada momento.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-gold/10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="font-serif text-3xl font-light text-cream sm:text-4xl">
              Nuestros <span className="text-gold">valores</span>
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {values.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="group rounded-2xl border border-gold/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-gold/25 hover:bg-white/[0.06]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/5 transition-colors group-hover:border-gold/40 group-hover:bg-gold/10">
                    <item.icon
                      className="h-5 w-5 text-gold"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/50">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-gold/10 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn className="text-center">
            <h2 className="font-serif text-3xl font-light text-cream sm:text-4xl">
              El <span className="text-gold">equipo</span>
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {team.map((member, index) => (
              <FadeIn key={member.name} delay={index * 0.1}>
                <div className="rounded-2xl border border-gold/10 bg-white/[0.03] p-8 text-center">
                  {/* Avatar placeholder */}
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/20 bg-gold/5">
                    <span className="text-2xl font-serif text-gold/50">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-cream">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gold">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-cream/50">
                    {member.bio}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gold/10 py-24">
        <div className="mx-auto max-w-xl px-6 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl font-light text-cream sm:text-4xl">
              Contacta con <span className="text-gold">nosotros</span>
            </h2>
            <p className="mt-4 text-cream/50">
              ¿Quieres saber más? Estamos encantados de resolver cualquier duda.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={ROUTES.registro}
                className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#b8983f]"
              >
                Reservar una llamada
              </Link>
              <a
                href="mailto:info@albertsonweiss.com"
                className="rounded-lg border border-gold/50 px-6 py-3 text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/10"
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
