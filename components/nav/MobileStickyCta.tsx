"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const pastHero = scrollY > window.innerHeight * 0.7;
      const nearBottom =
        scrollY + window.innerHeight > document.documentElement.scrollHeight - 500;
      setVisible(pastHero && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sm:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-brand-100 px-4 py-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Button href="/#contact" className="w-full justify-center">
        Book a Free Consultation
      </Button>
    </div>
  );
}
