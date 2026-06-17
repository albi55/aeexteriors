import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import { PHONE, SITE_URL, BUSINESS_NAME, LICENSE } from "@/lib/seo-data";
import { ArrowRight, Phone, Bolt } from "@/components/icons";

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
    name: "Hiring & Credentials",
    items: [
      { q: "How do I verify a contractor's NJ license?", a: `New Jersey home improvement contractors must register with the NJ Division of Consumer Affairs. You can verify any HIC license number on the state's website. Ours is #${LICENSE} — always confirm a contractor is licensed and insured before signing anything.` },
      { q: "Do you use subcontractors?", a: "No. Every project is handled by our own crew and personally supervised by the owner from start to finish, so quality and accountability never slip." },
      { q: "Are you insured?", a: "Yes — we carry general liability and workers' compensation coverage. This protects you in the event of property damage or an on-site injury. We're happy to provide a certificate of insurance on request." },
      { q: "Do you offer a warranty on your work?", a: "Yes. We stand behind our workmanship, and many of the materials we install (shingles, siding, etc.) carry manufacturer warranties. We'll explain the specific coverage for your project during your estimate." },
    ],
  },
  {
    name: "Estimates, Pricing & Financing",
    items: [
      { q: "How is the price of a project determined?", a: "Pricing depends on the scope of work, materials selected, the size and condition of the area, access, and labor. We provide a transparent, itemized estimate so you can see exactly what you're paying for — no hidden fees." },
      { q: "Do you require a deposit?", a: "For larger projects we typically collect a deposit to schedule the work and order materials, with the balance due on completion. We'll lay out the payment schedule clearly before any work begins." },
      { q: "Do you offer financing?", a: "Yes — flexible payment and financing options are available through third-party lending partners, subject to credit approval. Ask us about current options and any seasonal promotions when you request your estimate." },
      { q: "Will my estimate change once work starts?", a: "We work hard to give an accurate, written quote up front. The price only changes if you request additional work or if hidden conditions are uncovered (for example, rot found behind siding) — and we'll always discuss and approve any change with you first." },
    ],
  },
  {
    name: "Scheduling, Permits & Process",
    items: [
      { q: "How soon can you start my project?", a: "We respond fast — usually the same day — and schedule promptly. Timing depends on the season and project size, but we'll give you a realistic start date during your estimate." },
      { q: "Do you handle permits?", a: "When a permit is required by your municipality, we help coordinate it as part of the job. New Jersey towns have their own permitting rules, and we make sure the work is done to code." },
      { q: "What happens if it rains or snows?", a: "Exterior work is weather-dependent. We monitor the forecast and reschedule when conditions are unsafe or could compromise quality. For emergencies like active leaks, we provide temporary protection right away." },
      { q: "Will you clean up after the job?", a: "Always. We treat your property with respect and leave every job site clean — debris hauled away, materials cleared, and a final walkthrough with you before we consider the job done." },
    ],
  },
  {
    name: "Services & Materials",
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
    <div className="bg-concrete">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ════════ HERO ════════ */}
      <section className="relative surface-ink overflow-hidden">
        <div className="absolute inset-0 tex-blueprint opacity-50 tex-fade-top pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-16 lg:pb-20">
          <span className="kicker mb-6">Resources &amp; FAQ</span>
          <h1 className="font-display font-bold uppercase text-bone text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.015em] mb-6">
            Straight <span className="text-brand">answers</span>
          </h1>
          <p className="text-bone/65 text-base lg:text-lg max-w-2xl">
            Everything New Jersey homeowners ask before hiring an exterior contractor — licensing, pricing,
            financing, permits, timelines, and how each trade works. No jargon, no runaround.
          </p>
        </div>
      </section>

      {/* ════════ QUICK ANSWERS ════════ */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
          <Reveal className="mb-10">
            <span className="kicker mb-5">Quick Answers</span>
            <h2 className="font-display font-bold uppercase text-coal text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-[-0.01em]">
              The short version
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
            {quickAnswers.map((qa) => (
              <Reveal key={qa.q}>
                <div className="h-full bg-bone p-7">
                  <div className="flex items-start gap-3 mb-3">
                    <Bolt className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                    <h3 className="font-display font-semibold uppercase text-coal text-lg leading-snug tracking-[0.01em]">{qa.q}</h3>
                  </div>
                  <p className="text-ash text-sm leading-relaxed pl-8">{qa.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CATEGORIES ════════ */}
      {categories.map((cat, i) => (
        <section key={cat.name} className={i % 2 === 0 ? "bg-concrete" : "bg-cement"}>
          <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
            <Reveal className="mb-8">
              <span className="kicker mb-4">{String(i + 1).padStart(2, "0")} / Topic</span>
              <h2 className="font-display font-bold uppercase text-coal text-3xl sm:text-4xl leading-[0.95] tracking-[-0.01em]">
                {cat.name}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <FAQ items={cat.items} />
            </Reveal>
          </div>
        </section>
      ))}

      {/* ════════ CTA ════════ */}
      <section className="surface-brand">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-20 text-center">
          <h2 className="font-display font-bold uppercase text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] mb-5">
            Still have a question?
          </h2>
          <p className="text-white/85 text-base lg:text-lg mb-10 max-w-xl mx-auto">
            Call us — a real person answers — or request a free estimate and we&apos;ll walk you through it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="tel:7329560411" className="btn btn-bone w-full sm:w-auto justify-center">
              <Phone className="w-4 h-4" />
              Call {PHONE}
            </a>
            <Link href="/contact" className="btn btn-ink w-full sm:w-auto justify-center">
              Get Free Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
