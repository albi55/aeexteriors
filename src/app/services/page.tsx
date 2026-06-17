import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import ServicesSidebar from "@/components/ServicesSidebar";
import { services as seoServices, PHONE } from "@/lib/seo-data";
import { ArrowRight, Phone, Check, serviceIcons } from "@/components/icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "A&E Exteriors LLC offers expert Masonry, Roofing, Siding, Gutters, Chimneys, Foundation & Waterproofing across New Jersey. NJ Licensed #13VH13920700. Free estimates. Call 732-956-0411.",
  alternates: { canonical: "https://aeexteriorsnj.com/services" },
};

const stats = [
  { val: "7+", label: "Services" },
  { val: "100%", label: "Licensed & Insured" },
  { val: "21", label: "Counties Served" },
  { val: "Free", label: "On-Site Estimates" },
];

export default function ServicesPage() {
  return (
    <div className="bg-concrete">
      <ServicesSidebar />

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/cambridge-pavers/pavers-1.webp" alt="A&E Exteriors LLC exterior contracting in New Jersey" fill priority className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/55" />
        <div className="absolute inset-0 tex-blueprint opacity-40 tex-fade-top pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="kicker mb-6">What We Do</span>
              <h1 className="font-display font-bold uppercase text-bone text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.015em] mb-6">
                Our <span className="text-brand">services</span>
              </h1>
              <p className="text-bone/65 text-base lg:text-lg max-w-md mb-8">
                Full-service exterior contracting — everything your home needs, done right the first time.
                NJ licensed, fully insured, serving all of New Jersey.
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

      {/* Quick index chips */}
      <div className="surface-brand">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center gap-2 flex-wrap">
          <span className="spec text-white/80 mr-2">Jump to:</span>
          {seoServices.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="spec text-white border border-white/30 hover:bg-white hover:text-brand px-3 py-1.5 transition-colors !tracking-[0.1em]">
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {/* ════════ SERVICE DETAIL BLOCKS ════════ */}
      {seoServices.map((service, i) => {
        const Icon = serviceIcons[service.slug];
        const even = i % 2 === 0;
        return (
          <section key={service.slug} id={service.slug} className={`scroll-mt-28 ${even ? "bg-bone" : "bg-concrete"}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
              <Reveal className="flex items-start gap-5 mb-10 border-t-2 border-coal pt-8">
                <span className="hidden sm:inline-flex flex-shrink-0 items-center justify-center w-24 h-24">
                  {Icon ? <Icon className="w-full h-full" /> : null}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="spec text-ash">{String(i + 1).padStart(2, "0")}</span>
                    <span className="spec text-brand">{service.tagline}</span>
                  </div>
                  <h2 className="font-display font-bold uppercase text-coal text-4xl lg:text-5xl leading-[0.95] tracking-[-0.01em]">
                    {service.title}
                  </h2>
                </div>
              </Reveal>

              {service.images.length > 0 && (
                <Reveal className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
                  {service.images.slice(0, 4).map((src, j) => (
                    <div key={j} className="relative aspect-[4/3] overflow-hidden bg-cement group">
                      <Image src={src} alt={`${service.title} project ${j + 1} by A&E Exteriors LLC`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 50vw, 25vw" />
                    </div>
                  ))}
                </Reveal>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <Reveal className="lg:col-span-2">
                  <div className="flex flex-col gap-4 text-ash text-base leading-relaxed mb-8">
                    {service.seoContent.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link href={`/services/${service.slug}`} className="btn btn-red">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/contact" className="btn btn-outline">Get Free Estimate</Link>
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <div className={`${even ? "bg-concrete" : "bg-bone"} border border-line`}>
                    <div className="px-5 py-4 border-b border-line">
                      <span className="spec text-brand">What&apos;s Included</span>
                    </div>
                    {service.subServices.map((sub, j) => (
                      <div key={sub} className={`flex items-center gap-3 px-5 py-3 ${j < service.subServices.length - 1 ? "border-b border-line" : ""}`}>
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
        );
      })}

      {/* ════════ STATS ════════ */}
      <section className="surface-ink relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-steel">
            {stats.map((s) => (
              <div key={s.label} className="py-6 px-4 lg:px-8 text-center">
                <div className="font-display font-bold text-brand text-5xl lg:text-6xl leading-none">{s.val}</div>
                <div className="spec text-bone/45 mt-3">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="surface-brand">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 text-center">
          <h2 className="font-display font-bold uppercase text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-5">
            Need a custom solution?
          </h2>
          <p className="text-white/85 text-base lg:text-lg mb-10 max-w-xl mx-auto">
            Every home is different. Contact us for a free on-site assessment and personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-bone w-full sm:w-auto justify-center">
              Request Free Estimate
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
