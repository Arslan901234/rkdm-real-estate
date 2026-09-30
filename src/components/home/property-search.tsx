"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { PROJECT_TYPES } from "@/lib/utils";

const BUDGETS = [
  { value: "", label: "Any Budget" },
  { value: "0-2500", label: "Up to ₹2,500 / Var" },
  { value: "2500-5000", label: "₹2,500 – ₹5,000 / Var" },
  { value: "5000-6500", label: "₹5,000 – ₹6,500 / Var" },
  { value: "6500-1000000", label: "Above ₹6,500 / Var" },
];

const SIZES = [
  { value: "", label: "Any Plot Size" },
  { value: "0-150", label: "Up to ~150 Var" },
  { value: "150-500", label: "150 – 500 Var" },
  { value: "500-1000000", label: "Above 500 Var" },
];

export default function PropertySearch({ locations }: { locations: string[] }) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (budget) params.set("budget", budget);
    if (type) params.set("type", type);
    if (size) params.set("size", size);
    router.push(`/properties${params.size ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white p-4 shadow-[0_36px_80px_-32px_rgba(6,31,20,0.5)] ring-1 ring-forest-950/8 sm:p-5"
      aria-label="Property search"
    >
      <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        <div>
          <label htmlFor="s-location" className="input-label">Location</label>
          <select
            id="s-location"
            className="input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="s-budget" className="input-label">Budget</label>
          <select
            id="s-budget"
            className="input"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            {BUDGETS.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="s-type" className="input-label">Property Type</label>
          <select
            id="s-type"
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            {Object.entries(PROJECT_TYPES).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="s-size" className="input-label">Plot Size</label>
          <select
            id="s-size"
            className="input"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {SIZES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button type="submit" className="btn-forest w-full lg:w-auto">
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>
      <p className="mt-3 px-1 text-[11px] leading-relaxed text-ink-500/80">
        Rates are shown per Var wherever applicable. Availability and pricing may
        change — please confirm with our team before planning a visit.
      </p>
    </form>
  );
}
