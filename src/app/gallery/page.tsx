import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";
import { PHONE, SITE_URL, BUSINESS_NAME, services } from "@/lib/seo-data";
import { ArrowRight, Phone } from "@/components/icons";

const totalPhotos = services.reduce((n, s) => n + (s.images?.length ?? 0), 0);
const photoCount = `${Math.floor(totalPhotos / 5) * 5}+`;

const heroStats = [
  { value: photoCount, label: "Project Photos" },
  { value: String(services.length), label: "Trades" },
  { value: "21", label: "NJ Counties" },
];

/* Staggered preview montage in the hero — one shot per trade. */
const heroMontage = [
  { src: "/roofing/IMG_1985.webp", title: "Roofing", aspect: "aspect-[4/5]" },
  { src: "/cambridge-pavers/pavers-1.webp", title: "Masonry", aspect: "aspect-square" },
  { src: "/siding/siding-1.webp", title: "Siding", aspect: "aspect-square" },
  { src: "/chimney/chimney-1.webp", title: "Chimneys", aspect: "aspect-[4/5]" },
];

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse real exterior projects by A&E Exteriors LLC across New Jersey — masonry, roofing, siding, gutters, chimneys, foundation & waterproofing. NJ Licensed #13VH13920700.",
  alternates: { canonical: "https://aeexteriorsnj.com/gallery" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Project Gallery", item: `${SITE_URL}/gallery` },
  ],
};

export default function GalleryPage() {
  return (
    <div className="svc-canvas text-coal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative overflow-hidden">
        {/* photo + single flat dark tint (no gradient) */}
        <div className="absolute inset-0">
          <Image
            src="/showcase/home.png"
            alt="Completed exterior project by A&E Exteriors LLC in New Jersey"
            fill
            priority
            className="object-cover scale-105 animate-[heroPan_20s_ease-in-out_infinite_alternate]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 svc-tint-strong" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <span className="kicker mb-6 !bg-white/15 !text-white">Our Work</span>
              <h1 className="font-display font-bold text-bone text-5xl sm:text-6xl lg:text-7xl leading-[0.96] tracking-tight mb-6">
                See the work{" "}
                <span className="text-ember">up close.</span>
              </h1>
              <p className="text-bone/70 text-base lg:text-lg max-w-md mb-9 leading-relaxed">
                Real projects, real homes, real results — across {BUSINESS_NAME}&apos;s
                service area in New Jersey. Filter by trade and tap any photo to
                view it full size.
              </p>

              <div className="flex flex-wrap gap-3 mb-9">
                <a href="#gallery" className="btn btn-red">
                  Browse the Gallery
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="tel:7329560411" className="btn btn-outline-bone">
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </a>
              </div>

              <dl className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {heroStats.map((s) => (
                  <div key={s.label} className="flex items-baseline gap-2">
                    <dt className="font-display font-bold text-bone text-2xl sm:text-3xl tracking-tight leading-none">
                      {s.value}
                    </dt>
                    <dd className="spec text-bone/55 text-[0.6rem]">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Staggered preview montage */}
            <Reveal delay={120} variant="zoom" className="hidden lg:block">
              <div className="relative grid grid-cols-2 gap-4">
                <div className="grid gap-4 mt-10">
                  {heroMontage.slice(0, 2).map((m) => (
                    <div key={m.src} className={`relative ${m.aspect} ticks ring-1 ring-white/15 shadow-hard`}>
                      <Image src={m.src} alt={`${m.title} project by A&E Exteriors LLC`} fill className="object-cover" sizes="25vw" />
                    </div>
                  ))}
                </div>
                <div className="grid gap-4">
                  {heroMontage.slice(2, 4).map((m) => (
                    <div key={m.src} className={`relative ${m.aspect} ticks ring-1 ring-white/15 shadow-hard`}>
                      <Image src={m.src} alt={`${m.title} project by A&E Exteriors LLC`} fill className="object-cover" sizes="25vw" />
                    </div>
                  ))}
                </div>
                <span className="absolute -bottom-3 -left-3 inline-flex items-center gap-2 surface-ink rounded-full px-4 py-2 spec text-ember shadow-block">
                  <span className="w-1.5 h-1.5 rounded-full bg-ember" aria-hidden="true" />
                  {photoCount} Photos
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════ GALLERY ════════════════════ */}
      <section id="gallery" className="scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">

          {/* section heading */}
          <Reveal className="max-w-2xl mb-12 lg:mb-16">
            <span className="kicker mb-5">Project Gallery</span>
            <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.0] tracking-tight">
              Proof in every{" "}
              <span className="text-brand">project.</span>
            </h2>
            <div className="svc-rule w-24 mt-7 mb-6" />
            <p className="text-ash text-base lg:text-lg leading-relaxed">
              Browse real exterior work from across New Jersey. Filter by trade to
              narrow it down, then tap any photo to open the full-size viewer and
              page through the set.
            </p>
          </Reveal>

          <GalleryGrid />
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="surface-brand">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 text-center">
          <h2 className="font-display font-bold uppercase text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-5">
            Want results like these?
          </h2>
          <p className="text-white/85 text-base lg:text-lg mb-10 max-w-xl mx-auto">
            Book a free, no-obligation estimate and we&apos;ll show you exactly what we can do for your home.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-bone w-full sm:w-auto justify-center">
              Get Free Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:7329560411" className="btn btn-ink w-full sm:w-auto justify-center">
              <Phone className="w-4 h-4" />
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
