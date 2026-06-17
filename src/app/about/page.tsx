import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import { ArrowRight, Phone, Check } from "@/components/icons";
import { PHONE } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about A&E Exteriors LLC — a NJ licensed exterior contractor serving all of New Jersey. Masonry, roofing, siding, gutters, chimneys, foundation & waterproofing. NJ Lic #13VH13920700.",
  alternates: { canonical: "https://aeexteriorsnj.com/about" },
};

const values = [
  { title: "Honest Pricing", desc: "Clear, itemized estimates with no hidden fees. The price we quote is the price you pay." },
  { title: "Quality Craftsmanship", desc: "Every job done to the highest standard. We don't cut corners and we don't rush the work." },
  { title: "Licensed & Insured", desc: "Fully licensed in New Jersey (Lic #13VH13920700) and fully insured for your peace of mind." },
  { title: "Reliable Communication", desc: "We answer our phones, show up when we say we will, and keep you updated throughout the project." },
  { title: "Clean Job Sites", desc: "We respect your home and property. Every job site is cleaned up completely before we leave." },
  { title: "Local Expertise", desc: "Based in NJ, we know the weather, building codes, and what local homes need to last." },
];

const serviceAreas = [
  { county: "Passaic County", cities: "North Haledon, Haledon, Paterson, Wayne, Clifton, Hawthorne, Totowa, Woodland Park" },
  { county: "Bergen County", cities: "Ridgewood, Fair Lawn, Hackensack, Paramus, Ramsey, Mahwah, Lodi" },
  { county: "Essex County", cities: "Montclair, Bloomfield, Nutley, Belleville, East Orange, West Orange, Verona" },
  { county: "Morris County", cities: "Morristown, Parsippany, Rockaway, Dover, Denville, Boonton, Randolph" },
];

const credentials = [
  { label: "NJ Home Improvement License", value: "#13VH13920700" },
  { label: "Insurance Coverage", value: "General Liability & Workers' Comp" },
  { label: "Location", value: "871 Belmont Ave, North Haledon, NJ 07508" },
  { label: "Phone", value: "732-956-0411" },
  { label: "Email", value: "aeexteriorsnj@gmail.com" },
];

const stats = [
  { val: "7+", label: "Services Offered" },
  { val: "21", label: "Counties Served" },
  { val: "100%", label: "Licensed & Insured" },
  { val: "0", label: "Subcontractors" },
];

export default function AboutPage() {
  return (
    <div className="bg-concrete">

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/steps/steps-6.webp" alt="A&E Exteriors LLC masonry work on a New Jersey home" fill priority className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/55" />
        <div className="absolute inset-0 tex-blueprint opacity-40 tex-fade-top pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="kicker mb-6">Who We Are</span>
              <h1 className="font-display font-bold uppercase text-bone text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.015em] mb-6">
                About<br /><span className="text-brand">A&amp;E Exteriors</span>
              </h1>
              <p className="text-bone/65 text-base lg:text-lg max-w-md mb-8">
                A locally owned, NJ licensed exterior contractor proudly serving all of New Jersey — one honest, owner-supervised job at a time.
              </p>
              <a href="tel:7329560411" className="btn btn-red">
                <Phone className="w-4 h-4" />
                Call {PHONE}
              </a>
            </div>
            <Reveal delay={80}>
              <InlineEstimateForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ STORY ════════ */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
              <span className="kicker mb-5">Our Story</span>
              <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-6">
                Rooted in NJ.<br /><span className="text-brand">Built on quality.</span>
              </h2>
              <div className="flex flex-col gap-4 text-ash text-base leading-relaxed">
                <p>
                  A&amp;E Exteriors LLC was founded with a simple mission: to deliver honest, high-quality exterior work to New Jersey homeowners at a fair price. We are fully licensed and insured to work throughout Passaic, Bergen, Essex, and Morris counties — and all 21 counties statewide.
                </p>
                <p>
                  We specialize in masonry, roofing, siding, gutters, chimneys, foundation repair, and waterproofing — giving homeowners a single, trusted contractor for every exterior need.
                </p>
                <p>
                  Every project gets the same craftsmanship, whether it&apos;s a small repair or a full exterior renovation. We believe in doing the job right the first time — and we don&apos;t leave until you&apos;re satisfied.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="surface-ink ticks relative overflow-hidden">
                <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />
                <div className="relative p-2">
                  <div className="px-5 py-4 border-b border-steel">
                    <span className="spec text-brand">Company Record</span>
                  </div>
                  {credentials.map((item, i) => (
                    <div key={item.label} className={`flex items-start gap-3 px-5 py-4 ${i < credentials.length - 1 ? "border-b border-steel" : ""}`}>
                      <span className="inline-flex items-center justify-center w-7 h-7 bg-brand flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </span>
                      <div>
                        <p className="spec text-bone/45">{item.label}</p>
                        <p className="text-bone text-sm font-medium mt-1">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section className="surface-brand">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/20">
            {stats.map((s) => (
              <div key={s.label} className="py-6 px-4 lg:px-8 text-center">
                <div className="font-display font-bold text-white text-5xl lg:text-6xl leading-none">{s.val}</div>
                <div className="spec text-white/70 mt-3">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ VALUES ════════ */}
      <section className="bg-concrete">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="mb-12">
            <span className="kicker mb-5">Our Values</span>
            <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
              What we stand for
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 80}>
                <div className="group h-full bg-bone hover:bg-white p-8 transition-colors">
                  <div className="ghost-num text-coal/15 text-5xl mb-5 group-hover:text-brand/30 transition-colors">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-display font-semibold uppercase text-coal text-xl tracking-[0.01em] mb-3">{v.title}</h3>
                  <p className="text-ash text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SERVICE AREAS ════════ */}
      <section className="bg-cement">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="mb-12">
            <span className="kicker mb-5">Where We Work</span>
            <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
              Serving New Jersey
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
            {serviceAreas.map((area) => (
              <Reveal key={area.county}>
                <div className="h-full bg-bone p-7">
                  <h3 className="font-display font-semibold uppercase text-brand text-lg tracking-[0.01em] mb-1">{area.county}</h3>
                  <div className="w-8 h-0.5 bg-brand mb-4" />
                  <p className="text-ash text-sm leading-relaxed">{area.cities}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/areas" className="btn btn-ink">
              All Service Areas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-24 text-center">
          <h2 className="font-display font-bold uppercase text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-5">
            Let&apos;s work together
          </h2>
          <p className="text-bone/60 text-base lg:text-lg mb-10 max-w-xl mx-auto">
            Contact A&amp;E Exteriors LLC for a free estimate. No obligation, no pressure — just honest answers.
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
