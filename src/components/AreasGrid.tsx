"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
  { slug: "masonry", label: "Masonry" },
  { slug: "roofing", label: "Roofing" },
  { slug: "siding", label: "Siding" },
  { slug: "gutters", label: "Gutters" },
  { slug: "chimneys", label: "Chimneys" },
  { slug: "foundation", label: "Foundation" },
  { slug: "waterproofing", label: "Waterproofing" },
];

interface County {
  name: string;
  primary?: boolean;
  cities: string[];
}

export default function AreasGrid({ counties }: { counties: County[] }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const cityToSlug = (city: string) => city.toLowerCase().replace(/\s+/g, "-");
  const getCityHref = (city: string) => {
    const slug = cityToSlug(city);
    return selectedService ? `/areas/${slug}/${selectedService}` : `/areas/${slug}`;
  };
  const activeLabel = services.find((s) => s.slug === selectedService)?.label;

  const chipClass = (active: boolean) =>
    `font-display uppercase text-xs tracking-[0.06em] px-4 py-2.5 border-2 transition-colors ${
      active ? "bg-brand border-brand text-white" : "bg-bone border-line text-coal/70 hover:border-brand hover:text-brand"
    }`;

  return (
    <>
      {/* Service filter bar */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <span className="spec text-ash mr-1">Filter by service:</span>
        <button onClick={() => setSelectedService(null)} className={chipClass(!selectedService)}>
          All
        </button>
        {services.map((s) => (
          <button key={s.slug} onClick={() => setSelectedService(s.slug)} className={chipClass(selectedService === s.slug)}>
            {s.label}
          </button>
        ))}
      </div>

      {selectedService && (
        <div className="flex items-center gap-2 mb-6 spec text-ash">
          <span>Showing</span>
          <span className="text-brand">{activeLabel}</span>
          <span>pages for each city</span>
        </div>
      )}

      {/* Counties grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
        {counties.map((county) => (
          <div key={county.name} className="bg-bone p-7">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h2 className="font-display font-semibold uppercase text-coal text-lg tracking-[0.01em]">{county.name}</h2>
              {county.primary && <span className="spec text-brand !tracking-[0.12em]">Primary</span>}
            </div>
            <div className="w-8 h-0.5 bg-brand mb-5 mt-1" />
            <ul className="flex flex-col gap-2">
              {county.cities.map((city) => (
                <li key={city}>
                  <Link href={getCityHref(city)} className="group flex items-center gap-2 text-ash text-sm hover:text-brand transition-colors">
                    <span className="w-1.5 h-1.5 bg-brand flex-shrink-0 group-hover:scale-150 transition-transform" />
                    {city}
                    {selectedService && <span className="spec text-stone !tracking-[0.1em]">— {activeLabel}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
