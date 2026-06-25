import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import CountUp from "@/components/CountUp";
import { BUSINESS_NAME, PHONE, PHONE_LINK, EMAIL, ADDRESS, LICENSE, SITE_URL } from "@/lib/seo-data";
import { Phone, Mail, MapPin, Check, Clock, Star, ShieldCheck, ArrowRight, ArrowUpRight } from "@/components/icons";

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
            className="object-cover scale-105 animate-[heroPan_22s_ease-in-out_infinite_alternate]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" aria-hidden="true" />
        <div className="absolute inset-0 tex-blueprint opacity-25 tex-fade-top pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-20 lg:pb-28">
          <div className="max-w-3xl">
            {/* breadcrumb */}
            <nav className="flex items-center gap-2.5 spec text-bone/45 mb-7">
              <Link href="/" className="hover:text-brand transition-colors">Home</Link>
              <span className="text-bone/25">/</span>
              <span className="text-brand">Contact</span>
            </nav>

            <div className="mb-7">
              <span className="kicker !bg-white/10 !text-bone">Get In Touch · New Jersey</span>
            </div>

            <h1 className="font-display font-bold text-bone text-5xl sm:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-tight mb-6">
              Let&apos;s talk about your <span className="text-brand">project.</span>
            </h1>
            <p className="text-bone/70 text-lg lg:text-xl max-w-xl mb-9 leading-relaxed">
              Get a free, no-obligation estimate from a New Jersey licensed contractor.
              Call us or send the form below — a real person from our own crew responds
              within 24 hours. No phone trees, no call centers, no pressure.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="tel:7329560411" className="btn btn-red">
                <Phone className="w-4 h-4" />
                Call {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="btn btn-outline-bone">
                <Mail className="w-4 h-4" />
                Email Us
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
        </div>
      </section>

      {/* ════════════════════ STAT STRIP (animated count-up) ════════════════════ */}
      <section className="surface-brand relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y-0 lg:divide-x lg:divide-white/15">
            {[
              { to: 24, suffix: "hr", l: "Response Window", Icon: Clock },
              { to: 21, suffix: "", l: "NJ Counties Served", Icon: MapPin },
              { to: 100, suffix: "%", l: "Own Crew, No Subs", Icon: ShieldCheck },
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

      {/* ════════════════════ QUICK CONTACT CARDS ════════════════════ */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 lg:pt-40 pb-16 lg:pb-20">
          <Reveal className="max-w-2xl mb-10 lg:mb-12">
            <span className="kicker mb-5">Three Ways to Reach Us</span>
            <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-tight">
              Pick whatever&apos;s{" "}
              <span className="text-brand">easiest for you.</span>
            </h2>
            <div className="svc-rule w-20 mt-7" />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
            {[
              { Icon: Phone, label: "Call", value: PHONE, sub: "Mon–Fri 7–6 · Sat 8–3", href: "tel:7329560411" },
              { Icon: Mail, label: "Email", value: EMAIL, sub: "We reply within 24 hours", href: `mailto:${EMAIL}` },
              { Icon: MapPin, label: "Visit", value: `${ADDRESS.city}, ${ADDRESS.state}`, sub: `${ADDRESS.street}, ${ADDRESS.zip}`, href: `https://maps.google.com/maps?q=${mapQuery}` },
            ].map(({ Icon: CIcon, label, value, sub, href }) => (
              <a
                key={label}
                href={href}
                target={label === "Visit" ? "_blank" : undefined}
                rel={label === "Visit" ? "noopener noreferrer" : undefined}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-bone border border-line p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span aria-hidden="true" className="absolute left-0 top-0 h-full w-1 bg-brand origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand text-white transition-transform duration-300 group-hover:scale-110">
                    <CIcon className="w-5 h-5" />
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-coal/20 group-hover:text-brand transition-colors" />
                </div>
                <span className="spec text-stone mb-1.5">{label}</span>
                <span className="font-display font-bold text-coal text-lg tracking-tight truncate group-hover:text-brand transition-colors">{value}</span>
                <span className="text-ash text-sm mt-1.5">{sub}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ FORM + INFO ════════════════════ */}
      {/* Full-bleed, edge-to-edge band — integrated page section, not a floating card. */}
      <section className="relative bg-coal text-bone overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-x-16 gap-y-12 lg:gap-y-0">

            {/* Info — left, integrated into the dark surface with hairline dividers */}
            <Reveal className="lg:order-1">
              <span className="kicker !bg-white/10 !text-bone mb-6">Get In Touch</span>
              <h2 className="font-display font-bold text-bone text-3xl sm:text-4xl leading-[1.0] tracking-tight mb-4">
                The crew, on the other end.
              </h2>
              <p className="text-bone/55 text-sm leading-relaxed mb-8 max-w-sm">
                When you call or write, you reach the people who actually do the work —
                not a dispatcher and not a subcontractor. Here&apos;s how to find us.
              </p>

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
                  <span className="kicker !bg-white/10 !text-bone mb-5">Free Estimate</span>
                  <h2 className="font-display font-bold text-bone text-3xl sm:text-4xl leading-[1.0] tracking-tight mb-3">
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
              <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl leading-[1.0] tracking-tight">
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
      <section className="relative surface-brand overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 text-center">
          <span className="spec text-white/70 mb-5 block">Ready When You Are</span>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight mb-5">
            Prefer to talk? Call us.
          </h2>
          <p className="text-white/85 text-base lg:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            No phone trees, no call centers — you reach the crew that does the work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="tel:7329560411" className="btn btn-bone w-full sm:w-auto justify-center">
              <Phone className="w-4 h-4" />
              Call {PHONE}
            </a>
            <Link href="/services" className="btn btn-ink w-full sm:w-auto justify-center">
              Browse Our Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
