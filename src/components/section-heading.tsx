import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className={cn("eyebrow", align === "center" && "justify-center")}>
        <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-500" aria-hidden />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 font-display text-3xl font-medium leading-[1.12] tracking-tight text-balance sm:text-4xl lg:text-[2.9rem]",
          dark ? "text-sand-50" : "text-forest-950"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-[15px] leading-relaxed sm:text-base",
            dark ? "text-sand-100/70" : "text-ink-500"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
