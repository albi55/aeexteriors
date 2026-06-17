import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import { services, SITE_URL, BUSINESS_NAME, PHONE, PHONE_LINK, EMAIL, ADDRESS, LICENSE } from "@/lib/seo-data";
import { ArrowRight, Phone, Check, serviceIcons } from "@/components/icons";

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
  const Icon = serviceIcons[service.slug];

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
        {service.images.length > 0 && (
          <div className="absolute inset-0">
            <Image src={service.images[0]} alt={`${service.title} by A&E Exteriors LLC in New Jersey`} fill priority className="object-cover" sizes="100vw" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/55" />
        <div className="absolute inset-0 tex-blueprint opacity-40 tex-fade-top pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              {/* breadcrumb */}
              <nav className="flex items-center gap-2 spec text-bone/40 mb-6">
                <Link href="/" className="hover:text-brand">Home</Link>
                <span>/</span>
                <Link href="/services" className="hover:text-brand">Services</Link>
                <span>/</span>
                <span className="text-brand">{service.title}</span>
              </nav>
              <div className="flex items-center gap-4 mb-5">
                <span className="inline-flex items-center justify-center w-12 h-12 border-2 border-steel text-brand">
                  {Icon ? <Icon className="w-6 h-6" /> : null}
                </span>
                <span className="kicker">{service.title} Services</span>
              </div>
              <h1 className="font-display font-bold uppercase text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.92] tracking-[-0.015em] mb-6">
                {service.metaTitle}
              </h1>
              <p className="text-bone/65 text-base lg:text-lg max-w-md mb-8">
                {service.tagline}. NJ Licensed &amp; Insured. Serving all of New Jersey.
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

      {/* ════════ OVERVIEW ════════ */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <Reveal>
              <span className="kicker mb-5">Overview</span>
              <h2 className="font-display font-bold uppercase text-coal text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-[-0.01em] mb-6">
                {service.title} in {ADDRESS.city}, NJ
              </h2>
              <div className="flex flex-col gap-4 text-ash text-base leading-relaxed mb-8">
                {service.seoContent.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="surface-ink p-2">
                {[
                  `NJ Licensed (Lic #${LICENSE})`,
                  "Fully Insured — Liability & Workers' Comp",
                  "Free On-Site Estimates — No Obligation",
                  "Serving all of Passaic, Bergen, Essex & Morris County",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 px-4 py-3">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-brand flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                    <span className="text-bone/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <span className="kicker mb-5">What&apos;s Included</span>
              <h3 className="font-display font-bold uppercase text-coal text-2xl lg:text-3xl tracking-[0.01em] mb-6">
                Full scope of work
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
                {service.subServices.map((sub) => (
                  <div key={sub} className="flex items-center gap-3 bg-bone px-5 py-4">
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
      {service.images.length > 0 && (
        <section className="bg-cement">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
            <Reveal className="mb-10">
              <span className="kicker mb-5">Our Work</span>
              <h2 className="font-display font-bold uppercase text-coal text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-[-0.01em]">
                Recent {service.title.toLowerCase()} projects
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {service.images.map((src, i) => (
                <Reveal key={i} delay={(i % 3) * 70}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-cement group ticks">
                    <Image src={src} alt={`${service.title} project ${i + 1} by ${BUSINESS_NAME}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 50vw, 33vw" />
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
              {service.title} questions
            </h2>
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
          <Reveal className="mb-10">
            <span className="kicker mb-5">Other Services</span>
            <h2 className="font-display font-bold uppercase text-bone text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-[-0.01em]">
              Explore more
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-steel border border-steel">
            {otherServices.map((s) => {
              const OtherIcon = serviceIcons[s.slug];
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group bg-coal hover:bg-char p-7 transition-colors">
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center justify-center w-11 h-11 border-2 border-steel text-brand group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-colors">
                      {OtherIcon ? <OtherIcon className="w-5 h-5" /> : null}
                    </span>
                    <ArrowRight className="w-5 h-5 text-bone/40 group-hover:text-brand transition-colors" />
                  </div>
                  <h3 className="font-display font-semibold uppercase text-bone text-xl tracking-[0.01em] mb-1.5 group-hover:text-brand transition-colors">{s.title}</h3>
                  <p className="text-bone/50 text-sm leading-relaxed">{s.tagline}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="surface-brand">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 text-center">
          <h2 className="font-display font-bold uppercase text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-5">
            Need {service.title.toLowerCase()} work?
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
