"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEstimate } from "@/components/EstimateModalProvider";
import { Phone, ArrowRight } from "@/components/icons";

const nav = [
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Service Areas", href: "/areas" },
  { label: "Reviews", href: "/reviews" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

const mobileNav = [...nav, { label: "Financing", href: "/financing" }, { label: "Contact", href: "/contact" }];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { openEstimate } = useEstimate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isHome = pathname === "/";
  const solid = !isHome || scrolled || open;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* ── Utility spec strip ── */}
      <div className="hidden md:block surface-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-9 flex items-center justify-between">
          <span className="spec text-bone/55">NJ LIC&nbsp;#13VH13920700 — LICENSED &amp; INSURED</span>
          <div className="flex items-center gap-6">
            <Link href="/financing" className="spec text-ember hover:text-bone transition-colors">
              0% Financing Available →
            </Link>
            <span className="hidden lg:inline spec text-bone/45">Mon–Fri 7–6 · Sat 8–3</span>
            <a href="tel:7329560411" className="spec text-bone hover:text-ember transition-colors inline-flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              732·956·0411
            </a>
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div className={`transition-colors duration-300 ${solid ? "bg-bone border-b-2 border-coal/10" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <span className="relative w-11 h-11 lg:w-12 lg:h-12 overflow-hidden bg-coal ring-2 ring-brand">
                <Image src="/logo.png" alt="A&E Exteriors LLC logo" fill className="object-contain p-1" priority />
              </span>
              <span className="leading-none">
                <span className={`font-display font-bold text-lg lg:text-xl uppercase tracking-[0.02em] block transition-colors ${solid ? "text-coal" : "text-bone"}`}>
                  A&amp;E Exteriors
                </span>
                <span className="spec text-brand">Exterior Contractor · NJ</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {nav.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`relative font-display uppercase text-sm tracking-[0.04em] pb-1 transition-colors ${
                      active
                        ? solid ? "text-brand" : "text-bone"
                        : solid ? "text-coal/75 hover:text-brand" : "text-bone/75 hover:text-bone"
                    }`}
                  >
                    {l.label}
                    <span className={`absolute left-0 -bottom-0.5 h-0.5 bg-brand transition-all duration-300 ${active ? "w-full" : "w-0"}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
              <a
                href="tel:7329560411"
                className={`font-display uppercase text-sm tracking-[0.04em] inline-flex items-center gap-2 transition-colors ${
                  solid ? "text-coal hover:text-brand" : "text-bone hover:text-ember"
                }`}
              >
                <Phone className="w-4 h-4" />
                732·956·0411
              </a>
              <button
                type="button"
                onClick={openEstimate}
                className="group inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white font-display uppercase text-xs tracking-[0.06em] px-4 py-3 transition-colors"
              >
                Free Estimate
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href="tel:7329560411"
                className="inline-flex items-center gap-2 bg-brand text-white font-display uppercase text-xs tracking-[0.06em] px-3.5 py-2.5"
                aria-label="Call 732-956-0411"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className={`inline-flex items-center justify-center w-11 h-11 transition-colors ${
                  solid ? "bg-coal text-bone" : "bg-bone/10 text-bone ring-1 ring-bone/25 backdrop-blur"
                }`}
              >
                <span className="flex flex-col gap-1">
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`} />
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
                </span>
              </button>
            </div>
          </div>

          {/* Mobile panel */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[680px] pb-5" : "max-h-0"}`}>
            <div className="surface-ink relative overflow-hidden mt-1">
              <div className="absolute inset-0 tex-blueprint opacity-60 pointer-events-none" aria-hidden="true" />
              <div className="relative px-6 py-5">
                <nav className="flex flex-col">
                  {mobileNav.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between py-3.5 font-display uppercase text-sm tracking-[0.04em] border-b border-steel/70 transition-colors ${
                        isActive(l.href) ? "text-ember" : "text-bone hover:text-ember"
                      }`}
                    >
                      <span>{l.label}</span>
                      <ArrowRight className="w-4 h-4 text-brand" />
                    </Link>
                  ))}
                </nav>
                <button
                  type="button"
                  onClick={() => { setOpen(false); openEstimate(); }}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-deep text-white font-display uppercase text-sm tracking-[0.06em] py-3.5 transition-colors"
                >
                  Free Estimate
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="tel:7329560411"
                  onClick={() => setOpen(false)}
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 border-2 border-bone/25 text-bone font-display uppercase text-sm tracking-[0.06em] py-3"
                >
                  <Phone className="w-4 h-4" />
                  732·956·0411
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
