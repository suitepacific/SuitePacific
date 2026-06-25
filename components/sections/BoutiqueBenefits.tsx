import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { BOUTIQUE_BENEFITS } from "@/lib/content";

export function BoutiqueBenefits() {
  return (
    <section className="py-24 sm:py-32 bg-brand-50/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Boutique Advantage"
          title="Why Choose a Boutique Partner"
          subtitle="Senior expertise, without the overhead of an enterprise consulting firm."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOUTIQUE_BENEFITS.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <Card className="p-6 h-full">
                <IconBadge icon={benefit.icon} />
                <h3 className="mt-5 font-semibold text-brand-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-brand-400">{benefit.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
