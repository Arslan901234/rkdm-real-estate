"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, ChevronDown, Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest-950">
      {/* Cinematic backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Aerial view of residential plots and roads near Ahmedabad, Gujarat at golden hour"
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/45 to-forest-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 via-transparent to-transparent" />
      <div className="grain absolute inset-0" />

      <div className="container-x relative z-10 pt-40 pb-36 sm:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="eyebrow !text-gold-300"
        >
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-400" aria-hidden />
          {BRAND.name} · {BRAND.cityLabel}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.28, ease }}
          className="mt-6 max-w-4xl font-display text-[2.9rem] leading-[1.02] font-medium tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
        >
          Your Property.
          <br />
          <em className="text-gold-300 italic">Your Future.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.42, ease }}
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-sand-100/85 sm:text-lg"
        >
          Explore Residential Plots, Land &amp; Property Opportunities with RKDM
          Real Estate — across Ahmedabad, Kheda, Bareja, Sokhda and Matar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease }}
          className="mt-9 flex flex-wrap items-center gap-3.5"
        >
          <Link href="/properties" className="btn-gold">
            Explore Properties
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/book-site-visit" className="btn-outline-light">
            <CalendarCheck className="h-4 w-4" />
            Book Site Visit
          </Link>
          <a href={BRAND.tel} className="btn glass-card text-white hover:-translate-y-0.5 hover:bg-white/20">
            <Phone className="h-4 w-4 text-gold-300" />
            Call {BRAND.phone}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-sand-100/55"
        >
          <span>Residential Plots</span>
          <span className="h-1 w-1 rounded-full bg-gold-500/70" />
          <span>Land</span>
          <span className="h-1 w-1 rounded-full bg-gold-500/70" />
          <span>Farmhouse Plots</span>
          <span className="h-1 w-1 rounded-full bg-gold-500/70" />
          <span>Site Visit Assistance</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-28 left-1/2 z-10 hidden -translate-x-1/2 lg:flex"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2 text-sand-100/50">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
