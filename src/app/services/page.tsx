import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import { services as seoServices, PHONE, LICENSE } from "@/lib/seo-data";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Check,
  ShieldCheck,
  serviceIcons,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "A&E Exteriors LLC offers expert Masonry, Roofing, Siding, Gutters, Chimneys, Foundation & Waterproofing across New Jersey. NJ Licensed #13VH13920700. Free estimates. Call 732-956-0411.",
  alternates: { canonical: "https://aeexteriorsnj.com/services" },
};

/* Live service data → cards */
const cards = seoServices.map((s, i) => ({
  slug: s.slug,
  title: s.title,
  tagline: s.tagline,
  image: s.images[0],
  blurb: s.description,
  included: s.subServices.slice(0, 5),
  count: s.subServices.length,
  num: String(i + 1).padStart(2, "0"),
  feature: i === 0, // masonry → wide feature card
}));

export default function ServicesPage() {
  return (
    <div className="svc-canvas text-coal">

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative overflow-hidden">
        {/* photo + single flat dark tint (no gradient) */}
        <div className="absolute inset-0">
          <Image
            src="/cambridge-pavers/pavers-1.webp"
            alt="A&E Exteriors LLC exterior contracting in New Jersey"
            fill
            priority
            className="object-cover scale-105 animate-[heroPan_20s_ease-in-out_infinite_alternate]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 svc-tint-strong" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <span className="kicker mb-6 !bg-white/15 !text-white">What We Do</span>
              <h1 className="font-display font-bold text-bone text-5xl sm:text-6xl lg:text-7xl leading-[0.96] tracking-tight mb-6">
                Every side of your home,{" "}
                <span className="text-ember">handled.</span>
              </h1>
              <p className="text-bone/70 text-base lg:text-lg max-w-md mb-9 leading-relaxed">
                Seven exterior trades, one licensed crew. From the foundation
                under your feet to the shingles over your head — we build it,
                seal it, and stand behind it.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <a href="tel:7329560411" className="btn btn-red">
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </a>
                <a href="#services" className="btn btn-outline-bone">
                  Explore Services
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { Icon: ShieldCheck, t: `NJ Licensed #${LICENSE}` },
                  { Icon: Check, t: "Fully Insured" },
                  { Icon: Check, t: "All 21 Counties" },
                ].map(({ Icon, t }) => (
                  <li key={t} className="inline-flex items-center gap-2 text-bone/70 text-sm">
                    <Icon className="w-4 h-4 text-ember" />
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

        {/* slim solid accent bar at base (flat color) */}
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-ember" aria-hidden="true" />
      </section>

      {/* ════════════════════ SERVICES ════════════════════ */}
      <section id="services" className="scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">

          {/* section heading */}
          <Reveal className="max-w-2xl mb-12 lg:mb-16">
            <span className="kicker mb-5">Our Services</span>
            <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.0] tracking-tight">
              Seven trades.{" "}
              <span className="text-brand">One accountable team.</span>
            </h2>
            <div className="svc-rule w-24 mt-7 mb-6" />
            <p className="text-ash text-base lg:text-lg leading-relaxed">
              Pick a single fix or hand us the whole exterior — either way you
              get one crew, one estimate, and zero finger-pointing. Tap any card
              to see the work and what&apos;s included.
            </p>
          </Reveal>

          {/* card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {cards.map((s, i) => {
              const Icon = serviceIcons[s.slug];
              return (
                <Reveal
                  key={s.slug}
                  delay={Math.min(i * 70, 300)}
                  variant="zoom"
                  className={s.feature ? "md:col-span-2" : ""}
                >
                  <Link
                    href={`/services/${s.slug}`}
                    className="svc-card group relative block h-full overflow-hidden rounded-3xl bg-char focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  >
                    {/* photo */}
                    <div
                      className={`relative w-full overflow-hidden ${
                        s.feature ? "aspect-[16/11] sm:aspect-[16/9]" : "aspect-[4/5] sm:aspect-[3/4]"
                      }`}
                    >
                      <Image
                        src={s.image}
                        alt={`${s.title} project by A&E Exteriors LLC in New Jersey`}
                        fill
                        className="object-cover object-[center_70%] transition-transform duration-[900ms] ease-out group-hover:scale-105"
                        sizes={s.feature ? "(max-width:1024px) 100vw, 66vw" : "(max-width:768px) 100vw, 33vw"}
                        priority={i < 2}
                      />
                      {/* flat dark tint for legibility (no gradient) */}
                      <div className="absolute inset-0 svc-card-tint" />
                    </div>

                    {/* ghost number */}
                    <span className="ghost-num pointer-events-none absolute top-5 right-6 text-bone/25 text-6xl sm:text-7xl select-none">
                      {s.num}
                    </span>

                    {/* content pinned to bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-bone ring-1 ring-white/15 shadow-soft flex-shrink-0">
                          {Icon ? <Icon className="w-7 h-7" /> : null}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display font-bold text-bone text-2xl sm:text-3xl tracking-tight leading-none">
                            {s.title}
                          </h3>
                          <p className="spec text-ember mt-1.5 truncate">{s.tagline}</p>
                        </div>
                      </div>

                      {s.feature && (
                        <>
                          <p className="text-bone/75 text-sm leading-relaxed max-w-xl mb-4 hidden sm:block">
                            {s.blurb}
                          </p>
                          <ul className="flex flex-wrap gap-2 mb-5">
                            {s.included.map((sub) => (
                              <li
                                key={sub}
                                className="inline-flex items-center gap-1.5 rounded-full bg-bone/10 ring-1 ring-bone/15 px-3 py-1 text-bone/85 text-xs"
                              >
                                <Check className="w-3 h-3 text-ember" />
                                {sub}
                              </li>
                            ))}
                            <li className="inline-flex items-center rounded-full bg-ember px-3 py-1 text-white text-xs font-semibold">
                              +{s.count - s.included.length} more
                            </li>
                          </ul>
                        </>
                      )}

                      <span className="inline-flex items-center gap-1.5 font-display font-bold text-bone text-sm transition-colors group-hover:text-ember">
                        Explore {s.title}
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}

            {/* inline call card — lives inside the grid (flat brand color, no gradient) */}
            <Reveal delay={120} variant="zoom">
              <div className="relative h-full overflow-hidden rounded-3xl bg-brand p-7 lg:p-8 flex flex-col justify-between">
                <div className="relative">
                  <span className="spec text-white/70 mb-4 block">Free Estimate</span>
                  <h3 className="font-display font-bold text-white text-2xl sm:text-3xl tracking-tight leading-tight mb-3">
                    Not sure which service you need?
                  </h3>
                  <p className="text-white/85 text-sm leading-relaxed">
                    Tell us what&apos;s going on with your home — we&apos;ll take
                    a look and give you a straight, no-pressure answer.
                  </p>
                </div>
                <div className="relative mt-7 flex flex-col gap-3">
                  <Link href="/contact" className="btn btn-bone w-full justify-center">
                    Request Free Estimate
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <a href="tel:7329560411" className="btn btn-ink w-full justify-center">
                    <Phone className="w-4 h-4" />
                    {PHONE}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}
