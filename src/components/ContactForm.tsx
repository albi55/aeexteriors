"use client";

import { useState } from "react";
import { ArrowRight, Check, Phone, Mail, ShieldCheck } from "@/components/icons";
import { PHONE } from "@/lib/seo-data";

const services = ["Masonry", "Roofing", "Siding", "Gutters", "Chimneys", "Foundation", "Waterproofing", "Other / Multiple Services"];

export default function ContactForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const labelClass = dark ? "field-label field-label-dark" : "field-label";
  const fieldClass = dark ? "field field-dark" : "field";
  const wrapClass = dark ? "field-wrap field-wrap-dark" : "field-wrap";
  const noteClass = dark ? "text-bone/55" : "text-ash";

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
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setSubmitted(true);
    } catch (err) {
      setError((err instanceof Error && err.message) || "Failed to send. Please call us at 732-956-0411.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className={`rounded-[var(--radius)] p-10 text-center ${dark ? "bg-bone/5 border border-steel/70" : "bg-concrete"}`}>
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 text-brand mb-5 animate-[fadeUp_500ms_var(--ease-out)]">
          <Check className="w-8 h-8" />
        </span>
        <h3 className={`font-display font-bold text-2xl sm:text-3xl tracking-tight mb-2 ${dark ? "text-bone" : "text-coal"}`}>Message sent</h3>
        <p className={`text-sm mb-6 max-w-sm mx-auto leading-relaxed ${dark ? "text-bone/60" : "text-ash"}`}>
          We&apos;ll be in touch within 24 hours to schedule your free, no-obligation estimate.
        </p>
        <a href={`tel:${PHONE.replace(/\D/g, "")}`} className={dark ? "btn btn-outline-bone" : "btn btn-outline"}>
          <Phone className="w-4 h-4" />
          Or call {PHONE}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className={labelClass}>Full Name <span className="req">*</span></label>
          <input id="cf-name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Smith" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>Phone Number <span className="req">*</span></label>
          <span className={wrapClass}>
            <Phone className="field-icon" />
            <input id="cf-phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="(732) 555-0100" className={fieldClass} />
          </span>
        </div>
      </div>
      <div>
        <label htmlFor="cf-email" className={labelClass}>Email Address</label>
        <span className={wrapClass}>
          <Mail className="field-icon" />
          <input id="cf-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@email.com" className={fieldClass} />
        </span>
      </div>
      <div>
        <label htmlFor="cf-service" className={labelClass}>Service Needed <span className="req">*</span></label>
        <select id="cf-service" name="service" required value={formData.service} onChange={handleChange} className={fieldClass}>
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className={labelClass}>Project Details</label>
        <textarea id="cf-message" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Describe your project or issue…" className={`${fieldClass} resize-none`} />
      </div>
      {error && (
        <p className="rounded-[var(--radius-sm)] bg-brand/10 text-brand text-sm font-semibold px-4 py-3" role="alert">{error}</p>
      )}
      <button type="submit" disabled={loading} className="btn btn-red self-start disabled:opacity-60">
        {loading ? "Sending…" : "Send Message"}
        {!loading && <ArrowRight className="w-4 h-4" />}
      </button>
      <p className={`flex items-center gap-1.5 text-xs ${noteClass}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-brand" />
        Your details stay private — used only to contact you about your project.
      </p>
    </form>
  );
}
