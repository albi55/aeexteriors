import { services, serviceAreas, BUSINESS_NAME, PHONE, LICENSE } from "./seo-data";

export function getCityServiceContent(citySlug: string, serviceSlug: string) {
  const area = serviceAreas.find((a) => a.slug === citySlug);
  const service = services.find((s) => s.slug === serviceSlug);
  if (!area || !service) return null;

  const { city, county } = area;
  const { title, tagline, subServices, images } = service;

  const contentVariants: Record<string, (city: string, county: string) => string[]> = {
    masonry: (city, county) => [
      `Looking for a trusted masonry contractor in ${city}, NJ? ${BUSINESS_NAME} delivers expert brickwork, stone veneer, patios, walkways, retaining walls, and concrete steps for homeowners throughout ${city} and ${county}. Our licensed crew uses premium materials built to withstand New Jersey's toughest seasons.`,
      `${city} homes face unique challenges — from aging mortar joints cracking in the freeze-thaw cycle to settling steps and deteriorating retaining walls. We've repaired and rebuilt masonry across ${county} for years, and we understand exactly what local properties need to stay structurally sound and looking great.`,
      `Every masonry project in ${city} starts with a free, no-obligation on-site estimate. We assess the work, explain your options, and provide a transparent, itemized quote. No surprises, no hidden fees — just honest craftsmanship from a NJ licensed contractor (Lic # ${LICENSE}).`,
    ],
    roofing: (city, county) => [
      `Need a reliable roofing contractor in ${city}, NJ? ${BUSINESS_NAME} provides complete roofing services — from full replacements to emergency leak repairs — for homeowners throughout ${city} and all of ${county}. We install premium asphalt shingles, flat roofing systems (TPO/EPDM), and more.`,
      `${city}'s weather puts serious stress on your roof. Heavy snow, ice dams, high winds, and summer storms all take their toll. Our licensed roofing crew in ${county} has the experience to diagnose issues fast and deliver durable repairs or replacements that protect your home for decades.`,
      `Don't wait for a small leak to become a major problem. Call ${BUSINESS_NAME} for a free roof inspection and estimate in ${city}. We're NJ licensed (# ${LICENSE}), fully insured, and we stand behind every job. Same-day emergency service available.`,
    ],
    siding: (city, county) => [
      `Transform your ${city} home's exterior with new siding from ${BUSINESS_NAME}. We install vinyl, James Hardie fiber cement, and wood siding systems that protect against moisture, pests, and New Jersey's harsh weather — while dramatically improving your curb appeal.`,
      `Damaged, faded, or outdated siding on your ${city} home costs you more than just appearance. Poor siding leads to water intrusion, mold, and higher energy bills. Our ${county} siding team provides expert installation and repair using materials rated for NJ's climate.`,
      `Get a free siding estimate for your ${city} property. ${BUSINESS_NAME} handles everything from complete siding replacement to targeted repairs, soffit & fascia work, and trim. NJ Licensed # ${LICENSE}. Serving all of ${county}. Call ${PHONE}.`,
    ],
    gutters: (city, county) => [
      `Protect your ${city} home's foundation with seamless gutter installation from ${BUSINESS_NAME}. We custom-fit aluminum gutter systems to your roofline, install gutter guards, downspouts, and underground drainage — keeping water away from your foundation year-round.`,
      `Clogged or damaged gutters cause thousands in preventable water damage to ${city} homes every year. Basement flooding, foundation erosion, and landscape washout are all signs your gutters need attention. Our ${county} gutter team provides fast, professional service.`,
      `Schedule a free gutter assessment for your ${city} home. Whether you need new seamless gutters, gutter guard installation, or repair work, ${BUSINESS_NAME} has you covered. NJ Licensed # ${LICENSE}. Serving all of ${county}.`,
    ],
    chimneys: (city, county) => [
      `Is your chimney showing signs of damage? ${BUSINESS_NAME} provides expert chimney repair, rebuilds, and restoration for homeowners in ${city}, NJ. From tuckpointing and crown repair to full chimney rebuilds, we restore your chimney to safe, functional condition.`,
      `${city}'s freeze-thaw cycles are brutal on chimneys. Cracked crowns, failing flashing, deteriorating mortar, and missing caps let water penetrate the structure — causing hidden damage that gets more expensive to fix every season. Don't wait for a small issue to become a costly rebuild.`,
      `Call ${BUSINESS_NAME} for a free chimney inspection in ${city}. We serve all of ${county} with NJ licensed chimney work (Lic # ${LICENSE}). Fully insured, honest assessments, and transparent pricing on every job.`,
    ],
    foundation: (city, county) => [
      `Foundation problems in your ${city} home? ${BUSINESS_NAME} provides professional foundation crack repair, wall reinforcement, and structural restoration for homeowners throughout ${city} and ${county}. We diagnose the root cause and fix it right the first time.`,
      `Signs of foundation trouble in ${city} homes include cracked walls, sticking doors and windows, uneven floors, and visible cracks in the foundation itself. These issues don't fix themselves — they get worse and more expensive over time. Our ${county} foundation team has the experience to handle it.`,
      `Get a free foundation assessment for your ${city} property. ${BUSINESS_NAME} uses proven repair methods including epoxy injection, carbon fiber reinforcement, and structural bracing. NJ Licensed # ${LICENSE}. Fully insured. Call ${PHONE}.`,
    ],
    waterproofing: (city, county) => [
      `Dealing with a wet basement in ${city}? ${BUSINESS_NAME} installs comprehensive waterproofing systems — interior and exterior — that permanently solve moisture problems for homeowners in ${city} and throughout ${county}.`,
      `Basement water intrusion in ${city} homes causes mold growth, structural damage, and significant repair costs. Our waterproofing solutions include French drain systems, sump pump installation with battery backup, exterior membranes, crack injection, and vapor barriers.`,
      `Stop the water for good. Call ${BUSINESS_NAME} for a free basement waterproofing assessment in ${city}. We identify the source of the water and recommend the most effective solution for your specific situation. NJ Licensed # ${LICENSE}. Serving all of ${county}.`,
    ],
  };

  const content = contentVariants[serviceSlug]?.(city, county) ?? [
    `${BUSINESS_NAME} provides expert ${title.toLowerCase()} services in ${city}, NJ.`,
    `Serving ${city} and all of ${county} with licensed, insured ${title.toLowerCase()} work.`,
    `Contact us for a free estimate. Call ${PHONE}.`,
  ];

  const metaTitle = `${title} Contractor in ${city}, NJ | ${BUSINESS_NAME}`;
  const metaDescription = `Expert ${title.toLowerCase()} services in ${city}, NJ. ${tagline}. NJ Licensed #${LICENSE}. Free estimates. Call ${PHONE}.`;

  const keywords = [
    `${title.toLowerCase()} contractor ${city}`,
    `${title.toLowerCase()} ${city} NJ`,
    `${title.toLowerCase()} near me ${city}`,
    `${title.toLowerCase()} ${county}`,
    `best ${title.toLowerCase()} contractor ${city} NJ`,
    `${city} ${title.toLowerCase()} services`,
    `${title.toLowerCase()} repair ${city} NJ`,
  ];

  return {
    area,
    service,
    city,
    county,
    title: service.title,
    tagline,
    subServices,
    images,
    content,
    metaTitle,
    metaDescription,
    keywords,
  };
}

export function getAllCityServiceParams() {
  const params: { slug: string; service: string }[] = [];
  for (const area of serviceAreas) {
    for (const service of services) {
      params.push({ slug: area.slug, service: service.slug });
    }
  }
  return params;
}
