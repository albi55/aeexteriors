import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import FeaturableReviews from "@/components/FeaturableReviews";
import { services as allServices, PHONE } from "@/lib/seo-data";
import { ArrowRight, Phone, Star, Check, ShieldCheck, serviceIcons } from "@/components/icons";

export const metadata: Metadata = {
  title: "A&E Exteriors LLC | Expert Exterior Contractor in New Jersey",
  description:
    "A&E Exteriors LLC — NJ licensed exterior contractor. Masonry, Roofing, Siding, Gutters, Chimneys, Foundation & Waterproofing. Serving all of New Jersey — Passaic, Bergen, Essex, Morris & more. Free estimates. Call 732-956-0411.",
  alternates: { canonical: "https://aeexteriorsnj.com" },
};

const services = allServices.slice(0, 7);

const steps = [
  { n: "01", t: "Call or Request", d: "Pick up the phone or send the form. We respond fast — usually the same day." },
  { n: "02", t: "Free On-Site Estimate", d: "We walk the project with you and hand you a clear, written, itemized quote." },
  { n: "03", t: "Schedule the Crew", d: "Pick a date that works. We show up on time with materials and crew ready." },
  { n: "04", t: "We Build It Right", d: "Quality work, clean job site — we don't leave until you're satisfied." },
];

const work = [
  { src: "/steps/steps-1.webp", label: "Masonry Steps", area: "Passaic County" },
  { src: "/roofing/IMG_1985.webp", label: "Roof Replacement", area: "Bergen County" },
  { src: "/cambridge-pavers/pavers-1.webp", label: "Paver Patio", area: "Essex County" },
  { src: "/chimney/chimney-1.webp", label: "Chimney Rebuild", area: "Morris County" },
  { src: "/foundation-waterproofing/fw-1.webp", label: "Foundation Repair", area: "Passaic County" },
  { src: "/siding/siding-1.webp", label: "Siding Install", area: "Bergen County" },
];

const counties = [
  { name: "Passaic", primary: true }, { name: "Bergen", primary: true }, { name: "Essex", primary: true }, { name: "Morris", primary: true },
  { name: "Hudson" }, { name: "Union" }, { name: "Middlesex" }, { name: "Somerset" }, { name: "Monmouth" }, { name: "Ocean" },
  { name: "Mercer" }, { name: "Sussex" }, { name: "Warren" }, { name: "Hunterdon" }, { name: "Burlington" }, { name: "Camden" },
];

const faqs = [
  { q: "Are you licensed and insured in New Jersey?", a: "Yes. A&E Exteriors LLC is fully licensed (NJ Lic #13VH13920700) and insured. You're protected on every project, and we're happy to provide proof of coverage on request." },
  { q: "Do you offer free estimates?", a: "Always. We provide free, no-obligation on-site estimates. We walk the project with you, explain exactly what needs to be done and why, and give you a clear, written quote — no surprises." },
  { q: "What areas of New Jersey do you serve?", a: "We serve all 21 counties across New Jersey, with a primary focus on Passaic, Bergen, Essex, and Morris. If you're in NJ, we can help." },
  { q: "Do you use subcontractors?", a: "No. Every project is handled by our own crew and personally supervised by the owner from start to finish — so quality and accountability never slip." },
  { q: "How soon can you start my project?", a: "We respond fast — usually the same day — and schedule promptly. For emergencies like active leaks or storm damage, reach out right away and we'll prioritize you." },
];

const marquee = ["Masonry", "Roofing", "Siding", "Gutters", "Chimneys", "Foundation", "Waterproofing", "Free Estimates", "NJ Licensed", "Owner-Supervised", "No Subcontractors"];

const heroStats = [
  { v: "5.0★", l: "Homeowner Rating" },
  { v: "21", l: "NJ Counties" },
  { v: "100%", l: "Licensed & Insured" },
  { v: "7+", l: "Core Services" },
];

