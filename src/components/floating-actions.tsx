"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { WhatsAppIcon } from "./social-icons";

export default function FloatingActions() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Desktop floating cluster */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 md:flex"
      >
        <Link
          href="/book-site-visit"
          className="btn-gold !px-5 !py-3 text-[12px] shadow-[0_18px_40px_-14px_rgba(6,31,20,0.7)]"
        >
          <CalendarCheck className="h-4 w-4" />
          Book Site Visit
        </Link>
        <div className="flex items-center gap-3">
          <a
            href={BRAND.tel}
            aria-label={`Call ${BRAND.phone}`}
            className="flex h-13 w-13 items-center justify-center rounded-full bg-forest-800 text-sand-50 shadow-[0_18px_40px_-14px_rgba(6,31,20,0.8)] ring-1 ring-white/15 transition hover:-translate-y-1 hover:bg-forest-700"
          >
            <Phone className="h-5 w-5" />
          </a>
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1faa53] text-white shadow-[0_18px_44px_-12px_rgba(31,170,83,0.8)] ring-1 ring-white/20 transition hover:-translate-y-1 hover:bg-[#23bd5d]"
          >
            <WhatsAppIcon className="h-6 w-6" />
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-gold-400 ring-2 ring-white" />
          </a>
        </div>
      </motion.div>

      {/* Mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
        <div className="grid grid-cols-3 border-t border-white/10 bg-forest-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
          <a
            href={BRAND.tel}
            className="flex flex-col items-center gap-1 py-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-sand-100"
          >
            <Phone className="h-5 w-5 text-gold-400" />
            Call
          </a>
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1 border-x border-white/10 py-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-sand-100"
          >
            <WhatsAppIcon className="h-5 w-5 text-[#2bd06b]" />
            WhatsApp
          </a>
          <Link
            href="/book-site-visit"
            className="flex flex-col items-center gap-1 py-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-gold-300"
          >
            <CalendarCheck className="h-5 w-5" />
            Site Visit
          </Link>
        </div>
      </div>
      <div aria-hidden className="h-[57px] md:hidden" />
    </>
  );
}
