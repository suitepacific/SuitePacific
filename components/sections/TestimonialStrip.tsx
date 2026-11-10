import { TESTIMONIALS } from "@/lib/testimonials";

export function TestimonialStrip({ picks }: { picks: number[] }) {
  return (
    <div data-section="testimonials" className="mt-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">What clients say</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {picks.map((i) => (
          <figure key={i} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
            <blockquote className="text-sm text-brand-700 leading-relaxed">&ldquo;{TESTIMONIALS[i].quote}&rdquo;</blockquote>
            <figcaption className="mt-3 text-xs font-medium text-brand-400">{TESTIMONIALS[i].role}</figcaption>
          </figure>
        ))}
      </div>
      <a
        href="https://clutch.co/profile/suitepacific"
        className="mt-3 inline-block text-xs text-brand-400 hover:text-accent hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Independent client reviews on Clutch
      </a>
    </div>
  );
}
