"use client";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { LogisticsPhase } from "@/lib/types";
import { useState } from "react";
import PhotoGallery from "./PhotoGallery";
import Modal from "./Modal";

interface LogisticsTrackerProps {
  phases: LogisticsPhase[];
  currentPhase: number;
  className?: string;
}

const phaseIcons = [
  // 1: Comprado en subasta
  <svg key="1" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>,
  // 2: En transito a almacen
  <svg key="2" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  // 3: En almacen
  <svg key="3" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 8.35V20a2 2 0 01-2 2H4a2 2 0 01-2-2V8.35A2 2 0 013.26 6.5l8-3.2a2 2 0 011.48 0l8 3.2A2 2 0 0122 8.35z" /><path d="M6 18h12M6 14h12" /></svg>,
  // 4: Contenedor
  <svg key="4" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>,
  // 5: Transito maritimo
  <svg key="5" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 20l.8-2.4A7.13 7.13 0 012 14.5C2 10.36 5.58 7 10 7h4c4.42 0 8 3.36 8 7.5a7.13 7.13 0 01-.8 3.1L22 20" /><path d="M2 20h20" /><path d="M12 2v5" /><path d="M8 4h8" /></svg>,
  // 6: Puerto Europa
  <svg key="6" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
  // 7: Listo
  <svg key="7" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
];

export default function LogisticsTracker({
  phases,
  currentPhase,
  className,
}: LogisticsTrackerProps) {
  const [galleryPhase, setGalleryPhase] = useState<LogisticsPhase | null>(null);

  return (
    <>
      <div className={cn("w-full", className ?? "")}>
        {/* Desktop: horizontal */}
        <div className="hidden md:flex md:items-start md:gap-0">
          {phases.map((phase, index) => {
            const isCompleted = phase.completed;
            const isCurrent = phase.phase === currentPhase;
            const isPending = !isCompleted && !isCurrent;
            const hasPhotos = phase.photos.length > 0;

            return (
              <div key={phase.phase} className="flex flex-1 items-start">
                <div className="flex flex-col items-center text-center">
                  {/* Node */}
                  <button
                    onClick={hasPhotos ? () => setGalleryPhase(phase) : undefined}
                    disabled={!hasPhotos}
                    className={cn(
                      "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                      isCompleted && "border-gold bg-gold text-black",
                      isCurrent &&
                        "border-gold bg-transparent text-gold animate-pulse",
                      isPending && "border-gray-600 bg-transparent text-gray-600",
                      hasPhotos && "cursor-pointer hover:scale-110"
                    )}
                    aria-label={`${phase.name}${hasPhotos ? " - Ver fotos" : ""}`}
                  >
                    {phaseIcons[index]}
                    {hasPhotos && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-black">
                        <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
                        </svg>
                      </span>
                    )}
                  </button>

                  {/* Label */}
                  <span
                    className={cn(
                      "mt-2 text-xs leading-tight max-w-[90px]",
                      isCompleted && "text-cream font-medium",
                      isCurrent && "text-gold font-medium",
                      isPending && "text-gray-600"
                    )}
                  >
                    {phase.name}
                  </span>

                  {/* Date */}
                  {phase.date && (
                    <span className="mt-0.5 text-[10px] text-cream/50">
                      {formatDate(phase.date)}
                    </span>
                  )}
                </div>

                {/* Connector line */}
                {index < phases.length - 1 && (
                  <div className="mt-5 flex-1 px-1">
                    <div
                      className={cn(
                        "h-0.5 w-full",
                        isCompleted ? "bg-gold" : "bg-gray-700"
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical */}
        <div className="flex flex-col md:hidden">
          {phases.map((phase, index) => {
            const isCompleted = phase.completed;
            const isCurrent = phase.phase === currentPhase;
            const isPending = !isCompleted && !isCurrent;
            const hasPhotos = phase.photos.length > 0;

            return (
              <div key={phase.phase} className="flex gap-3">
                {/* Node + connector */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={hasPhotos ? () => setGalleryPhase(phase) : undefined}
                    disabled={!hasPhotos}
                    className={cn(
                      "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                      isCompleted && "border-gold bg-gold text-black",
                      isCurrent &&
                        "border-gold bg-transparent text-gold animate-pulse",
                      isPending && "border-gray-600 bg-transparent text-gray-600",
                      hasPhotos && "cursor-pointer hover:scale-110"
                    )}
                    aria-label={`${phase.name}${hasPhotos ? " - Ver fotos" : ""}`}
                  >
                    {phaseIcons[index]}
                    {hasPhotos && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-black">
                        <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
                        </svg>
                      </span>
                    )}
                  </button>
                  {index < phases.length - 1 && (
                    <div
                      className={cn(
                        "w-0.5 flex-1 min-h-[24px]",
                        isCompleted ? "bg-gold" : "bg-gray-700"
                      )}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6">
                  <span
                    className={cn(
                      "text-sm leading-tight",
                      isCompleted && "text-cream font-medium",
                      isCurrent && "text-gold font-medium",
                      isPending && "text-gray-600"
                    )}
                  >
                    {phase.name}
                  </span>
                  {phase.date && (
                    <span className="block text-xs text-cream/50 mt-0.5">
                      {formatDate(phase.date)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Photo gallery modal */}
      <Modal
        isOpen={!!galleryPhase}
        onClose={() => setGalleryPhase(null)}
        title={galleryPhase?.name ?? "Fotos"}
        className="max-w-3xl"
      >
        {galleryPhase && <PhotoGallery photos={galleryPhase.photos} columns={3} />}
      </Modal>
    </>
  );
}
