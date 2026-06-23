import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import ReviewCards from "@/components/ReviewCards";
import NJServiceMap from "@/components/NJServiceMap";
import HeroServiceSlider from "@/components/HeroServiceSlider";
import { PHONE } from "@/lib/seo-data";
import { getReviews } from "@/lib/reviews-data";
import { ArrowRight, ArrowUpRight, Phone, Star, Check, ShieldCheck, Google, serviceIcons } from "@/components/icons";

export const metadata: Metadata = {
  title: "A&E Exteriors LLC | Expert Exterior Contractor in New Jersey",
  description:
    "A&E Exteriors LLC — NJ licensed exterior contractor. Masonry, Roofing, Siding, Gutters, Chimneys, Foundation & Waterproofing. Serving all of New Jersey — Passaic, Bergen, Essex, Morris & more. Free estimates. Call 732-956-0411.",
  alternates: { canonical: "https://aeexteriorsnj.com" },
};

const work = [
  { src: "/steps/steps-1.webp", label: "Masonry Steps", area: "Passaic County", cat: "Masonry", span: "lg:col-span-7 lg:row-span-2" },
  { src: "/roofing/IMG_1985.webp", label: "Roof Replacement", area: "Bergen County", cat: "Roofing", span: "lg:col-span-5" },
  { src: "/cambridge-pavers/pavers-1.webp", label: "Paver Patio", area: "Essex County", cat: "Hardscape", span: "lg:col-span-5" },
  { src: "/chimney/chimney-1.webp", label: "Chimney Rebuild", area: "Morris County", cat: "Chimneys", span: "lg:col-span-4" },
  { src: "/foundation-waterproofing/fw-1.webp", label: "Foundation Repair", area: "Passaic County", cat: "Foundation", span: "lg:col-span-4" },
  { src: "/siding/siding-1.webp", label: "Siding Install", area: "Bergen County", cat: "Siding", span: "lg:col-span-4" },
];

const services = [
  { slug: "masonry", name: "Masonry", tag: "Steps, pavers, stucco, brick & stone — built to last generations." },
  { slug: "roofing", name: "Roofing", tag: "Full replacements & repairs. Protection from the top down." },
  { slug: "siding", name: "Siding", tag: "Beautify and protect every wall of your home." },
  { slug: "gutters", name: "Gutters", tag: "Seamless systems that divert water and protect the base." },
  { slug: "chimneys", name: "Chimneys", tag: "Rebuilds, repointing & caps — safe, sealed and sound." },
  { slug: "foundation", name: "Foundation", tag: "Stabilize and repair your home's critical structure." },
  { slug: "waterproofing", name: "Waterproofing", tag: "Interior & exterior systems built for NJ freeze-thaw." },
];

const faqs = [
  { q: "Are you licensed and insured in New Jersey?", a: "Yes. A&E Exteriors LLC is fully licensed (NJ Lic #13VH13920700) and insured. You're protected on every project, and we're happy to provide proof of coverage on request." },
  { q: "Do you offer free estimates?", a: "Always. We provide free, no-obligation on-site estimates. We walk the project with you, explain exactly what needs to be done and why, and give you a clear, written quote — no surprises." },
  { q: "What areas of New Jersey do you serve?", a: "We serve all 21 counties across New Jersey, with a primary focus on Passaic, Bergen, Essex, and Morris. If you're in NJ, we can help." },
  { q: "Do you use subcontractors?", a: "No. Every project is handled by our own crew and personally supervised by the owner from start to finish — so quality and accountability never slip." },
  { q: "How soon can you start my project?", a: "We respond fast — usually the same day — and schedule promptly. For emergencies like active leaks or storm damage, reach out right away and we'll prioritize you." },
];

