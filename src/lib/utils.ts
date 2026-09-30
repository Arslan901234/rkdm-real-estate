import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PROJECT_TYPES: Record<string, string> = {
  "residential-plots": "Residential Plots",
  "bungalow-scheme": "Bungalow Scheme",
  "farmhouse-plots": "Farmhouse Plots",
  land: "Land Parcel",
};

export const STATUS_META: Record<
  string,
  { label: string; dot: string; chip: string }
> = {
  available: {
    label: "Available",
    dot: "bg-emerald-400",
    chip: "bg-emerald-500/15 text-emerald-100 ring-emerald-300/30",
  },
  limited: {
    label: "Limited Availability",
    dot: "bg-amber-400",
    chip: "bg-amber-400/15 text-amber-100 ring-amber-300/30",
  },
  sold: {
    label: "Sold Out",
    dot: "bg-rose-400",
    chip: "bg-rose-500/15 text-rose-100 ring-rose-300/30",
  },
};

export function typeLabel(type: string) {
  return PROJECT_TYPES[type] ?? type.replace(/-/g, " ");
}

export function statusLabel(status: string) {
  return STATUS_META[status]?.label ?? status;
}

export function mapEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function mapLinkUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function youtubeEmbed(url: string): string | null {
  const m =
    url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/) ??
    (/^[\w-]{11}$/.test(url.trim()) ? [null, url.trim()] : null);
  const id = m?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function waLink(message: string, phone = "918866000677") {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
