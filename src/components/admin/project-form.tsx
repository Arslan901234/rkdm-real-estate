"use client";

import { useActionState, type ReactNode } from "react";
import { Loader2, Save } from "lucide-react";
import type { Project } from "@/db/schema";
import { upsertProject } from "@/app/admin/actions";
import { adminInitialState } from "@/lib/form-state";
import { PROJECT_TYPES } from "@/lib/utils";

function Group({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-2xl bg-white p-6 ring-1 ring-forest-950/8 sm:p-7">
      <legend className="sr-only">{title}</legend>
      <h2 className="font-display text-lg font-medium text-forest-950">{title}</h2>
      {hint ? <p className="mt-1 text-[12px] leading-relaxed text-ink-500">{hint}</p> : null}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
  hint,
  span,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  type?: string;
  required?: boolean;
  hint?: string;
  span?: boolean;
}) {
  return (
    <div className={span ? "sm:col-span-2" : undefined}>
      <label htmlFor={`pf-${name}`} className="input-label">
        {label} {required ? "*" : ""}
      </label>
      <input
        id={`pf-${name}`}
        name={name}
        type={type}
        step={type === "number" ? "any" : undefined}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="input"
      />
      {hint ? <p className="mt-1 text-[11px] text-ink-500/80">{hint}</p> : null}
    </div>
  );
}

function Area({
  label,
  name,
  defaultValue,
  rows = 4,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="sm:col-span-2">
      <label htmlFor={`pf-${name}`} className="input-label">{label}</label>
      <textarea
        id={`pf-${name}`}
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="input resize-y"
      />
      {hint ? <p className="mt-1 text-[11px] text-ink-500/80">{hint}</p> : null}
    </div>
  );
}

