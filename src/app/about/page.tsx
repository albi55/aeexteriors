import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import { ArrowRight, ArrowUpRight, Phone, Check, ShieldCheck, MapPin } from "@/components/icons";
import { PHONE } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about A&E Exteriors LLC — a NJ licensed exterior contractor serving all of New Jersey. Masonry, roofing, siding, gutters, chimneys, foundation & waterproofing. NJ Lic #13VH13920700.",
  alternates: { canonical: "https://aeexteriorsnj.com/about" },
};

const values = [
  { title: "Honest Pricing", desc: "A clear, itemized estimate up front — and the number we quote is the number you pay. No upsells, no surprise line items, no games." },
  { title: "Owner On Site", desc: "The owner is on every job from first walkthrough to final cleanup. You always know who's accountable for the work on your home." },
  { title: "Licensed & Insured", desc: "Fully licensed in New Jersey (Lic #13VH13920700) and carrying general liability and workers' comp — proof of coverage on request." },
  { title: "We Pick Up The Phone", desc: "We answer when you call, show up when we say we will, and keep you in the loop at every stage — no chasing us down." },
  { title: "We Leave It Spotless", desc: "Your home is your home. We protect your landscaping, haul away every scrap, and leave the site cleaner than we found it." },
  { title: "Built For NJ Weather", desc: "Freeze-thaw cycles, nor'easters, humid summers — we use materials and methods proven to hold up to New Jersey's seasons." },
];

const serviceAreas = [
  { county: "Passaic County", cities: "North Haledon, Haledon, Paterson, Wayne, Clifton, Hawthorne, Totowa, Woodland Park" },
  { county: "Bergen County", cities: "Ridgewood, Fair Lawn, Hackensack, Paramus, Ramsey, Mahwah, Lodi" },
  { county: "Essex County", cities: "Montclair, Bloomfield, Nutley, Belleville, East Orange, West Orange, Verona" },
  { county: "Morris County", cities: "Morristown, Parsippany, Rockaway, Dover, Denville, Boonton, Randolph" },
];

const stats = [
  { to: 7, suffix: "+", label: "Exterior Services" },
  { to: 21, suffix: "", label: "NJ Counties Served" },
  { to: 0, suffix: "", label: "Subcontractors", display: "Zero" },
  { to: 100, suffix: "%", label: "Owner-Supervised" },
];

const promises = [
  "Family-owned & owner-supervised — the same crew, start to finish.",
  "Free, no-pressure estimates with a price that doesn't change.",
  "Fully licensed & insured across all 21 New Jersey counties.",
];

