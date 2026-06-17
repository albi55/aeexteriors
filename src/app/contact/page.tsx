import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { BUSINESS_NAME, PHONE, PHONE_LINK, EMAIL, ADDRESS, LICENSE, SITE_URL } from "@/lib/seo-data";
import { Phone, Mail, MapPin, Check } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact A&E Exteriors LLC for a free, no-obligation estimate. NJ licensed exterior contractor — masonry, roofing, siding, gutters, chimneys, foundation & waterproofing. Call 732-956-0411.",
  alternates: { canonical: "https://aeexteriorsnj.com/contact" },
};

const hours = [
  { d: "Mon – Fri", h: "7am – 6pm" },
  { d: "Saturday", h: "8am – 3pm" },
  { d: "Sunday", h: "Closed" },
];

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

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 tex-fade-top pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-16 lg:pb-20">
          <span className="kicker mb-6">Get In Touch</span>
          <h1 className="font-display font-bold uppercase text-bone text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.015em] mb-6">
            Contact <span className="text-brand">us</span>
          </h1>
          <p className="text-bone/65 text-base lg:text-lg max-w-lg mb-10">
            Get a free, no-obligation estimate. Call us or fill out the form — we respond within 24 hours.
          </p>
          <div className="border-t border-steel pt-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-steel">
            <a href="tel:7329560411" className="group bg-coal hover:bg-char px-6 py-5 flex items-center gap-4 transition-colors">
              <span className="inline-flex items-center justify-center w-11 h-11 bg-brand flex-shrink-0"><Phone className="w-5 h-5 text-white" /></span>
              <span>
                <span className="spec text-bone/45 block">Call</span>
                <span className="font-display uppercase text-bone text-lg tracking-[0.01em]">{PHONE}</span>
              </span>
            </a>
            <a href={`mailto:${EMAIL}`} className="group bg-coal hover:bg-char px-6 py-5 flex items-center gap-4 transition-colors">
              <span className="inline-flex items-center justify-center w-11 h-11 bg-brand flex-shrink-0"><Mail className="w-5 h-5 text-white" /></span>
              <span className="min-w-0">
                <span className="spec text-bone/45 block">Email</span>
                <span className="text-bone text-sm font-medium truncate block">{EMAIL}</span>
              </span>
            </a>
            <div className="bg-coal px-6 py-5 flex items-center gap-4">
              <span className="inline-flex items-center justify-center w-11 h-11 bg-brand flex-shrink-0"><MapPin className="w-5 h-5 text-white" /></span>
              <span>
                <span className="spec text-bone/45 block">Visit</span>
                <span className="text-bone text-sm font-medium">{ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FORM + INFO ════════ */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <Reveal className="lg:col-span-2">
              <span className="kicker mb-5">Free Estimate</span>
              <h2 className="font-display font-bold uppercase text-coal text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-[-0.01em] mb-3">
                Request a quote
              </h2>
              <p className="text-ash text-sm mb-8">Tell us about your project. We respond within 24 hours.</p>
              <ContactForm />
            </Reveal>

            <Reveal delay={100} className="flex flex-col gap-px bg-line border border-line self-start">
              <div className="bg-bone p-6">
                <h3 className="spec text-brand mb-4">Business Hours</h3>
                <div className="flex flex-col gap-2 text-sm">
                  {hours.map((h) => (
                    <div key={h.d} className="flex justify-between">
                      <span className="text-ash">{h.d}</span>
                      <span className="text-coal font-medium">{h.h}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-bone p-6">
                <h3 className="spec text-brand mb-4">Service Areas</h3>
                <div className="flex flex-col gap-1.5 text-sm text-coal/80">
                  <p>Passaic County</p>
                  <p>Bergen County</p>
                  <p>Essex County</p>
                  <p>Morris County</p>
                  <p className="spec text-ash mt-2">+ all 21 NJ counties</p>
                </div>
              </div>
              <div className="bg-bone p-6">
                <h3 className="spec text-brand mb-4">Credentials</h3>
                <div className="flex flex-col gap-2.5 text-sm">
                  {[`NJ Lic #${LICENSE}`, "Fully Insured", "Free Estimates", "Owner-Supervised"].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-coal/80">
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-brand flex-shrink-0"><Check className="w-3 h-3 text-white" /></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ MAP ════════ */}
      <section className="bg-cement">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div>
              <span className="kicker mb-3">Find Us</span>
              <p className="font-display uppercase text-coal text-2xl tracking-[0.01em]">{ADDRESS.street}, {ADDRESS.city}, NJ</p>
            </div>
            <span className="spec text-ash">Based in North Haledon · Serving all of NJ</span>
          </div>
          <div className="ticks border-2 border-coal/10 overflow-hidden">
            <iframe
              title={`Map of ${BUSINESS_NAME} in ${ADDRESS.city}, NJ`}
              src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full grayscale-[0.2] contrast-[1.05]"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
