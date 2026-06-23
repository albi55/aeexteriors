import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import NJServiceMap from "@/components/NJServiceMap";
import AreasGrid from "@/components/AreasGrid";
import { PHONE } from "@/lib/seo-data";
import { ArrowRight, Phone, ShieldCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "A&E Exteriors LLC serves all 21 counties across New Jersey. Masonry, Roofing, Siding, Gutters, Chimneys, Foundation & Waterproofing. NJ Lic #13VH13920700. Call 732-956-0411.",
  alternates: { canonical: "https://aeexteriorsnj.com/areas" },
};

const counties = [
  { name: "Passaic County", primary: true, cities: ["North Haledon", "Haledon", "Paterson", "Clifton", "Wayne", "Hawthorne", "Totowa", "Woodland Park", "Little Falls", "West Milford", "Pompton Lakes", "Wanaque", "Ringwood", "Passaic"] },
  { name: "Bergen County", primary: true, cities: ["Hackensack", "Fort Lee", "Paramus", "Teaneck", "Garfield", "Englewood", "Ridgewood", "Fair Lawn", "Bergenfield", "Lodi", "Mahwah", "Lyndhurst", "Elmwood Park", "Saddle Brook", "Glen Rock", "Wyckoff"] },
  { name: "Essex County", primary: true, cities: ["Newark", "East Orange", "Bloomfield", "Montclair", "Irvington", "Orange", "West Orange", "Nutley", "Belleville", "Livingston", "Maplewood", "South Orange", "Verona", "Cedar Grove", "Caldwell"] },
  { name: "Morris County", primary: true, cities: ["Morristown", "Parsippany", "Dover", "Randolph", "Denville", "Mount Olive", "Roxbury", "Madison", "Chatham", "Boonton", "Morris Township", "Chester", "Lincoln Park", "Butler", "Kinnelon", "Pequannock"] },
  { name: "Hudson County", cities: ["Jersey City", "Hoboken", "Union City", "North Bergen", "West New York", "Bayonne", "Weehawken", "Secaucus", "Kearny", "Guttenberg", "Harrison"] },
  { name: "Union County", cities: ["Elizabeth", "Union", "Plainfield", "Linden", "Westfield", "Cranford", "Summit", "Rahway", "Scotch Plains", "Roselle", "Hillside", "Clark"] },
  { name: "Middlesex County", cities: ["New Brunswick", "Edison", "Woodbridge", "Piscataway", "Old Bridge", "Perth Amboy", "East Brunswick", "South Brunswick", "Sayreville", "Monroe Township", "North Brunswick", "Metuchen"] },
  { name: "Somerset County", cities: ["Franklin Township", "Bridgewater", "Hillsborough", "Somerville", "Bound Brook", "Manville", "North Plainfield", "Warren Township", "Bernardsville", "Watchung", "Montgomery", "Bedminster"] },
  { name: "Monmouth County", cities: ["Middletown", "Howell", "Freehold", "Long Branch", "Red Bank", "Manalapan", "Marlboro", "Holmdel", "Tinton Falls", "Colts Neck", "Asbury Park", "Eatontown"] },
  { name: "Ocean County", cities: ["Toms River", "Lakewood", "Brick", "Jackson", "Manchester", "Lacey", "Stafford", "Berkeley", "Barnegat", "Point Pleasant", "Seaside Heights", "Long Beach Township"] },
  { name: "Mercer County", cities: ["Trenton", "Princeton", "Hamilton Township", "Ewing", "Lawrence Township", "West Windsor", "Hopewell", "Robbinsville", "East Windsor", "Hightstown", "Pennington"] },
  { name: "Sussex County", cities: ["Newton", "Sparta", "Vernon", "Hopatcong", "Andover", "Hamburg", "Franklin", "Stanhope", "Byram", "Ogdensburg"] },
  { name: "Warren County", cities: ["Phillipsburg", "Washington", "Hackettstown", "Lopatcong", "Belvidere", "Oxford", "Mansfield"] },
  { name: "Hunterdon County", cities: ["Flemington", "Raritan Township", "Clinton", "Readington", "Lebanon", "Lambertville", "Tewksbury"] },
  { name: "Burlington County", cities: ["Mount Laurel", "Evesham", "Burlington", "Moorestown", "Cinnaminson", "Delran", "Medford", "Willingboro", "Maple Shade", "Bordentown", "Mount Holly", "Pemberton"] },
  { name: "Camden County", cities: ["Camden", "Cherry Hill", "Gloucester Township", "Voorhees", "Collingswood", "Haddonfield", "Pennsauken", "Haddon Township", "Bellmawr", "Lindenwold", "Stratford"] },
  { name: "Gloucester County", cities: ["Washington Township", "Deptford", "Monroe Township", "West Deptford", "Woodbury", "Mantua", "Glassboro", "Pitman", "Clayton", "Woolwich", "Harrison Township"] },
  { name: "Atlantic County", cities: ["Atlantic City", "Egg Harbor Township", "Galloway", "Hammonton", "Pleasantville", "Absecon", "Linwood", "Northfield", "Somers Point", "Ventnor City"] },
  { name: "Cape May County", cities: ["Cape May", "Wildwood", "Ocean City", "Sea Isle City", "Avalon", "Stone Harbor", "Middle Township", "Lower Township", "North Wildwood"] },
  { name: "Cumberland County", cities: ["Vineland", "Bridgeton", "Millville", "Commercial Township", "Upper Deerfield", "Fairfield", "Hopewell"] },
  { name: "Salem County", cities: ["Salem", "Pennsville", "Carneys Point", "Woodstown", "Pittsgrove", "Alloway"] },
];

