"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
};

function Card({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={service.id === "more" ? "/services" : `/services/${service.id}`}
      className="group relative rounded-[1.5rem] overflow-hidden min-h-[320px] flex flex-col justify-between p-7 h-full"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url('${service.image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 group-hover:via-black/70 group-hover:to-black/50 transition-all" />

      <div className="relative flex items-center justify-between">
        <span className="text-white text-xs font-bold tracking-widest bg-[#E10E0E] rounded-full px-3 py-1">
          0{index + 1}
        </span>
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-black group-hover:bg-[#E10E0E] group-hover:text-white transition-all">
          <svg className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>

      <div className="relative">
        <h3 className="font-[family-name:var(--font-montserrat)] text-white text-2xl font-bold mb-3">
          {service.title}
        </h3>
        <p className="text-gray-200 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    </Link>
  );
}

export default function ServicesCarousel({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [services.length]);

  return (
    <>
      {/* Mobile — sliding carousel */}
      <div className="sm:hidden">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {services.map((service, i) => (
              <div key={service.id} className="w-full flex-shrink-0 px-1">
                <Card service={service} index={i} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-6 flex-wrap">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to service ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-8 bg-[#E10E0E]" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop — grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {services.map((service, i) => (
          <Card key={service.id} service={service} index={i} />
        ))}
      </div>
    </>
  );
}
