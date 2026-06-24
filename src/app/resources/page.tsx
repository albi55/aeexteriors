import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import { PHONE, SITE_URL, BUSINESS_NAME, LICENSE } from "@/lib/seo-data";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Bolt,
  Check,
  ShieldCheck,
  Clock,
  MapPin,
  serviceIcons,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Resources & FAQ",
  description:
    "Answers to common questions about hiring an exterior contractor in New Jersey — licensing, estimates, pricing, financing, permits, timelines, roofing, siding, masonry, chimneys, foundation & waterproofing. A&E Exteriors LLC, NJ Lic #13VH13920700.",
  alternates: { canonical: "https://aeexteriorsnj.com/resources" },
};

// Concise, direct answers — optimized for AI answer engines & featured snippets.
const quickAnswers = [
  { q: "Is A&E Exteriors licensed and insured in NJ?", a: `Yes. ${BUSINESS_NAME} holds NJ Home Improvement Contractor License #${LICENSE} and carries general liability and workers' compensation insurance. Proof is available on request.` },
  { q: "Do you charge for estimates?", a: "No. All on-site estimates are free and carry no obligation. We assess the work, explain your options, and give you a clear, written, itemized quote." },
  { q: "What areas do you serve?", a: "All 21 counties in New Jersey, with a primary focus on Passaic, Bergen, Essex, and Morris counties." },
  { q: "How fast do you respond?", a: "Usually the same day. For emergencies like active leaks or storm damage, we prioritize your call." },
];

const categories = [
  {
    id: "hiring",
    name: "Hiring & Credentials",
    blurb: "How to vet a contractor and what protects you on the job.",
    items: [
      { q: "How do I verify a contractor's NJ license?", a: `New Jersey home improvement contractors must register with the NJ Division of Consumer Affairs. You can verify any HIC license number on the state's website. Ours is #${LICENSE} — always confirm a contractor is licensed and insured before signing anything.` },
      { q: "Do you use subcontractors?", a: "No. Every project is handled by our own crew and personally supervised by the owner from start to finish, so quality and accountability never slip." },
      { q: "Are you insured?", a: "Yes — we carry general liability and workers' compensation coverage. This protects you in the event of property damage or an on-site injury. We're happy to provide a certificate of insurance on request." },
      { q: "Do you offer a warranty on your work?", a: "Yes. We stand behind our workmanship, and many of the materials we install (shingles, siding, etc.) carry manufacturer warranties. We'll explain the specific coverage for your project during your estimate." },
    ],
  },
  {
    id: "pricing",
    name: "Estimates, Pricing & Financing",
    blurb: "Straight talk on quotes, deposits, financing, and what can change.",
    items: [
      { q: "How is the price of a project determined?", a: "Pricing depends on the scope of work, materials selected, the size and condition of the area, access, and labor. We provide a transparent, itemized estimate so you can see exactly what you're paying for — no hidden fees." },
      { q: "Do you require a deposit?", a: "For larger projects we typically collect a deposit to schedule the work and order materials, with the balance due on completion. We'll lay out the payment schedule clearly before any work begins." },
      { q: "Do you offer financing?", a: "Yes — flexible payment and financing options are available through third-party lending partners, subject to credit approval. Ask us about current options and any seasonal promotions when you request your estimate." },
      { q: "Will my estimate change once work starts?", a: "We work hard to give an accurate, written quote up front. The price only changes if you request additional work or if hidden conditions are uncovered (for example, rot found behind siding) — and we'll always discuss and approve any change with you first." },
    ],
  },
  {
    id: "process",
    name: "Scheduling, Permits & Process",
    blurb: "Timelines, permits, weather, and what we leave behind.",
    items: [
      { q: "How soon can you start my project?", a: "We respond fast — usually the same day — and schedule promptly. Timing depends on the season and project size, but we'll give you a realistic start date during your estimate." },
      { q: "Do you handle permits?", a: "When a permit is required by your municipality, we help coordinate it as part of the job. New Jersey towns have their own permitting rules, and we make sure the work is done to code." },
      { q: "What happens if it rains or snows?", a: "Exterior work is weather-dependent. We monitor the forecast and reschedule when conditions are unsafe or could compromise quality. For emergencies like active leaks, we provide temporary protection right away." },
      { q: "Will you clean up after the job?", a: "Always. We treat your property with respect and leave every job site clean — debris hauled away, materials cleared, and a final walkthrough with you before we consider the job done." },
    ],
  },
  {
    id: "services",
    name: "Services & Materials",
    blurb: "How each trade works and what holds up in New Jersey's climate.",
    items: [
      { q: "How long does a new roof last in New Jersey?", a: "A quality architectural asphalt shingle roof typically lasts 25–30 years in NJ's climate, depending on ventilation, installation, and maintenance. Flat roofing systems (TPO/EPDM) generally last 15–25 years." },
      { q: "What siding is best for NJ homes?", a: "Vinyl and fiber cement (James Hardie) are the most popular choices in New Jersey. Vinyl is cost-effective and low-maintenance; fiber cement is more durable and fire-resistant. We'll recommend the best fit for your home and budget." },
      { q: "How do I know if my chimney needs repair?", a: "Common warning signs include crumbling mortar, white staining (efflorescence), a cracked crown, rusted or missing flashing, and leaks near the chimney. NJ's freeze-thaw cycles accelerate this damage, so address it early." },
      { q: "What are signs of a foundation problem?", a: "Watch for cracks in walls or floors, doors and windows that stick, uneven or sloping floors, and visible cracks in the foundation itself. These issues worsen over time, so a professional assessment is worth it." },
      { q: "Interior or exterior waterproofing — which is better?", a: "It depends on the source of the water. Interior systems (French drains, sump pumps) manage water that gets in; exterior membranes stop it at the wall. Sometimes a combination is best. We diagnose the cause first, then recommend the right fix." },
      { q: "How often should gutters be cleaned?", a: "At least twice a year — spring and fall — and after major storms. Gutter guards can dramatically reduce how often cleaning is needed and help protect your foundation from water damage." },
      { q: "What is tuckpointing (repointing)?", a: "Tuckpointing is the process of removing deteriorated mortar from brick or stone joints and replacing it with fresh mortar. It restores both the structural integrity and the appearance of masonry, and it's essential for NJ's freeze-thaw climate." },
    ],
  },
];

