import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import CountUp from "@/components/CountUp";
import { services, serviceAreas, SITE_URL, BUSINESS_NAME, PHONE, PHONE_LINK, EMAIL, ADDRESS, LICENSE } from "@/lib/seo-data";
import { ArrowRight, ArrowUpRight, Phone, Check, ShieldCheck, Star, Clock, MapPin, Quote, serviceIcons } from "@/components/icons";
import { processSteps, benefits } from "@/lib/service-page-content";

export async function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) return {};

  const title = `Exterior Contractor in ${area.city}, NJ`;

  return {
    title,
    description: area.metaDescription,
    keywords: [
      `exterior contractor ${area.city}`,
      `masonry contractor ${area.city} NJ`,
      `roofing contractor ${area.city} NJ`,
      `siding contractor ${area.city} NJ`,
      `${area.city} home improvement`,
      `contractor near me ${area.city}`,
    ],
    alternates: { canonical: `${SITE_URL}/areas/${area.slug}` },
    openGraph: {
      title: `${title} | ${BUSINESS_NAME}`,
      description: area.metaDescription,
      url: `${SITE_URL}/areas/${area.slug}`,
      type: "website",
    },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const nearbyAreas = serviceAreas.filter((a) => a.county === area.county && a.slug !== slug).slice(0, 8);

  // ── Locally-flavored long-form copy, generated from the city + county ──
  // Keeps every one of the area pages text-rich and unique without a per-city CMS.
  const overviewParagraphs = [
    `When ${area.city} homeowners need exterior work done right the first time, ${BUSINESS_NAME} is the local, licensed contractor they call. We're a family-owned New Jersey company rooted in ${area.county}, and we've built our reputation one ${area.city} home at a time — with honest pricing, craftsmanship that lasts, and a crew that shows up when we say we will.`,
    `From the foundation under your feet to the shingles over your head, we handle the full exterior of your ${area.city} home under one roof. That means masonry, roofing, siding, seamless gutters, chimney work, foundation repair, and waterproofing — all delivered by our own crew, never subcontracted out to whoever happens to be cheapest that week. One company, one point of accountability, one standard of quality.`,
    `${area.city} sits in ${area.county}, where Northeast weather is genuinely tough on a home. Freeze-thaw cycles work loose mortar joints and crack masonry, heavy snow loads stress roofs and gutters, and spring rains find their way into basements and foundations. We choose materials and installation methods specifically for that climate, so the work we do holds up through ${area.city}'s winters and summers alike — not just until the next storm.`,
    `Whether you own a century-old home near the heart of ${area.city} or a newer build on its outskirts, we treat your property with the respect we'd give our own. We protect landscaping, keep job sites clean and safe, communicate directly without middlemen, and walk every finished project with you before we consider it done. No surprises on the bill, no shortcuts behind the walls.`,
    `Every estimate in ${area.city} is free, detailed, and written down — so you can see exactly what you're paying for before any work begins. There's no obligation and no pressure: just a clear, honest assessment of what your home needs and what it will cost. That's how we've earned the trust of homeowners across ${area.county}, and how we'd like to earn yours.`,
  ];

  const localPoints = [
    {
      Icon: MapPin,
      t: `Truly local to ${area.county}`,
      d: `We're not a national franchise routing your call to a distant office. We live and work in New Jersey, we know ${area.city}'s neighborhoods and housing stock, and we're a short drive away when you need us.`,
    },
    {
      Icon: ShieldCheck,
      t: "Licensed & fully insured",
      d: `NJ Home Improvement Contractor License #${LICENSE}, backed by general liability and workers' compensation coverage on every ${area.city} job — so you're protected from day one.`,
    },
    {
      Icon: Star,
      t: "Our own crew, no subs",
      d: `The crew that quotes your ${area.city} project is the crew that does the work. Owner-supervised from start to finish means consistent quality and one person accountable for the result.`,
    },
    {
      Icon: Clock,
      t: "Fast, real responses",
      d: `A real person answers the phone, and we move quickly on emergencies like active roof leaks, storm damage, and water in the basement — common after ${area.county} weather.`,
    },
  ];

  const faqs = [
    {
      q: `Does ${BUSINESS_NAME} serve all of ${area.city}, NJ?`,
      a: `Yes. We provide our full range of exterior services — masonry, roofing, siding, gutters, chimneys, foundation repair, and waterproofing — throughout ${area.city} and the surrounding ${area.county} area. Call ${PHONE} to confirm we cover your street.`,
    },
    {
      q: `Are you licensed and insured to work in ${area.city}?`,
      a: `Absolutely. ${BUSINESS_NAME} holds NJ Home Improvement Contractor License #${LICENSE} and carries general liability and workers' compensation insurance. Every ${area.city} project is fully licensed and insured — we'll gladly provide documentation.`,
    },
    {
      q: `Do you offer free estimates in ${area.city}?`,
      a: `Yes — every estimate in ${area.city} is free, on-site, and with no obligation. We come out, assess the work in person, and give you a clear, itemized written quote so you know exactly what you're paying for before anything begins.`,
    },
    {
      q: `How fast can you respond to an emergency in ${area.city}?`,
      a: `We prioritize emergencies like active leaks, storm damage, and flooding. Because we're local to ${area.county}, we can typically get someone out to your ${area.city} home quickly. Call ${PHONE} and a real person will help you right away.`,
    },
    {
      q: `Do you use subcontractors on ${area.city} projects?`,
      a: `No. Every ${area.city} project is completed by our own crew under direct, owner-level supervision. That's how we keep quality consistent and make sure there's a single point of accountability for your home.`,
    },
  ];

  const contactRows = [
    { label: "Location", value: `${ADDRESS.street}, ${ADDRESS.city}, ${ADDRESS.state} ${ADDRESS.zip}` },
    { label: "Phone", value: PHONE },
    { label: "Email", value: EMAIL },
    { label: "License", value: `NJ #${LICENSE}` },
    { label: "Hours", value: "Mon–Fri 7am–6pm · Sat 8am–3pm" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: BUSINESS_NAME,
    telephone: PHONE_LINK,
    email: EMAIL,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.state,
      postalCode: ADDRESS.zip,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: area.city,
      containedInPlace: { "@type": "County", name: area.county },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Exterior Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title },
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE_URL}/areas` },
      { "@type": "ListItem", position: 3, name: area.city, item: `${SITE_URL}/areas/${area.slug}` },
    ],
  };

  return (
    <div className="bg-concrete">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/showcase/home.png"
            alt={`Exterior contracting in ${area.city}, NJ by ${BUSINESS_NAME}`}
            fill
            priority
            className="object-cover scale-105 animate-[heroPan_22s_ease-in-out_infinite_alternate]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" aria-hidden="true" />
        <div className="absolute inset-0 tex-blueprint opacity-25 tex-fade-top pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-48 pb-28 lg:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              {/* breadcrumb */}
              <nav className="flex items-center gap-2.5 spec text-bone/45 mb-7">
                <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                <span className="text-bone/25">/</span>
                <Link href="/areas" className="hover:text-brand transition-colors">Areas</Link>
                <span className="text-bone/25">/</span>
                <span className="text-brand">{area.city}</span>
              </nav>

              <div className="mb-7">
                <span className="kicker !bg-white/10 !text-bone">{area.county} · New Jersey</span>
              </div>

              <h1 className="font-display font-bold text-bone text-5xl sm:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-tight mb-6">
                Exterior Contractor in <span className="text-brand">{area.city}</span>, NJ
              </h1>
              <p className="text-bone/70 text-lg lg:text-xl max-w-xl mb-9 leading-relaxed">
                {BUSINESS_NAME} serves {area.city} with expert masonry, roofing, siding,
                gutters, chimneys, foundation &amp; waterproofing — licensed, insured, and
                local to {area.county}. One crew, no subcontractors, and a free estimate
                with no obligation.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a href="tel:7329560411" className="btn btn-red">
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </a>
                <a href="#services" className="btn btn-outline-bone">
                  Our Services
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <ul className="flex flex-wrap items-center gap-2.5">
                {[
                  { Icon: ShieldCheck, t: `NJ Licensed #${LICENSE}` },
                  { Icon: Check, t: "Fully Insured" },
                  { Icon: Star, t: `Local to ${area.county}` },
                ].map(({ Icon: TrustIcon, t }) => (
                  <li key={t} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-sm px-4 py-2 text-bone/85 text-sm font-medium">
                    <TrustIcon className="w-4 h-4 text-brand" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* floating glass estimate card */}
            <Reveal delay={80} className="lg:col-span-5">
              <div className="lg:-mb-28 rounded-[var(--radius-lg)] ring-1 ring-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
                <InlineEstimateForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ STAT STRIP (animated count-up) ════════ */}
      <section className="surface-brand relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y-0 lg:divide-x lg:divide-white/15">
            {[
              { to: 100, suffix: "%", l: "Own Crew, No Subs", Icon: ShieldCheck },
              { to: 7, suffix: "", l: "Exterior Trades", Icon: MapPin },
              { to: 24, suffix: "hr", l: "Response Window", Icon: Clock },
              { to: 0, display: "Free", l: "On-Site Estimates", Icon: Star },
            ].map((s) => (
              <div key={s.l} className="text-center lg:text-left lg:pl-8 first:lg:pl-0">
                <s.Icon className="w-6 h-6 text-white/80 mb-3 mx-auto lg:mx-0" />
                <div className="font-display font-bold text-white text-3xl lg:text-4xl tracking-tight leading-none mb-1.5">
                  <CountUp to={s.to} suffix={s.suffix} display={s.display} />
                </div>
                <div className="spec text-white/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ OVERVIEW ════════ */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 lg:pt-40 pb-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <Reveal className="lg:col-span-2">
              <span className="kicker mb-5">Your {area.city} Contractor</span>
              <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.02] tracking-tight mb-7">
                Trusted exterior work in {area.city}, NJ
              </h2>
              <div className="svc-rule w-20 mb-8" />

              {/* lead paragraph — larger, with a brand drop-edge */}
              <p className="relative pl-6 border-l-2 border-brand text-coal text-xl lg:text-2xl font-display font-medium leading-snug tracking-tight mb-7">
                {overviewParagraphs[0]}
              </p>
              <div className="flex flex-col gap-5 text-ash text-base lg:text-lg leading-relaxed">
                {overviewParagraphs.slice(1).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  `NJ Licensed (Lic #${LICENSE})`,
                  "Fully Insured — Liability & Workers' Comp",
                  "Free On-Site Estimates — No Obligation",
                  `Serving all of ${area.county}`,
                ].map((item) => (
                  <div key={item} className="group flex items-center gap-3 rounded-xl bg-concrete border border-line px-4 py-3.5 transition-colors hover:border-brand/30">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-brand flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                    <span className="text-coal/80 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* sticky "services we provide" card */}
            <Reveal delay={120}>
              <div className="lg:sticky lg:top-28 rounded-[var(--radius-lg)] bg-bone border border-line shadow-block overflow-hidden">
                <div className="h-1.5 w-full bg-brand" aria-hidden="true" />
                <div className="px-6 py-5 border-b border-line">
                  <span className="spec text-brand">In {area.city}</span>
                  <h3 className="font-display font-bold text-coal text-xl tracking-tight mt-1">Services we provide</h3>
                  <p className="text-ash text-sm mt-1.5">{services.length} exterior trades, one local crew.</p>
                </div>
                <div className="p-2">
                  {services.map((s) => {
                    const SvcIcon = serviceIcons[s.slug];
                    return (
                      <Link key={s.slug} href={`/areas/${slug}/${s.slug}`} className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-concrete transition-colors">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-concrete ring-1 ring-line flex-shrink-0">
                          {SvcIcon ? <SvcIcon className="w-5 h-5" /> : null}
                        </span>
                        <span className="flex-1 text-coal/80 text-sm font-medium group-hover:text-coal transition-colors">{s.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-coal/20 group-hover:text-brand transition-colors" />
                      </Link>
                    );
                  })}
                </div>
                <div className="px-6 py-5 border-t border-line bg-concrete">
                  <Link href="/contact" className="btn btn-red w-full justify-center">
                    Get a Free Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="tel:7329560411" className="mt-3 flex items-center justify-center gap-1.5 font-display font-semibold text-sm text-coal hover:text-brand transition-colors">
                    <Phone className="w-3.5 h-3.5 text-brand" />
                    Or call {PHONE}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ SERVICES IN AREA ════════ */}
      <section id="services" className="scroll-mt-24 bg-cement">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="max-w-2xl mb-12 lg:mb-16">
            <span className="kicker mb-5">Services in {area.city}</span>
            <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.0] tracking-tight">
              Every trade,{" "}
              <span className="text-brand">on one crew.</span>
            </h2>
            <div className="svc-rule w-24 mt-7 mb-6" />
            <p className="text-ash text-base lg:text-lg leading-relaxed">
              From the foundation under your feet to the shingles over your head, here&apos;s
              everything we handle for {area.city} homeowners — each delivered by our own crew,
              built for New Jersey weather, and backed by a free written estimate. Tap any service
              to see how we do it in {area.city}.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.slug];
              return (
                <Reveal key={service.slug} variant="zoom" delay={Math.min(i * 60, 300)}>
                  <Link
                    href={`/areas/${slug}/${service.slug}`}
                    className="group relative flex h-full flex-col rounded-2xl bg-bone border border-line p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-concrete ring-1 ring-line">
                        {Icon ? <Icon className="w-7 h-7" /> : null}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-coal/25 group-hover:text-brand transition-colors" />
                    </div>
                    <h3 className="font-display font-bold text-coal text-2xl tracking-tight mb-1.5 group-hover:text-brand transition-colors">{service.title} in {area.city}</h3>
                    <p className="text-ash text-sm leading-relaxed mb-5">{service.tagline}.</p>
                    <ul className="flex flex-col gap-2 mb-5">
                      {service.subServices.slice(0, 3).map((sub) => (
                        <li key={sub} className="flex items-center gap-2.5 text-ash text-xs">
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand/10 text-brand flex-shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                          {sub}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto pt-4 border-t border-line inline-flex items-center gap-1.5 font-display font-semibold text-sm text-coal group-hover:text-brand transition-colors">
                      View {service.title.toLowerCase()} in {area.city}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ PROCESS (connected timeline) ════════ */}
      <section className="bg-concrete">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* sticky intro */}
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <span className="kicker mb-5">How We Work</span>
                <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-tight">
                  Your {area.city} project,{" "}
                  <span className="text-brand">step by step.</span>
                </h2>
                <p className="text-ash text-base lg:text-lg leading-relaxed mt-5">
                  No surprises, no runaround. Every job in {area.city} follows the same
                  clear, transparent process — from the first phone call to the final
                  walkthrough, so you always know exactly where things stand.
                </p>
                <a href="tel:7329560411" className="btn btn-red mt-8">
                  <Phone className="w-4 h-4" />
                  Start with a Call
                </a>
              </div>
            </Reveal>

            {/* timeline */}
            <div className="lg:col-span-8 relative">
              {/* vertical connector line */}
              <span aria-hidden="true" className="absolute left-[1.4rem] top-3 bottom-3 w-px bg-gradient-to-b from-brand/40 via-line to-line" />
              <div className="flex flex-col gap-5">
                {processSteps.map((step, i) => (
                  <Reveal key={step.n} delay={Math.min(i * 90, 270)}>
                    <div className="group relative flex gap-5 lg:gap-7">
                      {/* node */}
                      <span className="relative z-10 flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand text-white font-display font-bold shadow-[0_8px_20px_-8px_rgba(180,10,10,0.7)] ring-4 ring-concrete transition-transform duration-300 group-hover:scale-110">
                        {step.n}
                      </span>
                      {/* card */}
                      <div className="flex-1 rounded-2xl bg-bone border border-line shadow-soft p-6 lg:p-7 transition-all duration-300 hover:shadow-block hover:border-brand/30 hover:-translate-y-0.5">
                        <h3 className="font-display font-bold text-coal text-lg lg:text-xl tracking-tight mb-2">{step.t}</h3>
                        <p className="text-ash text-sm lg:text-base leading-relaxed">{step.d}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ WHY US (BENEFITS) ════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-40 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="max-w-2xl mb-12 lg:mb-16">
            <span className="kicker mb-5 !bg-white/10 !text-bone">Why {BUSINESS_NAME}</span>
            <h2 className="font-display font-bold text-bone text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-tight">
              Why {area.city} homeowners{" "}
              <span className="text-ember">choose us.</span>
            </h2>
            <p className="text-bone/60 text-base lg:text-lg leading-relaxed mt-5">
              We&apos;re a family-owned New Jersey contractor that treats your {area.city}
              home like our own — and your time and money with respect.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {benefits.map(({ Icon: BIcon, t, d }, i) => (
              <Reveal key={t} delay={Math.min(i * 70, 280)}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-white/[0.04] border border-steel/70 p-7 transition-all duration-300 hover:bg-white/[0.07] hover:border-brand/40 hover:-translate-y-1">
                  <span aria-hidden="true" className="absolute -top-4 right-3 font-display font-bold text-[5rem] leading-none tabular-nums text-white/[0.03] group-hover:text-brand/15 transition-colors duration-300 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand text-white mb-5 transition-transform duration-300 group-hover:scale-110">
                    <BIcon className="w-6 h-6" />
                  </span>
                  <h3 className="relative font-display font-bold text-bone text-lg tracking-tight mb-2">{t}</h3>
                  <p className="relative text-bone/60 text-sm leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ LOCAL KNOWLEDGE + CREDENTIALS ════════ */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
              <span className="kicker mb-5">Local Knowledge</span>
              <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-tight mb-6">
                We know {area.city} homes.
              </h2>
              <div className="svc-rule w-20 mb-7" />
              <p className="text-ash text-base lg:text-lg leading-relaxed mb-8">
                {area.city} homes face the same {area.county} weather we&apos;ve been working
                in for years — and that local knowledge shows up in every job we do. Here&apos;s
                what sets the work apart:
              </p>
              <div className="flex flex-col gap-4">
                {localPoints.map(({ Icon: LIcon, t, d }) => (
                  <div key={t} className="flex gap-4 rounded-2xl bg-concrete border border-line p-5 transition-colors hover:border-brand/30">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand text-white flex-shrink-0">
                      <LIcon className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-coal text-base tracking-tight mb-1">{t}</h3>
                      <p className="text-ash text-sm leading-relaxed">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} className="w-full self-start">
              <div className="lg:sticky lg:top-28 rounded-2xl bg-bone border border-line shadow-block overflow-hidden">
                <div className="h-1.5 w-full bg-brand" aria-hidden="true" />
                <div className="px-6 py-5 border-b border-line">
                  <span className="spec text-brand">Contact &amp; Credentials</span>
                  <h3 className="font-display font-bold text-coal text-xl tracking-tight mt-1">Reach the {area.city} crew</h3>
                </div>
                {contactRows.map((item, i, arr) => (
                  <div key={item.label} className={`px-6 py-4 ${i < arr.length - 1 ? "border-b border-line" : ""}`}>
                    <p className="spec text-stone text-[0.6rem] mb-1.5">{item.label}</p>
                    <p className="text-coal text-sm font-medium">{item.value}</p>
                  </div>
                ))}
                <div className="px-6 py-5 border-t border-line bg-concrete">
                  <Link href="/contact" className="btn btn-red w-full justify-center">
                    Get a Free Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ QUOTE BANNER ════════ */}
      <section className="bg-concrete">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
          <Reveal>
            <div className="relative rounded-3xl surface-ink overflow-hidden px-8 py-12 lg:px-14 lg:py-14 text-center">
              <div className="absolute inset-0 tex-blueprint opacity-30 pointer-events-none" aria-hidden="true" />
              <Quote className="relative w-10 h-10 text-brand mx-auto mb-6" />
              <p className="relative font-display font-semibold text-bone text-xl sm:text-2xl lg:text-3xl leading-snug tracking-tight max-w-3xl mx-auto">
                &ldquo;We don&apos;t cut corners and we don&apos;t hand your home to a stranger.
                The crew that quotes your {area.city} project is the crew that does the
                work — licensed, insured, and local to {area.county}.&rdquo;
              </p>
              <p className="relative spec text-bone/55 mt-7">— {BUSINESS_NAME}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="bg-bone">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <Reveal className="mb-10">
            <span className="kicker mb-5">FAQ</span>
            <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-tight">
              {area.city} questions, answered
            </h2>
            <p className="text-ash text-base leading-relaxed mt-4">
              Straight answers to what {area.city} homeowners ask us most — no jargon,
              no runaround.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <FAQ items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ════════ NEARBY AREAS ════════ */}
      {nearbyAreas.length > 0 && (
        <section className="bg-cement">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
            <Reveal className="max-w-2xl mb-12 lg:mb-14">
              <span className="kicker mb-5">Nearby Areas</span>
              <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-5xl leading-[1.0] tracking-tight">
                Also serving{" "}
                <span className="text-brand">{area.county}.</span>
              </h2>
              <p className="text-ash text-base leading-relaxed mt-4">
                We&apos;re local to {area.county}, so {area.city} is just one of the towns
                we cover. Explore exterior contracting in these nearby communities.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {nearbyAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-bone border border-line p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {/* left brand accent bar — fills on hover */}
                  <span aria-hidden="true" className="absolute left-0 top-0 h-full w-1 bg-brand origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />

                  {/* map-pin chip */}
                  <span className="inline-flex items-center justify-center w-11 h-11 flex-shrink-0 rounded-xl bg-concrete ring-1 ring-line text-stone transition-colors duration-300 group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
                    <MapPin className="w-5 h-5" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-display font-bold text-coal text-base tracking-tight truncate group-hover:text-brand transition-colors">
                      {a.city}
                    </span>
                    <span className="block spec text-stone mt-0.5">Exterior work · NJ</span>
                  </span>

                  <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-coal/20 transition-all duration-300 group-hover:text-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>

            <Reveal delay={120} className="mt-10 flex justify-center">
              <Link href="/areas" className="btn btn-outline">
                View all NJ service areas
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ════════ CTA ════════ */}
      <section className="relative surface-brand overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 text-center">
          <span className="spec text-white/70 mb-5 block">Ready When You Are</span>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight mb-5">
            Need exterior work in {area.city}?
          </h2>
          <p className="text-white/85 text-base lg:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Contact {BUSINESS_NAME} for a free, no-obligation estimate. A real person
            answers, and we&apos;ll walk you through your options for your {area.city} home.
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
