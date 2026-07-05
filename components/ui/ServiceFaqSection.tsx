import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface FaqItem {
  question: string;
  answer: string;
}

export function ServiceFaqSection({ items }: { items: FaqItem[] }) {
  return (
    <div className="mt-14 pt-10 border-t border-brand-50">
      <h2 className="text-lg font-semibold text-brand-900">Frequently Asked Questions</h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <Card key={item.question} className="overflow-hidden">
            <details className="group p-5 open:bg-brand-50/30 transition-colors">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-brand-900 text-sm">
                {item.question}
                <ChevronDown className="h-4 w-4 text-brand-400 shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-brand-400 leading-relaxed">{item.answer}</p>
            </details>
          </Card>
        ))}
      </div>
    </div>
  );
}
