import { and, asc, desc, eq, gte, ilike, isNotNull, lte, ne, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { projects, inquiries, settings, type Project } from "@/db/schema";

export interface ProjectFilter {
  q?: string; // location keyword
  type?: string; // residential-plots | bungalow-scheme | farmhouse-plots | land
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  listing?: string; // project | property
  status?: string;
  includeSold?: boolean;
}

export async function getProjects(filter: ProjectFilter = {}): Promise<Project[]> {
  const conditions = [];
  if (filter.listing) conditions.push(eq(projects.listing, filter.listing));
  if (filter.type) conditions.push(eq(projects.type, filter.type));
  if (filter.status) conditions.push(eq(projects.status, filter.status));
  if (!filter.includeSold && !filter.status) {
    // keep sold items visible but sorted last — no exclusion
  }
  if (filter.q) {
    const like = `%${filter.q}%`;
    conditions.push(
      or(
        ilike(projects.location, like),
        ilike(projects.name, like),
        ilike(projects.tagline, like)
      )
    );
  }
  if (filter.minPrice !== undefined) {
    conditions.push(and(isNotNull(projects.priceValue), gte(projects.priceValue, filter.minPrice)));
  }
  if (filter.maxPrice !== undefined) {
    conditions.push(and(isNotNull(projects.priceValue), lte(projects.priceValue, filter.maxPrice)));
  }
  if (filter.minSize !== undefined) {
    conditions.push(and(isNotNull(projects.sizeValue), gte(projects.sizeValue, filter.minSize)));
  }
  if (filter.maxSize !== undefined) {
    conditions.push(and(isNotNull(projects.sizeValue), lte(projects.sizeValue, filter.maxSize)));
  }

  return db
    .select()
    .from(projects)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(
      sql`CASE WHEN ${projects.status} = 'sold' THEN 1 ELSE 0 END`,
      desc(projects.featured),
      asc(projects.sortOrder),
      asc(projects.id)
    );
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  return db
    .select()
    .from(projects)
    .where(and(eq(projects.featured, true), ne(projects.status, "sold")))
    .orderBy(asc(projects.sortOrder), asc(projects.id))
    .limit(limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return rows[0];
}

export async function getProjectById(id: number): Promise<Project | undefined> {
  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return rows[0];
}

export async function getRelatedProjects(current: Project, limit = 3): Promise<Project[]> {
  return db
    .select()
    .from(projects)
    .where(and(ne(projects.id, current.id), eq(projects.type, current.type)))
    .orderBy(asc(projects.sortOrder))
    .limit(limit)
    .then(async (rows) => {
      if (rows.length >= limit) return rows;
      const extra = await db
        .select()
        .from(projects)
        .where(and(ne(projects.id, current.id), ne(projects.type, current.type)))
        .orderBy(asc(projects.sortOrder))
        .limit(limit - rows.length);
      return [...rows, ...extra];
    });
}

export async function getDistinctLocations(): Promise<string[]> {
  const rows = await db
    .selectDistinct({ location: projects.location })
    .from(projects)
    .orderBy(asc(projects.location));
  return rows.map((r) => r.location).filter(Boolean);
}

export async function getSetting(key: string, fallback = ""): Promise<string> {
  const rows = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
  return rows[0]?.value ?? fallback;
}

export async function getAllSettings(): Promise<Record<string, string>> {
  const rows = await db.select().from(settings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function getInquiries(): Promise<(typeof inquiries.$inferSelect)[]> {
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function getCounts() {
  const [projCount] = await db.select({ count: sql<number>`count(*)` }).from(projects);
  const [openCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(projects)
    .where(ne(projects.status, "sold"));
  const [leadCount] = await db.select({ count: sql<number>`count(*)` }).from(inquiries);
  const [newLeadCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(inquiries)
    .where(eq(inquiries.status, "new"));
  return {
    projects: Number(projCount?.count ?? 0),
    available: Number(openCount?.count ?? 0),
    leads: Number(leadCount?.count ?? 0),
    newLeads: Number(newLeadCount?.count ?? 0),
  };
}
