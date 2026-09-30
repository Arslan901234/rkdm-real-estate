import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grain flex min-h-[80svh] items-center justify-center bg-forest-950 px-5 text-center">
      <div>
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500 text-forest-950">
          <Compass className="h-7 w-7" />
        </span>
        <p className="mt-8 font-display text-7xl font-medium text-white sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-2xl text-gold-300 italic">
          This plot isn&apos;t on our map.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-sand-100/65">
          The page you are looking for may have moved or never existed. Let us
          guide you back to solid ground.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-gold">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <Link href="/properties" className="btn-outline-light">
            Explore Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
