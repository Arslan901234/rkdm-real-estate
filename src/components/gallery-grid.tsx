"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

export interface GalleryItem {
  src: string;
  project: string;
  slug: string;
  location: string;
}

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const count = items.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
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

  const current = items[index];

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 [column-fill:balance]">
        {items.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            type="button"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="group relative mb-4 block w-full overflow-hidden rounded-2xl ring-1 ring-forest-950/10"
            aria-label={`View ${item.project} photo`}
          >
            <Image
              src={item.src}
              alt={`${item.project}, ${item.location}`}
              width={800}
              height={600}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
            <span className="absolute bottom-0 left-0 right-0 translate-y-3 p-4 text-left opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="block font-display text-lg font-medium text-white">{item.project}</span>
              <span className="mt-0.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">
                {item.location}
              </span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-forest-950/97 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
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
              key={current.src + index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative h-[70vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={`${current.project}, ${current.location}`}
                fill
                sizes="90vw"
                className="rounded-2xl object-contain"
              />
            </motion.div>
            <div className="mt-5 flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
              <div>
                <p className="text-center font-display text-lg font-medium text-white">{current.project}</p>
                <Link
                  href={`/projects/${current.slug}`}
                  className="mt-1 flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-300 hover:text-gold-200"
                >
                  View project <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
