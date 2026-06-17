"use client";

import { useState, useEffect } from "react";

const serviceLinks = [
  { id: "masonry", label: "Masonry" },
  { id: "roofing", label: "Roofing" },
  { id: "siding", label: "Siding" },
  { id: "gutters", label: "Gutters" },
  { id: "chimneys", label: "Chimneys" },
  { id: "foundation", label: "Foundation" },
  { id: "waterproofing", label: "Waterproofing" },
];

export default function ServicesSidebar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    serviceLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="hidden lg:block fixed right-0 z-40"
      style={{ top: "50%", transform: `translateY(-50%) translateX(${open ? "0" : "calc(100% - 32px)"})`, transition: "transform 0.3s" }}
    >
      <div className="flex items-stretch">
        {/* Toggle tab */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle service navigation"
          className="bg-brand hover:bg-brand-deep text-white w-8 flex items-center justify-center flex-shrink-0 transition-colors"
        >
          <svg className={`w-4 h-4 transition-transform duration-300 ${open ? "" : "rotate-180"}`} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Panel */}
        <div className="surface-ink border-l-2 border-brand flex flex-col">
          <span className="spec text-bone/40 px-5 pt-3 pb-2 border-b border-steel">Services</span>
          {serviceLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`font-display uppercase text-xs tracking-[0.06em] px-5 py-3 border-b border-steel transition-colors whitespace-nowrap ${
                active === link.id ? "bg-brand text-white" : "text-bone/70 hover:bg-char hover:text-bone"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