function Select({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={`pf-${name}`} className="input-label">{label}</label>
      <select id={`pf-${name}`} name={name} defaultValue={defaultValue} className="input">
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

const IMAGE_HINT =
  "Built-in images you can reuse: /images/hero.jpg, /images/plots-sunset.jpg, /images/about.jpg, /images/projects/silicon-city.jpg, /images/projects/bareja-bungalow.jpg, /images/projects/sail-kunj.jpg, /images/projects/sokhda-farm.jpg, /images/projects/matar-kheda.jpg, /images/projects/road-land.jpg — or paste any full https:// image URL.";

export default function ProjectForm({ initial }: { initial?: Partial<Project> }) {
  const [state, action, pending] = useActionState(upsertProject, adminInitialState);

  return (
    <form action={action} className="space-y-5">
      {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}

      {state.status === "error" && (
        <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 ring-1 ring-rose-200">
          {state.message}
        </p>
      )}

      <Group title="Basics" hint="Name, URL slug, category and visibility.">
        <Field label="Project Name" name="name" required defaultValue={initial?.name} placeholder="e.g. Silicon City Kheda" />
        <Field label="URL Slug" name="slug" defaultValue={initial?.slug} placeholder="auto-generated if blank" hint="Used in /projects/your-slug" />
        <Select
          label="Listing Kind"
          name="listing"
          defaultValue={initial?.listing ?? "project"}
          options={[
            { value: "project", label: "Project (scheme / development)" },
            { value: "property", label: "Property (individual opportunity / land)" },
          ]}
        />
        <Select
          label="Property Type"
          name="type"
          defaultValue={initial?.type ?? "residential-plots"}
          options={Object.entries(PROJECT_TYPES).map(([value, label]) => ({ value, label }))}
        />
        <Select
          label="Availability"
          name="status"
          defaultValue={initial?.status ?? "available"}
          options={[
            { value: "available", label: "Available" },
            { value: "limited", label: "Limited Availability" },
            { value: "sold", label: "Sold Out" },
          ]}
        />
        <Field label="Display Order" name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} hint="Lower numbers appear first." />
        <div className="flex items-center gap-3 sm:col-span-2">
          <input
            id="pf-featured"
            name="featured"
            type="checkbox"
            defaultChecked={initial?.featured ?? false}
            className="h-4.5 w-4.5 rounded accent-[#c7a35c]"
          />
          <label htmlFor="pf-featured" className="text-sm font-bold text-forest-900">
            Feature on the home page
          </label>
        </div>
      </Group>

      <Group title="Location & Distance" hint="Distances can be project-specific marketing claims — keep them accurate, and add a note below if they need qualification.">
        <Field label="Location" name="location" required defaultValue={initial?.location} placeholder="e.g. Kheda, Gujarat" />
        <Field label="Distance / Connectivity" name="distance" defaultValue={initial?.distance} placeholder="e.g. Approx. 30 minutes from Ahmedabad" />
        <Field label="Google Maps Search Query" name="mapQuery" defaultValue={initial?.mapQuery} placeholder="e.g. Bareja, Ahmedabad, Gujarat" span hint="Used for the embedded map. Leave blank to use project name + location." />
      </Group>

      <Group title="Pricing & Size" hint="The display label is what visitors see; the numeric values power the website filters.">
        <Field label="Price Label (display)" name="priceLabel" defaultValue={initial?.priceLabel} placeholder="e.g. ₹6,500 / Var or Price on request" />
        <Field label="Rate Value (₹ / Var, numeric)" name="priceValue" type="number" defaultValue={initial?.priceValue ?? ""} hint="Used by the budget filter. Leave blank for 'on request'." />
        <Field label="Size Label (display)" name="sizeLabel" defaultValue={initial?.sizeLabel} placeholder="e.g. 15×40 plots · ~106 Var" />
        <Field label="Size Value (Var, numeric)" name="sizeValue" type="number" defaultValue={initial?.sizeValue ?? ""} hint="Used by the plot size filter." />
        <Field label="Road / Access" name="roadWidth" defaultValue={initial?.roadWidth} placeholder="e.g. 120 ft outer road · 6 m internal roads" />
        <Field label="Contact Phone" name="contactPhone" defaultValue={initial?.contactPhone ?? "8866000677"} />
      </Group>

      <Group title="Content">
        <Area label="Short Tagline" name="tagline" rows={2} defaultValue={initial?.tagline ?? ""} placeholder="One-line summary shown on cards." />
        <Area label="Description" name="description" rows={5} defaultValue={initial?.description ?? ""} placeholder="Honest overview of the project, location and who it suits." />
        <Area label="Project Highlights (one per line)" name="features" rows={5} defaultValue={(initial?.features ?? []).join("\n")} placeholder={"15×40 residential plots\n120 ft outer main road\nCommon plot"} />
        <Area label="Amenities (one per line)" name="amenities" rows={4} defaultValue={(initial?.amenities ?? []).join("\n")} placeholder={"RCC internal roads\nWater infrastructure\nDrainage / gutter"} />
      </Group>

      <Group
        title="Documentation"
        hint="Only state NA / NOC / Title Clear / RERA where verified for this specific project. Everything here is shown to buyers as a note."
      >
        <Area label="Documentation Notes (one per line)" name="documentation" rows={4} defaultValue={(initial?.documentation ?? []).join("\n")} placeholder={"Documentation details shared on request.\nIndependently verify title, NA status and approvals."} />
        <Area label="Claims / Distance Note (optional)" name="claimsNote" rows={3} defaultValue={initial?.claimsNote ?? ""} placeholder="e.g. 'Approx. 500 m from New Ring Road' is a project-specific claim — please verify during the site visit." />
      </Group>

      <Group title="Media" hint="One item per line. Images appear in the gallery; YouTube links appear on the project page and Videos page.">
        <Area label="Images (one path or URL per line)" name="images" rows={4} defaultValue={(initial?.images ?? []).join("\n")} placeholder="/images/projects/silicon-city.jpg" hint={IMAGE_HINT} />
        <Area label="Videos (YouTube URLs / IDs, one per line, optional)" name="videos" rows={3} defaultValue={(initial?.videos ?? []).join("\n")} placeholder="https://www.youtube.com/watch?v=…" />
      </Group>

      <div className="flex items-center gap-3 pb-10">
        <button type="submit" disabled={pending} className="btn-forest disabled:opacity-60">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {pending ? "Saving…" : "Save Project"}
        </button>
        <a href="/admin" className="btn-outline-forest">Cancel</a>
      </div>
    </form>
  );
}
