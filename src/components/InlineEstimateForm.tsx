"use client";

import { useState } from "react";
import { ArrowRight, Check, Phone, Mail, ShieldCheck } from "@/components/icons";

const services = ["Masonry", "Roofing", "Siding", "Gutters", "Chimneys", "Foundation", "Waterproofing", "Other"];

const fieldClass =
  "w-full rounded-lg bg-concrete focus:bg-white border border-line focus:border-brand text-coal placeholder-ash/60 px-3.5 py-2.5 text-sm outline-none transition-colors";

export default function InlineEstimateForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }
      setSubmitted(true);
    } catch (err) {
      setError((err instanceof Error && err.message) || "Failed to send. Please call us instead.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-bone border border-line shadow-soft p-7 text-center max-w-md">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand/10 text-brand mb-4 animate-[fadeUp_500ms_cubic-bezier(0.16,1,0.3,1)]">
          <Check className="w-7 h-7" />
        </span>
        <p className="font-display font-bold text-coal text-xl tracking-tight mb-1.5">Request sent!</p>
        <p className="text-ash text-sm leading-relaxed">Thanks — we&apos;ll reach out within 24 hours to schedule your free on-site estimate.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-bone border border-line shadow-soft p-5 sm:p-6 max-w-md">
      {/* header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="kicker mb-2.5">Free Estimate</span>
          <h3 className="font-display font-bold text-coal text-xl sm:text-2xl tracking-tight">Get a free quote</h3>
          <p className="text-ash text-xs mt-1">No obligation — we respond within 24 hours.</p>
        </div>
        <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand/10 text-brand flex-shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="spec text-coal/50 mb-1.5 block">Name *</span>
            <input name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your name" className={fieldClass} />
          </label>
          <label className="block">
            <span className="spec text-coal/50 mb-1.5 block">Phone *</span>
            <div className="relative group">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ash/60 group-focus-within:text-brand transition-colors z-10" />
              <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="(732) 555-0000" className={`${fieldClass} pl-10`} />
            </div>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="spec text-coal/50 mb-1.5 block">Email</span>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ash/60 group-focus-within:text-brand transition-colors z-10" />
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" className={`${fieldClass} pl-10`} />
            </div>
          </label>
          <label className="block">
            <span className="spec text-coal/50 mb-1.5 block">Service *</span>
            <select name="service" required value={formData.service} onChange={handleChange} className={`${fieldClass} appearance-none bg-[length:1.1rem] bg-[right_0.85rem_center] bg-no-repeat pr-9`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238A8A92' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}>
              <option value="">Choose…</option>
              {services.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="spec text-coal/50 mb-1.5 block">Project details</span>
          <textarea name="message" rows={3} value={formData.message} onChange={handleChange} placeholder="Tell us a bit about your project (optional)" className={`${fieldClass} resize-none`} />
        </label>

        {error && (
          <p className="rounded-lg bg-brand/10 text-brand text-xs font-semibold px-3 py-2">{error}</p>
        )}

        <button type="submit" disabled={loading} className="btn btn-red w-full justify-center disabled:opacity-60 mt-1 !shadow-none">
          {loading ? "Sending…" : "Send Request"}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-ash text-[0.7rem] mt-0.5">
          <ShieldCheck className="w-3 h-3 text-brand" />
          Your details stay private — used only to contact you.
        </p>
      </form>
    </div>
  );
}
