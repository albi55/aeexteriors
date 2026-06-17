"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  { src: "/roofing/IMG_1985.webp", label: "Roofing" },
  { src: "/steps/steps-1.webp", label: "Masonry" },
  { src: "/cambridge-pavers/pavers-1.webp", label: "Pavers & Walkways" },
  { src: "/chimney/chimney-1.webp", label: "Chimneys" },
  { src: "/siding/siding-1.webp", label: "Siding" },
  { src: "/gutters/gutter-1.webp", label: "Gutters" },
  { src: "/foundation-waterproofing/fw-1.webp", label: "Foundation" },
  { src: "/basement-doors/bdoor-1.webp", label: "Waterproofing" },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[520px] rounded-[2rem] overflow-hidden border border-white/10 bg-black">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={`${slide.label} project by A&E Exteriors LLC`}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 520px"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 pointer-events-none" />

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
        <div>
          <span className="block text-white/60 text-[10px] font-bold tracking-[0.25em] uppercase mb-1">
            Our Work
          </span>
          <span className="block font-[family-name:var(--font-montserrat)] text-white text-2xl font-bold leading-tight">
            {slides[active].label}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur rounded-full px-3 py-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-[#E10E0E]" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
