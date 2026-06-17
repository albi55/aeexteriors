import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import InlineEstimateForm from "@/components/InlineEstimateForm";
import ServicesDropdown from "@/components/ServicesDropdown";
import AreasGrid from "@/components/AreasGrid";
import { PHONE } from "@/lib/seo-data";
import { ArrowRight, Phone } from "@/components/icons";

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

export default function AreasPage() {
  return (
    <div className="bg-concrete">

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/steps/steps-1.webp" alt="A&E Exteriors LLC serving New Jersey" fill priority className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/55" />
        <div className="absolute inset-0 tex-blueprint opacity-40 tex-fade-top pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="kicker mb-6">Where We Work</span>
              <h1 className="font-display font-bold uppercase text-bone text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.015em] mb-6">
                Service <span className="text-brand">areas</span>
              </h1>
              <p className="text-bone/65 text-base lg:text-lg max-w-md mb-8">
                A&amp;E Exteriors LLC serves homeowners across all 21 New Jersey counties. Licensed, insured, and ready to work.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:7329560411" className="btn btn-red">
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </a>
                <ServicesDropdown />
              </div>
            </div>
            <Reveal delay={80}>
              <InlineEstimateForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ ALL COUNTIES ════════ */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <Reveal className="mb-10">
            <span className="kicker mb-5">All New Jersey Counties</span>
            <h2 className="font-display font-bold uppercase text-coal text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-3">
              Statewide coverage
            </h2>
            <p className="text-ash text-sm">Filter by service, then pick your town for a local page tuned to your area.</p>
          </Reveal>
          <AreasGrid counties={counties} />
        </div>
      </section>

      {/* ════════ CTA ════════ */}
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
