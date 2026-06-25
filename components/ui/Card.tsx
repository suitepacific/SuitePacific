import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "glass";
};

export function Card({ children, className = "", variant = "solid" }: CardProps) {
  const base =
    variant === "glass"
      ? "glass rounded-2xl shadow-glass"
      : "bg-white rounded-2xl shadow-soft border border-brand-50";

  return <div className={`${base} ${className}`}>{children}</div>;
}
