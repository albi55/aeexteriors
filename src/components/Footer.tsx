import Image from "next/image";
import Link from "next/link";
import { services, BUSINESS_NAME, PHONE, EMAIL, ADDRESS, LICENSE } from "@/lib/seo-data";
import { Phone, Mail, MapPin, Clock, Check, ArrowRight, Facebook, Instagram } from "@/components/icons";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Project Gallery", href: "/gallery" },
  { label: "Resources & FAQ", href: "/resources" },
  { label: "Financing", href: "/financing" },
  { label: "Contact", href: "/contact" },
];

const credentials = ["NJ Lic #13VH13920700", "Licensed & Insured", "Free Estimates", "Owner-Supervised"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-char text-bone relative overflow-hidden">
      {/* hazard strip */}
      <div className="tex-hazard h-2.5 w-full" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* ── CTA band ── */}
        <div className="py-12 lg:py-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-steel">
          <div className="max-w-2xl">
            <span className="kicker mb-5">Get Started</span>
            <h2 className="font-display font-bold text-bone text-3xl sm:text-4xl lg:text-5xl leading-[1.04] tracking-tight">
              Let&apos;s build something <span className="text-brand">that lasts.</span>
            </h2>
            <p className="text-bone/55 text-base leading-relaxed mt-5">
              Free, no-obligation estimates across all 21 NJ counties. Owner-supervised, done right the first time.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/contact" className="btn btn-red">
              Get Free Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:7329560411" className="btn btn-outline-bone">
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
          </div>
        </div>

        {/* ── Columns ── */}
        <div className="py-14 grid grid-cols-2 lg:grid-cols-12 gap-x-10 gap-y-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <span className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shadow-sm">
                <Image src="/logo-light.jpeg" alt="A&E Exteriors LLC" fill className="object-cover scale-[1.15]" />
              </span>
              <span className="leading-none">
                <span className="font-display font-bold text-bone text-xl tracking-tight block">A&amp;E Exteriors</span>
                <span className="text-[0.7rem] font-semibold tracking-wide text-bone/60">Exterior Contractor · NJ</span>
              </span>
            </Link>
            <p className="text-bone/55 text-sm leading-relaxed mb-6 max-w-xs">
              Expert masonry, roofing, siding, gutters, chimneys, foundation &amp; waterproofing — serving all of New Jersey since day one.
            </p>
            <ul className="flex flex-col gap-2.5">
              {credentials.map((c) => (
                <li key={c} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand flex-shrink-0" />
                  <span className="text-bone/70 text-sm">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="spec text-bone/40 mb-5 pb-3 border-b border-steel">Services</h3>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="group inline-flex items-center gap-2.5 text-bone/65 hover:text-bone text-sm transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-brand -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="-ml-[1.375rem] group-hover:ml-0 transition-all duration-300">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="spec text-bone/40 mb-5 pb-3 border-b border-steel">Company</h3>
            <ul className="flex flex-col gap-3">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-2.5 text-bone/65 hover:text-bone text-sm transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-brand -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="-ml-[1.375rem] group-hover:ml-0 transition-all duration-300">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-3">
            <h3 className="spec text-bone/40 mb-5 pb-3 border-b border-steel">Contact</h3>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a href="tel:7329560411" className="group flex items-center gap-3 text-bone/70 hover:text-bone transition-colors">
                  <Phone className="w-4 h-4 text-brand flex-shrink-0" />
                  <span className="text-sm font-semibold">{PHONE}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="group flex items-center gap-3 text-bone/70 hover:text-bone transition-colors">
                  <Mail className="w-4 h-4 text-brand flex-shrink-0" />
                  <span className="text-sm break-all">{EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-bone/70">
                <MapPin className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  {ADDRESS.street}, {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
                </span>
              </li>
              <li className="flex items-start gap-3 text-bone/70">
                <Clock className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  Mon–Fri 7am–6pm · Sat 8am–3pm
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom band — darker bar to separate from the charcoal footer ── */}
      <div className="relative z-10 bg-coal">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* left: copyright + credit */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1.5 text-center sm:text-left">
            <p className="text-bone/55 text-sm">
              © {year} <span className="text-bone/80 font-semibold">{BUSINESS_NAME}</span>
            </p>
            <span className="hidden sm:block h-3.5 w-px bg-steel" aria-hidden="true" />
            <p className="spec text-bone/35">NJ Lic #{LICENSE}</p>
          </div>

          {/* right: socials + designer credit */}
          <div className="flex items-center gap-5">
            <span className="spec text-bone/35 hidden md:inline">Designed &amp; managed by ALB</span>
            <span className="hidden md:block h-3.5 w-px bg-steel" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-bone/[0.06] border border-steel text-bone/60 hover:bg-brand hover:text-white hover:border-brand transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-bone/[0.06] border border-steel text-bone/60 hover:bg-brand hover:text-white hover:border-brand transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* designer credit on mobile (centered under the bar) */}
        <p className="md:hidden spec text-bone/30 text-center pb-5 !tracking-[0.18em]">Designed &amp; managed by ALB</p>
      </div>
    </footer>
  );
}
