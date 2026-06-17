"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  { src: "/steps/steps-1.webp", label: "Masonry" },
  { src: "/roofing/IMG_1985.webp", label: "Roofing" },
  { src: "/cambridge-pavers/pavers-1.webp", label: "Pavers" },
  { src: "/chimney/chimney-1.webp", label: "Chimneys" },
  { src: "/foundation-waterproofing/fw-1.webp", label: "Foundation" },
  { src: "/basement-doors/bdoor-1.webp", label: "Waterproofing" },
];

export default function WorkGallery() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-gray-200">
      {/* Left — large active image */}
      <div className="lg:col-span-3 relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {images.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt={`${img.label} project by A&E Exteriors LLC`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <p className="text-white font-bold text-lg">{images[active].label}</p>
          <p className="text-white/70 text-xs">A&E Exteriors LLC</p>
        </div>
      </div>

      {/* Right — stacked thumbnails */}
      <div className="lg:col-span-2 grid grid-cols-3 lg:grid-cols-2 gap-0">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActive(i)}
            className={`relative aspect-square overflow-hidden border border-gray-200 transition-all ${
              i === active ? "ring-2 ring-inset ring-[#E10E0E]" : "hover:opacity-80"
            }`}
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              className="object-cover"
              sizes="200px"
            />
            <div className={`absolute inset-0 flex items-end p-2 transition-colors ${
              i === active ? "bg-[#E10E0E]/40" : "bg-black/30 hover:bg-black/10"
            }`}>
              <span className="text-white text-[10px] font-bold uppercase tracking-wider">{img.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
