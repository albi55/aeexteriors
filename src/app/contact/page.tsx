import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { BUSINESS_NAME, PHONE, PHONE_LINK, EMAIL, ADDRESS, LICENSE, SITE_URL } from "@/lib/seo-data";
import { Phone, Mail, MapPin, Check, Clock, ShieldCheck, ArrowRight, ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact A&E Exteriors LLC for a free, no-obligation estimate. NJ licensed exterior contractor — masonry, roofing, siding, gutters, chimneys, foundation & waterproofing. Call 732-956-0411.",
  alternates: { canonical: "https://aeexteriorsnj.com/contact" },
};

const hours = [
  { d: "Mon – Fri", h: "7:00a – 6:00p", open: true },
  { d: "Saturday", h: "8:00a – 3:00p", open: true },
  { d: "Sunday", h: "Closed", open: false },
];

const credentials = [`NJ Lic #${LICENSE}`, "Fully Insured", "Free Estimates", "Owner-Supervised"];

const mapQuery = encodeURIComponent(`${ADDRESS.street}, ${ADDRESS.city}, ${ADDRESS.state} ${ADDRESS.zip}`);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${BUSINESS_NAME}`,
  url: `${SITE_URL}/contact`,
  mainEntity: {
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
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:00", closes: "15:00" },
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="bg-concrete">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/showcase/home.png"
            alt="Luxury New Jersey home with stone masonry, siding and a new roof by A&E Exteriors LLC"
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
          <span className="kicker mb-6">Get In Touch</span>
          <h1 className="font-display font-bold uppercase text-bone text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.015em] mb-6 max-w-3xl">
            Let&apos;s talk about your <span className="text-brand">project.</span>
          </h1>
          <p className="text-bone/70 text-base lg:text-lg max-w-xl mb-9">
            Get a free, no-obligation estimate from a New Jersey licensed contractor.
            Call us or send the form below — a real person from our crew responds
            within 24 hours.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="tel:7329560411" className="btn btn-red">
              <Phone className="w-4 h-4" />
              Call {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="btn btn-outline-bone">
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════ QUICK CONTACT STRIP ════════════════════ */}
      <section className="bg-bone border-b border-line">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
            <a href="tel:7329560411" className="group flex items-center gap-4 py-7 sm:pr-8 sm:first:pl-0 transition-colors">
              <span className="inline-flex items-center justify-center w-12 h-12 bg-brand flex-shrink-0 rounded-sm">
                <Phone className="w-5 h-5 text-white" />
              </span>
              <span>
                <span className="spec text-ash block mb-1">Call</span>
                <span className="font-display uppercase text-coal text-lg leading-none tracking-[0.01em] group-hover:text-brand transition-colors">{PHONE}</span>
              </span>
            </a>
            <a href={`mailto:${EMAIL}`} className="group flex items-center gap-4 py-7 sm:px-8 min-w-0 transition-colors">
              <span className="inline-flex items-center justify-center w-12 h-12 bg-brand flex-shrink-0 rounded-sm">
                <Mail className="w-5 h-5 text-white" />
              </span>
              <span className="min-w-0">
                <span className="spec text-ash block mb-1">Email</span>
                <span className="text-coal text-sm font-medium truncate block group-hover:text-brand transition-colors">{EMAIL}</span>
              </span>
            </a>
            <div className="flex items-center gap-4 py-7 sm:pl-8">
              <span className="inline-flex items-center justify-center w-12 h-12 bg-brand flex-shrink-0 rounded-sm">
                <MapPin className="w-5 h-5 text-white" />
              </span>
              <span>
                <span className="spec text-ash block mb-1">Visit</span>
                <span className="text-coal text-sm font-medium">{ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ FORM + INFO ════════════════════ */}
      {/* Full-bleed, edge-to-edge band — integrated page section, not a floating card. */}
      <section className="relative bg-coal text-bone overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-x-16 gap-y-12 lg:gap-y-0">

            {/* Info — left, integrated into the dark surface with hairline dividers */}
            <Reveal className="lg:order-1">
              <span className="kicker mb-6">Get In Touch</span>
              <h2 className="font-display font-bold uppercase text-bone text-3xl sm:text-4xl leading-[0.95] tracking-[-0.01em] mb-8">
                The crew, on the<br className="hidden sm:block" /> other end.
              </h2>

              <div className="divide-y divide-steel/70 border-y border-steel/70">
                {/* Hours */}
                <div className="py-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-brand" />
                    <h3 className="spec text-bone/50">Business Hours</h3>
                  </div>
                  <div className="flex flex-col gap-2.5 text-sm">
                    {hours.map((h) => (
                      <div key={h.d} className="flex items-center justify-between">
                        <span className="text-bone/55">{h.d}</span>
                        <span className={`font-medium inline-flex items-center gap-2 ${h.open ? "text-bone" : "text-stone"}`}>
                          {h.open && <span className="w-1.5 h-1.5 rounded-full bg-ember" aria-hidden="true" />}
                          {h.h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service areas */}
                <div className="py-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-brand" />
                    <h3 className="spec text-bone/50">Service Areas</h3>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-bone/75">
                    <span>Passaic</span>
                    <span>Bergen</span>
                    <span>Essex</span>
                    <span>Morris</span>
                    <span className="spec text-bone/40 w-full mt-1">+ all 21 NJ counties</span>
                  </div>
                </div>

                {/* Credentials */}
                <div className="py-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Check className="w-4 h-4 text-brand" />
                    <h3 className="spec text-bone/50">Credentials</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 text-sm">
                    {credentials.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-bone/80">
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-brand flex-shrink-0 rounded-sm">
                          <Check className="w-3 h-3 text-white" />
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <ShieldCheck className="w-7 h-7 text-brand flex-shrink-0" />
                <p className="text-bone/70 text-sm leading-snug">
                  Owner-supervised, fully insured, and proud of every job we sign our name to.
                </p>
              </div>
            </Reveal>

            {/* Form — right, on an elevated dark panel for depth (not a white modal card) */}
            <Reveal delay={100} className="lg:order-2">
              <div className="relative rounded-[var(--radius-lg)] border border-steel/80 bg-char shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* brand accent rail */}
                <div className="h-1 w-full bg-brand" aria-hidden="true" />
                <div className="p-7 sm:p-10">
                  <span className="kicker mb-5">Free Estimate</span>
                  <h2 className="font-display font-bold uppercase text-bone text-3xl sm:text-4xl leading-[0.95] tracking-[-0.01em] mb-3">
                    Request a quote
                  </h2>
                  <p className="text-bone/55 text-sm mb-8 max-w-md">
                    Tell us about your project. We respond within 24 hours to schedule your free, no-obligation estimate.
                  </p>
                  <ContactForm tone="dark" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════ MAP ════════════════════ */}
      <section className="bg-bone border-t border-line">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
          <Reveal className="flex items-end justify-between gap-4 mb-7 flex-wrap">
            <div>
              <span className="kicker mb-4">Find Us</span>
              <h2 className="font-display font-bold uppercase text-coal text-3xl sm:text-4xl leading-[0.95] tracking-[-0.01em]">
                Based in North Haledon
              </h2>
            </div>
            <span className="spec text-ash">Serving all 21 NJ counties</span>
          </Reveal>

          <Reveal delay={80} className="relative ticks border-2 border-coal/10 shadow-soft">
            <iframe
              title={`Map of ${BUSINESS_NAME} in ${ADDRESS.city}, NJ`}
              src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="460"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full grayscale-[0.25] contrast-[1.05]"
            />
            <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 max-w-xs surface-ink rounded-[var(--radius)] shadow-block p-5">
              <span className="spec text-brand block mb-2">Office</span>
              <p className="font-display uppercase text-bone text-lg leading-tight tracking-[0.01em]">{ADDRESS.street}</p>
              <p className="text-bone/60 text-sm mt-0.5">{ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}</p>
              <a
                href={`https://maps.google.com/maps?q=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 mt-3 font-display uppercase text-sm text-bone hover:text-brand transition-colors"
              >
                Get Directions
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section className="surface-brand relative overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-25 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 text-center">
          <h2 className="font-display font-bold uppercase text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-5">
            Prefer to talk? Call us.
          </h2>
          <p className="text-white/80 text-base lg:text-lg mb-10 max-w-xl mx-auto">
            No phone trees, no call centers — you reach the crew that does the work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="tel:7329560411" className="btn btn-bone w-full sm:w-auto justify-center">
              <Phone className="w-4 h-4" />
              Call {PHONE}
            </a>
            <Link href="/services" className="btn btn-outline-bone w-full sm:w-auto justify-center">
              Browse Our Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
