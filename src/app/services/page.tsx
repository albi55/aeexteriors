import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import ServiceGallery from "@/components/ServiceGallery";
import { services as seoServices, PHONE } from "@/lib/seo-data";
import { ArrowRight, Phone, Check, ShieldCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "A&E Exteriors LLC offers expert Masonry, Roofing, Siding, Gutters, Chimneys, Foundation & Waterproofing across New Jersey. NJ Licensed #13VH13920700. Free estimates. Call 732-956-0411.",
  alternates: { canonical: "https://aeexteriorsnj.com/services" },
};

const galleryServices = seoServices.map((s) => ({
  slug: s.slug,
  title: s.title,
  tagline: s.tagline,
  image: s.images[0],
  blurb: s.seoContent[0],
  included: s.subServices,
  // full detail for the panel that opens below the gallery
  content: s.seoContent,
  gallery: s.images.slice(0, 5),
}));

export default function ServicesPage() {
  return (
    <div className="bg-concrete">

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/cambridge-pavers/pavers-1.webp" alt="A&E Exteriors LLC exterior contracting in New Jersey" fill priority className="object-cover scale-105 animate-[heroPan_20s_ease-in-out_infinite_alternate]" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/55" />
        <div className="absolute inset-0 tex-blueprint opacity-40 tex-fade-top pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <span className="kicker mb-6">What We Do</span>
              <h1 className="font-display font-bold text-bone text-5xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-tight mb-6">
                Our <span className="text-brand">services</span>
              </h1>
              <p className="text-bone/65 text-base lg:text-lg max-w-md mb-8 leading-relaxed">
                Full-service exterior contracting — everything your home needs, done right the first time.
                NJ licensed, fully insured, serving all of New Jersey.
              </p>
              <div className="flex flex-wrap gap-3 mb-9">
                <a href="tel:7329560411" className="btn btn-red">
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </a>
                <a href="#masonry" className="btn btn-outline-bone">
                  Explore Services
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { Icon: ShieldCheck, t: "NJ Licensed & Insured" },
                  { Icon: Check, t: "7 Core Services" },
                  { Icon: Check, t: "All 21 Counties" },
                ].map(({ Icon, t }) => (
                  <li key={t} className="inline-flex items-center gap-2 text-bone/70 text-sm">
                    <Icon className="w-4 h-4 text-brand" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <InlineEstimateForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ INTERACTIVE SERVICE GALLERY ════════ */}
      <section className="bg-concrete">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
            <span className="kicker kicker-center mb-5">Explore Our Work</span>
            <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight mb-4">
              Tap a service to see more
            </h2>
            <p className="text-ash text-base lg:text-lg leading-relaxed">
              Hover or tap any panel to expand it — real projects, what&apos;s included, and where to go next.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ServiceGallery services={galleryServices} />
          </Reveal>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="surface-brand relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 text-center">
          <Reveal>
            <span className="kicker kicker-center mb-6 !bg-white/15 !text-white">Free Estimates</span>
            <h2 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight mb-5">
              Need a custom solution?
            </h2>
            <p className="text-white/85 text-base lg:text-lg mb-10 max-w-xl mx-auto">
              Every home is different. Contact us for a free on-site assessment and personalized quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact" className="btn btn-bone w-full sm:w-auto justify-center">
                Request Free Estimate
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:7329560411" className="btn btn-ink w-full sm:w-auto justify-center">
                <Phone className="w-4 h-4" />
                Call {PHONE}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
