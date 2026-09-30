import {
  boolean,
  integer,
  jsonb,
  pgTable,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull().default(""),
  // residential-plots | bungalow-scheme | farmhouse-plots | land
  type: text("type").notNull().default("residential-plots"),
  // project (scheme) | property (individual opportunity / land parcel)
  listing: text("listing").notNull().default("project"),
  // available | limited | sold
  status: text("status").notNull().default("available"),
  featured: boolean("featured").notNull().default(false),
  location: text("location").notNull().default(""),
  distance: text("distance").notNull().default(""),
  priceLabel: text("price_label").notNull().default("Price on request"),
  priceValue: real("price_value"), // normalized ₹ per Var for budget filter
  sizeLabel: text("size_label").notNull().default(""),
  sizeValue: real("size_value"), // normalized Var for size filter
  roadWidth: text("road_width").notNull().default(""),
  description: text("description").notNull().default(""),
  features: jsonb("features").$type<string[]>().notNull(),
  amenities: jsonb("amenities").$type<string[]>().notNull(),
  documentation: jsonb("documentation").$type<string[]>().notNull(),
  claimsNote: text("claims_note").notNull().default(""),
  images: jsonb("images").$type<string[]>().notNull(),
  videos: jsonb("videos").$type<string[]>().notNull(),
  mapQuery: text("map_query").notNull().default(""),
  contactPhone: text("contact_phone").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  // contact | site-visit
  type: text("type").notNull().default("contact"),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().default(""),
  projectName: text("project_name").notNull().default(""),
  preferredDate: text("preferred_date").notNull().default(""),
  preferredTime: text("preferred_time").notNull().default(""),
  message: text("message").notNull().default(""),
  // new | contacted | closed
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default(""),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Inquiry = typeof inquiries.$inferSelect;
