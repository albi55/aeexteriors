import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import CountUp from "@/components/CountUp";
import { services, SITE_URL, BUSINESS_NAME, PHONE, PHONE_LINK, EMAIL, ADDRESS, LICENSE } from "@/lib/seo-data";
import { ArrowRight, ArrowUpRight, Phone, Check, ShieldCheck, Star, Clock, MapPin, Quote, serviceIcons } from "@/components/icons";
import { processSteps, benefits } from "@/lib/service-page-content";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `${SITE_URL}/services/${service.slug}` },
    openGraph: {
      title: `${service.metaTitle} | ${BUSINESS_NAME}`,
      description: service.metaDescription,
      url: `${SITE_URL}/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} Services`,
    serviceType: service.title,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: BUSINESS_NAME,
      telephone: PHONE_LINK,
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS.street,
        addressLocality: ADDRESS.city,
        addressRegion: ADDRESS.state,
        postalCode: ADDRESS.zip,
        addressCountry: "US",
      },
    },
    areaServed: [
      { "@type": "County", name: "Passaic County" },
      { "@type": "County", name: "Bergen County" },
      { "@type": "County", name: "Essex County" },
      { "@type": "County", name: "Morris County" },
    ],
    description: service.description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.subServices.map((sub) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: sub },
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${SITE_URL}/services/${service.slug}` },
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
            alt={`${service.title} by A&E Exteriors LLC in New Jersey`}
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
                <Link href="/services" className="hover:text-brand transition-colors">Services</Link>
                <span className="text-bone/25">/</span>
                <span className="text-brand">{service.title}</span>
              </nav>

              <div className="mb-7">
                <span className="kicker !bg-white/10 !text-bone">{service.title} Services · New Jersey</span>
              </div>

              <h1 className="font-display font-bold text-bone text-5xl sm:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-tight mb-6">
                {service.metaTitle}
              </h1>
              <p className="text-bone/70 text-lg lg:text-xl max-w-xl mb-9 leading-relaxed">
                {service.tagline}. {service.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a href="tel:7329560411" className="btn btn-red">
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </a>
                <a href="#overview" className="btn btn-outline-bone">
                  Explore the Work
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <ul className="flex flex-wrap items-center gap-2.5">
                {[
                  { Icon: ShieldCheck, t: `NJ Licensed #${LICENSE}` },
                  { Icon: Check, t: "Fully Insured" },
                  { Icon: Star, t: "Free Estimates" },
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
              { to: 21, suffix: "", l: "NJ Counties Served", Icon: MapPin },
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
      <section id="overview" className="scroll-mt-24 bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 lg:pt-40 pb-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <Reveal className="lg:col-span-2">
              <span className="kicker mb-5">Overview</span>
              <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.02] tracking-tight mb-7">
                Professional {service.title.toLowerCase()} in {ADDRESS.city}, NJ
              </h2>
              <div className="svc-rule w-20 mb-8" />

              {/* lead paragraph — larger, with a brand drop-edge */}
              {service.seoContent.length > 0 && (
                <p className="relative pl-6 border-l-2 border-brand text-coal text-xl lg:text-2xl font-display font-medium leading-snug tracking-tight mb-7">
                  {service.seoContent[0]}
                </p>
              )}
              <div className="flex flex-col gap-5 text-ash text-base lg:text-lg leading-relaxed">
                {service.seoContent.slice(1).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  `NJ Licensed (Lic #${LICENSE})`,
                  "Fully Insured — Liability & Workers' Comp",
                  "Free On-Site Estimates — No Obligation",
                  "Serving Passaic, Bergen, Essex & Morris",
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

            {/* sticky "what's included" card */}
            <Reveal delay={120}>
              <div className="lg:sticky lg:top-28 rounded-[var(--radius-lg)] bg-bone border border-line shadow-block overflow-hidden">
                <div className="h-1.5 w-full bg-brand" aria-hidden="true" />
                <div className="px-6 py-5 border-b border-line">
                  <span className="spec text-brand">What&apos;s Included</span>
                  <h3 className="font-display font-bold text-coal text-xl tracking-tight mt-1">Full scope of work</h3>
                  <p className="text-ash text-sm mt-1.5">{service.subServices.length} services under one crew.</p>
                </div>
                <div className="p-2">
                  {service.subServices.map((sub) => (
                    <div key={sub} className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-concrete transition-colors">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-brand/10 text-brand flex-shrink-0 transition-colors group-hover:bg-brand group-hover:text-white">
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="text-coal/80 text-sm group-hover:text-coal transition-colors">{sub}</span>
                    </div>
                  ))}
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

      {/* ════════ PROCESS (connected timeline) ════════ */}
      <section className="bg-concrete">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* sticky intro */}
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <span className="kicker mb-5">How We Work</span>
                <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-tight">
                  Your project,{" "}
                  <span className="text-brand">step by step.</span>
                </h2>
                <p className="text-ash text-base lg:text-lg leading-relaxed mt-5">
                  No surprises, no runaround. Here&apos;s exactly what to expect from
                  the first phone call to the final walkthrough — four clear stages,
                  start to finish.
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
              Why homeowners choose{" "}
              <span className="text-ember">us for {service.title.toLowerCase()}.</span>
            </h2>
            <p className="text-bone/60 text-base lg:text-lg leading-relaxed mt-5">
              We&apos;re a family-owned New Jersey contractor that treats your
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

      {/* ════════ PROJECT PHOTOS ════════ */}
      {service.images.length > 0 && (
        <section className="bg-cement">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
            <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 lg:mb-12">
              <div className="max-w-2xl">
                <span className="kicker mb-5">Our Work</span>
                <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-tight">
                  Recent {service.title.toLowerCase()} projects
                </h2>
                <p className="text-ash text-base leading-relaxed mt-4">
                  Real work for real New Jersey homeowners — a look at the
                  craftsmanship we bring to every {service.title.toLowerCase()} job.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-bone border border-line px-4 py-2 shadow-soft flex-shrink-0">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand/10 text-brand font-display font-bold text-xs tabular-nums">
                  {service.images.length}
                </span>
                <span className="spec text-stone">Photos</span>
              </span>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {service.images.slice(0, 12).map((src, i) => (
                <Reveal key={i} variant="zoom" delay={(i % 3) * 70}>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-cement ring-1 ring-coal/[0.06] ticks transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-brand/40 hover:shadow-block">
                    <Image src={src} alt={`${service.title} project ${i + 1} by ${BUSINESS_NAME}`} fill className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]" sizes="(max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════ QUOTE BANNER ════════ */}
      <section className="bg-bone">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
          <Reveal>
            <div className="relative rounded-3xl surface-ink overflow-hidden px-8 py-12 lg:px-14 lg:py-14 text-center">
              <div className="absolute inset-0 tex-blueprint opacity-30 pointer-events-none" aria-hidden="true" />
              <Quote className="relative w-10 h-10 text-brand mx-auto mb-6" />
              <p className="relative font-display font-semibold text-bone text-xl sm:text-2xl lg:text-3xl leading-snug tracking-tight max-w-3xl mx-auto">
                &ldquo;We don&apos;t cut corners and we don&apos;t hand your home to
                a stranger. The crew that quotes your {service.title.toLowerCase()} is
                the crew that does the work.&rdquo;
              </p>
              <p className="relative spec text-bone/55 mt-7">— {BUSINESS_NAME}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="bg-concrete">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <Reveal className="mb-10">
            <span className="kicker mb-5">FAQ</span>
            <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-tight">
              {service.title} questions, answered
            </h2>
            <p className="text-ash text-base leading-relaxed mt-4">
              The things homeowners ask us most about {service.title.toLowerCase()} —
              and straight answers, no jargon.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <FAQ items={service.faq} />
          </Reveal>
        </div>
      </section>

      {/* ════════ OTHER SERVICES ════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <Reveal className="mb-10 lg:mb-12">
            <span className="kicker mb-5 !bg-white/10 !text-bone">Other Services</span>
            <h2 className="font-display font-bold text-bone text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-tight">
              One crew for the whole exterior
            </h2>
            <p className="text-bone/60 text-base lg:text-lg leading-relaxed mt-4 max-w-2xl">
              From the foundation under your feet to the shingles over your head —
              explore everything we handle for New Jersey homeowners.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {otherServices.map((s) => {
              const OtherIcon = serviceIcons[s.slug];
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group flex flex-col rounded-2xl bg-bone border border-line shadow-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center justify-center w-11 h-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      {OtherIcon ? <OtherIcon className="w-full h-full" /> : null}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-coal/25 group-hover:text-brand transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-coal text-xl tracking-tight mb-2 group-hover:text-brand transition-colors">{s.title}</h3>
                  <p className="text-ash text-sm leading-relaxed">{s.tagline}.</p>
                  <span className="mt-5 pt-4 border-t border-line inline-flex items-center gap-1.5 font-display font-semibold text-sm text-coal group-hover:text-brand transition-colors">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="relative surface-brand overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 text-center">
          <span className="spec text-white/70 mb-5 block">Ready When You Are</span>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight mb-5">
            Need {service.title.toLowerCase()} work in NJ?
          </h2>
          <p className="text-white/85 text-base lg:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Contact {BUSINESS_NAME} for a free, no-obligation estimate. A real
            person answers, and we&apos;ll walk you through your options.
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
