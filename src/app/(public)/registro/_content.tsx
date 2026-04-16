"use client";

import PageHero from "@/components/public/PageHero";
import FadeIn from "@/components/public/FadeIn";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Tabs from "@/components/ui/Tabs";
import { ROUTES } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import { Shield, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type FormTab = "registro" | "llamada";

export default function RegistroContent() {
  const { signUp } = useAuth();
  const [activeTab, setActiveTab] = useState<FormTab>("registro");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Registration form state
  const [regForm, setRegForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  // Call form state
  const [callForm, setCallForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signUp(regForm.email, regForm.password, regForm.fullName, regForm.phone || undefined);
      setSuccess(
        "Registro completado. Revisa tu email para verificar tu cuenta. Una vez verificada, podrás acceder a tu panel de inversor."
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al registrarse";
      if (message.includes("already registered")) {
        setError("Este email ya está registrado. ¿Quieres iniciar sesión?");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCallRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // TODO: Save to Supabase table or send via email API
      await new Promise((r) => setTimeout(r, 1000));
      setSuccess(
        "¡Solicitud recibida! Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas."
      );
    } catch {
      setError("Error al enviar la solicitud. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { label: "Regístrate como inversor", value: "registro" },
    { label: "Reserva una llamada", value: "llamada" },
  ];

  if (success) {
    return (
      <main>
        <PageHero title="¡Gracias!" />
        <section className="pb-32">
          <div className="mx-auto max-w-md px-6 text-center">
            <FadeIn>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-green/30 bg-green/10">
                <svg
                  className="h-8 w-8 text-green"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-lg text-cream/70">{success}</p>
              <Link
                href={ROUTES.home}
                className="mt-8 inline-flex rounded-lg border border-gold/50 px-6 py-3 text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/10"
              >
                Volver al inicio
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        title="Empieza a"
        highlight="invertir"
        subtitle="Crea tu cuenta de inversor o reserva una llamada con nuestro equipo."
      />

      <section className="pb-32">
        <div className="mx-auto max-w-lg px-6">
          <FadeIn>
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={(v) => setActiveTab(v as FormTab)}
              variant="dark"
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8">
              {error && (
                <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {activeTab === "registro" ? (
                <form onSubmit={handleRegister} className="space-y-5">
                  <Input
                    label="Nombre completo"
                    type="text"
                    variant="dark"
                    placeholder="Tu nombre y apellidos"
                    required
                    value={regForm.fullName}
                    onChange={(e) =>
                      setRegForm({ ...regForm, fullName: (e.target as HTMLInputElement).value })
                    }
                  />
                  <Input
                    label="Email"
                    type="email"
                    variant="dark"
                    placeholder="tu@email.com"
                    required
                    value={regForm.email}
                    onChange={(e) =>
                      setRegForm({ ...regForm, email: (e.target as HTMLInputElement).value })
                    }
                  />
                  <Input
                    label="Teléfono"
                    type="text"
                    variant="dark"
                    placeholder="+34 600 000 000"
                    value={regForm.phone}
                    onChange={(e) =>
                      setRegForm({ ...regForm, phone: (e.target as HTMLInputElement).value })
                    }
                  />
                  <Input
                    label="Contraseña"
                    type="password"
                    variant="dark"
                    placeholder="Mínimo 8 caracteres"
                    required
                    value={regForm.password}
                    onChange={(e) =>
                      setRegForm({ ...regForm, password: (e.target as HTMLInputElement).value })
                    }
                    helperText="Mínimo 8 caracteres con al menos una mayúscula y un número"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    loading={loading}
                  >
                    Crear cuenta de inversor
                  </Button>
                  <p className="text-center text-xs text-cream/30">
                    Al registrarte aceptas los{" "}
                    <a href="#" className="text-gold/50 hover:text-gold underline">
                      términos y condiciones
                    </a>{" "}
                    y la{" "}
                    <a href="#" className="text-gold/50 hover:text-gold underline">
                      política de privacidad
                    </a>
                    .
                  </p>
                </form>
              ) : (
                <form onSubmit={handleCallRequest} className="space-y-5">
                  <Input
                    label="Nombre"
                    type="text"
                    variant="dark"
                    placeholder="Tu nombre"
                    required
                    value={callForm.name}
                    onChange={(e) =>
                      setCallForm({ ...callForm, name: (e.target as HTMLInputElement).value })
                    }
                  />
                  <Input
                    label="Email"
                    type="email"
                    variant="dark"
                    placeholder="tu@email.com"
                    required
                    value={callForm.email}
                    onChange={(e) =>
                      setCallForm({ ...callForm, email: (e.target as HTMLInputElement).value })
                    }
                  />
                  <Input
                    label="Teléfono"
                    type="text"
                    variant="dark"
                    placeholder="+34 600 000 000"
                    required
                    value={callForm.phone}
                    onChange={(e) =>
                      setCallForm({ ...callForm, phone: (e.target as HTMLInputElement).value })
                    }
                  />
                  <Input
                    label="Mensaje (opcional)"
                    type="textarea"
                    variant="dark"
                    placeholder="¿Sobre qué te gustaría hablar? ¿Cuánto te gustaría invertir?"
                    value={callForm.message}
                    onChange={(e) =>
                      setCallForm({ ...callForm, message: (e.target as HTMLTextAreaElement).value })
                    }
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    loading={loading}
                  >
                    Solicitar llamada
                  </Button>
                  <p className="text-center text-xs text-cream/30">
                    Te contactaremos en las próximas 24 horas hábiles.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>

          {/* Trust signals */}
          <FadeIn delay={0.2}>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-gold/10 pt-10">
              {[
                { icon: Shield, text: "Contrato legal" },
                { icon: Eye, text: "Transparencia total" },
                { icon: TrendingUp, text: "25% rentabilidad" },
              ].map((signal) => (
                <div key={signal.text} className="text-center">
                  <signal.icon className="mx-auto h-5 w-5 text-gold/50" strokeWidth={1.5} />
                  <p className="mt-2 text-xs text-cream/40">{signal.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Login link */}
          <FadeIn delay={0.25}>
            <p className="mt-8 text-center text-sm text-cream/40">
              ¿Ya tienes cuenta?{" "}
              <Link href={ROUTES.login} className="text-gold hover:text-gold/80 transition-colors">
                Inicia sesión
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
