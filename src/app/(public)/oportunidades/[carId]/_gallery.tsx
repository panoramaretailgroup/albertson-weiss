"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export interface GalleryPhotos {
  exterior: string[];
  interior: string[];
  details: string[];
}

type TabKey = keyof GalleryPhotos;

const tabLabels: Record<TabKey, string> = {
  exterior: "Exterior",
  interior: "Interior",
  details: "Detalles",
};

interface GalleryProps {
  photos: GalleryPhotos;
}

export default function Gallery({ photos }: GalleryProps) {
  // Pick the first tab that has photos
  const initialTab: TabKey =
    (Object.keys(photos) as TabKey[]).find((k) => photos[k].length > 0) ??
    "exterior";

  const [tab, setTab] = useState<TabKey>(initialTab);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const current = photos[tab];

  // Reset index when tab changes
  useEffect(() => {
    setActiveIndex(0);
  }, [tab]);

  const handlePrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + current.length) % current.length);
  }, [current.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % current.length);
  }, [current.length]);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  // Keyboard handling inside lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, handlePrev, handleNext, closeLightbox]);

  return (
    <div>
      {/* Tabs */}
      <div className="flex border border-rule mb-2">
        {(Object.keys(tabLabels) as TabKey[]).map((key, i) => {
          const disabled = photos[key].length === 0;
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => !disabled && setTab(key)}
              disabled={disabled}
              className={cn(
                "flex-1 font-sans font-normal text-[10px] uppercase tracking-[0.22em] py-3 transition-colors",
                i > 0 && "border-l border-rule",
                active
                  ? "bg-text text-ivory"
                  : "text-muted hover:text-text",
                disabled && "opacity-40 cursor-not-allowed hover:text-muted"
              )}
            >
              {tabLabels[key]}{" "}
              <span className="num text-[9px] opacity-60">
                ({photos[key].length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Main image */}
      <button
        onClick={() => current.length > 0 && setLightboxOpen(true)}
        disabled={current.length === 0}
        className="group relative block w-full overflow-hidden cursor-zoom-in disabled:cursor-default"
        aria-label="Ampliar foto"
      >
        <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[500px] bg-ivory-deep">
          <AnimatePresence mode="wait">
            {current[activeIndex] && (
              <motion.div
                key={`${tab}-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <Image
                  src={current[activeIndex]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>

      {/* Thumbnails */}
      {current.length > 1 && (
        <div className="mt-2 grid grid-cols-4 sm:grid-cols-5 gap-2">
          {current.map((photo, i) => (
            <button
              key={`${tab}-thumb-${i}`}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "group relative h-20 overflow-hidden border transition-all",
                activeIndex === i
                  ? "border-text opacity-100"
                  : "border-rule opacity-60 hover:opacity-100 hover:border-text"
              )}
              aria-label={`Foto ${i + 1}`}
            >
              <Image
                src={photo}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && current[activeIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Galería de fotos ampliada"
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute right-6 top-6 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Counter */}
            <div className="absolute left-6 top-6 font-sans font-normal text-[10px] uppercase tracking-[0.22em] text-white/60">
              <span className="num">{activeIndex + 1}</span>
              {" / "}
              <span className="num">{current.length}</span>
            </div>

            {/* Prev */}
            {current.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            {/* Image */}
            <div className="relative h-[90vh] w-[90vw]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${tab}-lb-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current[activeIndex]}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next */}
            {current.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
