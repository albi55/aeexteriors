"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { services, PHONE } from "@/lib/seo-data";
import { serviceIcons, ArrowRight, Phone } from "@/components/icons";

// Hero right-column: auto-advancing service cards (image + icon + title + tagline).
export default function HeroServiceSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = services.length;

  useEffect(() => {
    if (paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setActive((p) => (p + 1) % count), 3200);
    return () => clearInterval(t);
  }, [paused, count]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/5] sm:aspect-[5/5] w-full rounded-3xl overflow-hidden shadow-block ring-1 ring-white/10">
        {services.map((s, i) => {
          const Icon = serviceIcons[s.slug];
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              aria-hidden={i !== active}
              tabIndex={i === active ? 0 : -1}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                i === active ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={s.images[0]}
                alt={`${s.title} by A&E Exteriors LLC`}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />

              {/* Top tag */}
              <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-brand text-white text-xs font-bold px-3 py-1.5 shadow-lg">
                {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] ring-1 ring-black/5 mb-5 overflow-hidden">
                  {Icon ? <Icon className="w-full h-full scale-[2.1]" /> : null}
                </span>
                <h3 className="font-display font-bold text-white text-2xl lg:text-3xl">{s.title}</h3>
                <p className="text-white/80 text-sm mt-1.5 max-w-xs">{s.tagline}</p>
                <span className="inline-flex items-center gap-2 mt-4 font-display font-semibold text-sm text-white">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Dots */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-ink/70 backdrop-blur-sm rounded-full px-3 py-2 ring-1 ring-white/10">
        {services.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${s.title}`}
            aria-current={i === active}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-brand" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Floating "call" chip */}
      <a
        href="tel:7329560411"
        className="hidden lg:flex absolute -top-5 -left-5 items-center gap-2.5 bg-bone text-coal rounded-2xl shadow-block px-4 py-3 ring-1 ring-black/5 animate-floaty"
      >
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand text-white">
          <Phone className="w-4 h-4" />
        </span>
        <span className="leading-tight">
          <span className="block text-[0.65rem] font-semibold text-ash uppercase tracking-wide">Call us today</span>
          <span className="block font-display font-bold text-sm">{PHONE}</span>
        </span>
      </a>
    </div>
  );
}
