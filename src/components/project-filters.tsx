import { Search, SlidersHorizontal } from "lucide-react";
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

const STATUSES = [
  { value: "", label: "Any Availability" },
  { value: "available", label: "Available" },
  { value: "limited", label: "Limited Availability" },
  { value: "sold", label: "Sold Out" },
];

export default function ProjectFilters({
  locations,
  current,
  action,
}: {
  locations: string[];
  current: Record<string, string | undefined>;
  action: string;
}) {
  return (
    <form
      action={action}
      method="get"
      className="rounded-2xl bg-white p-4 ring-1 ring-forest-950/8 sm:p-5"
      aria-label="Filter properties"
    >
      <div className="mb-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-forest-800">
        <SlidersHorizontal className="h-4 w-4 text-gold-600" />
        Refine Results
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-1">
          <label htmlFor="f-location" className="input-label">Location</label>
          <select id="f-location" name="location" className="input" defaultValue={current.location ?? ""}>
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-budget" className="input-label">Budget</label>
          <select id="f-budget" name="budget" className="input" defaultValue={current.budget ?? ""}>
            {BUDGETS.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-type" className="input-label">Property Type</label>
          <select id="f-type" name="type" className="input" defaultValue={current.type ?? ""}>
            <option value="">All Types</option>
            {Object.entries(PROJECT_TYPES).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-size" className="input-label">Plot Size</label>
          <select id="f-size" name="size" className="input" defaultValue={current.size ?? ""}>
            {SIZES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-status" className="input-label">Availability</label>
          <select id="f-status" name="status" className="input" defaultValue={current.status ?? ""}>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end gap-2">
          <button type="submit" className="btn-forest flex-1 !px-4">
            <Search className="h-4 w-4" />
            Apply
          </button>
        </div>
      </div>
      {(current.location || current.budget || current.type || current.size || current.status) && (
        <a href={action} className="mt-3 inline-block text-[12px] font-bold text-gold-700 underline-offset-4 hover:underline">
          Clear all filters
        </a>
      )}
    </form>
  );
}
