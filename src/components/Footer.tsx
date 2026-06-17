import Image from "next/image";
import Link from "next/link";
import { services, BUSINESS_NAME, PHONE, EMAIL, ADDRESS, LICENSE } from "@/lib/seo-data";
import { Phone, Mail, MapPin, Clock, Check, ArrowRight, Facebook, Instagram } from "@/components/icons";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Project Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "Resources & FAQ", href: "/resources" },
  { label: "Financing", href: "/financing" },
  { label: "Contact", href: "/contact" },
];

const credentials = ["NJ Lic #13VH13920700", "Licensed & Insured", "Free Estimates", "Owner-Supervised"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-ink relative overflow-hidden">
      {/* hazard strip */}
      <div className="tex-hazard h-2.5 w-full" aria-hidden="true" />
      <div className="absolute inset-0 tex-blueprint opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* ── CTA band ── */}
        <div className="py-12 lg:py-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-steel">
          <div className="max-w-2xl">
            <span className="kicker mb-5">Get Started</span>
            <h2 className="font-display font-bold uppercase text-bone text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em]">
              Let&apos;s build something
              <br />
              <span className="text-brand">that lasts.</span>
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
        <div className="py-14 grid grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-5">
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
            <div className="flex flex-wrap gap-2">
              {credentials.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 bg-bone/5 border border-steel px-2.5 py-1.5">
                  <Check className="w-3 h-3 text-brand" />
                  <span className="spec text-bone/70 !tracking-[0.12em]">{c}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="spec text-bone/40 mb-5">Services</h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="group inline-flex items-center gap-2.5 text-bone/70 hover:text-bone text-sm transition-colors">
                    <span className="w-1.5 h-1.5 bg-brand group-hover:scale-150 transition-transform" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="spec text-bone/40 mb-5">Company</h3>
            <ul className="flex flex-col gap-2.5">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-2.5 text-bone/70 hover:text-bone text-sm transition-colors">
                    <span className="w-1.5 h-1.5 bg-brand group-hover:scale-150 transition-transform" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-3">
            <h3 className="spec text-bone/40 mb-5">Contact</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="tel:7329560411" className="flex items-start gap-3 text-bone/70 hover:text-bone transition-colors">
                  <Phone className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{PHONE}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 text-bone/70 hover:text-bone transition-colors">
                  <Mail className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                  <span className="text-sm break-all">{EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-bone/70">
                <MapPin className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  {ADDRESS.street}<br />
                  {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
                </span>
              </li>
              <li className="flex items-start gap-3 text-bone/70">
                <Clock className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Mon–Fri: 7am–6pm<br />
                  Sat: 8am–3pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="py-8 border-t border-steel flex flex-wrap items-center justify-center gap-10">
          <div className="relative w-24 h-24 opacity-90">
            <Image src="/homeadvisor-clean.png" alt="HomeAdvisor Screened & Approved" fill className="object-contain" />
          </div>
          <div className="relative w-24 h-24 opacity-90">
            <Image src="/why-photo-removebg-preview.png" alt="Google Five Star Customer Rating" fill className="object-contain" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t border-steel flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="spec text-bone/40 !tracking-[0.12em] text-center sm:text-left">
            © {year} {BUSINESS_NAME} · NJ Lic #{LICENSE}
          </p>
          <div className="flex items-center gap-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="inline-flex items-center justify-center w-10 h-10 bg-bone/5 border border-steel text-bone/60 hover:bg-brand hover:text-white hover:border-brand transition-all">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="inline-flex items-center justify-center w-10 h-10 bg-bone/5 border border-steel text-bone/60 hover:bg-brand hover:text-white hover:border-brand transition-all">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pb-7 text-center">
          <p className="spec text-bone/25 !tracking-[0.18em]">Designed &amp; managed by ALB</p>
        </div>
      </div>
    </footer>
  );
}
