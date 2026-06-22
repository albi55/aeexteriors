"use client";

import { useState } from "react";
import { ArrowRight, Check, Phone, Mail, ShieldCheck } from "@/components/icons";
import { PHONE } from "@/lib/seo-data";

const services = ["Masonry", "Roofing", "Siding", "Gutters", "Chimneys", "Foundation", "Waterproofing", "Other"];

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
      <div className="rounded-[var(--radius-lg)] bg-bone border border-line shadow-soft p-7 text-center max-w-md">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand/10 text-brand mb-4 animate-[fadeUp_500ms_var(--ease-out)]">
          <Check className="w-7 h-7" />
        </span>
        <p className="font-display font-bold text-coal text-xl tracking-tight mb-1.5">Request sent!</p>
        <p className="text-ash text-sm leading-relaxed mb-5">Thanks — we&apos;ll reach out within 24 hours to schedule your free on-site estimate.</p>
        <a href={`tel:${PHONE.replace(/\D/g, "")}`} className="inline-flex items-center gap-1.5 font-display font-semibold text-sm text-coal hover:text-brand transition-colors">
          <Phone className="w-4 h-4 text-brand" />
          Or call {PHONE}
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-lg)] bg-bone border border-line shadow-soft p-5 sm:p-6 max-w-md">
      {/* header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <span className="kicker mb-2.5">Free Estimate</span>
          <h3 className="font-display font-bold text-coal text-xl sm:text-2xl tracking-tight mt-2">Get a free quote</h3>
          <p className="text-ash text-xs mt-1">No obligation — we respond within 24 hours.</p>
        </div>
        <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand/10 text-brand flex-shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label htmlFor="ie-name" className="field-label">Name <span className="req">*</span></label>
            <input id="ie-name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your name" className="field" />
          </div>
          <div>
            <label htmlFor="ie-phone" className="field-label">Phone <span className="req">*</span></label>
            <span className="field-wrap">
              <Phone className="field-icon" />
              <input id="ie-phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="(732) 555-0000" className="field" />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label htmlFor="ie-email" className="field-label">Email</label>
            <span className="field-wrap">
              <Mail className="field-icon" />
              <input id="ie-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" className="field" />
            </span>
          </div>
          <div>
            <label htmlFor="ie-service" className="field-label">Service <span className="req">*</span></label>
            <select id="ie-service" name="service" required value={formData.service} onChange={handleChange} className="field">
              <option value="">Choose…</option>
              {services.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="ie-message" className="field-label">Project details</label>
          <textarea id="ie-message" name="message" rows={3} value={formData.message} onChange={handleChange} placeholder="Tell us a bit about your project (optional)" className="field resize-none" />
        </div>

        {error && (
          <p className="rounded-[var(--radius-sm)] bg-brand/10 text-brand text-xs font-semibold px-3 py-2">{error}</p>
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
