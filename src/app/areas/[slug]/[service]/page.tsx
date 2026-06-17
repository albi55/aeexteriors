import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import { getCityServiceContent, getAllCityServiceParams } from "@/lib/city-service-content";
import { services, SITE_URL, BUSINESS_NAME, PHONE, PHONE_LINK, ADDRESS, LICENSE } from "@/lib/seo-data";
import { ArrowRight, Phone, Check, serviceIcons } from "@/components/icons";

export async function generateStaticParams() {
  return getAllCityServiceParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; service: string }> }): Promise<Metadata> {
  const { slug, service } = await params;
  const data = getCityServiceContent(slug, service);
  if (!data) return {};

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    alternates: { canonical: `${SITE_URL}/areas/${slug}/${service}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `${SITE_URL}/areas/${slug}/${service}`,
      type: "website",
      images: data.images.length > 0 ? [{ url: data.images[0], width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function CityServicePage({ params }: { params: Promise<{ slug: string; service: string }> }) {
  const { slug, service: serviceSlug } = await params;
  const data = getCityServiceContent(slug, serviceSlug);
  if (!data) notFound();

  const otherServices = services.filter((s) => s.slug !== serviceSlug);
  const displayImages = data.images.slice(0, 6);
  const Icon = serviceIcons[serviceSlug];
  const lc = data.title.toLowerCase();

  const faqs = [
    { q: `How much does ${lc} cost in ${data.city}, NJ?`, a: `${data.title} costs in ${data.city} vary by project scope and complexity. ${BUSINESS_NAME} provides free, detailed on-site estimates with no obligation. Contact us at ${PHONE} for an accurate quote for your specific project.` },
    { q: `Is ${BUSINESS_NAME} licensed for ${lc} work in ${data.city}?`, a: `Yes, ${BUSINESS_NAME} holds NJ Home Improvement Contractor License #${LICENSE}. We are fully licensed and insured to perform ${lc} work in ${data.city} and all of ${data.county}.` },
    { q: `Do you offer free ${lc} estimates in ${data.city}?`, a: `Absolutely. We provide free, no-obligation on-site estimates for all ${lc} projects in ${data.city}. Call ${PHONE} or fill out our online contact form to schedule yours.` },
    { q: `How long does a ${lc} project take in ${data.city}?`, a: `Project timelines depend on scope. Minor repairs may take 1–2 days, while larger projects can take a week or more. We'll provide a clear timeline during your free estimate.` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${data.title} in ${data.city}, NJ`,
    serviceType: data.title,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: BUSINESS_NAME,
      telephone: PHONE_LINK,
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS.street,
        addressLocality: ADDRESS.city,
        addressRegion: ADDRESS.state,
        postalCode: ADDRESS.zip,
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "City",
      name: data.city,
      containedInPlace: { "@type": "County", name: data.county },
    },
    description: data.content[0],
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
      { "@type": "ListItem", position: 3, name: data.city, item: `${SITE_URL}/areas/${slug}` },
      { "@type": "ListItem", position: 4, name: data.title, item: `${SITE_URL}/areas/${slug}/${serviceSlug}` },
    ],
  };

  return (
    <div className="bg-concrete">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        {data.images.length > 0 && (
          <div className="absolute inset-0">
            <Image src={data.images[0]} alt={`${data.title} in ${data.city}, NJ`} fill priority className="object-cover" sizes="100vw" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/55" />
        <div className="absolute inset-0 tex-blueprint opacity-40 tex-fade-top pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="flex items-center gap-2 spec text-bone/40 mb-6 flex-wrap">
                <Link href="/" className="hover:text-brand">Home</Link>
                <span>/</span>
                <Link href="/areas" className="hover:text-brand">Areas</Link>
                <span>/</span>
                <Link href={`/areas/${slug}`} className="hover:text-brand">{data.city}</Link>
                <span>/</span>
                <span className="text-brand">{data.title}</span>
              </nav>
              <div className="flex items-center gap-4 mb-5">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white p-1.5">
                  {Icon ? <Icon className="w-full h-full" /> : null}
                </span>
                <span className="kicker">{data.title} · {data.city}</span>
              </div>
              <h1 className="font-display font-bold uppercase text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.92] tracking-[-0.015em] mb-6">
                {data.title} Contractor in {data.city}, NJ
              </h1>
              <p className="text-bone/65 text-base lg:text-lg max-w-md mb-8">
                {data.tagline}. NJ Licensed &amp; Insured. Serving {data.city} and all of {data.county}.
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

      {/* ════════ CONTENT ════════ */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <Reveal className="lg:col-span-2">
              <span className="kicker mb-5">{data.title} in {data.city}</span>
              <h2 className="font-display font-bold uppercase text-coal text-3xl sm:text-4xl leading-[0.95] tracking-[-0.01em] mb-6">
                Professional {data.title} in {data.city}, {data.county}
              </h2>
              <div className="flex flex-col gap-4 text-ash text-base leading-relaxed">
                {data.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="border border-line">
                <div className="px-5 py-4 border-b border-line bg-concrete">
                  <span className="spec text-brand">{data.title} · {data.city}</span>
                </div>
                {data.subServices.map((sub, j) => (
                  <div key={sub} className={`flex items-center gap-3 px-5 py-3 ${j < data.subServices.length - 1 ? "border-b border-line" : ""}`}>
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-brand flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                    <span className="text-coal/80 text-sm">{sub}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ PROJECT PHOTOS ════════ */}
      {displayImages.length > 1 && (
        <section className="bg-cement">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
            <Reveal className="mb-10">
              <span className="kicker mb-5">Our Work</span>
              <h2 className="font-display font-bold uppercase text-coal text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-[-0.01em]">
                {data.title} projects near {data.city}
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {displayImages.slice(1).map((src, i) => (
                <Reveal key={i} delay={(i % 3) * 70}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-cement group ticks">
                    <Image src={src} alt={`${data.title} project ${i + 1} near ${data.city}, NJ by ${BUSINESS_NAME}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 50vw, 33vw" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════ FAQ ════════ */}
      <section className="bg-bone">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <Reveal className="mb-10">
            <span className="kicker mb-5">FAQ</span>
            <h2 className="font-display font-bold uppercase text-coal text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-[-0.01em]">
              {data.title} questions in {data.city}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <FAQ items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ════════ OTHER SERVICES IN CITY ════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <Reveal className="mb-10">
            <span className="kicker mb-5">More in {data.city}</span>
            <h2 className="font-display font-bold uppercase text-bone text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-[-0.01em]">
              Other services in {data.city}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-steel border border-steel">
            {otherServices.map((s) => {
              const OtherIcon = serviceIcons[s.slug];
              return (
                <Link key={s.slug} href={`/areas/${slug}/${s.slug}`} className="group bg-coal hover:bg-char p-6 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white p-1.5">
                      {OtherIcon ? <OtherIcon className="w-full h-full" /> : null}
                    </span>
                    <ArrowRight className="w-4 h-4 text-bone/40 group-hover:text-brand transition-colors" />
                  </div>
                  <h3 className="font-display font-semibold uppercase text-bone text-base tracking-[0.01em] mb-1 group-hover:text-brand transition-colors">{s.title} in {data.city}</h3>
                  <p className="text-bone/50 text-xs leading-relaxed">{s.tagline}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="surface-brand">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-20 text-center">
          <h2 className="font-display font-bold uppercase text-white text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-[-0.01em] mb-5">
            Need {lc} work in {data.city}?
          </h2>
          <p className="text-white/85 text-base mb-10 max-w-xl mx-auto">
            Contact {BUSINESS_NAME} for a free, no-obligation estimate. NJ Licensed &amp; Insured.
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