export default function HomePage() {
  return (
    <div className="bg-concrete">

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        {/* swap-in point for Higgsfield hero art → /public/ai/hero.webp */}
        <div className="absolute inset-0">
          <Image src="/chimney/chimney-1.webp" alt="A&E Exteriors LLC exterior masonry and roofing work on a New Jersey home" fill priority className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        <div className="absolute inset-0 tex-blueprint opacity-40 tex-fade-top pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-0">
          <div className="max-w-3xl pb-16 lg:pb-24">
            <span className="kicker mb-6">EST. New Jersey · Lic #13VH13920700</span>
            <h1 className="font-display font-bold uppercase text-bone text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.015em]">
              Exterior work
              <br />
              built to <span className="text-brand">last.</span>
            </h1>
            <p className="text-bone/65 text-base lg:text-lg max-w-xl mt-7 leading-relaxed">
              Masonry, roofing, siding, gutters, chimneys, foundation &amp; waterproofing — across all of New Jersey.
              Owner-supervised, no subcontractors, done right the first time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-9">
              <Link href="/contact" className="btn btn-red">
                Get Free Estimate
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:7329560411" className="btn btn-outline-bone">
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>
          </div>
        </div>

        {/* Blueprint title-block stat strip */}
        <div className="relative z-10 border-t border-steel bg-ink/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-2 lg:grid-cols-4 divide-x divide-steel">
            {heroStats.map((s) => (
              <div key={s.l} className="py-6 px-4 lg:px-6 first:pl-0">
                <div className="font-display font-bold text-bone text-3xl lg:text-4xl leading-none">{s.v}</div>
                <div className="spec text-bone/45 mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TRUST MARQUEE ════════ */}
      <section className="surface-brand py-5 overflow-hidden">
        <div className="marquee-mask">
          <div className="flex w-max animate-marquee">
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i} className="flex items-center gap-7 px-7">
                <span className="font-display uppercase text-white/95 text-xl tracking-[0.04em] whitespace-nowrap">{m}</span>
                <span className="text-white/40">✕</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ ABOUT ════════ */}
      <section className="bg-concrete">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal className="relative">
              <div className="ticks relative aspect-[4/3] overflow-hidden shadow-block">
                <Image src="/steps/steps-8.webp" alt="A&E Exteriors LLC crew building masonry steps on a New Jersey home" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-3 sm:right-6 surface-ink shadow-block px-7 py-5 ticks">
                <div className="font-display font-bold text-brand text-5xl leading-none">21</div>
                <div className="spec text-bone/55 mt-2 max-w-[8rem]">NJ Counties Served · Fully Licensed</div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <span className="kicker mb-5">Who We Are</span>
              <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-6">
                Built on grit.
                <br />
                <span className="text-brand">Backed by license.</span>
              </h2>
              <p className="text-ash text-base leading-relaxed mb-8 max-w-lg">
                A&amp;E Exteriors LLC is a locally owned, NJ licensed exterior contractor. Every project gets our
                full attention — no subcontractors, no shortcuts, no surprises. Just honest work from a crew
                that treats your home like its own.
              </p>
              <ul className="space-y-3 mb-9">
                {[
                  "Owner-supervised on every single project",
                  "Fully licensed & insured — NJ Lic #13VH13920700",
                  "Honest, transparent pricing with no hidden costs",
                  "Premium materials rated for NJ freeze-thaw",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 bg-brand/10 text-brand">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-coal/80 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/about" className="btn btn-ink">
                  More About Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="btn btn-outline">Get a Free Estimate</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ SERVICES ════════ */}
      <section id="services" className="scroll-mt-24 surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="kicker mb-5">What We Do</span>
              <h2 className="font-display font-bold uppercase text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
                Full-service exterior contracting
              </h2>
              <p className="text-bone/55 text-base leading-relaxed mt-5">
                From the roofline down to the foundation, we handle every part of your home&apos;s exterior with one trusted, owner-supervised crew.
              </p>
            </div>
            <Link href="/services" className="btn btn-bone flex-shrink-0">
              All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-steel border border-steel">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.slug];
              return (
                <Reveal key={s.slug} delay={(i % 3) * 80}>
                  <Link href={`/services/${s.slug}`} className="group relative h-full bg-coal hover:bg-char transition-colors p-8 flex flex-col">
                    <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-500 group-hover:w-full" aria-hidden="true" />
                    <div className="flex items-start justify-between mb-7">
                      <span className="inline-flex items-center justify-center w-12 h-12 border-2 border-steel text-brand group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-colors">
                        {Icon ? <Icon className="w-6 h-6" /> : null}
                      </span>
                      <span className="spec text-bone/30">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-display font-semibold uppercase text-bone text-2xl tracking-[0.01em] mb-2 group-hover:text-brand transition-colors">{s.title}</h3>
                    <p className="text-bone/50 text-sm leading-relaxed mb-5 flex-1">{s.tagline}</p>
                    <span className="inline-flex items-center gap-2 spec text-bone/60 group-hover:text-brand transition-colors">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
            {/* And More tile */}
            <Reveal delay={160}>
              <Link href="/services" className="group relative h-full surface-brand p-8 flex flex-col justify-between min-h-[220px]">
                <span className="spec text-white/70">08 / +</span>
                <div>
                  <h3 className="font-display font-bold uppercase text-white text-2xl tracking-[0.01em] mb-2">And more</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-5">Concrete slabs, pavers, stucco, steps, basement doors — full-service exterior contracting.</p>
                  <span className="inline-flex items-center gap-2 spec text-white">View all <ArrowRight className="w-4 h-4" /></span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ PROCESS ════════ */}
      <section className="bg-concrete">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="max-w-2xl mb-14">
            <span className="kicker mb-5">How It Works</span>
            <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
              From call to completion
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="group relative h-full bg-bone p-8 transition-colors hover:bg-white">
                  <div className="ghost-num text-coal/15 text-6xl mb-6 group-hover:text-brand/30 transition-colors">{s.n}</div>
                  <h3 className="font-display font-semibold uppercase text-coal text-xl tracking-[0.01em] mb-3">{s.t}</h3>
                  <p className="text-ash text-sm leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SELECTED WORK ════════ */}
      <section className="bg-cement">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <span className="kicker mb-5">Our Work</span>
              <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-3">
                Real projects. Real results.
              </h2>
              <p className="text-ash text-base">Recent exterior work across New Jersey.</p>
            </div>
            <Link href="/gallery" className="btn btn-ink flex-shrink-0">
              Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {work.map((w, i) => (
              <Reveal key={w.src} delay={(i % 3) * 80}>
                <Link href="/gallery" className={`group relative block overflow-hidden ticks ${i === 0 ? "lg:col-span-2 aspect-[2/1.2]" : "aspect-[4/3]"}`}>
                  <Image src={w.src} alt={`${w.label} project by A&E Exteriors LLC in ${w.area}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="spec text-brand">{w.area}</span>
                    <p className="font-display font-semibold uppercase text-bone text-lg lg:text-xl tracking-[0.01em] mt-1">{w.label}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ REVIEWS ════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <span className="kicker mb-5">Reviews</span>
              <h2 className="font-display font-bold uppercase text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
                Trusted by your neighbors
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-brand">
                {Array(5).fill(0).map((_, i) => <Star key={i} className="w-5 h-5" />)}
              </div>
              <span className="font-display font-bold text-bone text-2xl">5.0</span>
              <span className="spec text-bone/45">Google</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <FeaturableReviews />
          </Reveal>
          <div className="mt-10">
            <Link href="/reviews" className="btn btn-bone">
              Read All Reviews
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ SERVICE AREAS ════════ */}
      <section className="bg-concrete">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <span className="kicker mb-5">Service Areas</span>
              <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-5">
                Serving all of <span className="text-brand">New Jersey</span>
              </h2>
              <p className="text-ash text-base leading-relaxed mb-8 max-w-lg">
                Based in North Haledon and covering all 21 counties — from Passaic and Bergen to the Jersey Shore.
                Wherever you are in NJ, A&amp;E Exteriors is close by.
              </p>
              <Link href="/areas" className="btn btn-ink">
                All Service Areas
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
            <Reveal delay={100} className="flex flex-wrap gap-2">
              {counties.map((c) => (
                <Link
                  key={c.name}
                  href="/areas"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-display uppercase tracking-[0.02em] transition-all ${
                    c.primary
                      ? "bg-brand text-white"
                      : "bg-bone text-coal/75 border border-line hover:border-brand hover:text-brand"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 ${c.primary ? "bg-white" : "bg-brand"}`} />
                  {c.name}
                </Link>
              ))}
              <span className="inline-flex items-center px-4 py-2.5 spec text-ash">+ all 21 counties</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="bg-bone">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="mb-12">
            <span className="kicker mb-5">FAQ</span>
            <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
              Questions homeowners ask
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <FAQ items={faqs} />
            <p className="text-ash text-sm mt-10">
              Still have questions?{" "}
              <a href="tel:7329560411" className="text-brand font-semibold link-underline">Call {PHONE}</a> — we&apos;re happy to help.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section className="relative surface-brand overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/roofing/IMG_1990.webp" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand/80 via-brand-deep/90 to-ink/95" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-32 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 mb-6 justify-center">
              <span className="h-px w-8 bg-white/60" />
              <span className="spec text-white">Free Estimates · No Obligation</span>
              <span className="h-px w-8 bg-white/60" />
            </span>
            <h2 className="font-display font-bold uppercase text-white text-4xl sm:text-5xl lg:text-7xl leading-[0.92] tracking-[-0.015em] mb-6">
              Ready to start
              <br />
              your project?
            </h2>
            <p className="text-white/85 text-base lg:text-lg mb-10 max-w-xl mx-auto">
              NJ licensed contractor serving all 21 counties. Let&apos;s get yours started.
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
            <div className="flex items-center justify-center gap-2 mt-8 text-white/80">
              <ShieldCheck className="w-4 h-4" />
              <span className="spec text-white/70">NJ Lic #13VH13920700 · Licensed &amp; Insured</span>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
