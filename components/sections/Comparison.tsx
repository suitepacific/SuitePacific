import { X, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { COMPARISON_CONS, COMPARISON_PROS } from "@/lib/content";

export function Comparison() {
  return (
    <section id="why-us" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Why SuitePacific" title="A Different Kind of NetSuite Partner" />

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          <FadeIn>
            <div className="rounded-2xl border border-brand-100 bg-brand-50/40 p-8 h-full">
              <h3 className="font-semibold text-brand-400">Large Consulting Firms</h3>
              <ul className="mt-6 space-y-4">
                {COMPARISON_CONS.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-brand-400">
                    <X className="h-4 w-4 text-red-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl bg-brand text-white p-8 h-full shadow-soft-lg">
              <h3 className="font-semibold">SuitePacific</h3>
              <ul className="mt-6 space-y-4">
                {COMPARISON_PROS.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
