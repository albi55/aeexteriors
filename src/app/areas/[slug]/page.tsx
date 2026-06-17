import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import { services, serviceAreas, SITE_URL, BUSINESS_NAME, PHONE, PHONE_LINK, EMAIL, ADDRESS, LICENSE } from "@/lib/seo-data";
import { ArrowRight, Phone, Check, serviceIcons } from "@/components/icons";

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
    <div className="bg-concrete">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/foundation-waterproofing/fw-1.webp" alt={`Exterior contracting in ${area.city}, NJ`} fill priority className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/55" />
        <div className="absolute inset-0 tex-blueprint opacity-40 tex-fade-top pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="flex items-center gap-2 spec text-bone/40 mb-6">
                <Link href="/" className="hover:text-brand">Home</Link>
                <span>/</span>
                <Link href="/areas" className="hover:text-brand">Areas</Link>
                <span>/</span>
                <span className="text-brand">{area.city}</span>
              </nav>
              <span className="kicker mb-5">{area.county}</span>
              <h1 className="font-display font-bold uppercase text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.92] tracking-[-0.015em] mb-6">
                Exterior Contractor in {area.city}, NJ
              </h1>
              <p className="text-bone/65 text-base lg:text-lg max-w-md mb-8">
                {BUSINESS_NAME} proudly serves {area.city}, NJ with expert exterior contracting — licensed, insured, and local.
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

      {/* ════════ SERVICES IN AREA ════════ */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <Reveal className="mb-10">
            <span className="kicker mb-5">Services in {area.city}</span>
            <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
              What we offer
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {services.map((service) => {
              const Icon = serviceIcons[service.slug];
              return (
                <Reveal key={service.slug}>
                  <Link href={`/areas/${slug}/${service.slug}`} className="group h-full bg-bone hover:bg-concrete transition-colors p-7 flex flex-col">
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center justify-center w-12 h-12">
                        {Icon ? <Icon className="w-full h-full" /> : null}
                      </span>
                      <ArrowRight className="w-5 h-5 text-coal/30 group-hover:text-brand transition-colors" />
                    </div>
                    <h3 className="font-display font-semibold uppercase text-coal text-xl tracking-[0.01em] mb-1.5 group-hover:text-brand transition-colors">{service.title}</h3>
                    <p className="text-ash text-sm leading-relaxed mb-4">{service.tagline}</p>
                    <ul className="flex flex-col gap-1.5 mt-auto">
                      {service.subServices.slice(0, 3).map((sub) => (
                        <li key={sub} className="flex items-center gap-2 text-ash text-xs">
                          <span className="w-1.5 h-1.5 bg-brand flex-shrink-0" />
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

      {/* ════════ WHY US ════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
              <span className="kicker mb-5">Why {BUSINESS_NAME}</span>
              <h2 className="font-display font-bold uppercase text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-6">
                Trusted in {area.city}
              </h2>
              <p className="text-bone/55 text-base leading-relaxed mb-8">
                We serve {area.city} and all of {area.county} with professional exterior work. Every project gets our full attention — no subcontractors, no shortcuts, no surprises on your bill.
              </p>
              <div className="space-y-2">
                {[
                  `NJ Licensed & Insured (Lic #${LICENSE})`,
                  "Free, detailed estimates with no obligation",
                  "Direct communication — no middlemen",
                  "Clean job sites and on-time completion",
                  `Serving all of ${area.county}`,
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 bg-bone/5 border border-steel px-5 py-3.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-brand flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </span>
                    <span className="text-bone/85 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100} className="border border-steel self-start w-full">
              {contactRows.map((item, i, arr) => (
                <div key={item.label} className={`px-6 py-4 ${i < arr.length - 1 ? "border-b border-steel" : ""}`}>
                  <p className="spec text-brand mb-1">{item.label}</p>
                  <p className="text-bone text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ NEARBY AREAS ════════ */}
      {nearbyAreas.length > 0 && (
        <section className="bg-cement">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
            <Reveal className="mb-10">
              <span className="kicker mb-5">Nearby Areas</span>
              <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
                Also serving
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {nearbyAreas.map((a) => (
                <Link key={a.slug} href={`/areas/${a.slug}`} className="group bg-bone hover:bg-brand border border-line hover:border-brand text-coal hover:text-white font-display uppercase text-sm tracking-[0.02em] text-center py-4 px-3 transition-all">
                  {a.city}
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
