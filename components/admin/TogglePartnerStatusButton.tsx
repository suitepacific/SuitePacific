"use client";

import { useTransition } from "react";
import { togglePartnerStatusAction } from "@/app/admin/(dashboard)/partners/actions";

export function TogglePartnerStatusButton({
  partnerId,
  currentStatus,
}: {
  partnerId: string;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();
  const isActive = currentStatus === "active";

  return (
    <button
      onClick={() => startTransition(() => togglePartnerStatusAction(partnerId))}
      disabled={isPending}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
        isActive
          ? "bg-red-50 text-red-600 hover:bg-red-100"
          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
      }`}
    >
      {isPending ? "Updating…" : isActive ? "Suspend" : "Activate"}
    </button>
  );
}
