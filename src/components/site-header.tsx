"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 bg-forest-950/90 py-2.5 shadow-[0_18px_40px_-24px_rgba(6,31,20,0.9)] backdrop-blur-xl"
            : "bg-transparent py-4"
        )}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Link href="/" aria-label="RKDM Real Estate — Home" className="shrink-0">
            <Logo light />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-5 xl:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-[12.5px] font-bold tracking-[0.06em] uppercase transition-colors",
                    active ? "text-gold-300" : "text-sand-100/80 hover:text-white"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-0 h-px bg-gold-400 transition-all duration-300",
                      active ? "w-full" : "w-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={BRAND.tel}
              className="hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-[13px] font-bold text-white transition hover:border-gold-400/60 hover:text-gold-300 lg:flex"
              aria-label={`Call ${BRAND.phone}`}
            >
              <Phone className="h-3.5 w-3.5" />
              {BRAND.phoneDisplay}
            </a>
            <Link href="/book-site-visit" className="btn-gold hidden !px-5 !py-2.5 text-[13px] sm:inline-flex">
              <CalendarCheck className="h-4 w-4" />
              Book Site Visit
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-gold-400/60 hover:text-gold-300 xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grain fixed inset-0 z-[60] flex flex-col bg-forest-950/98 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-x flex items-center justify-between py-4">
              <Logo light />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold-400/60 hover:text-gold-300"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x mt-4 flex-1 overflow-y-auto">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "group flex items-baseline gap-4 border-b border-white/8 py-3.5",
                        pathname === link.href ? "text-gold-300" : "text-sand-100"
                      )}
                    >
                      <span className="text-[10px] font-extrabold tracking-[0.2em] text-gold-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-2xl font-medium tracking-wide transition group-hover:text-gold-300">
                        {link.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + NAV_LINKS.length * 0.04 }}
                >
                  <Link
                    href="/book-site-visit"
                    className="flex items-center gap-4 border-b border-white/8 py-3.5 text-gold-300"
                  >
                    <span className="text-[10px] font-extrabold tracking-[0.2em] text-gold-600">
                      {String(NAV_LINKS.length + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl font-medium tracking-wide">
                      Book Site Visit
                    </span>
                  </Link>
                </motion.li>
              </ul>
            </nav>
            <div className="container-x pb-8">
              <div className="flex flex-wrap items-center gap-3">
                <a href={BRAND.tel} className="btn-gold !px-5 !py-2.5 text-[13px]">
                  <Phone className="h-4 w-4" /> Call {BRAND.phoneDisplay}
                </a>
                <a href={BRAND.whatsapp} className="btn-whatsapp !px-5 !py-2.5 text-[13px]" target="_blank" rel="noreferrer">
                  WhatsApp Us
                </a>
              </div>
              <p className="mt-5 text-xs tracking-wide text-sand-100/50">
                {BRAND.email} · {BRAND.cityLabel}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
