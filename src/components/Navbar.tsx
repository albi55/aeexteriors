"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ArrowRight, ShieldCheck, Clock } from "@/components/icons";
import { PHONE, LICENSE } from "@/lib/seo-data";

const nav = [
  { label: "Home", href: "/", desc: "Back to the start" },
  { label: "Services", href: "/services", desc: "Masonry, roofing, siding & more" },
  { label: "Gallery", href: "/gallery", desc: "See our recent NJ projects" },
  { label: "Service Areas", href: "/areas", desc: "All 21 New Jersey counties" },
  { label: "Resources", href: "/resources", desc: "Guides & homeowner tips" },
  { label: "About", href: "/about", desc: "Meet the family-owned crew" },
  { label: "Contact", href: "/contact", desc: "Get your free estimate" },
];

const mobileNav = [...nav, { label: "Financing", href: "/financing", desc: "0% financing available" }];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [panelH, setPanelH] = useState(0);
  const infoRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => setInfoOpen(false), [pathname]);

  // Lock body scroll + close on Escape while the full-screen mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Auto-open the promo strip 1s after load.
  useEffect(() => {
    const t = setTimeout(() => setInfoOpen(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // Continuously measure the panel's natural height (content/resize-aware).
  useEffect(() => {
    const el = panelRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setPanelH(el.offsetHeight));
    ro.observe(el);
    setPanelH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  // Push the whole page down by exactly the promo height when open.
  useEffect(() => {
    document.documentElement.style.setProperty("--promo-h", `${infoOpen ? panelH : 0}px`);
  }, [infoOpen, panelH]);

  // Close the info dropdown on outside-click or Escape.
  useEffect(() => {
    if (!infoOpen) return;
    const onClick = (e: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(e.target as Node)) setInfoOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setInfoOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [infoOpen]);

  const isHome = pathname === "/";
  const solid = !isHome || scrolled || open;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* ── Utility strip — the whole bar expands/collapses ── */}
      <div className="hidden md:block bg-brand-deep text-white relative z-50" ref={infoRef}>
        {/* Always-visible top row */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-9 flex items-center justify-between text-[0.72rem] font-medium tracking-wide">
          <span className="inline-flex items-center gap-2 text-white/85">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            NJ Lic&nbsp;#{LICENSE} — Licensed &amp; Insured · Owner-Supervised
          </span>
          <div className="flex items-center gap-6">
            <Link href="/financing" className="font-semibold text-white hover:text-white/80 transition-colors">
              0% Financing Available →
            </Link>
            <span className="hidden lg:inline text-white/70">Mon–Fri 7–6 · Sat 8–3</span>
            <a href="tel:7329560411" className="hidden lg:inline-flex text-white hover:text-white/80 transition-colors items-center gap-2 font-semibold">
              <Phone className="w-3.5 h-3.5" />
              {PHONE}
            </a>
            <button
              type="button"
              onClick={() => setInfoOpen((v) => !v)}
              aria-expanded={infoOpen}
              className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-white/80 transition-colors"
            >
              {infoOpen ? "See Less" : "Special Offer"}
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ${infoOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expandable lower section — animates to exact measured height */}
        <div
          className="overflow-hidden transition-[height] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ height: infoOpen ? panelH : 0 }}
          aria-hidden={!infoOpen}
        >
          <div
            ref={panelRef}
            className={`max-w-7xl mx-auto px-6 lg:px-10 py-6 border-t border-white/15 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              infoOpen ? "opacity-100 translate-y-0 delay-100" : "opacity-0 -translate-y-3"
            }`}
          >
            <div className="flex items-start gap-3.5">
              {/* Warning / badge icon */}
              <svg
                className="w-7 h-7 text-white flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              >
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>

              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-white text-base lg:text-lg leading-snug">
                  Request Your Exclusive 20% Discount Today!
                </p>
                <p className="text-white/85 text-sm leading-relaxed mt-2 max-w-3xl">
                  If you&apos;re a military member or a senior, we want to thank you with an exclusive 20% discount on
                  our home-exterior services. Whether you need roofing, siding, gutters, or more — reach out today and
                  claim your savings.
                </p>
                <Link
                  href="/contact"
                  onClick={() => setInfoOpen(false)}
                  className="group inline-flex items-center gap-2.5 mt-4 font-display font-bold text-white text-sm hover:gap-3.5 transition-all"
                >
                  Inquire Now
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-white/70 group-hover:bg-white group-hover:text-brand-deep transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div className={`relative z-50 transition-colors duration-300 ${solid || open ? "bg-bone border-b-2 border-coal/10" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <span className="relative w-11 h-11 lg:w-12 lg:h-12 rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
                <Image src="/logo-light.jpeg" alt="A&E Exteriors LLC logo" fill className="object-cover scale-[1.15]" priority />
              </span>
              <span className="leading-none">
                <span className={`font-display font-bold text-lg lg:text-xl tracking-tight block transition-colors ${solid ? "text-coal" : "text-bone"}`}>
                  A&amp;E Exteriors
                </span>
                <span className={`text-[0.7rem] font-semibold tracking-wide transition-colors ${solid ? "text-ash" : "text-bone/70"}`}>
                  Exterior Contractor · NJ
                </span>
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
            <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
              <a
                href="tel:7329560411"
                className={`font-display font-semibold text-sm inline-flex items-center gap-2 transition-colors ${
                  solid ? "text-coal hover:text-brand" : "text-bone hover:text-brand"
                }`}
              >
                <Phone className="w-4 h-4" />
                732·956·0411
              </a>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand hover:bg-brand-deep text-white font-display font-bold text-sm px-5 py-2.5 shadow-[0_10px_24px_-10px_rgba(180,10,10,0.55)] hover:shadow-[0_16px_30px_-12px_rgba(180,10,10,0.6)] hover:-translate-y-0.5 transition-all duration-200"
              >
                Free Estimate
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-2.5">
              <a
                href="tel:7329560411"
                className="inline-flex items-center gap-2 h-11 rounded-full bg-brand hover:bg-brand-deep active:scale-95 text-white font-display font-bold text-sm px-4 shadow-[0_8px_20px_-8px_rgba(180,10,10,0.6)] transition-all duration-200"
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
                className={`inline-flex items-center justify-center w-11 h-11 rounded-full active:scale-95 transition-all duration-200 ${
                  open
                    ? "bg-brand text-white shadow-[0_8px_20px_-8px_rgba(180,10,10,0.6)]"
                    : solid
                      ? "bg-coal text-bone hover:bg-char"
                      : "bg-bone/10 text-bone ring-1 ring-bone/25 backdrop-blur hover:bg-bone/15"
                }`}
              >
                <span className="flex flex-col gap-1">
                  <span className={`block w-5 h-0.5 rounded-full bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`} />
                  <span className={`block w-5 h-0.5 rounded-full bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                  <span className={`block w-5 h-0.5 rounded-full bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Full-screen mobile menu overlay ── */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="relative h-[100dvh] w-screen overflow-y-auto overscroll-contain bg-coal">
          {/* spacer so content clears the fixed top bar (utility strip + main bar) */}
          <div className="relative flex min-h-full flex-col px-6 pt-24 pb-10">
            <span
              className={`spec text-bone/40 mb-4 transition-all duration-500 ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
              style={{ transitionDelay: open ? "80ms" : "0ms" }}
            >
              Menu
            </span>

            <nav className="flex flex-col">
              {mobileNav.map((l, i) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}
                    className={`group flex items-center justify-between gap-4 py-3.5 border-b border-bone/10 transition-all duration-500 ${
                      open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className={`block font-display uppercase text-lg tracking-[0.04em] transition-colors ${active ? "text-brand" : "text-bone group-hover:text-brand"}`}>
                        {l.label}
                      </span>
                      <span className="block text-bone/45 text-xs mt-0.5 normal-case tracking-normal">{l.desc}</span>
                    </span>
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 transition-colors ${active ? "bg-brand text-white" : "bg-bone/[0.06] text-brand group-hover:bg-brand group-hover:text-white"}`}>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-8">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-deep text-white font-display uppercase text-base tracking-[0.06em] py-4 shadow-[0_12px_28px_-12px_rgba(180,10,10,0.6)] transition-colors"
              >
                Free Estimate
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:7329560411"
                onClick={() => setOpen(false)}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-bone/25 text-bone font-display uppercase text-base tracking-[0.06em] py-3.5"
              >
                <Phone className="w-5 h-5" />
                732·956·0411
              </a>

              <div className="mt-6 flex flex-col items-center gap-1.5 text-center">
                <span className="inline-flex items-center gap-2 text-bone/55 text-xs">
                  <Clock className="w-3.5 h-3.5 text-brand" />
                  Mon–Fri 7–6 · Sat 8–3
                </span>
                <span className="inline-flex items-center gap-2 spec text-bone/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand" />
                  NJ Lic #{LICENSE} · Licensed &amp; Insured
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
