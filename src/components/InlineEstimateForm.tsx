"use client";

import { useState } from "react";
import { ArrowRight, Check } from "@/components/icons";

const services = ["Masonry", "Roofing", "Siding", "Gutters", "Chimneys", "Foundation", "Waterproofing", "Other"];

const fieldClass =
  "w-full bg-concrete focus:bg-white border-2 border-line focus:border-brand text-coal placeholder-ash/70 px-4 py-2.5 text-sm outline-none transition-colors";

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
      <div className="bg-bone ticks p-8 text-center">
        <span className="inline-flex items-center justify-center w-12 h-12 bg-brand mb-4">
          <Check className="w-6 h-6 text-white" />
        </span>
        <p className="font-display font-bold uppercase text-coal text-2xl mb-1 tracking-[0.01em]">Request sent</p>
        <p className="text-ash text-sm">We&apos;ll call you within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="bg-bone ticks p-6">
      <span className="kicker mb-3">Free Estimate</span>
      <p className="font-display font-bold uppercase text-coal text-2xl mb-4 leading-none tracking-[0.01em]">
        Get a free quote
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          <input name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Name *" className={fieldClass} />
          <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="Phone *" className={fieldClass} />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className={fieldClass} />
          <select name="service" required value={formData.service} onChange={handleChange} className={fieldClass}>
            <option value="">Service *</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <textarea name="message" rows={2} value={formData.message} onChange={handleChange} placeholder="Project details (optional)" className={`${fieldClass} resize-none`} />
        {error && <p className="text-brand text-xs font-medium">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-red w-full justify-center disabled:opacity-60 mt-1">
          {loading ? "Sending…" : "Send Request"}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}
