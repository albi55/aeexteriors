import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import { getCityServiceContent, getAllCityServiceParams } from "@/lib/city-service-content";
import { services, SITE_URL, BUSINESS_NAME, PHONE, PHONE_LINK, ADDRESS, LICENSE } from "@/lib/seo-data";
import { ArrowRight, ArrowUpRight, Phone, Check, ShieldCheck, Quote, serviceIcons } from "@/components/icons";
import { processSteps, benefits } from "@/lib/service-page-content";

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
    <div className="svc-canvas text-coal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/showcase/home.png"
            alt={`${data.title} in ${data.city}, NJ`}
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
              <nav className="flex items-center gap-2 spec text-bone/45 mb-6 flex-wrap text-[0.6rem]">
                <Link href="/" className="hover:text-ember transition-colors">Home</Link>
                <span>/</span>
                <Link href="/areas" className="hover:text-ember transition-colors">Areas</Link>
                <span>/</span>
                <Link href={`/areas/${slug}`} className="hover:text-ember transition-colors">{data.city}</Link>
                <span>/</span>
                <span className="text-ember">{data.title}</span>
              </nav>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white p-1.5 shadow-soft flex-shrink-0">
                  {Icon ? <Icon className="w-full h-full" /> : null}
                </span>
                <span className="kicker !bg-white/15 !text-white">{data.title} · {data.city}</span>
              </div>
              <h1 className="font-display font-bold text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.98] tracking-tight mb-6">
                {data.title} Contractor in{" "}
                <span className="text-ember">{data.city}</span>, NJ
              </h1>
              <p className="text-bone/70 text-base lg:text-lg max-w-md mb-9 leading-relaxed">
                {data.tagline}. NJ Licensed &amp; Insured. Serving {data.city} and all of {data.county}.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <a href="tel:7329560411" className="btn btn-red">
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </a>
                <a href="#content" className="btn btn-outline-bone">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { Icon: ShieldCheck, t: `NJ Licensed #${LICENSE}` },
                  { Icon: Check, t: "Fully Insured" },
                  { Icon: Check, t: "Free Estimates" },
                ].map(({ Icon: TrustIcon, t }) => (
                  <li key={t} className="inline-flex items-center gap-2 text-bone/70 text-sm">
                    <TrustIcon className="w-4 h-4 text-ember" />
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

      </section>

      {/* ════════════════════ STAT STRIP ════════════════════ */}
      <section className="surface-brand">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 lg:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { v: `#${LICENSE}`, l: "NJ License" },
              { v: data.city, l: "Local Crew" },
              { v: "100%", l: "Own Crew, No Subs" },
              { v: "Free", l: "On-Site Estimates" },
            ].map((s) => (
              <div key={s.l} className="text-center lg:text-left">
                <div className="font-display font-bold text-white text-2xl lg:text-3xl tracking-tight leading-none mb-1.5 break-words">{s.v}</div>
                <div className="spec text-white/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ CONTENT ════════════════════ */}
      <section id="content" className="scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-14">
            <Reveal className="lg:col-span-2">
              <span className="kicker mb-5">{data.title} in {data.city}</span>
              <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.05] tracking-tight mb-6">
                Professional {data.title} in {data.city}, {data.county}
              </h2>
              <div className="svc-rule w-20 mb-7" />
              <div className="flex flex-col gap-4 text-ash text-base leading-relaxed">
                {data.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="lg:sticky lg:top-28 rounded-2xl bg-bone border border-line shadow-soft overflow-hidden">
                <div className="h-1 w-full bg-brand" aria-hidden="true" />
                <div className="px-6 py-4 border-b border-line">
                  <span className="spec text-brand">What&apos;s Included</span>
                </div>
                <div className="p-2">
                  {data.subServices.map((sub) => (
                    <div key={sub} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-concrete transition-colors">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-brand flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                      <span className="text-coal/80 text-sm">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════ PROCESS ════════════════════ */}
      <section className="bg-concrete">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="max-w-2xl mb-12 lg:mb-16">
            <span className="kicker mb-5">How We Work</span>
            <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-tight">
              Your {lc} project in {data.city},{" "}
              <span className="text-brand">step by step.</span>
            </h2>
            <p className="text-ash text-base lg:text-lg leading-relaxed mt-5">
              No surprises, no runaround. Here&apos;s exactly what to expect from
              the first phone call to the final walkthrough.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {processSteps.map((step, i) => (
              <Reveal key={step.n} delay={Math.min(i * 80, 240)}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-bone border border-line shadow-soft p-7 transition-all duration-300 hover:shadow-block hover:border-brand/30 hover:-translate-y-1">
                  <span aria-hidden="true" className="absolute -top-3 right-2 font-display font-bold text-[5.5rem] leading-none tabular-nums text-coal/[0.04] group-hover:text-brand/10 transition-colors duration-300 select-none">
                    {step.n}
                  </span>
                  <span className="relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand text-white font-display font-bold mb-5">
                    {step.n}
                  </span>
                  <h3 className="relative font-display font-bold text-coal text-lg tracking-tight mb-2">{step.t}</h3>
                  <p className="relative text-ash text-sm leading-relaxed">{step.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ WHY US (BENEFITS) ════════════════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-40 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="max-w-2xl mb-12 lg:mb-16">
            <span className="kicker mb-5 !bg-white/10 !text-bone">Why {BUSINESS_NAME}</span>
            <h2 className="font-display font-bold text-bone text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-tight">
              Why {data.city} homeowners{" "}
              <span className="text-ember">choose us.</span>
            </h2>
            <p className="text-bone/60 text-base lg:text-lg leading-relaxed mt-5">
              We&apos;re a family-owned New Jersey contractor that treats your
              home like our own — and your time and money with respect.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {benefits.map(({ Icon: BIcon, t, d }, i) => (
              <Reveal key={t} delay={Math.min(i * 70, 280)}>
                <div className="group h-full rounded-2xl bg-white/[0.04] border border-steel/70 p-7 transition-all duration-300 hover:bg-white/[0.07] hover:border-brand/40 hover:-translate-y-1">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand text-white mb-5">
                    <BIcon className="w-6 h-6" />
                  </span>
                  <h3 className="font-display font-bold text-bone text-lg tracking-tight mb-2">{t}</h3>
                  <p className="text-bone/60 text-sm leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ PROJECT PHOTOS ════════════════════ */}
      {displayImages.length > 1 && (
        <section className="bg-cement">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
            <Reveal className="max-w-2xl mb-12 lg:mb-14">
              <span className="kicker mb-5">Our Work</span>
              <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-5xl leading-[1.0] tracking-tight">
                {data.title} near{" "}
                <span className="text-brand">{data.city}.</span>
              </h2>
              <div className="svc-rule w-20 mt-7" />
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {displayImages.slice(1).map((src, i) => (
                <Reveal key={i} variant="zoom" delay={(i % 3) * 70}>
                  <div className="group relative aspect-[4/3] overflow-hidden ticks bg-cement ring-1 ring-coal/[0.06] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-brand/40 hover:shadow-block">
                    <Image
                      src={src}
                      alt={`${data.title} project ${i + 1} near ${data.city}, NJ by ${BUSINESS_NAME}`}
                      fill
                      className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
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
                &ldquo;The crew that quotes your {lc} in {data.city} is the crew
                that does the work — licensed, insured, and local to {data.county}.&rdquo;
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
              {data.title} questions in {data.city}
            </h2>
            <p className="text-ash text-base leading-relaxed mt-4">
              Straight answers to what {data.city} homeowners ask us most about {lc}.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <FAQ items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ════════════════════ OTHER SERVICES IN CITY ════════════════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="max-w-2xl mb-12 lg:mb-14">
            <span className="kicker mb-5 !bg-white/10">More in {data.city}</span>
            <h2 className="font-display font-bold text-bone text-3xl sm:text-4xl lg:text-5xl leading-[1.0] tracking-tight">
              Other services in{" "}
              <span className="text-ember">{data.city}.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {otherServices.map((s) => {
              const OtherIcon = serviceIcons[s.slug];
              return (
                <Link
                  key={s.slug}
                  href={`/areas/${slug}/${s.slug}`}
                  className="group rounded-2xl bg-char border border-steel/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white p-1.5 flex-shrink-0">
                      {OtherIcon ? <OtherIcon className="w-full h-full" /> : null}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-bone/35 group-hover:text-brand transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-bone text-lg tracking-tight mb-1 group-hover:text-ember transition-colors">{s.title} in {data.city}</h3>
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
