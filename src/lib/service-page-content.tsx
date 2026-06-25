import { ShieldCheck, Clock, MapPin, Star, Bolt, Check } from "@/components/icons";
import { LICENSE } from "@/lib/seo-data";

// Evergreen, contractor-agnostic content shared by every service / area-service page.
// Keeping it in one place means all slug pages stay consistent as copy evolves.

export const processSteps = [
  { n: "01", t: "Free On-Site Estimate", d: "We come to you, assess the work in person, and give you a clear, itemized written quote — no obligation, no pressure, no guesswork." },
  { n: "02", t: "Transparent Plan & Price", d: "You'll know the exact scope, the materials we'll use, the timeline, and the cost before any work begins. Questions answered in plain English." },
  { n: "03", t: "Expert Craftsmanship", d: "Our own crew does the work — never subcontractors. We use materials rated for New Jersey's freeze-thaw climate and proven installation methods." },
  { n: "04", t: "Clean-Up & Final Walkthrough", d: "We haul away debris, leave your property spotless, and walk the finished job with you to make sure every detail meets your standards." },
];

export const benefits = [
  { Icon: ShieldCheck, t: "Licensed & Fully Insured", d: `NJ Home Improvement Contractor License #${LICENSE}, with general liability and workers' comp coverage on every job.` },
  { Icon: Star, t: "Own Crew, No Subcontractors", d: "Owner-supervised work from start to finish means consistent quality and a single point of accountability." },
  { Icon: Clock, t: "Same-Day Response", d: "We answer the phone and respond fast — and we prioritize emergencies like active leaks and storm damage." },
  { Icon: Check, t: "Free, Honest Estimates", d: "Detailed, itemized, and written down — so you can see exactly what you're paying for. No hidden fees." },
  { Icon: MapPin, t: "Local to New Jersey", d: "Family-owned and rooted in NJ, serving Passaic, Bergen, Essex & Morris counties and beyond." },
  { Icon: Bolt, t: "Built for NJ Weather", d: "Materials and methods chosen for the Northeast's brutal freeze-thaw cycles, snow loads, and summer storms." },
];