const totalTowns = counties.reduce((n, c) => n + c.cities.length, 0);
const townCount = `${Math.floor(totalTowns / 10) * 10}+`;

const heroStats = [
  { value: "21", label: "Counties" },
  { value: townCount, label: "Towns" },
  { value: "7", label: "Trades" },
];

export default function AreasPage() {
  return (
    <div className="svc-canvas text-coal">

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/showcase/home.png"
            alt="A&E Exteriors LLC serving homes across New Jersey"
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
              <span className="kicker mb-6 !bg-white/15 !text-white">Where We Work</span>
              <h1 className="font-display font-bold text-bone text-5xl sm:text-6xl lg:text-7xl leading-[0.96] tracking-tight mb-6">
                All of New Jersey,{" "}
                <span className="text-ember">covered.</span>
              </h1>
              <p className="text-bone/70 text-base lg:text-lg max-w-md mb-9 leading-relaxed">
                A&amp;E Exteriors LLC serves homeowners across all 21 New Jersey
                counties — licensed, insured, and local to your town.
              </p>

              <div className="flex flex-wrap gap-3 mb-9">
                <a href="#counties" className="btn btn-red">
                  Find Your Town
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

            <Reveal delay={120}>
              <InlineEstimateForm />
            </Reveal>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-ember" aria-hidden="true" />
      </section>

      {/* ════════════════════ STATEWIDE MAP ════════════════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 tex-blueprint opacity-50 tex-fade-top" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
          <Reveal className="text-center mb-10 lg:mb-12">
            <span className="kicker kicker-center mb-5">Statewide Coverage</span>
            <h2 className="font-display font-bold text-bone text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
              From the Hudson to <span className="text-brand">the Shore.</span>
            </h2>
            <p className="text-bone/65 text-base lg:text-lg leading-relaxed mt-5 max-w-xl mx-auto">
              One licensed New Jersey crew, every county on the map — with a home
              base in Passaic, Bergen, Essex, and Morris.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <NJServiceMap />
          </Reveal>

          <Reveal delay={200} className="flex items-center justify-center gap-2 mt-10 text-bone/70">
            <ShieldCheck className="w-4 h-4 text-brand" />
            <span className="text-sm">NJ Licensed &amp; Insured · Owner-Supervised on every job</span>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════ ALL COUNTIES ════════════════════ */}
      <section id="counties" className="scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <Reveal className="max-w-2xl mb-12 lg:mb-16">
            <span className="kicker mb-5">All New Jersey Counties</span>
            <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.0] tracking-tight">
              Find your{" "}
              <span className="text-brand">town.</span>
            </h2>
            <div className="svc-rule w-24 mt-7 mb-6" />
            <p className="text-ash text-base lg:text-lg leading-relaxed">
              Search for your town or filter by the work you need, then open a
              local page tuned to your area — pricing, photos, and answers for
              your county.
            </p>
          </Reveal>

          <AreasGrid counties={counties} />
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section className="surface-brand">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 text-center">
          <h2 className="font-display font-bold uppercase text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-5">
            Don&apos;t see your town?
          </h2>
          <p className="text-white/85 text-base lg:text-lg mb-10 max-w-xl mx-auto">
            We may still serve your area. Give us a call and we&apos;ll let you know.
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
