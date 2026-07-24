"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { FORMSUBMIT_ENDPOINT } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadFormLight() {
  const [status, setStatus] = useState<Status>("idle");
  const [sourceUrl, setSourceUrl] = useState("");

  useEffect(() => {
    setSourceUrl(window.location.href);
  }, []);

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
      <div role="status" aria-live="polite" className="flex items-center gap-3 py-4">
        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
        <p className="text-sm text-brand-600">We&apos;ll be in touch within one business day.</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input type="hidden" name="_subject" value="New SuitePacific Consultation Request" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
        <input type="hidden" name="name" value={sourceUrl} />

        <input
          name="email"
          type="email"
          required
          placeholder="Your work email"
          className="flex-1 rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
        />

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white font-medium px-5 py-2.5 text-sm shadow-soft hover:bg-brand-700 transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "submitting" ? "Sending..." : "Get in touch"}
        </button>
      </form>

      {status === "error" && (
        <p role="status" aria-live="polite" className="mt-2 text-sm text-red-500">
          Something went wrong. Email us at{" "}
          <a href="mailto:info@suitepacific.com" className="underline">
            info@suitepacific.com
          </a>
          .
        </p>
      )}
    </div>
  );
}
