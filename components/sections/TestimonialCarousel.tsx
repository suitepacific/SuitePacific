"use client";

import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  role: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  intervalMs?: number;
}

export function TestimonialCarousel({
  testimonials,
  intervalMs = 5500,
}: TestimonialCarouselProps) {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = (next: number) => {
    setFading(true);
    setTimeout(() => {
      setActive(next);
      setFading(false);
    }, 300);
  };

  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      advance((active + 1) % testimonials.length);
    }, intervalMs);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const goTo = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    advance(i);
  };

  const { quote, role } = testimonials[active];

  return (
    <div
      className="flex flex-col items-center gap-6"
      onMouseEnter={() => { if (timerRef.current) clearTimeout(timerRef.current); }}
      onMouseLeave={startTimer}
    >
      <div
        className="w-full rounded-xl border border-brand-100 bg-white p-6 sm:p-8 shadow-sm min-h-[160px] flex flex-col justify-between transition-opacity duration-300"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <div className="flex gap-0.5 mb-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <blockquote className="text-sm sm:text-[15px] text-brand-600 leading-relaxed flex-1">
          {quote}
        </blockquote>
        <p className="mt-4 text-xs text-brand-400 font-medium">{role}</p>
      </div>

      {/* Dot navigation */}
      <div className="flex items-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? "bg-accent w-5 h-2"
                : "bg-brand-200 hover:bg-brand-300 w-2 h-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
