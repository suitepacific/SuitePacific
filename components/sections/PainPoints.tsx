import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { PAIN_POINTS } from "@/lib/content";

export function PainPoints() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Reality After Go-Live"
          title="Sound Familiar?"
          subtitle="You're not alone. These are the most common challenges after NetSuite goes live."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point) => (
            <StaggerItem key={point.title}>
              <Card className="p-6 h-full">
                <IconBadge icon={point.icon} />
                <h3 className="mt-5 font-semibold text-brand-900">{point.title}</h3>
                <p className="mt-2 text-sm text-brand-400">{point.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
