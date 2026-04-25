"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface VehicleGalleryCategories {
  showcase: string[];
  exterior: string[];
  interior: string[];
  logistics: string[];
}

interface Props {
  categories: VehicleGalleryCategories;
  carName: string;
}

type TabKey = keyof VehicleGalleryCategories;

const TABS: { key: TabKey; label: string }[] = [
  { key: "showcase", label: "Exhibición" },
  { key: "exterior", label: "Exterior" },
  { key: "interior", label: "Interior" },
  { key: "logistics", label: "Logística" },
];

export default function VehicleGallery({ categories, carName }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("showcase");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = categories[activeTab] ?? [];
  const display = photos.slice(0, 3);
  const extra = Math.max(photos.length - 3, 0);

  const open = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length
    );
  }, [photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, next, prev]);

  // Reset tab index when switching tabs
  useEffect(() => {
    setLightboxIndex(null);
  }, [activeTab]);

  const counts = useMemo(
    () =>
      TABS.reduce<Record<TabKey, number>>(
        (acc, t) => {
          acc[t.key] = categories[t.key]?.length ?? 0;
          return acc;
        },
        { showcase: 0, exterior: 0, interior: 0, logistics: 0 }
      ),
    [categories]
  );

  return (
    <section className="mb-12">
      {/* Tabs */}
      <div className="flex gap-0 border-b border-rule">
        {TABS.map((t) => {
          const active = t.key === activeTab;
          const n = counts[t.key];
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key)}
              className={cn(
                "font-sans text-[10px] uppercase tracking-[0.22em] font-normal py-3 px-6 border-b-2 -mb-px transition-colors cursor-pointer",
                active
                  ? "text-text border-text"
                  : "text-muted border-transparent hover:text-text"
              )}
            >
              {t.label}
              {n > 0 && (
                <span className="num ml-2 text-[9px] tracking-[0.05em] text-muted">
                  {n}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {display.length === 0 ? (
        <Placeholder />
      ) : (
        <div className="grid grid-cols-3 grid-rows-2 gap-[2px] mt-[2px]">
          {/* First photo — big, 2x2 */}
          <button
            type="button"
            onClick={() => open(0)}
            className="relative col-span-2 row-span-2 aspect-[16/10] overflow-hidden group"
            aria-label={`Ampliar foto 1 de ${carName}`}
          >
            <Image
              src={display[0]}
              alt={`${carName} — 1`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
          </button>

          {/* Second + Third — stacked, 1x1 each */}
          {[1, 2].map((i) => {
            const src = display[i];
            if (!src) {
              return (
                <div
                  key={i}
                  className="aspect-[16/10] bg-ivory-deep border border-rule"
                  aria-hidden="true"
                />
              );
            }
            const showOverlay = i === 2 && extra > 0;
            return (
              <button
                key={i}
                type="button"
                onClick={() => open(i)}
                className="relative aspect-[16/10] overflow-hidden group"
                aria-label={`Ampliar foto ${i + 1} de ${carName}`}
              >
                <Image
                  src={src}
                  alt={`${carName} — ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                {showOverlay && (
                  <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                    <span className="num text-[22px] text-white font-light tracking-[0.04em]">
                      +{extra} fotos
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galería ampliada"
          className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-6"
          onClick={close}
        >
          {/* Top bar */}
          <div className="absolute top-5 right-5 flex items-center gap-3">
            <span className="num text-white text-[11px] tracking-[0.12em]">
              {lightboxIndex + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="w-10 h-10 border border-white/25 text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
              aria-label="Cerrar"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </button>
          </div>

          {/* Image */}
          <div
            className="relative w-full max-w-[1200px] aspect-[16/10]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex]}
              alt={`${carName} — ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>

          {/* Prev / Next */}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/25 text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
                aria-label="Anterior"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M9 1L3 7l6 6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/25 text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
                aria-label="Siguiente"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M5 1l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}

function Placeholder() {
  return (
    <div className="aspect-[16/7] border border-rule bg-ivory-deep flex items-center justify-center mt-[2px]">
      <svg
        className="h-16 w-16 text-rule"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}
