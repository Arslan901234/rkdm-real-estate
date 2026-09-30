"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProjectGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const count = images.length;

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count]
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, prev, next]);

  if (count === 0) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-forest-950/10"
        aria-label={`Open ${name} photo gallery`}
      >
        <Image
          src={images[index]}
          alt={`${name} — photo ${index + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
        />
        <span className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-forest-950/70 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          <Expand className="h-3.5 w-3.5" />
          {index + 1} / {count}
        </span>
      </button>

      {count > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.slice(0, 5).map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-xl ring-2 transition",
                i === index ? "ring-gold-500" : "ring-transparent hover:ring-gold-300"
              )}
              aria-label={`View photo ${i + 1}`}
            >
              <Image src={img} alt={`${name} thumbnail ${i + 1}`} fill sizes="140px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-forest-950/97 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`${name} photo viewer`}
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-gold-400 hover:text-gold-300"
              aria-label="Close viewer"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative h-[74vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[index]}
                alt={`${name} — photo ${index + 1}`}
                fill
                sizes="90vw"
                className="rounded-2xl object-contain"
              />
            </motion.div>
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-gold-500 hover:text-forest-950"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-gold-500 hover:text-forest-950"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
