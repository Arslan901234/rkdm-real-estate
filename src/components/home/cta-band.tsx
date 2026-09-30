import Link from "next/link";
import Image from "next/image";
import { CalendarCheck, Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon } from "@/components/social-icons";

export default function CtaBand({
  title = "Walk the land before you decide.",
  text = "Book a guided site visit — see the plots, roads and surroundings yourself, and get honest answers to every question.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-950 py-20 sm:py-26">
      <div className="absolute inset-0">
        <Image
          src="/images/plots-sunset.jpg"
          alt="Surveyed residential plots at sunset in Gujarat"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/80 to-forest-950/40" />
      </div>
      <div className="grain absolute inset-0" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow !text-gold-400">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-500" aria-hidden />
            {BRAND.tagline}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-sand-100/75 sm:text-base">
            {text}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link href="/book-site-visit" className="btn-gold">
              <CalendarCheck className="h-4 w-4" />
              Book Site Visit
            </Link>
            <a href={BRAND.tel} className="btn-outline-light">
              <Phone className="h-4 w-4" />
              Call {BRAND.phoneDisplay}
            </a>
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