export default function AboutPage() {
  return (
    <div className="bg-concrete">

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/showcase/home.png"
            alt="Luxury New Jersey home with stone masonry, siding, and a new roof by A&E Exteriors LLC"
            fill
            priority
            className="object-cover animate-[heroPan_20s_ease-in-out_infinite_alternate]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <div className="absolute inset-0 tex-blueprint opacity-40 tex-fade-top pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="kicker mb-6">Who We Are</span>
              <h1 className="font-display font-bold uppercase text-bone text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.015em] mb-6">
                A family name<br />on every <span className="text-brand">job.</span>
              </h1>
              <p className="text-bone/70 text-base lg:text-lg max-w-md mb-8">
                A&amp;E Exteriors is a family-owned, New Jersey licensed contractor. We do the work ourselves, we answer to you directly, and we don&apos;t leave until your home is done right.
              </p>
              <ul className="flex flex-col gap-3 mb-9 max-w-md">
                {promises.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-bone/80 text-sm">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand/20 text-brand flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href="tel:7329560411" className="btn btn-red">
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </a>
                <Link href="/contact" className="btn btn-outline-bone">
                  Free Estimate
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <Reveal delay={80}>
              <InlineEstimateForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ STATS BAND ════════ */}
      <section className="surface-brand relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-white/15 lg:divide-y-0">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="py-6 px-4 lg:px-8 text-center">
                  <div className="font-display font-bold text-white text-5xl lg:text-6xl leading-none tabular-nums">
                    <CountUp to={s.to} suffix={s.suffix} display={s.display} />
                  </div>
                  <div className="spec text-white/75 mt-3">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ STORY ════════ */}
      <section className="bg-bone overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image collage */}
            <Reveal variant="zoom">
              <div className="relative">
                <div className="ticks relative aspect-[4/5] shadow-block">
                  <Image
                    src="/about/about.png"
                    alt="A&E Exteriors LLC branded van parked at a finished masonry and siding project in New Jersey"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" aria-hidden="true" />
                </div>
                {/* Floating license chip */}
                <div className="absolute -bottom-5 -right-3 sm:-right-5 surface-ink shadow-block rounded-[var(--radius)] px-5 py-4 flex items-center gap-3 max-w-[15rem] animate-floaty">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </span>
                  <div>
                    <p className="spec text-brand leading-none">NJ Licensed</p>
                    <p className="text-bone text-sm font-semibold mt-1 leading-tight">#13VH13920700</p>
                  </div>
                </div>
                {/* Decorative corner accent */}
                <div className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-brand rounded-tl-[var(--radius-lg)] pointer-events-none" aria-hidden="true" />
              </div>
            </Reveal>

            {/* Story text */}
            <div>
              <Reveal>
                <span className="kicker mb-5">Our Story</span>
                <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-6">
                  Built by a family<br /><span className="text-brand">that shows up.</span>
                </h2>
                <div className="flex flex-col gap-4 text-ash text-base leading-relaxed">
                  <p>
                    A&amp;E Exteriors started with a simple frustration: too many homeowners get a polished sales pitch, then never see the same crew twice. We built our company to be the opposite — a family-run team where the people who quote your project are the people who actually do the work.
                  </p>
                  <p>
                    We handle the whole exterior under one roof — masonry, roofing, siding, gutters, chimneys, foundation repair, and waterproofing — so you have one accountable contractor instead of juggling five. No subcontractors, no finger-pointing, no &ldquo;that&apos;s not our part of the job.&rdquo;
                  </p>
                  <p>
                    From a single cracked step to a full exterior renovation, every project gets the same care and the same standard. We do it right the first time, we clean up after ourselves, and we stand behind the work long after the final invoice.
                  </p>
                </div>
                <blockquote className="mt-8 pt-6 border-t border-line">
                  <p className="font-display text-coal text-lg sm:text-xl leading-snug italic">
                    &ldquo;If our name is on the truck, we&apos;re on the job. We treat every home like it&apos;s ours.&rdquo;
                  </p>
                  <footer className="mt-3 flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full surface-ink font-display text-sm">AE</span>
                    <span className="text-sm leading-tight">
                      <span className="block font-display font-bold text-coal">The A&amp;E Exteriors Family</span>
                      <span className="block text-ash">Owner-operators · North Haledon, NJ</span>
                    </span>
                  </footer>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ VALUES ════════ */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20">
            {/* Sticky header */}
            <div>
              <Reveal className="lg:sticky lg:top-32">
                <span className="kicker mb-5">Our Values</span>
                <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
                  How we earn<br /><span className="text-brand">your trust</span>
                </h2>
                <p className="text-ash text-base mt-5 max-w-sm">
                  These aren&apos;t slogans — they&apos;re the standards our crew is held to on every job site in New Jersey.
                </p>
                <div className="hidden lg:flex items-center gap-3 mt-8 pt-8 border-t border-line">
                  <ShieldCheck className="w-6 h-6 text-brand flex-shrink-0" />
                  <span className="spec text-stone">NJ Lic #13VH13920700 · Licensed &amp; Insured</span>
                </div>
              </Reveal>
            </div>

            {/* Numbered principle rows */}
            <div className="flex flex-col">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={(i % 2) * 70}>
                  <div className="group flex gap-5 sm:gap-7 py-7 border-t border-line first:border-t-0 lg:first:border-t transition-colors">
                    <span className="font-display font-bold text-2xl tabular-nums text-line group-hover:text-brand transition-colors leading-none pt-0.5 w-9 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-coal text-xl tracking-tight mb-1.5 transition-colors group-hover:text-brand">{v.title}</h3>
                      <p className="text-ash text-sm sm:text-[0.95rem] leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SERVICE AREAS ════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 tex-fade-top pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-14">
            <Reveal className="max-w-2xl">
              <span className="kicker mb-5">Where We Work</span>
              <h2 className="font-display font-bold uppercase text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
                Proud to be<br /><span className="text-brand">your neighbor</span>
              </h2>
              <p className="text-bone/60 text-base mt-5">
                Based in North Haledon, serving homeowners across all 21 New Jersey counties — with these towns at the heart of our work.
              </p>
            </Reveal>
            <Reveal delay={120} className="flex-shrink-0">
              <Link href="/areas" className="group inline-flex items-center gap-2 font-display font-semibold text-bone hover:text-brand transition-colors">
                <span className="border-b-2 border-brand/40 group-hover:border-brand pb-1 transition-colors">All Service Areas</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-steel rounded-[var(--radius)] overflow-hidden border border-steel">
            {serviceAreas.map((area, i) => (
              <Reveal key={area.county} delay={(i % 4) * 70}>
                <div className="group relative h-full bg-coal hover:bg-char p-7 transition-colors duration-300 overflow-hidden">
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-0.5 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-char/80 text-brand mb-5 transition-colors group-hover:bg-brand group-hover:text-white">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <h3 className="font-display font-bold text-bone text-lg tracking-tight transition-colors group-hover:text-brand">{area.county}</h3>
                  <p className="text-bone/50 text-sm leading-relaxed mt-2">{area.cities}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="bg-concrete">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal>
            <div className="relative surface-brand overflow-hidden rounded-[var(--radius-lg)] shadow-block px-8 sm:px-12 lg:px-16 py-14 lg:py-20">
              <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-ink/15 blur-3xl" />
              <div className="relative grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 spec text-white mb-6">
                    Free Estimate
                  </span>
                  <h2 className="font-display font-bold uppercase text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
                    Let&apos;s protect your home
                  </h2>
                  <p className="text-white/85 text-base lg:text-lg mt-5 max-w-lg">
                    Tell us what your home needs and we&apos;ll come take a look — free, no obligation, no pressure. Just an honest assessment and a straight answer.
                  </p>
                </div>
                <div className="lg:justify-self-end w-full lg:w-auto">
                  <div className="flex flex-col gap-3 sm:max-w-xs lg:min-w-[18rem]">
                    <Link href="/contact" className="btn btn-bone w-full justify-center">
                      Get Free Estimate
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <a href="tel:7329560411" className="btn btn-outline-bone w-full justify-center">
                      <Phone className="w-4 h-4" />
                      Call {PHONE}
                    </a>
                    <div className="flex items-center justify-center gap-2 mt-2 text-white/70">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="spec text-white/70">NJ Lic #13VH13920700</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
