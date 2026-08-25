"use client";

export function PreferredSourceButton() {
  return (
    <div className="mt-10 pt-8 border-t border-brand-50 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-brand-900">Find us in Google AI Search?</p>
        <p className="mt-0.5 text-xs text-brand-400">
          Add SuitePacific as a Preferred Source so Google surfaces our content in your AI answers.
        </p>
      </div>
      <div className="shrink-0" {...{ "google-add-preferred-source-btn": "" }} />
    </div>
  );
}
