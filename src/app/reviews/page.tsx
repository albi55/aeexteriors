import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FeaturableReviews from "@/components/FeaturableReviews";
import { PHONE, EMAIL, SITE_URL, BUSINESS_NAME, LICENSE } from "@/lib/seo-data";
import { ArrowRight, Phone, Star, Check, ShieldCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "See what New Jersey homeowners say about A&E Exteriors LLC. 5.0-star rated exterior contractor — masonry, roofing, siding, gutters, chimneys, foundation & waterproofing. NJ Licensed #13VH13920700.",
  alternates: { canonical: "https://aeexteriorsnj.com/reviews" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: BUSINESS_NAME,
  url: `${SITE_URL}/reviews`,
  telephone: PHONE,
  email: EMAIL,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },
};

const trustPoints = [
  { t: "Owner-Supervised", d: "The owner is on every job — quality and accountability never slip." },
  { t: "No Subcontractors", d: "Our own crew, start to finish. No middlemen, no surprises." },
  { t: "Licensed & Insured", d: `NJ Lic #${LICENSE}, fully insured — proof available on request.` },
  { t: "Clean & On-Time", d: "We show up when we say we will and leave your property spotless." },
];

export default function ReviewsPage() {
  return (
    <div className="bg-concrete">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 tex-fade-top pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-16 lg:pb-20">
          <span className="kicker mb-6">Reviews</span>
          <h1 className="font-display font-bold uppercase text-bone text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.015em] mb-6">
            Trusted by your
            <br />
            <span className="text-brand">neighbors</span>
          </h1>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-brand">
                {Array(5).fill(0).map((_, i) => <Star key={i} className="w-6 h-6" />)}
              </div>
              <span className="font-display font-bold text-bone text-3xl">5.0</span>
            </div>
            <span className="h-8 w-px bg-steel hidden sm:block" />
            <span className="spec text-bone/55">Rated on Google by NJ homeowners</span>
          </div>
        </div>
      </section>

      {/* ════════ WHY TRUST US ════════ */}
      <section className="surface-brand">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/20">
            {trustPoints.map((p) => (
              <div key={p.t} className="py-4 px-4 lg:px-7">
                <Check className="w-6 h-6 text-white mb-3" />
                <h3 className="font-display font-semibold uppercase text-white text-base tracking-[0.01em] mb-1.5">{p.t}</h3>
                <p className="text-white/75 text-xs leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ LIVE REVIEWS ════════ */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <Reveal className="mb-10">
            <span className="kicker mb-5">Straight from Google</span>
            <h2 className="font-display font-bold uppercase text-coal text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-[-0.01em]">
              What homeowners say
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <FeaturableReviews />
          </Reveal>
        </div>
      </section>

      {/* ════════ BADGES ════════ */}
      <section className="bg-cement">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 flex flex-wrap items-center justify-center gap-12">
          <div className="relative w-28 h-28">
            <Image src="/homeadvisor-clean.png" alt="HomeAdvisor Screened & Approved" fill className="object-contain" />
          </div>
          <div className="relative w-28 h-28">
            <Image src="/why-photo-removebg-preview.png" alt="Google Five Star Customer Rating" fill className="object-contain" />
          </div>
          <div className="flex items-center gap-3 text-coal">
            <ShieldCheck className="w-8 h-8 text-brand" />
            <span className="font-display uppercase text-lg tracking-[0.01em]">NJ Licensed &amp; Insured</span>
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-24 text-center">
          <h2 className="font-display font-bold uppercase text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-5">
            Join our happy homeowners
          </h2>
          <p className="text-bone/60 text-base lg:text-lg mb-10 max-w-xl mx-auto">
            Get a free, no-obligation estimate and see why your neighbors keep calling us back.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-red w-full sm:w-auto justify-center">
              Get Free Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:7329560411" className="btn btn-outline-bone w-full sm:w-auto justify-center">
              <Phone className="w-4 h-4" />
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