// A genuinely useful homeowner checklist — the value-add for a resources page.
const hireChecklist = [
  { t: "Confirm the NJ license & insurance", d: "Ask for the HIC registration number and a certificate of insurance — then verify both before signing." },
  { t: "Get it in writing", d: "A clear, itemized written estimate protects you. Scope, materials, timeline, and payment schedule should all be spelled out." },
  { t: "Ask who does the work", d: "Own crew or subcontractors? Owner-supervised work means consistent quality and one point of accountability." },
  { t: "Understand the payment schedule", d: "Know the deposit, the milestones, and the final balance up front. Avoid paying everything before work begins." },
  { t: "Clarify the warranty", d: "Separate workmanship warranty from manufacturer material warranties — and get the coverage in writing." },
  { t: "Check the cleanup & permits", d: "Confirm who pulls permits and that the site will be left clean with a final walkthrough." },
];

// Seasonal maintenance reminders — useful, evergreen content.
const seasonalTips = [
  { season: "Spring", d: "Clean gutters after pollen and storms, inspect the roof for winter damage, and check masonry for new freeze-thaw cracks." },
  { season: "Summer", d: "Ideal window for roofing, siding, and masonry. Schedule larger exterior projects before the fall rush." },
  { season: "Fall", d: "Clear gutters of leaves, seal chimney crowns and flashing, and waterproof the basement ahead of winter." },
  { season: "Winter", d: "Watch for ice dams and roof leaks, keep downspouts clear of ice, and act fast on any active water intrusion." },
];

const serviceLinks = [
  { slug: "masonry", title: "Masonry", blurb: "Brick, block & stone repair, repointing, and full rebuilds." },
  { slug: "roofing", title: "Roofing", blurb: "Tear-offs, new roofs, leak repairs, and flashing done right." },
  { slug: "siding", title: "Siding", blurb: "Vinyl, fiber cement & wrap that seals and lifts curb appeal." },
  { slug: "gutters", title: "Gutters", blurb: "Seamless gutters, guards, and downspouts that move water away." },
  { slug: "chimneys", title: "Chimneys", blurb: "Crown repair, relining, caps, and safe, draft-free rebuilds." },
  { slug: "foundation", title: "Foundation", blurb: "Crack repair, parging, and structural fixes that hold." },
  { slug: "waterproofing", title: "Waterproofing", blurb: "Interior & exterior systems that keep basements dry for good." },
];

const allFaqs = [...quickAnswers, ...categories.flatMap((c) => c.items)];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Resources & FAQ", item: `${SITE_URL}/resources` },
  ],
};

