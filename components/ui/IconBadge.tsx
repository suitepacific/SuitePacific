import type { LucideIcon } from "lucide-react";

type IconBadgeProps = {
  icon: LucideIcon;
  size?: "md" | "lg";
};

export function IconBadge({ icon: Icon, size = "md" }: IconBadgeProps) {
  const dimension = size === "lg" ? "h-14 w-14" : "h-11 w-11";
  const iconSize = size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div
      className={`${dimension} flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand`}
    >
      <Icon className={iconSize} strokeWidth={1.75} />
    </div>
  );
}
