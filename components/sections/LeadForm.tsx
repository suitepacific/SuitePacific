"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { FORMSUBMIT_ENDPOINT, CTA_SUPPORT_LINE } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Submission failed");

      // Email delivery happens directly from the browser: FormSubmit sits behind
      // Cloudflare, which blocks server-to-server requests but allows real browsers.
      fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      }).catch(() => {});

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="flex flex-col items-center justify-center text-center py-10">
        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        <h3 className="mt-4 font-semibold text-brand-900 text-lg">Request received.</h3>
        <p className="mt-2 text-sm text-brand-400 max-w-xs">
          We&apos;ll reach out within one business day to schedule your free consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="_subject" value="New SuitePacific Consultation Request" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-700 mb-1.5">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-brand-700 mb-1.5">
            Company <span className="text-brand-300 font-normal">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            placeholder="Acme Inc."
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-700 mb-1.5">
          Work Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          placeholder="jane@acme.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-700 mb-1.5">
          What do you need help with? <span className="text-brand-400">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent resize-none"
          placeholder="Tell us about your project, issue, or idea..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white font-medium px-6 py-3 text-sm shadow-soft hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "submitting" ? "Sending..." : "Talk to a NetSuite Expert"}
      </button>

      {status === "error" && (
        <p role="status" aria-live="polite" className="text-sm text-red-500 text-center">
          Something went wrong. Please email us directly at{" "}
          <a href="mailto:info@suitepacific.com" className="underline">
            info@suitepacific.com
          </a>
          .
        </p>
      )}

      <p className="text-xs text-brand-400 text-center">{CTA_SUPPORT_LINE}</p>

    </form>
  );
}
