import type { ReactNode } from "react";
import PageHero from "./page-hero";
import { Reveal } from "./reveal";

export function LSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-6 ring-1 ring-forest-950/6 sm:p-8">
      <h2 className="flex items-center gap-3 font-display text-xl font-medium text-forest-950">
        <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-500" aria-hidden />
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-700">{children}</div>
    </section>
  );
}

export default function LegalPage({
  eyebrow,
  title,
  accent,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} accent={accent} description={intro} compact />
      <div className="bg-sand-50 py-12 sm:py-16">
        <div className="container-x max-w-3xl space-y-5">
          <Reveal>{children}</Reveal>
        </div>
      </div>
    </>
  );
}
