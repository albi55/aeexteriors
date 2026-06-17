"use client";

import { useState } from "react";
import { ArrowRight, Check } from "@/components/icons";

const services = ["Masonry", "Roofing", "Siding", "Gutters", "Chimneys", "Foundation", "Waterproofing", "Other / Multiple Services"];

const fieldClass =
  "w-full bg-concrete focus:bg-white border-2 border-line focus:border-brand text-coal placeholder-ash/70 px-4 py-3 text-sm outline-none transition-colors";

export default function ContactForm() {
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
      <div className="bg-concrete ticks p-10 text-center">
        <span className="inline-flex items-center justify-center w-16 h-16 bg-brand mb-5">
          <Check className="w-8 h-8 text-white" />
        </span>
        <h3 className="font-display font-bold uppercase text-coal text-2xl mb-2 tracking-[0.01em]">Message sent</h3>
        <p className="text-ash text-sm">We&apos;ll be in touch within 24 hours to schedule your free estimate.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="spec text-ash block mb-2">Full Name *</label>
          <input name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Smith" className={fieldClass} />
        </div>
        <div>
          <label className="spec text-ash block mb-2">Phone Number *</label>
          <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="(732) 555-0100" className={fieldClass} />
        </div>
      </div>
      <div>
        <label className="spec text-ash block mb-2">Email Address</label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@email.com" className={fieldClass} />
      </div>
      <div>
        <label className="spec text-ash block mb-2">Service Needed *</label>
        <select name="service" required value={formData.service} onChange={handleChange} className={fieldClass}>
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="spec text-ash block mb-2">Project Details</label>
        <textarea name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Describe your project or issue…" className={`${fieldClass} resize-none`} />
      </div>
      {error && <p className="text-brand text-sm font-medium" role="alert">{error}</p>}
      <button type="submit" disabled={loading} className="btn btn-red self-start disabled:opacity-60">
        {loading ? "Sending…" : "Send Message"}
        {!loading && <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  );
}