export default async function HomePage() {
  const { rating, count, reviewUrl, reviews } = await getReviews();

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

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">

          {/* ── Editorial header: oversized headline, generous whitespace ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 lg:mb-16">
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
          <Reveal delay={80} className="mb-12 lg:mb-16">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-12 lg:mb-16">
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

      {/* ════════ SERVICES (index register) ════════ */}
      <section id="services" className="scroll-mt-24 bg-concrete relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">

          {/* ── Header ── */}
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
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

          {/* ── Service register: numbered editorial cards + one red anchor ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-3xl overflow-hidden border border-line shadow-soft">

            {services.map((s, i) => {
              const Icon = serviceIcons[s.slug];
              return (
                <Reveal key={s.slug} delay={i * 70}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group relative flex h-full min-h-[15rem] flex-col bg-bone p-7 lg:p-8 transition-colors duration-300 hover:bg-concrete"
                  >
                    {/* red wipe that grows up from the baseline on hover */}
                    <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-brand/[0.04] transition-all duration-500 ease-out group-hover:h-full" />

                    {/* index + hairline */}
                    <div className="relative flex items-center gap-3 mb-7">
                      <span className="spec text-stone tabular-nums transition-colors group-hover:text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-line transition-colors group-hover:bg-brand/30" />
                    </div>

                    {/* icon */}
                    <span className="relative inline-flex h-24 w-24 lg:h-28 lg:w-28 items-center justify-center mb-auto">
                      {Icon ? <Icon className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-110" /> : null}
                    </span>

                    {/* title + tag */}
                    <div className="relative mt-7">
                      <h3 className="font-display font-bold text-coal text-xl lg:text-2xl tracking-tight">{s.name}</h3>
                      <p className="text-ash text-sm leading-relaxed mt-2">{s.tag}</p>
                    </div>

                    {/* learn-more affordance */}
                    <span className="relative mt-5 inline-flex items-center gap-1.5 font-display font-semibold text-sm text-coal/0 group-hover:text-brand transition-all duration-300">
                      Learn more
                      <ArrowRight className="w-4 h-4 -translate-x-1 transition-transform duration-300 group-hover:translate-x-0" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}

            {/* RED ANCHOR — fills the 8th cell, completing the 4×2 register */}
            <Reveal delay={services.length * 70}>
              <div className="group relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden surface-brand p-7 lg:p-8">
                <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                <div className="relative">
                  <span className="spec text-white/70">One Crew · Every Layer</span>
                  <p className="font-display font-bold text-white text-xl lg:text-2xl leading-[1.15] mt-4 tracking-tight">
                    Your whole exterior, one accountable team.
                  </p>
                </div>
                <div className="relative mt-6">
                  <Link href="/contact" className="btn btn-bone w-full justify-center">
                    Get Free Estimate
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="spec text-white/60 block text-center mt-3">NJ Lic #13VH13920700</span>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ════════ SELECTED WORK ════════ */}
      <section className="bg-concrete relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-0 pb-16 lg:pb-24">

          {/* ── Header ── */}
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-12">
            <div className="max-w-2xl">
              <span className="kicker mb-5">Our Work</span>
              <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight mb-4">
                Real projects. <span className="text-brand">Real results.</span>
              </h2>
              <p className="text-ash text-base lg:text-lg leading-relaxed">Recent exterior work across New Jersey — every job by our own crew.</p>
            </div>
            <Link href="/gallery" className="group inline-flex items-center gap-2 font-display font-semibold text-coal hover:text-brand transition-colors flex-shrink-0 pb-1">
              <span className="border-b-2 border-brand/30 group-hover:border-brand pb-1 transition-colors">View Full Gallery</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          {/* ── Editorial mosaic ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 auto-rows-[13rem] lg:auto-rows-[12.5rem] gap-3 lg:gap-4">
            {work.map((w, i) => (
              <Reveal key={w.src} variant="zoom" delay={i * 110} className={`${w.span} sm:[&>*]:h-full`}>
                <Link
                  href="/gallery"
                  className="group relative flex h-full min-h-[13rem] overflow-hidden rounded-3xl ring-1 ring-coal/10 shadow-soft transition-shadow duration-500 hover:shadow-block"
                >
                  <Image
                    src={w.src}
                    alt={`${w.label} project by A&E Exteriors LLC in ${w.area}`}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  />
                  {/* legibility gradient — deepens on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />

                  {/* category chip — top left */}
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-bone/15 backdrop-blur-sm px-3 py-1 spec text-bone ring-1 ring-bone/25">
                    {w.cat}
                  </span>

                  {/* arrow chip — slides in on hover */}
                  <span className="absolute right-4 top-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand text-white opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>

                  {/* caption */}
                  <div className="relative mt-auto p-5 lg:p-6">
                    <span className="spec text-brand">{w.area}</span>
                    <p className="font-display font-bold text-bone text-xl lg:text-2xl tracking-tight mt-1.5">{w.label}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-bone/0 group-hover:text-bone/85 text-sm font-semibold transition-colors duration-300">
                      View project
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ REVIEWS ════════ */}
      <section className="bg-concrete relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-0 pb-16 lg:pb-24">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-12">
            <div className="max-w-2xl">
              <span className="kicker mb-5">Reviews</span>
              <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
                Trusted by your <span className="text-brand">neighbors</span>
              </h2>
            </div>
            {/* Google rating badge — on-brand */}
            <div className="inline-flex items-center gap-4 bg-bone border border-line rounded-2xl shadow-soft px-5 py-4 flex-shrink-0">
              <Google className="w-8 h-8" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-coal text-2xl leading-none">{rating}</span>
                  <span className="flex items-center gap-0.5 text-brand">
                    {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4" />)}
                  </span>
                </div>
                <span className="spec text-ash mt-1">Based on {count} Google reviews</span>
              </div>
            </div>
          </Reveal>

          <ReviewCards reviews={reviews} />

          <Reveal delay={160} className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red">
              <Google className="w-4 h-4" />
              Read Our Google Reviews
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <Google className="w-4 h-4" />
              Leave a Review
            </a>
          </Reveal>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="bg-concrete">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 pt-0 pb-16 lg:pb-24">
          <Reveal className="mb-10 lg:mb-12 text-center">
            <span className="kicker kicker-center mb-5">FAQ</span>
            <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
              Questions homeowners <span className="text-brand">ask</span>
            </h2>
            <p className="text-ash text-base lg:text-lg leading-relaxed mt-5 max-w-xl mx-auto">
              Straight answers about licensing, estimates, scheduling and how we work.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <FAQ items={faqs} />
            <p className="text-ash text-sm mt-10 text-center">
              Still have questions?{" "}
              <a href="tel:7329560411" className="text-brand font-semibold link-underline">Call {PHONE}</a> — we&apos;re happy to help.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════ USA MAP — home base: New Jersey ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 tex-blueprint opacity-50 tex-fade-top" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
          <Reveal className="relative z-10 text-center mb-10 lg:mb-12">
            <span className="kicker kicker-center mb-5">Where We Work</span>
            <h2 className="font-display font-bold text-bone text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
              Proudly based in <span className="text-brand">New Jersey</span>
            </h2>
            <p className="text-bone/65 text-base lg:text-lg leading-relaxed mt-5 max-w-xl mx-auto">
              A&amp;E Exteriors is a licensed New Jersey contractor — serving all 21 counties, from the Hudson to the Shore.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <NJServiceMap />
          </Reveal>

          <Reveal delay={200} className="flex items-center justify-center gap-2 mt-10 text-bone/70">
            <ShieldCheck className="w-4 h-4 text-brand" />
            <span className="spec text-bone/60">NJ Lic #13VH13920700 · Licensed &amp; Insured · All 21 Counties</span>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
