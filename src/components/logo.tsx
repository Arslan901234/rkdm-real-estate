import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" className={cn("h-10 w-10", className)} aria-hidden="true">
      <rect x="2" y="2" width="40" height="40" rx="9" className="fill-forest-800" />
      <rect x="8.5" y="8.5" width="12" height="12" rx="2" className="fill-sand-100" />
      <rect x="23.5" y="8.5" width="12" height="12" rx="2" className="fill-gold-500" />
      <rect x="8.5" y="23.5" width="12" height="12" rx="2" className="fill-gold-500/70" />
      <rect x="23.5" y="23.5" width="12" height="12" rx="2" className="fill-forest-500" />
    </svg>
  );
}

export function Logo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-[19px] font-semibold tracking-[0.08em]",
            light ? "text-white" : "text-forest-900"
          )}
        >
          RKDM
        </span>
        <span
          className={cn(
            "mt-1 block text-[9px] font-extrabold uppercase tracking-[0.34em]",
            light ? "text-gold-300" : "text-gold-600"
          )}
        >
          Real Estate
        </span>
      </span>
    </span>
  );
}
