import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import { ArrowRight, ArrowUpRight, Phone, Check, ShieldCheck, MapPin, Mail } from "@/components/icons";
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

const credentials = [
  { label: "NJ Home Improvement License", value: "#13VH13920700", icon: ShieldCheck },
  { label: "Insurance Coverage", value: "General Liability & Workers' Comp", icon: Check },
  { label: "Location", value: "871 Belmont Ave, North Haledon, NJ 07508", icon: MapPin },
  { label: "Phone", value: "732-956-0411", icon: Phone },
  { label: "Email", value: "aeexteriorsnj@gmail.com", icon: Mail },
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
            src="/about/secondabout.png"
            alt="A&E Exteriors LLC crew and branded trucks at a New Jersey home"
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

      {/* ════════ CREDENTIALS ════════ */}
      <section className="bg-concrete">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="mb-12 max-w-2xl">
            <span className="kicker mb-5">On The Record</span>
            <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
              Verify before you hire
            </h2>
            <p className="text-ash text-base mt-4">
              A good contractor has nothing to hide. Here&apos;s our license, our coverage, and every way to reach us — check us out before you commit to anything.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {credentials.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={(i % 3) * 80}>
                  <div className="group h-full bg-bone rounded-[var(--radius)] border border-line p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-soft hover:-translate-y-1">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-concrete text-coal mb-5 transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon className="w-6 h-6" />
                    </span>
                    <p className="spec text-stone">{item.label}</p>
                    <p className="text-coal text-base font-semibold mt-1.5 break-words">{item.value}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ VALUES ════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="mb-12 max-w-2xl">
            <span className="kicker mb-5">Our Values</span>
            <h2 className="font-display font-bold uppercase text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
              How we earn your trust
            </h2>
            <p className="text-bone/60 text-base mt-4">
              These aren&apos;t slogans — they&apos;re the standards our crew is held to on every job site in New Jersey.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 80}>
                <div className="group relative h-full bg-char/40 hover:bg-char/70 border border-steel rounded-[var(--radius)] p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute top-0 left-0 h-1 w-0 bg-brand transition-all duration-500 group-hover:w-full" aria-hidden="true" />
                  <div className="ghost-num text-bone/15 text-5xl mb-5 group-hover:text-brand/40 transition-colors">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-display font-semibold uppercase text-bone text-xl tracking-[0.01em] mb-3">{v.title}</h3>
                  <p className="text-bone/55 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SERVICE AREAS ════════ */}
      <section className="bg-cement">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="mb-12 max-w-2xl">
            <span className="kicker mb-5">Where We Work</span>
            <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
              Proud to be your neighbor
            </h2>
            <p className="text-ash text-base mt-4">
              Based in North Haledon and serving homeowners across all 21 New Jersey counties — with these towns at the heart of our work.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceAreas.map((area, i) => (
              <Reveal key={area.county} delay={(i % 4) * 70}>
                <div className="group h-full bg-bone rounded-[var(--radius)] border border-line p-7 transition-all duration-300 hover:border-brand/30 hover:shadow-soft hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-brand" />
                    <h3 className="font-display font-semibold uppercase text-coal text-lg tracking-[0.01em] group-hover:text-brand transition-colors">{area.county}</h3>
                  </div>
                  <div className="w-8 h-0.5 bg-brand mb-4 transition-all duration-300 group-hover:w-14" />
                  <p className="text-ash text-sm leading-relaxed">{area.cities}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link href="/areas" className="btn btn-ink">
              All Service Areas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/about/about.png"
            alt=""
            fill
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70" />
        <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-28 text-center">
          <span className="kicker kicker-center mb-6">Free Estimate</span>
          <h2 className="font-display font-bold uppercase text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-5">
            Let&apos;s protect your home
          </h2>
          <p className="text-bone/65 text-base lg:text-lg mb-10 max-w-xl mx-auto">
            Tell us what your home needs and we&apos;ll come take a look — free, with no obligation and no pressure. Just an honest assessment and a straight answer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-red w-full sm:w-auto justify-center">
              Get Free Estimate
              <ArrowUpRight className="w-4 h-4" />
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