export default function ResourcesPage() {
  return (
    <div className="svc-canvas text-coal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative surface-ink overflow-hidden">
        {/* showcase photo background */}
        <div className="absolute inset-0">
          <Image
            src="/showcase/home.png"
            alt="Luxury New Jersey home with stone masonry, siding, and a new roof by A&E Exteriors LLC"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* dark overlays keep the copy legible over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/45" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-transparent to-ink/40" aria-hidden="true" />
        <div className="absolute inset-0 tex-blueprint opacity-30 tex-fade-top pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <Reveal className="lg:col-span-8">
              <span className="kicker mb-6 !bg-white/10 !text-bone">Resources &amp; FAQ</span>
              <h1 className="font-display font-bold text-bone text-5xl sm:text-6xl lg:text-7xl leading-[0.96] tracking-tight mb-6">
                Straight <span className="text-ember">answers</span> for NJ homeowners.
              </h1>
              <p className="text-bone/65 text-base lg:text-lg max-w-2xl leading-relaxed">
                Everything you ask before hiring an exterior contractor — licensing,
                pricing, financing, permits, timelines, and how each trade works.
                No jargon, no runaround.
              </p>

              <div className="flex flex-wrap gap-3 mt-9">
                <a href="#quick" className="btn btn-red">
                  Read the FAQ
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="tel:7329560411" className="btn btn-outline-bone">
                  <Phone className="w-4 h-4" />
                  Call {PHONE}
                </a>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-4">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {[
                  { Icon: ShieldCheck, t: `NJ Lic #${LICENSE}`, d: "Licensed & fully insured" },
                  { Icon: Clock, t: "Same-day response", d: "Priority for emergencies" },
                  { Icon: MapPin, t: "All 21 counties", d: "Statewide New Jersey" },
                ].map(({ Icon, t, d }) => (
                  <li key={t} className="flex items-start gap-3.5 rounded-2xl bg-white/[0.04] ring-1 ring-white/10 px-5 py-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand text-white flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="leading-tight">
                      <span className="block font-display font-bold text-bone text-sm">{t}</span>
                      <span className="block text-bone/55 text-xs mt-0.5">{d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════ QUICK ANSWERS ════════════════════ */}
      <section id="quick" className="scroll-mt-40 bg-concrete">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
          <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 lg:mb-14">
            <div className="max-w-2xl">
              <span className="kicker mb-5">Quick Answers</span>
              <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
                The short version
              </h2>
              <div className="svc-rule w-24 mt-7" />
            </div>
            <p className="text-ash text-sm leading-relaxed max-w-xs sm:text-right">
              The four things homeowners ask first — answered in a sentence. Full
              detail is in the topics below.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {quickAnswers.map((qa, i) => (
              <Reveal key={qa.q} delay={Math.min(i * 70, 210)}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-bone border border-line shadow-soft p-6 lg:p-7 transition-all duration-300 hover:shadow-block hover:border-brand/30">
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-5 font-display font-bold text-5xl tabular-nums text-coal/[0.04] group-hover:text-brand/10 transition-colors duration-300 select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative flex items-start gap-3.5 mb-3">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-brand/10 text-brand flex-shrink-0 transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                      <Bolt className="w-5 h-5" />
                    </span>
                    <h3 className="font-display font-bold text-coal text-lg leading-snug tracking-tight pt-1">{qa.q}</h3>
                  </div>
                  <p className="relative text-ash text-sm leading-relaxed pl-[3.125rem]">{qa.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ CATEGORIES ════════════════════ */}
      <section className="bg-concrete pb-12 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col gap-16 lg:gap-28">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              id={cat.id}
              className="scroll-mt-40 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            >
              {/* sticky topic panel */}
              <Reveal className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <div className="relative pl-6">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full bg-brand"
                    />
                    <span className="spec text-brand block mb-3">
                      {String(i + 1).padStart(2, "0")} · Topic
                    </span>
                    <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.02] tracking-tight">
                      {cat.name}
                    </h2>
                    <p className="text-ash text-base leading-relaxed mt-4 max-w-sm">
                      {cat.blurb}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-bone border border-line px-3.5 py-1.5 shadow-soft">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand/10 text-brand font-display font-bold text-xs tabular-nums">
                        {cat.items.length}
                      </span>
                      <span className="spec text-stone">
                        {cat.items.length === 1 ? "Question" : "Questions"}
                      </span>
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* accordion */}
              <Reveal delay={80} className="lg:col-span-8">
                <FAQ items={cat.items} />
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════ HIRING CHECKLIST ════════════════════ */}
      <section id="checklist" className="scroll-mt-40 relative surface-ink overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 tex-blueprint opacity-50 tex-fade-top" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
          <Reveal className="max-w-2xl mb-12 lg:mb-16">
            <span className="kicker mb-5 !bg-white/10 !text-bone">Know Before You Hire</span>
            <h2 className="font-display font-bold text-bone text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
              The 6-point homeowner{" "}
              <span className="text-ember">checklist.</span>
            </h2>
            <p className="text-bone/65 text-base lg:text-lg leading-relaxed mt-6">
              Run any exterior contractor through this before you sign — it&apos;s the
              same standard we hold ourselves to.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-steel rounded-3xl overflow-hidden border border-steel">
            {hireChecklist.map((item, i) => (
              <Reveal key={item.t} delay={Math.min(i * 70, 280)}>
                <div className="group h-full bg-coal p-7 lg:p-8 transition-colors duration-300 hover:bg-char">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand text-white font-display font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-ember/15 text-ember">
                      <Check className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-bone text-lg tracking-tight mb-2">{item.t}</h3>
                  <p className="text-bone/60 text-sm leading-relaxed">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ SEASONAL MAINTENANCE ════════════════════ */}
      <section className="bg-concrete">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
          <Reveal className="max-w-2xl mb-10 lg:mb-14">
            <span className="kicker mb-5">Seasonal Care</span>
            <h2 className="font-display font-bold text-coal text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
              A year of exterior upkeep
            </h2>
            <div className="svc-rule w-24 mt-7 mb-6" />
            <p className="text-ash text-base lg:text-lg leading-relaxed">
              Small, seasonal maintenance prevents the big, expensive repairs.
              Here&apos;s what to watch through the New Jersey year.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {seasonalTips.map((tip, i) => (
              <Reveal key={tip.season} delay={Math.min(i * 70, 210)}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-bone border border-line shadow-soft p-6 lg:p-7 transition-all duration-300 hover:shadow-block hover:border-brand/30 hover:-translate-y-1">
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 -right-1 font-display font-bold text-[5.5rem] leading-none tabular-nums text-coal/[0.04] group-hover:text-brand/10 transition-colors duration-300 select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="absolute top-0 left-6 right-6 h-1 rounded-b-full bg-brand/0 group-hover:bg-brand/60 transition-colors duration-300" />
                  <span className="relative spec text-brand mb-4 block">Season {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="relative font-display font-bold text-coal text-xl tracking-tight mb-3">{tip.season}</h3>
                  <p className="relative text-ash text-sm leading-relaxed">{tip.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ SERVICE DEEP-LINKS ════════════════════ */}
      <section className="bg-concrete">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-0 pb-16 lg:pb-24">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-12">
            <div className="max-w-2xl">
              <span className="kicker mb-5">Explore the Work</span>
              <h2 className="font-display font-bold text-coal text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-tight">
                Dig deeper by trade
              </h2>
              <p className="text-ash text-base lg:text-lg leading-relaxed mt-4">
                Every service has its own page with the full scope, photos, and answers.
              </p>
            </div>
            <Link href="/services" className="group inline-flex items-center gap-2 font-display font-semibold text-coal hover:text-brand transition-colors flex-shrink-0 pb-1">
              <span className="border-b-2 border-brand/30 group-hover:border-brand pb-1 transition-colors">All Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {serviceLinks.map((s) => {
              const Icon = serviceIcons[s.slug];
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group relative flex flex-col items-start rounded-2xl bg-bone border border-line shadow-soft p-5 lg:p-6 transition-all duration-300 hover:shadow-block hover:border-brand/30"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 mb-4">
                    {Icon ? <Icon className="w-full h-full transition-transform duration-300 group-hover:scale-110" /> : null}
                  </span>
                  <span className="font-display font-bold text-coal text-base tracking-tight">{s.title}</span>
                  <span className="mt-2 text-ash text-sm leading-relaxed">{s.blurb}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-coal/0 group-hover:text-brand transition-colors duration-300">
                    Learn more
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}

            {/* contact anchor card to fill the 8th cell */}
            <Link
              href="/contact"
              className="group relative flex flex-col justify-between rounded-2xl bg-brand p-5 lg:p-6 overflow-hidden"
            >
              <span aria-hidden="true" className="pointer-events-none absolute -top-10 -right-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <span className="relative spec text-white/70">Free Estimate</span>
              <span className="relative font-display font-bold text-white text-lg tracking-tight leading-tight mt-3">
                Talk to a real person
              </span>
              <span className="relative mt-2 text-white/80 text-sm leading-relaxed">
                No call centers — reach the crew that does the work and get honest answers.
              </span>
              <span className="relative mt-4 inline-flex items-center gap-1.5 font-display font-bold text-white text-sm">
                Get started
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════ FINAL CTA ════════════════════ */}
      <section className="relative surface-brand overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24 text-center">
          <Reveal>
            <span className="spec text-white/70 mb-5 block">Still Have a Question?</span>
            <h2 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
              We&apos;re happy to help.
            </h2>
            <p className="text-white/85 text-base lg:text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
              Call us — a real person answers — or request a free estimate and
              we&apos;ll walk you through it, no pressure.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:7329560411" className="btn btn-bone">
                <Phone className="w-4 h-4" />
                Call {PHONE}
              </a>
              <Link href="/contact" className="btn btn-ink">
                Get Free Estimate
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
