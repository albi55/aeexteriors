import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import { services, serviceAreas, SITE_URL, BUSINESS_NAME, PHONE, PHONE_LINK, EMAIL, ADDRESS, LICENSE } from "@/lib/seo-data";
import { ArrowRight, ArrowUpRight, Phone, Check, ShieldCheck, serviceIcons } from "@/components/icons";

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

  const nearbyAreas = serviceAreas.filter((a) => a.county === area.county && a.slug !== slug).slice(0, 6);

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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE_URL}/areas` },
      { "@type": "ListItem", position: 3, name: area.city, item: `${SITE_URL}/areas/${area.slug}` },
    ],
  };

  const contactRows = [
    { label: "Location", value: `${ADDRESS.street}, ${ADDRESS.city}, ${ADDRESS.state} ${ADDRESS.zip}` },
    { label: "Phone", value: PHONE },
    { label: "Email", value: EMAIL },
    { label: "License", value: `NJ #${LICENSE}` },
    { label: "Hours", value: "Mon–Fri 7am–6pm · Sat 8am–3pm" },
  ];

  return (
    <div className="svc-canvas text-coal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/foundation-waterproofing/fw-1.webp"
            alt={`Exterior contracting in ${area.city}, NJ`}
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
              <nav className="flex items-center gap-2 spec text-bone/45 mb-6 text-[0.6rem]">
                <Link href="/" className="hover:text-ember transition-colors">Home</Link>
                <span>/</span>
                <Link href="/areas" className="hover:text-ember transition-colors">Areas</Link>
                <span>/</span>
                <span className="text-ember">{area.city}</span>
              </nav>
              <span className="kicker mb-5 !bg-white/15 !text-white">{area.county}</span>
              <h1 className="font-display font-bold text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.98] tracking-tight mb-6">
                Exterior Contractor in{" "}
                <span className="text-ember">{area.city}</span>, NJ
              </h1>
              <p className="text-bone/70 text-base lg:text-lg max-w-md mb-9 leading-relaxed">
                {BUSINESS_NAME} proudly serves {area.city} with expert exterior
                contracting — licensed, insured, and local to {area.county}.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <a href="tel:7329560411" className="btn btn-red">
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </a>
                <a href="#services" className="btn btn-outline-bone">
                  Our Services
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { Icon: ShieldCheck, t: `NJ Licensed #${LICENSE}` },
                  { Icon: Check, t: "Fully Insured" },
                  { Icon: Check, t: `Local to ${area.county}` },
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

        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-ember" aria-hidden="true" />
      </section>

      {/* ════════════════════ SERVICES IN AREA ════════════════════ */}
      <section id="services" className="scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="max-w-2xl mb-12 lg:mb-16">
            <span className="kicker mb-5">Services in {area.city}</span>
            <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.0] tracking-tight">
              Every trade,{" "}
              <span className="text-brand">on one crew.</span>
            </h2>
            <div className="svc-rule w-24 mt-7 mb-6" />
            <p className="text-ash text-base lg:text-lg leading-relaxed">
              From the foundation under your feet to the shingles over your head —
              here&apos;s everything we handle for homeowners in {area.city}.
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
                    <h3 className="font-display font-bold text-coal text-2xl tracking-tight mb-1.5 group-hover:text-brand transition-colors">{service.title}</h3>
                    <p className="text-ash text-sm leading-relaxed mb-5">{service.tagline}</p>
                    <ul className="flex flex-col gap-2 mt-auto">
                      {service.subServices.slice(0, 3).map((sub) => (
                        <li key={sub} className="flex items-center gap-2.5 text-ash text-xs">
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand/10 text-brand flex-shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════ WHY US ════════════════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
              <span className="kicker mb-5 !bg-white/10">Why {BUSINESS_NAME}</span>
              <h2 className="font-display font-bold text-bone text-4xl sm:text-5xl lg:text-6xl leading-[1.0] tracking-tight mb-6">
                Trusted in{" "}
                <span className="text-ember">{area.city}.</span>
              </h2>
              <p className="text-bone/60 text-base leading-relaxed mb-8">
                We serve {area.city} and all of {area.county} with professional
                exterior work. Every project gets our full attention — no
                subcontractors, no shortcuts, no surprises on your bill.
              </p>
              <div className="space-y-2.5">
                {[
                  `NJ Licensed & Insured (Lic #${LICENSE})`,
                  "Free, detailed estimates with no obligation",
                  "Direct communication — no middlemen",
                  "Clean job sites and on-time completion",
                  `Serving all of ${area.county}`,
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 rounded-xl bg-bone/[0.04] border border-steel/70 px-5 py-3.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-brand flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </span>
                    <span className="text-bone/85 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} className="w-full self-start">
              <div className="rounded-2xl border border-steel/80 bg-char shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)] overflow-hidden">
                <div className="h-1 w-full bg-brand" aria-hidden="true" />
                <div className="px-6 py-5 border-b border-steel/70">
                  <span className="spec text-brand">Contact &amp; Credentials</span>
                </div>
                {contactRows.map((item, i, arr) => (
                  <div key={item.label} className={`px-6 py-4 ${i < arr.length - 1 ? "border-b border-steel/70" : ""}`}>
                    <p className="spec text-bone/40 text-[0.6rem] mb-1.5">{item.label}</p>
                    <p className="text-bone text-sm font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════ NEARBY AREAS ════════════════════ */}
      {nearbyAreas.length > 0 && (
        <section className="bg-cement">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
            <Reveal className="max-w-2xl mb-12 lg:mb-14">
              <span className="kicker mb-5">Nearby Areas</span>
              <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.0] tracking-tight">
                Also serving{" "}
                <span className="text-brand">{area.county}.</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
              {nearbyAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="group flex items-center justify-between gap-2 rounded-xl bg-bone border border-line px-4 py-4 hover:border-brand/40 hover:shadow-soft hover:-translate-y-0.5 transition-all"
                >
                  <span className="font-display font-semibold text-coal text-sm group-hover:text-brand transition-colors truncate">{a.city}</span>
                  <ArrowUpRight className="w-4 h-4 text-coal/25 group-hover:text-brand transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════ CTA ════════ */}
      <section className="surface-brand">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 text-center">
          <h2 className="font-display font-bold uppercase text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-5">
            Need work in {area.city}?
          </h2>
          <p className="text-white/85 text-base lg:text-lg mb-10 max-w-xl mx-auto">
            Contact {BUSINESS_NAME} for a free, no-obligation estimate.
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
