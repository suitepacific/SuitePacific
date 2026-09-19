"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { FORMSUBMIT_ENDPOINT } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export function ScriptReadinessForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("sourcePage", window.location.href);
    formData.set("_subject", "SuiteScript 2028.2 Readiness Checklist Request");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Submission failed");

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
      <div role="status" aria-live="polite" className="text-center py-8">
        <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
        <h3 className="mt-4 font-semibold text-brand-900 text-base">
          Received. We&apos;ll be in touch within one business day.
        </h3>
        <p className="mt-2 text-sm text-brand-400 max-w-sm mx-auto">
          Based on your answers we will review the scope and send you a migration estimate.
          In the meantime, use the checklist below to continue your readiness review.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sr-name" className="block text-sm font-medium text-brand-700 mb-1.5">
            Full name
          </label>
          <input
            id="sr-name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="sr-company" className="block text-sm font-medium text-brand-700 mb-1.5">
            Company
          </label>
          <input
            id="sr-company"
            name="company"
            type="text"
            required
            placeholder="Acme Inc."
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="sr-email" className="block text-sm font-medium text-brand-700 mb-1.5">
          Work email
        </label>
        <input
          id="sr-email"
          name="email"
          type="email"
          required
          placeholder="jane@acme.com"
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sr-scripts" className="block text-sm font-medium text-brand-700 mb-1.5">
            Approximate number of custom scripts
          </label>
          <select
            id="sr-scripts"
            name="scriptCount"
            required
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent bg-white"
          >
            <option value="" disabled>Select range</option>
            <option value="Unknown">Unknown</option>
            <option value="1-10">1 to 10</option>
            <option value="11-50">11 to 50</option>
            <option value="51-100">51 to 100</option>
            <option value="100+">More than 100</option>
          </select>
        </div>
        <div>
          <label htmlFor="sr-warning" className="block text-sm font-medium text-brand-700 mb-1.5">
            Is the NetSuite 2028.2 warning visible in your account?
          </label>
          <select
            id="sr-warning"
            name="warningVisible"
            required
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent bg-white"
          >
            <option value="" disabled>Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="sr-need" className="block text-sm font-medium text-brand-700 mb-1.5">
          What do you need help with?
        </label>
        <select
          id="sr-need"
          name="helpNeeded"
          required
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent bg-white"
        >
          <option value="" disabled>Select</option>
          <option value="Script audit only">Script audit only (inventory and risk report)</option>
          <option value="Conversion help">Script conversion to SuiteScript 2.1</option>
          <option value="Both audit and conversion">Both the audit and the conversion</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold px-6 py-3 text-sm shadow-soft hover:bg-accent/90 transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request a SuiteScript 2.1 Audit Estimate"
        )}
      </button>

      {status === "error" && (
        <p role="status" aria-live="polite" className="text-sm text-red-500 text-center">
          Something went wrong. Email us at{" "}
          <a href="mailto:info@suitepacific.com" className="underline">
            info@suitepacific.com
          </a>
          .
        </p>
      )}

      <p className="text-xs text-brand-400 text-center">
        We respect your privacy. No automated sequences, no spam.
      </p>
    </form>
  );
}
