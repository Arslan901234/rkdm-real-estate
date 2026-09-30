import { config } from "dotenv";
config();

const STANDARD_DOC_NOTE =
  "Independently verify ownership, title, approvals and land classification before any purchase decision.";

const seedProjects = [
  {
    slug: "silicon-city-kheda",
    name: "Silicon City Kheda",
    tagline: "Planned residential plotting scheme with RCC internal roads in Kheda.",
    type: "residential-plots",
    listing: "project",
    status: "available",
    featured: true,
    location: "Kheda, Gujarat",
    distance: "Situated in the developing Kheda corridor",
    priceLabel: "Price on request",
    priceValue: null,
    sizeLabel: "15×40 plots · ~106 Var",
    sizeValue: 106,
    roadWidth: "120 ft outer road · 6 m internal · 12 m crossover",
    description:
      "Silicon City is a planned residential plotting scheme in Kheda with 15×40 plots of approximately 106 Var each. The scheme is laid out with a 120 ft outer main road, 6-metre internal roads and a 12-metre crossover road, along with core infrastructure provisions.\n\nA site visit is available — call us to schedule a guided walk-through of the layout, roads and plot positions.",
    features: [
      "15×40 residential plots",
      "Approx. 106 Var plot area",
      "120 ft outer main road",
      "Planned internal roads",
      "6 m wide internal roads",
      "12 m crossover road",
      "Common plot provision",
      "Site visit available",
    ],
    amenities: [
      "RCC internal roads",
      "Gutter / drainage network",
      "Water infrastructure",
      "Common plot",
    ],
    documentation: [
      `Documentation details for this project are shared on request. ${STANDARD_DOC_NOTE}`,
      "Ask for survey numbers and the sanctioned layout plan during your site visit.",
    ],
    claimsNote: "",
    images: [
      "/images/projects/silicon-city.jpg",
      "/images/plots-sunset.jpg",
      "/images/hero.jpg",
    ],
    videos: [] as string[],
    mapQuery: "Kheda, Gujarat",
    contactPhone: "8866000677",
    sortOrder: 1,
  },
  {
    slug: "bareja-bungalow-scheme",
    name: "Bareja Bungalow Scheme",
    tagline: "A compact scheme of 55 bungalows at ₹6,500 per Var in Bareja.",
    type: "bungalow-scheme",
    listing: "project",
    status: "available",
    featured: true,
    location: "Bareja, Ahmedabad",
    distance: "Approx. 4 km from bus depot",
    priceLabel: "₹6,500 / Var",
    priceValue: 6500,
    sizeLabel: "15×40 plots",
    sizeValue: 106,
    roadWidth: "Scheme internal roads",
    description:
      "A bungalow scheme of 55 plots in Bareja, offering 15×40 plots at ₹6,500 per Var (subject to change). The scheme sits close to the local market, with the bus depot about 4 km away and Meldi Mata Mandir about 3 km away.\n\nCome see the layout and the surrounding neighbourhood in person — book a site visit and we will take you around.",
    features: [
      "Scheme of 55 bungalows",
      "15×40 residential plots",
      "₹6,500 per Var (subject to change)",
      "Nearby market for daily needs",
      "Approx. 4 km from bus depot",
      "Approx. 3 km from Meldi Mata Mandir",
    ],
    amenities: ["Internal scheme roads", "Nearby market", "Temple nearby"],
    documentation: [
      `Documentation details for this scheme are shared on request. ${STANDARD_DOC_NOTE}`,
    ],
    claimsNote:
      "Distances to the bus depot and Meldi Mata Mandir are approximate, project-specific figures — please verify them during your site visit.",
    images: ["/images/projects/bareja-bungalow.jpg", "/images/projects/sail-kunj.jpg"],
    videos: [] as string[],
    mapQuery: "Bareja, Ahmedabad, Gujarat",
    contactPhone: "8866000677",
    sortOrder: 2,
  },
  {
    slug: "sail-kunj-residency",
    name: "Sail Kunj Residency",
    tagline: "New bungalow scheme on the Ahmedabad New Ring Road side.",
    type: "bungalow-scheme",
    listing: "project",
    status: "available",
    featured: false,
    location: "New Ring Road side, Ahmedabad",
    distance: "Approx. 500 m from New Ring Road",
    priceLabel: "Price on request",
    priceValue: null,
    sizeLabel: "Bungalow plots",
    sizeValue: 120,
    roadWidth: "Near New Ring Road, Ahmedabad",
    description:
      "Sail Kunj Residency is a new bungalow scheme positioned on the Ahmedabad New Ring Road side — a corridor seeing rapid residential growth. Plot sizes, pricing and scheme layout are available on enquiry.\n\nAsk us for current availability and walk the location with our team before you decide.",
    features: [
      "Brand-new bungalow scheme",
      "Located on Ahmedabad New Ring Road side",
      "Approx. 500 m from New Ring Road (project-specific claim)",
      "Planned plots and internal roads",
    ],
    amenities: ["Ring Road connectivity", "Developing residential corridor"],
    documentation: [
      `Layout and approval details are shared on request. ${STANDARD_DOC_NOTE}`,
    ],
    claimsNote:
      "'Approx. 500 m from New Ring Road' is a project-specific marketing claim that may be edited or removed — please verify the actual distance during your site visit.",
    images: ["/images/projects/sail-kunj.jpg", "/images/projects/bareja-bungalow.jpg"],
    videos: [] as string[],
    mapQuery: "SP Ring Road, Ahmedabad, Gujarat",
    contactPhone: "8866000677",
    sortOrder: 3,
  },
  {
    slug: "western-hotel-sokhda-farmhouse-plots",
    name: "Sokhda Farmhouse Plots (Near Western Hotel)",
    tagline: "500 Var farmhouse plots with gate, pool, garden and bore water near Western Hotel.",
    type: "farmhouse-plots",
    listing: "property",
    status: "available",
    featured: true,
    location: "Sokhda (Near Western Hotel), Ahmedabad district",
    distance: "Near Western Hotel landmark",
    priceLabel: "₹5,000 / Var",
    priceValue: 5000,
    sizeLabel: "500 Var farmhouse plots",
    sizeValue: 500,
    roadWidth: "RCC internal roads",
    description:
      "500 Var farmhouse plots near the Western Hotel landmark at Sokhda, offered at ₹5,000 per Var (subject to change). The plots come with provisions for an entry gate, bore water, swimming pool, garden, gutter and RCC internal roads.\n\nIdeal for a weekend farmhouse — visit the site to see the plot positions, road work and water provisions yourself.",
    features: [
      "500 Var farmhouse plots",
      "₹5,000 per Var (subject to change)",
      "Near Western Hotel landmark",
      "Entry gate provision",
      "Bore water",
      "Swimming pool",
      "Garden area",
      "Gutter / drainage",
      "RCC internal roads",
    ],
    amenities: ["Gate", "Bore water", "Swimming pool", "Garden", "Gutter", "RCC road"],
    documentation: [
      `Documentation details for these plots are shared on request. ${STANDARD_DOC_NOTE}`,
    ],
    claimsNote: "",
    images: ["/images/projects/sokhda-farm.jpg", "/images/projects/matar-kheda.jpg"],
    videos: [] as string[],
    mapQuery: "Sokhda, Dholka, Ahmedabad, Gujarat",
    contactPhone: "8866000677",
    sortOrder: 4,
  },
  {
    slug: "matar-kheda-farmhouse-land",
    name: "Matar Farmhouse Land, Kheda",
    tagline: "Farmhouse land opportunity at ₹2,000 per Var in Matar, Kheda district.",
    type: "farmhouse-plots",
    listing: "property",
    status: "available",
    featured: false,
    location: "Matar, Kheda district, Gujarat",
    distance: "Approx. 30 minutes from Ahmedabad (claim)",
    priceLabel: "₹2,000 / Var",
    priceValue: 2000,
    sizeLabel: "Farmhouse land parcels",
    sizeValue: 500,
    roadWidth: "Rural road access",
    description:
      "A farmhouse land opportunity in Matar, Kheda district, at ₹2,000 per Var (subject to change), in open agricultural surroundings. Parcel sizes can be discussed based on availability.\n\nMarketing communication for this opportunity mentions roughly 30 minutes from Ahmedabad — treat this as an approximate, project-specific claim and verify the drive yourself.",
    features: [
      "Farmhouse land opportunity",
      "₹2,000 per Var (subject to change)",
      "Approx. 30 minutes from Ahmedabad (project-specific claim)",
      "Open, green surroundings",
    ],
    amenities: ["Farmland surroundings", "Approach road access"],
    documentation: [
      "NA / NOC / Title Clear statuses are displayed only where verified for the specific parcel — confirm the current status of the parcel you shortlist.",
      "Independently verify land classification (agricultural / NA), survey numbers and title before purchase.",
    ],
    claimsNote:
      "'Approx. 30 minutes from Ahmedabad' is a project-specific marketing claim — travel time varies by route and traffic; please verify during your site visit.",
    images: ["/images/projects/matar-kheda.jpg", "/images/plots-sunset.jpg"],
    videos: [] as string[],
    mapQuery: "Matar, Kheda, Gujarat",
    contactPhone: "8866000677",
    sortOrder: 5,
  },
  {
    slug: "road-touch-land-parcel",
    name: "Road-Touch Land Parcel",
    tagline: "Large road-touch land opportunity approx. 60 km from Ahmedabad at ₹12 Lakh per Bigha.",
    type: "land",
    listing: "property",
    status: "available",
    featured: false,
    location: "Ahmedabad outskirts, Gujarat",
    distance: "Approx. 60 km from Ahmedabad",
    priceLabel: "₹12 Lakh / Bigha",
    priceValue: 689,
    sizeLabel: "Large land parcels (per Bigha)",
    sizeValue: 1700,
    roadWidth: "Road-touch frontage",
    description:
      "A road-touch land parcel located approximately 60 km from Ahmedabad, offered at ₹12 Lakh per Bigha (subject to change). Suitable for buyers looking at larger land holding options with direct road access.\n\nBoth distance and price are editable, project-specific details — contact us for the current rate per Bigha, exact location pinning and survey numbers.",
    features: [
      "Road-touch land parcel",
      "Approx. 60 km from Ahmedabad",
      "₹12 Lakh per Bigha (subject to change)",
      "Large holding opportunity",
    ],
    amenities: ["Direct road frontage", "Open land"],
    documentation: [
      `Land records, survey numbers and title details are shared on request. ${STANDARD_DOC_NOTE}`,
    ],
    claimsNote:
      "The rate label uses a normalized per-Var value internally for search filters; the displayed commercial rate is ₹12 Lakh per Bigha. Distance and price are project-specific details that may change without notice.",
    images: ["/images/projects/road-land.jpg"],
    videos: [] as string[],
    mapQuery: "Ahmedabad, Gujarat",
    contactPhone: "8866000677",
    sortOrder: 6,
  },
];

async function seed() {
  const { db } = await import("../db");
  const { projects, settings } = await import("../db/schema");
  console.log("Seeding projects…");
  for (const p of seedProjects) {
    await db
      .insert(projects)
      .values(p)
      .onConflictDoUpdate({
        target: projects.slug,
        set: { ...p, updatedAt: new Date() },
      });
    console.log(`  ✓ ${p.name}`);
  }

  console.log("Seeding settings…");
  await db
    .insert(settings)
    .values({ key: "customerOffice", value: "F-11, Pratibha Complex" })
    .onConflictDoNothing();
  await db
    .insert(settings)
    .values({
      key: "officeMapQuery",
      value: "Nava Vatva, Ahmedabad, Gujarat 382445",
    })
    .onConflictDoNothing();

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
