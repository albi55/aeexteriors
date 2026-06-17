"use client";

import { createContext, useContext, useState } from "react";
import { ArrowRight, Check } from "@/components/icons";

const services = [
  "Masonry",
  "Roofing",
  "Siding",
  "Gutters",
  "Chimneys",
  "Foundation",
  "Waterproofing",
  "Other / Multiple Services",
];

type EstimateContextValue = { openEstimate: () => void };

const EstimateContext = createContext<EstimateContextValue | null>(null);

/** Open the global estimate modal from any client component. */
export function useEstimate() {
  const ctx = useContext(EstimateContext);
  if (!ctx) {
    throw new Error("useEstimate must be used within <EstimateModalProvider>");
  }
  return ctx;
}

const fieldClass =
  "w-full bg-concrete focus:bg-white border-2 border-line focus:border-brand text-coal placeholder-ash/70 px-4 py-3 text-sm outline-none transition-colors";

/**
 * Renders the estimate modal once at the app root and exposes openEstimate()
 * to the whole tree via context, so any "Free Estimate" button on any page can
 * open the same functional modal. The form posts to /api/send-email.
 */
export default function EstimateModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
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
      setError(
        (err instanceof Error && err.message) ||
          "Failed to send. Please call us at 732-956-0411."
      );
    }
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    if (submitted) {
      setSubmitted(false);
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
    }
  };

  return (
    <EstimateContext.Provider value={{ openEstimate: () => setOpen(true) }}>
      {children}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={handleClose} />

          {/* Modal */}
          <div className="relative bg-bone w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-block">
            {/* Header strip */}
            <div className="surface-ink relative overflow-hidden">
              <div className="absolute inset-0 tex-blueprint opacity-60 pointer-events-none" aria-hidden="true" />
              <div className="relative flex items-center justify-between px-7 py-5">
                <div>
                  <span className="kicker mb-1.5">Work Order</span>
                  <p className="font-display font-bold uppercase text-bone text-2xl tracking-[0.01em] leading-none mt-2">
                    Request a Free Estimate
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 bg-bone/10 hover:bg-brand text-bone transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="tex-hazard h-1.5 w-full" aria-hidden="true" />
            </div>

            <div className="p-7 sm:p-9">
              {submitted ? (
                <div className="text-center py-10">
                  <span className="inline-flex items-center justify-center w-16 h-16 bg-brand mb-6">
                    <Check className="w-8 h-8 text-white" />
                  </span>
                  <h3 className="font-display font-bold uppercase text-coal text-3xl mb-3 tracking-[0.01em]">
                    Request received
                  </h3>
                  <p className="text-ash text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                    Thanks — we&apos;ll be in touch within 24 hours to schedule your free on-site estimate.
                  </p>
                  <button onClick={handleClose} className="btn btn-ink">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="spec text-ash block mb-2">Full Name *</label>
                      <input name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Smith" className={fieldClass} />
                    </div>
                    <div>
                      <label className="spec text-ash block mb-2">Phone *</label>
                      <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="(732) 555-0100" className={fieldClass} />
                    </div>
                  </div>
                  <div>
                    <label className="spec text-ash block mb-2">Email</label>
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
                    <textarea name="message" rows={3} value={formData.message} onChange={handleChange} placeholder="Describe your project…" className={`${fieldClass} resize-none`} />
                  </div>
                  {error && <p className="text-brand text-sm font-medium" role="alert">{error}</p>}
                  <button type="submit" disabled={loading} className="btn btn-red w-full justify-center disabled:opacity-60 mt-1">
                    {loading ? "Sending…" : "Submit Request"}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>
                  <p className="spec text-ash/70 text-center !tracking-[0.12em]">No obligation · We reply within 24h</p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </EstimateContext.Provider>
  );
}
