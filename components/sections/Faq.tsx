import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { FAQ_ITEMS } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <FaqJsonLd />
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading eyebrow="Common Questions" title="Frequently Asked Questions" />

        <div className="mt-14 grid sm:grid-cols-2 gap-4 items-start">
          {FAQ_ITEMS.map((item, index) => (
            <FadeIn key={item.question} delay={index * 0.04}>
              <Card className="overflow-hidden">
                <details className="group p-6 open:bg-brand-50/30 transition-colors">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-brand-900">
                    {item.question}
                    <ChevronDown className="h-4 w-4 text-brand-400 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm text-brand-400 leading-relaxed">{item.answer}</p>
                </details>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
