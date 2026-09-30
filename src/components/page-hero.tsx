import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        "grain relative overflow-hidden bg-forest-950 text-sand-50",
        compact ? "pt-32 pb-14 sm:pt-36" : "pt-36 pb-18 sm:pt-44 sm:pb-22"
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 480px at 12% -10%, rgba(199,163,92,0.16), transparent 60%), radial-gradient(900px 500px at 95% 110%, rgba(41,103,76,0.35), transparent 60%)",
        }}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow !text-gold-400">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-500" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
            {accent ? (
              <>
                {" "}
                <em className="text-gold-300 italic">{accent}</em>
              </>
            ) : null}
          </h1>
        </Reveal>
        {description ? (
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-sand-100/70 sm:text-base">
              {description}
            </p>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
