"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { inquiries, projects, settings } from "@/db/schema";
import { ADMIN_COOKIE, isAdmin, makeToken, verifyPasscode } from "@/lib/admin-auth";
import { slugify } from "@/lib/utils";
import type { AdminFormState } from "@/lib/form-state";

function refreshPublicPages() {
  revalidatePath("/", "layout");
}

/* ------------------------------ Auth ------------------------------ */

export async function loginAdmin(
  _prev: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  const passcode = String(formData.get("passcode") ?? "");
  if (!verifyPasscode(passcode)) {
    return { status: "error", message: "Incorrect passcode. Please try again." };
  }
  const store = await cookies();
  store.set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return { status: "success", message: "Signed in." };
}

export async function logoutAdmin() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin");
}

/* ----------------------------- Projects ---------------------------- */

const lines = (v: FormDataEntryValue | null): string[] =>
  String(v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

const num = (v: FormDataEntryValue | null): number | null => {
  const s = String(v ?? "").trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};

const str = (v: FormDataEntryValue | null): string => String(v ?? "").trim();

export async function upsertProject(
  _prev: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  if (!(await isAdmin())) {
    return { status: "error", message: "Session expired. Please sign in again." };
  }

  try {
    const idRaw = str(formData.get("id"));
    const name = str(formData.get("name"));
    if (name.length < 3) {
      return { status: "error", message: "Project name is required (min 3 characters)." };
    }
    const slug = str(formData.get("slug")) || slugify(name);

    const values = {
      name,
      slug,
      tagline: str(formData.get("tagline")),
      type: str(formData.get("type")) || "residential-plots",
      listing: str(formData.get("listing")) || "project",
      status: str(formData.get("status")) || "available",
      featured: formData.get("featured") === "on",
      location: str(formData.get("location")),
      distance: str(formData.get("distance")),
      priceLabel: str(formData.get("priceLabel")) || "Price on request",
      priceValue: num(formData.get("priceValue")),
      sizeLabel: str(formData.get("sizeLabel")),
      sizeValue: num(formData.get("sizeValue")),
      roadWidth: str(formData.get("roadWidth")),
      description: str(formData.get("description")),
      features: lines(formData.get("features")),
      amenities: lines(formData.get("amenities")),
      documentation: lines(formData.get("documentation")),
      claimsNote: str(formData.get("claimsNote")),
      images: lines(formData.get("images")),
      videos: lines(formData.get("videos")),
      mapQuery: str(formData.get("mapQuery")),
      contactPhone: str(formData.get("contactPhone")) || "8866000677",
      sortOrder: num(formData.get("sortOrder")) ?? 0,
      updatedAt: new Date(),
    };

    if (idRaw) {
      const id = Number(idRaw);
      await db.update(projects).set(values).where(eq(projects.id, id));
    } else {
      await db.insert(projects).values(values);
    }

    refreshPublicPages();
  } catch (error: unknown) {
    console.error("upsertProject failed:", error);
    const msg =
      error instanceof Error && error.message.includes("unique")
        ? "That slug is already in use. Choose a different slug."
        : "Could not save the project. Please review the fields and try again.";
    return { status: "error", message: msg };
  }

  redirect("/admin?saved=1");
}

export async function deleteProject(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const id = Number(formData.get("id"));
  if (Number.isFinite(id)) {
    await db.delete(projects).where(eq(projects.id, id));
    refreshPublicPages();
  }
  redirect("/admin");
}

export async function setProjectStatus(id: number, status: string) {
  if (!(await isAdmin())) return;
  if (!["available", "limited", "sold"].includes(status)) return;
  await db
    .update(projects)
    .set({ status, updatedAt: new Date() })
    .where(eq(projects.id, id));
  refreshPublicPages();
}

export async function toggleFeatured(id: number) {
  if (!(await isAdmin())) return;
  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  if (!rows[0]) return;
  await db
    .update(projects)
    .set({ featured: !rows[0].featured, updatedAt: new Date() })
    .where(eq(projects.id, id));
  refreshPublicPages();
}

/* ----------------------------- Settings ---------------------------- */

export async function saveSettings(
  _prev: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  if (!(await isAdmin())) {
    return { status: "error", message: "Session expired. Please sign in again." };
  }
  try {
    const keys = ["customerOffice", "officeMapQuery", "youtubeUrl"] as const;
    for (const key of keys) {
      const value = str(formData.get(key));
      await db
        .insert(settings)
        .values({ key, value })
        .onConflictDoUpdate({ target: settings.key, set: { value } });
    }
    refreshPublicPages();
    return { status: "success", message: "Settings saved successfully." };
  } catch (error) {
    console.error("saveSettings failed:", error);
    return { status: "error", message: "Could not save settings. Please try again." };
  }
}

/* ----------------------------- Inquiries --------------------------- */

export async function setInquiryStatus(id: number, status: string) {
  if (!(await isAdmin())) return;
  if (!["new", "contacted", "closed"].includes(status)) return;
  await db.update(inquiries).set({ status }).where(eq(inquiries.id, id));
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}
