import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import { PHONE, SITE_URL, BUSINESS_NAME } from "@/lib/seo-data";
import { ArrowRight, Phone } from "@/components/icons";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse real exterior projects by A&E Exteriors LLC across New Jersey — masonry, roofing, siding, gutters, chimneys, foundation & waterproofing. NJ Licensed #13VH13920700.",
  alternates: { canonical: "https://aeexteriorsnj.com/gallery" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Project Gallery", item: `${SITE_URL}/gallery` },
  ],
};

export default function GalleryPage() {
  return (
    <div className="bg-concrete">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 tex-fade-top pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-16 lg:pb-20">
          <span className="kicker mb-6">Our Work</span>
          <h1 className="font-display font-bold uppercase text-bone text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.015em] mb-6">
            Project <span className="text-brand">gallery</span>
          </h1>
          <p className="text-bone/65 text-base lg:text-lg max-w-2xl">
            Real projects, real homes, real results — across {BUSINESS_NAME}&apos;s service area in New Jersey. Filter by trade and tap any photo to view it full size.
          </p>
        </div>
      </section>

      {/* ════════ GALLERY ════════ */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
          <GalleryGrid />
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="surface-brand">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 text-center">
          <h2 className="font-display font-bold uppercase text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-5">
            Want results like these?
          </h2>
          <p className="text-white/85 text-base lg:text-lg mb-10 max-w-xl mx-auto">
            Book a free, no-obligation estimate and we&apos;ll show you exactly what we can do for your home.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-bone w-full sm:w-auto justify-center">
              Get Free Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:7329560411" className="btn btn-ink w-full sm:w-auto justify-center">
              <Phone className="w-4 h-4" />
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
