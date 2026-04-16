"use client";

import { ROUTES } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState } from "react";

function LoginForm() {
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { role } = await signIn(email, password);

      // Redirect based on role or redirect param
      if (redirect) {
        router.push(redirect);
      } else if (role === "admin") {
        router.push(ROUTES.admin);
      } else {
        router.push(ROUTES.panel);
      }

      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al iniciar sesión";

      if (message.includes("Invalid login credentials")) {
        setError("Email o contraseña incorrectos.");
      } else if (message.includes("Email not confirmed")) {
        setError(
          "Tu cuenta no ha sido verificada. Revisa tu email para confirmar tu cuenta."
        );
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        variant="dark"
        placeholder="tu@email.com"
        required
        value={email}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
      />

      <div>
        <Input
          label="Contraseña"
          type="password"
          variant="dark"
          placeholder="Tu contraseña"
          required
          value={password}
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
        />
        <div className="mt-2 text-right">
          <button
            type="button"
            className="text-xs text-gold/60 hover:text-gold transition-colors"
            onClick={() => {
              // TODO: Implement password reset flow
              alert(
                "Funcionalidad de recuperación de contraseña en desarrollo."
              );
            }}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        loading={loading}
      >
        Iniciar sesión
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.02] blur-[100px]" />
        </div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 text-center">
          <Link href={ROUTES.home} className="inline-block">
            <span className="block font-serif text-2xl font-light tracking-[0.2em] text-cream">
              ALBERTSON & WEISS
            </span>
            <span className="block font-serif text-[10px] font-light tracking-[0.35em] text-gold">
              MOTORS
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gold/15 bg-white/[0.03] p-8 backdrop-blur-sm">
          <h1 className="text-center font-serif text-2xl font-light text-cream">
            Acceso inversores
          </h1>
          <p className="mt-2 text-center text-sm text-cream/40">
            Inicia sesión para acceder a tu panel
          </p>

          <div className="mt-8">
            <Suspense
              fallback={
                <div className="flex justify-center py-8">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </div>
        </div>

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-cream/40">
          ¿No tienes cuenta?{" "}
          <Link
            href={ROUTES.registro}
            className="text-gold hover:text-gold/80 transition-colors"
          >
            Regístrate como inversor
          </Link>
        </p>
      </div>
    </main>
  );
}
