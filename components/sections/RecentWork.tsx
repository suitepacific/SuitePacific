import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { RECENT_WORK } from "@/lib/content";

export function RecentWork() {
  return (
    <section id="work" className="py-24 sm:py-32 bg-brand-50/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Recent Work"
          title="What We've Been Building"
          subtitle="A look at the kind of NetSuite work that fills our queue every week."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RECENT_WORK.map((item) => (
            <StaggerItem key={item.title}>
              <Card className="p-5 h-full flex items-start gap-4">
                <IconBadge icon={item.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
