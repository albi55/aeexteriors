"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { serviceIcons } from "@/components/icons";

const services = [
  { slug: "masonry", label: "Masonry" },
  { slug: "roofing", label: "Roofing" },
  { slug: "siding", label: "Siding" },
  { slug: "gutters", label: "Gutters" },
  { slug: "chimneys", label: "Chimneys" },
  { slug: "foundation", label: "Foundation" },
  { slug: "waterproofing", label: "Waterproofing" },
];

export default function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-bone/10 hover:bg-bone/20 text-bone border-2 border-bone/25 font-display uppercase text-xs tracking-[0.06em] px-5 py-3 transition-colors"
      >
        Our Services
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 surface-ink border-2 border-brand z-50 w-56">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.slug];
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-5 py-3 text-bone/80 font-display uppercase text-xs tracking-[0.04em] hover:bg-char hover:text-brand transition-colors ${i < services.length - 1 ? "border-b border-steel" : ""}`}
              >
                {Icon ? <Icon className="w-4 h-4 text-brand" /> : null}
                {s.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
