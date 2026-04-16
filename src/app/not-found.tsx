import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[400px] w-[400px] rounded-full bg-gold/[0.02] blur-[100px]" />
        </div>
      </div>

      <div className="relative text-center">
        <p className="font-serif text-8xl font-light text-gold sm:text-9xl">404</p>
        <h1 className="mt-4 font-serif text-2xl font-light text-cream sm:text-3xl">
          Página no encontrada
        </h1>
        <p className="mt-3 text-cream/50">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#b8983f]"
          >
            Volver al inicio
          </Link>
          <Link
            href="/oportunidades"
            className="rounded-lg border border-gold/50 px-6 py-3 text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            Ver oportunidades
          </Link>
        </div>
      </div>
    </div>
  );
}
