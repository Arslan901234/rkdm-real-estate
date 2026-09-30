import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/page-hero";
import ContactForm from "@/components/forms/contact-form";
import { Reveal } from "@/components/reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/social-icons";
import { BRAND } from "@/lib/brand";
import { getSetting } from "@/lib/queries";
import { mapEmbedUrl, mapLinkUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${BRAND.name}, Ahmedabad — call ${BRAND.phone}, WhatsApp, email ${BRAND.email} or visit our office for property enquiries and site visits.`,
};

export default async function ContactPage() {
  const customerOffice = await getSetting("customerOffice", BRAND.customerOfficeDefault);
  const mapQuery = await getSetting(
    "officeMapQuery",
    `${BRAND.registeredOffice.join(" ")}`
  );

  const contactCards = [
    {
      icon: Phone,
      label: "Call Us",
      value: BRAND.phoneDisplay,
      href: BRAND.tel,
      note: "Fastest way to reach us",
    },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: BRAND.phoneDisplay,
      href: BRAND.whatsapp,
      note: "Chat with our team",
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: BRAND.email,
      href: `mailto:${BRAND.email}`,
      note: "Share requirements in detail",
    },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: BRAND.instagram,
      href: BRAND.instagramUrl,
      note: "Site videos & updates",
      external: true,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about"
        accent="your next plot"
        description="Call, WhatsApp, email or send the form below — tell us the location, budget and plot size you have in mind, and we'll share what genuinely matches."
      />

      <section className="bg-sand-50 py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((c, i) => (
                <Reveal key={c.label} delay={0.05 * i}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-forest-950/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_rgba(6,31,20,0.3)]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-800 text-gold-300 transition-colors group-hover:bg-gold-500 group-hover:text-forest-950">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.22em] text-ink-500/70">
                      {c.label}
                    </p>
                    <p className="mt-1.5 break-all text-[15px] font-bold text-forest-900">{c.value}</p>
                    <p className="mt-1 text-[12px] text-ink-500">{c.note}</p>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <div className="mt-6 rounded-2xl bg-forest-950 p-7 text-sand-100 sm:p-8">
                <h2 className="flex items-center gap-3 font-display text-xl font-medium">
                  <MapPin className="h-5 w-5 text-gold-400" />
                  Our Offices
                </h2>
                <div className="mt-5 space-y-5 text-sm leading-relaxed">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-400">
                      Customer-Facing Office
                    </p>
                    <p className="mt-1.5 text-sand-50">{customerOffice}</p>
                    <p className="mt-1 text-[12px] text-sand-100/55">
                      Please call before visiting — our team is often out on site visits.
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-400">
                      Registered Office
                    </p>
                    <p className="mt-1.5 text-sand-100/85">{BRAND.registeredOffice.join(", ")}</p>
                  </div>
                  <p className="flex items-start gap-2.5 border-t border-white/10 pt-5 text-[12.5px] text-sand-100/60">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                    Open all days. Site visits preferred between 9 AM and 6 PM, by appointment.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white py-14 sm:py-18">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">
                  <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-500" aria-hidden />
                  Find Us
                </p>
                <h2 className="mt-3 font-display text-2xl font-medium text-forest-950 sm:text-3xl">
                  On the map
                </h2>
              </div>
              <a
                href={mapLinkUrl(mapQuery)}
                target="_blank"
                rel="noreferrer"
                className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-gold-700 transition hover:text-gold-600"
              >
                Open in Google Maps
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-7 overflow-hidden rounded-2xl ring-1 ring-forest-950/10">
              <iframe
                src={mapEmbedUrl(mapQuery)}
                title="RKDM Real Estate office location map"
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
