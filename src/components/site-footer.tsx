import Link from "next/link";
import { connection } from "next/server";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { BRAND, DISCLAIMER, NAV_LINKS } from "@/lib/brand";
import { getSetting } from "@/lib/queries";
import { Logo } from "./logo";
import { InstagramIcon } from "./social-icons";

export function FooterContent({ office }: { office: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="grain relative overflow-hidden bg-forest-950 text-sand-100">
      <div className="gold-hairline absolute inset-x-0 top-0" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr] lg:py-20">
        <div>
          <Logo light />
          <p className="mt-6 font-display text-xl italic text-gold-300">
            &ldquo;{BRAND.tagline}&rdquo;
          </p>
          <p className="mt-3 text-sm leading-relaxed text-sand-100/70">
            {BRAND.focusLine}
          </p>
          <p className="mt-5 text-[11px] leading-relaxed tracking-wide text-sand-100/45">
            {BRAND.legalName}
            <br />
            CIN: {BRAND.cin}
          </p>
        </div>

        <nav aria-label="Footer" className="lg:pl-6">
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold-400">
            Explore
          </h3>
          <ul className="mt-5 grid grid-cols-1 gap-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sand-100/70 transition hover:text-gold-300"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book-site-visit" className="text-gold-300 transition hover:text-gold-200">
                Book Site Visit
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold-400">
            Contact
          </h3>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a href={BRAND.tel} className="flex items-start gap-3 text-sand-100/80 transition hover:text-gold-300">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                Call: {BRAND.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="flex items-start gap-3 text-sand-100/80 transition hover:text-gold-300">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                {BRAND.email}
              </a>
            </li>
            <li>
              <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sand-100/80 transition hover:text-gold-300">
                <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                Instagram: {BRAND.instagram}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sand-100/60">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              Site visits by appointment — call or WhatsApp to schedule.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold-400">
            Offices
          </h3>
          <div className="mt-5 space-y-5 text-sm">
            <p className="flex items-start gap-3 text-sand-100/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <span>
                <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-sand-100/45">
                  Visit Us
                </span>
                {office}
              </span>
            </p>
            <p className="flex items-start gap-3 text-sand-100/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <span>
                <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-sand-100/45">
                  Registered Office
                </span>
                {BRAND.registeredOffice.join(" ")}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="container-x border-t border-white/8 pt-6 pb-2">
        <p className="text-[11px] leading-relaxed text-sand-100/40">
          <span className="font-bold text-sand-100/55">Property Disclaimer — </span>
          {DISCLAIMER}
        </p>
      </div>

      <div className="container-x flex flex-col items-start justify-between gap-4 py-6 text-[12px] text-sand-100/50 sm:flex-row sm:items-center">
        <p>
          © {year} {BRAND.legalName}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/privacy-policy" className="transition hover:text-gold-300">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-gold-300">
            Terms of Use
          </Link>
          <Link href="/disclaimer" className="transition hover:text-gold-300">
            Property Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default async function SiteFooter() {
  await connection();
  const office = await getSetting("customerOffice", BRAND.customerOfficeDefault);
  return <FooterContent office={office} />;
}
