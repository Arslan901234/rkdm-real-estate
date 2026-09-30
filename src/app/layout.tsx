import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Suspense, type ReactNode } from "react";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import SiteHeader from "@/components/site-header";
import SiteFooter, { FooterContent } from "@/components/site-footer";
import FloatingActions from "@/components/floating-actions";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rkdmrealestate.in"),
  title: {
    default:
      "RKDM Real Estate — Residential Plots, Land & Farmhouse Plots in Ahmedabad, Gujarat",
    template: "%s · RKDM Real Estate",
  },
  description:
    "RKDM Real Estate India Limited, Ahmedabad — explore residential plots, land parcels, farmhouse plots and bungalow schemes across Ahmedabad, Kheda, Bareja, Sokhda and Matar. Site visit assistance and transparent property information.",
  keywords: [
    "RKDM Real Estate",
    "residential plots Ahmedabad",
    "plots Kheda",
    "farmhouse plots Gujarat",
    "land for sale Gujarat",
    "Bareja bungalow scheme",
    "Silicon City Kheda",
  ],
  openGraph: {
    siteName: BRAND.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/hero.jpg", width: 1600, height: 900, alt: "RKDM Real Estate — property opportunities in Gujarat" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#081f14",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: BRAND.name,
  legalName: BRAND.legalName,
  identifier: BRAND.cin,
  telephone: BRAND.phoneIntl,
  email: BRAND.email,
  areaServed: ["Ahmedabad", "Kheda", "Gujarat"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "568, Nr. Sunder Vidya Bihar School, Bachubhai Na Kuva, Nava Vatva",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "382445",
    addressCountry: "IN",
  },
  sameAs: [BRAND.instagramUrl],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <main id="main">{children}</main>
        <Suspense fallback={<FooterContent office={BRAND.customerOfficeDefault} />}>
          <SiteFooter />
        </Suspense>
        <FloatingActions />
      </body>
    </html>
  );
}
