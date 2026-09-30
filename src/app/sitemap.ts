import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

const BASE = "https://rkdmrealestate.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/properties",
    "/projects",
    "/services",
    "/gallery",
    "/videos",
    "/documentation",
    "/contact",
    "/book-site-visit",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects({ includeSold: true });
    projectRoutes = projects.map((p) => ({
      url: `${BASE}/projects/${p.slug}`,
      lastModified: p.updatedAt,
    }));
  } catch {
    projectRoutes = [];
  }

  return [...staticRoutes, ...projectRoutes];
}
