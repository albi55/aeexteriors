import type { Metadata } from "next";
import { Montserrat, Barlow, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EstimateModalProvider from "@/components/EstimateModalProvider";

// Display — clean, modern geometric sans for headlines.
const montserrat = Montserrat({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Body — humanist grotesque, highly legible at small sizes.
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Spec labels — clean mono for small caps / kickers.
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aeexteriorsnj.com"),
  title: {
    default: "A&E Exteriors LLC | Expert Exterior Contractor in New Jersey",
    template: "%s | A&E Exteriors LLC",
  },
  description:
    "A&E Exteriors LLC — NJ licensed exterior contractor serving all of New Jersey. Specializing in Masonry, Roofing, Siding, Gutters, Chimneys, Foundation & Waterproofing. NJ Lic #13VH13920700. Call 732-956-0411.",
  keywords: [
    "exterior contractor NJ",
    "masonry contractor NJ",
    "roofing contractor NJ",
    "siding contractor NJ",
    "gutters NJ",
    "chimney repair NJ",
    "foundation repair NJ",
    "waterproofing NJ",
    "A&E Exteriors",
    "exterior contractor Passaic County",
    "contractor Bergen County NJ",
  ],
  authors: [{ name: "A&E Exteriors LLC" }],
  creator: "A&E Exteriors LLC",
  publisher: "A&E Exteriors LLC",
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aeexteriorsnj.com",
    siteName: "A&E Exteriors LLC",
    title: "A&E Exteriors LLC | Expert Exterior Contractor in New Jersey",
    description:
      "NJ licensed exterior contractor specializing in Masonry, Roofing, Siding, Gutters, Chimneys, Foundation & Waterproofing. Serving all 21 counties across New Jersey.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "A&E Exteriors LLC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A&E Exteriors LLC | Expert Exterior Contractor NJ",
    description:
      "NJ licensed exterior contractor — Masonry, Roofing, Siding, Gutters, Chimneys, Foundation & Waterproofing. Call 732-956-0411.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "A&E Exteriors LLC",
  image: "https://aeexteriorsnj.com/logo.png",
  url: "https://aeexteriorsnj.com",
  telephone: "+1-732-956-0411",
  email: "aeexteriorsnj@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "871 Belmont Ave",
    addressLocality: "North Haledon",
    addressRegion: "NJ",
    postalCode: "07508",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "State", name: "New Jersey" },
    { "@type": "County", name: "Passaic County" },
    { "@type": "County", name: "Bergen County" },
    { "@type": "County", name: "Essex County" },
    { "@type": "County", name: "Morris County" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Exterior Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Masonry" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roofing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Siding" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gutters" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Chimneys" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Foundation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Waterproofing" } },
    ],
  },
  priceRange: "$$",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.9554,
    longitude: -74.1857,
  },
  sameAs: [
    "https://facebook.com",
    "https://instagram.com",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "15:00",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${barlow.variable} ${jetbrains.variable}`}>
      <head>
        <meta name="geo.region" content="US-NJ" />
        <meta name="geo.placename" content="North Haledon" />
        <meta name="geo.position" content="40.9554;-74.1857" />
        <meta name="ICBM" content="40.9554, -74.1857" />
        <meta name="theme-color" content="#E10E0E" />
        <link rel="canonical" href="https://aeexteriorsnj.com" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <EstimateModalProvider>
          <Navbar />
          <main
            className="flex-1 transition-[padding-top] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ paddingTop: "var(--promo-h, 0px)" }}
          >
            {children}
          </main>
          <Footer />
        </EstimateModalProvider>
      </body>
    </html>
  );
}
