"use client";

import { useState } from "react";

type PostFormValues = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string;
  content: string;
  published: boolean;
};

type PostFormProps = {
  action: (formData: FormData) => Promise<void>;
  initialValues?: PostFormValues;
  submitLabel: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function PostForm({ action, initialValues, submitLabel }: PostFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [slug, setSlug] = useState(initialValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues?.slug));

  return (
    <form action={action} className="space-y-5 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-brand-700 mb-1.5">Title</label>
        <input
          name="title"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-700 mb-1.5">
          Slug <span className="text-brand-300">(suitepacific.com/blog/...)</span>
        </label>
        <input
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(slugify(e.target.value));
          }}
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-700 mb-1.5">
          Description <span className="text-brand-300">(SEO summary, shown on blog index)</span>
        </label>
        <textarea
          name="description"
          required
          rows={2}
          defaultValue={initialValues?.description}
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">Date</label>
          <input
            type="date"
            name="date"
            required
            defaultValue={initialValues?.date ?? new Date().toISOString().slice(0, 10)}
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">
            Tags <span className="text-brand-300">(comma-separated)</span>
          </label>
          <input
            name="tags"
            defaultValue={initialValues?.tags}
            placeholder="SuiteScript, Development"
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-700 mb-1.5">
          Content <span className="text-brand-300">(markdown)</span>
        </label>
        <textarea
          name="content"
          required
          rows={18}
          defaultValue={initialValues?.content}
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-brand-700">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initialValues?.published ?? true}
          className="h-4 w-4 rounded border-brand-200 text-brand focus:ring-accent/40"
        />
        Published (visible on the live site)
      </label>

      <button
        type="submit"
        className="rounded-full bg-brand text-white font-medium px-6 py-2.5 text-sm shadow-soft hover:bg-brand-700 transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
}
