"use client";

import { useState } from "react";
import { deleteLead } from "./actions";

export function DeleteLeadButton({ id }: { id: string }) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    setPending(true);
    await deleteLead(id);
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="text-xs text-red-400 hover:text-red-600 disabled:opacity-40 transition-colors"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
