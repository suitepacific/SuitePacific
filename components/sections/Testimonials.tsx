import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { TESTIMONIALS } from "@/lib/content";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="What Clients Say" title="Trusted by NetSuite Teams" />

        <StaggerGroup className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <Card className="p-7 h-full flex flex-col">
                <Quote className="h-6 w-6 text-accent" strokeWidth={1.75} />
                <p className="mt-4 text-brand-700 flex-1">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-brand-50">
                  <p className="font-semibold text-brand-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-brand-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
