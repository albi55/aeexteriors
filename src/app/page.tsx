import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import FeaturableReviews from "@/components/FeaturableReviews";
import HeroServiceSlider from "@/components/HeroServiceSlider";
import { PHONE } from "@/lib/seo-data";
import { ArrowRight, Phone, Star, Check, ShieldCheck, serviceIcons } from "@/components/icons";

export const metadata: Metadata = {
  title: "A&E Exteriors LLC | Expert Exterior Contractor in New Jersey",
  description:
    "A&E Exteriors LLC — NJ licensed exterior contractor. Masonry, Roofing, Siding, Gutters, Chimneys, Foundation & Waterproofing. Serving all of New Jersey — Passaic, Bergen, Essex, Morris & more. Free estimates. Call 732-956-0411.",
  alternates: { canonical: "https://aeexteriorsnj.com" },
};

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

export default function HomePage() {
  return (
    <div className="bg-concrete">

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/showcase/home.png" alt="Luxury New Jersey home with stone masonry, siding, and a new roof by A&E Exteriors LLC" fill priority className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-transparent to-ink/30" />

        <div className="relative z-10 flex items-center min-h-[80vh] lg:min-h-[92vh] max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-40 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center w-full">
            {/* Left — copy + trust */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-white/90 text-xs font-semibold tracking-[0.12em] uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                Family Owned · Est. New Jersey · Lic #13VH13920700
              </span>
              <h1 className="font-display font-extrabold text-bone text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
                Exterior work
                <br />
                built to <span className="text-brand">last.</span>
              </h1>
              <p className="text-bone/75 text-base lg:text-lg max-w-xl mt-7 leading-relaxed">
                A family-owned, owner-supervised New Jersey contractor for masonry, roofing, siding, gutters,
                chimneys, foundation &amp; waterproofing. No subcontractors — just honest work, done right the first time.
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

              {/* Trust strip */}
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-4 mt-10 pt-8 border-t border-white/15">
                {[
                  { t: "Family Owned", d: "& operated" },
                  { t: "Licensed & Insured", d: `NJ #13VH13920700` },
                  { t: "Free Estimates", d: "No obligation" },
                  { t: "5.0★ Rated", d: "By NJ homeowners" },
                ].map((f) => (
                  <li key={f.t} className="flex items-start gap-2.5">
                    <span className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand/20 text-brand flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="leading-tight">
                      <span className="block font-display font-bold text-bone text-sm">{f.t}</span>
                      <span className="block text-bone/55 text-xs">{f.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — auto-sliding service cards */}
            <div className="relative w-full lg:max-w-sm lg:ml-auto lg:mr-2">
              <HeroServiceSlider />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ABOUT ════════ */}
      <section className="relative overflow-hidden bg-concrete tex-grain">
        {/* faint blueprint wash + soft top fade keep the canvas premium, never busy */}
        <div className="pointer-events-none absolute inset-0 z-0 tex-blueprint-dark tex-fade-top opacity-[0.45]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-36">

          {/* ── Editorial header: oversized headline, generous whitespace ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-16 lg:mb-24">
            <Reveal className="lg:col-span-7">
              <span className="kicker mb-7">Who We Are</span>
              <h2 className="font-display font-bold text-coal text-[2.6rem] sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
                Built on grit.
                <br />
                <span className="text-brand">Backed by license.</span>
              </h2>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5 lg:pb-2">
              {/* thin red accent rule — the single editorial flourish */}
              <span className="block h-px w-16 bg-brand mb-6" />
              <p className="text-ash text-base lg:text-lg leading-relaxed mb-5">
                A&amp;E Exteriors LLC is a family-owned, New Jersey licensed exterior contractor serving homeowners
                across all 21 counties — every project personally supervised by the owner, start to final walkthrough.
              </p>
              <p className="text-ash text-base leading-relaxed">
                No subcontractors. No shortcuts. No surprises — just honest, dependable craftsmanship from a crew that
                treats your home like its own and stands behind the work long after the job is done.
              </p>
            </Reveal>
          </div>

          {/* ── One beautiful large image in a refined rounded frame ── */}
          <Reveal delay={80} className="mb-16 lg:mb-24">
            <figure className="relative">
              <div className="group relative aspect-[16/10] sm:aspect-[2/1] lg:aspect-[21/9] rounded-3xl overflow-hidden shadow-block ring-1 ring-line">
                <Image
                  src="/showcase/home-case.png"
                  alt="Showcase of finished New Jersey homes — modern colonials, custom transitionals and high-contrast estates by A&E Exteriors LLC"
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 1100px"
                />
                {/* gentle bottom gradient for caption legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-coal/55 via-coal/0 to-transparent" />
                {/* restrained corner credential chip */}
                <div className="absolute left-4 top-4 sm:left-6 sm:top-6 inline-flex items-center gap-2 rounded-full bg-bone/90 backdrop-blur px-3.5 py-1.5 shadow-soft">
                  <ShieldCheck className="w-4 h-4 text-brand" />
                  <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-coal">Est. New Jersey · Lic #13VH13920700</span>
                </div>
                {/* understated caption */}
                <figcaption className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between gap-4">
                  <span className="font-display text-bone text-lg sm:text-xl leading-tight">A complete exterior, finished by one accountable crew.</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-bone/15 backdrop-blur px-3 py-1 text-bone text-xs font-semibold ring-1 ring-bone/25">
                    <Star className="w-3.5 h-3.5 text-brand" />
                    5.0 rated
                  </span>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          {/* ── Owner quote (italic) + signature, beside trust pillars ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 lg:mb-24">
            <Reveal className="lg:col-span-6">
              <span className="block h-px w-16 bg-brand mb-7" />
              <blockquote className="font-display text-coal text-2xl sm:text-3xl lg:text-[2.1rem] leading-snug italic">
                &ldquo;If my name is on it, I&rsquo;m on the job. We build every home like it&rsquo;s ours — and we don&rsquo;t leave until it&rsquo;s right.&rdquo;
              </blockquote>
              <div className="mt-7 flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full surface-ink font-display text-base">AE</span>
                <div className="leading-tight">
                  <div className="font-display text-coal text-base font-bold">The A&amp;E Exteriors Family</div>
                  <div className="text-stone text-sm">Owner-operators · Serving NJ homeowners</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                <li className="border-t border-line pt-5">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand text-white mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <h3 className="font-display text-coal text-base font-bold mb-1">Owner-supervised</h3>
                  <p className="text-ash text-sm leading-relaxed">Hands-on oversight on every single project — no subcontractors.</p>
                </li>
                <li className="border-t border-line pt-5">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-coal text-white mb-3">
                    <Check className="w-5 h-5" />
                  </span>
                  <h3 className="font-display text-coal text-base font-bold mb-1">Licensed &amp; insured</h3>
                  <p className="text-ash text-sm leading-relaxed">Fully covered in New Jersey — Lic #13VH13920700.</p>
                </li>
                <li className="border-t border-line pt-5">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-coal text-white mb-3">
                    <Check className="w-5 h-5" />
                  </span>
                  <h3 className="font-display text-coal text-base font-bold mb-1">Transparent pricing</h3>
                  <p className="text-ash text-sm leading-relaxed">Clear, detailed estimates with no hidden costs or surprises.</p>
                </li>
                <li className="border-t border-line pt-5">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-coal text-white mb-3">
                    <Check className="w-5 h-5" />
                  </span>
                  <h3 className="font-display text-coal text-base font-bold mb-1">Premium materials</h3>
                  <p className="text-ash text-sm leading-relaxed">Freeze-thaw rated systems built for New Jersey winters.</p>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* ── CTAs ── */}
          <Reveal delay={140} className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/about" className="btn btn-ink">
              More About Us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn btn-outline">Get a Free Estimate</Link>
            <span className="hidden sm:inline-flex items-center gap-2 text-ash text-sm sm:ml-2">
              <Phone className="w-4 h-4 text-brand" />
              Family-owned · Free, no-pressure estimates
            </span>
          </Reveal>
        </div>
      </section>

      {/* ════════ SERVICES (bento) ════════ */}
      <section id="services" className="scroll-mt-24 bg-concrete relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">

          {/* ── Minimal header ── */}
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-14">
            <div className="max-w-2xl">
              <span className="kicker mb-5">What We Do</span>
              <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.04] tracking-tight">
                Full-service exterior contracting
              </h2>
              <p className="text-ash text-base lg:text-lg leading-relaxed mt-5">
                From the roofline down to the foundation, one accountable crew handles every layer of your home&apos;s exterior.
              </p>
            </div>
            <Link href="/services" className="group inline-flex items-center gap-2 font-display font-semibold text-coal hover:text-brand transition-colors flex-shrink-0 pb-1">
              <span className="border-b-2 border-brand/30 group-hover:border-brand pb-1 transition-colors">All Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          {/* ── Bento grid: 1-col stack (mobile) / 2-col (sm) / asymmetric 4-col (lg) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-fr">

            {/* MASONRY — wide hero tile */}
            <Reveal delay={0} className="sm:col-span-2 lg:col-span-2">
              <Link href="/services/masonry" className="group relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-3xl bg-bone border border-line shadow-soft p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-block hover:border-stone/40">
                <div className="flex items-start justify-between gap-6">
                  <span className="relative inline-flex h-20 w-20 lg:h-24 lg:w-24 items-center justify-center overflow-hidden rounded-2xl bg-concrete ring-1 ring-line shrink-0">
                    {(() => { const Icon = serviceIcons["masonry"]; return Icon ? <Icon className="w-full h-full scale-[1.35]" /> : null; })()}
                  </span>
                  <span className="spec text-stone pt-1">01 / 07</span>
                </div>
                <div className="mt-6">
                  <h3 className="font-display font-bold text-coal text-2xl lg:text-3xl">Masonry</h3>
                  <p className="text-ash text-sm lg:text-base leading-relaxed mt-2 max-w-md">
                    Built to last for generations — steps, pavers, stucco, brick &amp; stone.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-display font-semibold text-sm text-brand">
                    Learn more
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* ROOFING */}
            <Reveal delay={80} className="lg:col-span-1">
              <Link href="/services/roofing" className="group relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-3xl bg-bone border border-line shadow-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-block hover:border-stone/40">
                <span className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-concrete ring-1 ring-line">
                  {(() => { const Icon = serviceIcons["roofing"]; return Icon ? <Icon className="w-full h-full scale-[1.3]" /> : null; })()}
                </span>
                <div className="mt-6">
                  <h3 className="font-display font-bold text-coal text-xl">Roofing</h3>
                  <p className="text-ash text-sm leading-relaxed mt-1.5">Protection from the top down.</p>
                </div>
                <ArrowRight className="absolute right-6 bottom-6 w-4 h-4 text-stone transition-all duration-300 group-hover:text-brand group-hover:translate-x-1" />
              </Link>
            </Reveal>

            {/* RED ANCHOR — value prop + CTA, tall on lg; falls to end on mobile */}
            <Reveal delay={160} className="order-last sm:order-none sm:col-span-2 lg:col-span-1 lg:row-span-3">
              <div className="group relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-3xl surface-brand shadow-block p-8">
                <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                <div className="relative">
                  <span className="spec text-white/70">One Crew · Every Layer</span>
                  <p className="font-display font-bold text-white text-2xl lg:text-[1.8rem] leading-[1.12] mt-4">
                    Your whole exterior, handled by one accountable team.
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed mt-4 max-w-xs">
                    Owner-supervised, NJ licensed &amp; insured. No subcontractors, no hand-offs — just honest work, done right.
                  </p>
                </div>
                <div className="relative mt-8 flex flex-col gap-3">
                  <Link href="/contact" className="btn btn-bone justify-center">
                    Get Free Estimate
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="spec text-white/60 text-center">NJ Lic #13VH13920700</span>
                </div>
              </div>
            </Reveal>

            {/* SIDING */}
            <Reveal delay={120} className="lg:col-span-1">
              <Link href="/services/siding" className="group relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-3xl bg-bone border border-line shadow-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-block hover:border-stone/40">
                <span className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-concrete ring-1 ring-line">
                  {(() => { const Icon = serviceIcons["siding"]; return Icon ? <Icon className="w-full h-full scale-[1.3]" /> : null; })()}
                </span>
                <div className="mt-6">
                  <h3 className="font-display font-bold text-coal text-xl">Siding</h3>
                  <p className="text-ash text-sm leading-relaxed mt-1.5">Beautify &amp; protect.</p>
                </div>
                <ArrowRight className="absolute right-6 bottom-6 w-4 h-4 text-stone transition-all duration-300 group-hover:text-brand group-hover:translate-x-1" />
              </Link>
            </Reveal>

            {/* GUTTERS */}
            <Reveal delay={200} className="lg:col-span-1">
              <Link href="/services/gutters" className="group relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-3xl bg-bone border border-line shadow-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-block hover:border-stone/40">
                <span className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-concrete ring-1 ring-line">
                  {(() => { const Icon = serviceIcons["gutters"]; return Icon ? <Icon className="w-full h-full scale-[1.3]" /> : null; })()}
                </span>
                <div className="mt-6">
                  <h3 className="font-display font-bold text-coal text-xl">Gutters</h3>
                  <p className="text-ash text-sm leading-relaxed mt-1.5">Divert water, protect the base.</p>
                </div>
                <ArrowRight className="absolute right-6 bottom-6 w-4 h-4 text-stone transition-all duration-300 group-hover:text-brand group-hover:translate-x-1" />
              </Link>
            </Reveal>

            {/* CHIMNEYS — dark accent tile */}
            <Reveal delay={240} className="lg:col-span-1">
              <Link href="/services/chimneys" className="group relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-3xl surface-ink shadow-block p-7 transition-all duration-300 hover:-translate-y-1">
                <span className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-bone ring-1 ring-black/5">
                  {(() => { const Icon = serviceIcons["chimneys"]; return Icon ? <Icon className="w-full h-full scale-[1.3]" /> : null; })()}
                </span>
                <div className="mt-6">
                  <h3 className="font-display font-bold text-bone text-xl">Chimneys</h3>
                  <p className="text-stone text-sm leading-relaxed mt-1.5">Safe, sealed &amp; sound.</p>
                </div>
                <ArrowRight className="absolute right-6 bottom-6 w-4 h-4 text-stone transition-all duration-300 group-hover:text-brand group-hover:translate-x-1" />
              </Link>
            </Reveal>

            {/* FOUNDATION */}
            <Reveal delay={280} className="lg:col-span-1">
              <Link href="/services/foundation" className="group relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-3xl bg-bone border border-line shadow-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-block hover:border-stone/40">
                <span className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-concrete ring-1 ring-line">
                  {(() => { const Icon = serviceIcons["foundation"]; return Icon ? <Icon className="w-full h-full scale-[1.3]" /> : null; })()}
                </span>
                <div className="mt-6">
                  <h3 className="font-display font-bold text-coal text-xl">Foundation</h3>
                  <p className="text-ash text-sm leading-relaxed mt-1.5">Your home&apos;s critical structure.</p>
                </div>
                <ArrowRight className="absolute right-6 bottom-6 w-4 h-4 text-stone transition-all duration-300 group-hover:text-brand group-hover:translate-x-1" />
              </Link>
            </Reveal>

            {/* WATERPROOFING — wide closer */}
            <Reveal delay={320} className="sm:col-span-2 lg:col-span-2">
              <Link href="/services/waterproofing" className="group relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-3xl bg-bone border border-line shadow-soft p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-block hover:border-stone/40">
                <div className="flex items-start justify-between gap-6">
                  <span className="relative inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-concrete ring-1 ring-line shrink-0">
                    {(() => { const Icon = serviceIcons["waterproofing"]; return Icon ? <Icon className="w-full h-full scale-[1.35]" /> : null; })()}
                  </span>
                  <span className="spec text-stone pt-1">07 / 07</span>
                </div>
                <div className="mt-6">
                  <h3 className="font-display font-bold text-coal text-2xl">Waterproofing</h3>
                  <p className="text-ash text-sm lg:text-base leading-relaxed mt-2 max-w-md">
                    Keep water out for good — interior &amp; exterior systems built for NJ freeze-thaw.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-display font-semibold text-sm text-brand">
                    Learn more
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="group relative h-full bg-bone border border-line rounded-2xl shadow-soft hover:shadow-block hover:-translate-y-1 transition-all duration-300 p-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand text-white font-display font-bold text-lg mb-6">{s.n}</div>
                  <h3 className="font-display font-bold text-coal text-xl mb-3">{s.t}</h3>
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
      <section className="bg-concrete relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <span className="kicker mb-5">Reviews</span>
              <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                Trusted by your neighbors
              </h2>
            </div>
            <div className="flex items-center gap-3 bg-bone border border-line rounded-full shadow-soft px-5 py-3">
              <div className="flex items-center gap-1 text-brand">
                {Array(5).fill(0).map((_, i) => <Star key={i} className="w-5 h-5" />)}
              </div>
              <span className="font-display font-bold text-coal text-2xl">5.0</span>
              <span className="spec text-ash">Google</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <FeaturableReviews />
          </Reveal>
          <div className="mt-10">
            <Link href="/reviews" className="btn btn-red">
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
