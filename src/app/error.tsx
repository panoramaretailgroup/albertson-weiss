"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="relative text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">
          <svg
            className="h-8 w-8 text-red-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="font-serif text-2xl font-light text-cream">
          Algo salió mal
        </h1>
        <p className="mt-3 text-sm text-cream/50">
          Ha ocurrido un error inesperado. Puedes intentar recargar la página.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#b8983f]"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="rounded-lg border border-gold/50 px-6 py-3 text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
