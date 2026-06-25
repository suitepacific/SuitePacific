"use client";

import { Trash2 } from "lucide-react";
import { deletePostAction } from "@/app/admin/(dashboard)/posts/actions";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={async () => {
        if (confirm(`Delete "${title}"? This can't be undone.`)) {
          await deletePostAction(id);
        }
      }}
    >
      <button type="submit" className="text-brand-400 hover:text-red-600" aria-label="Delete">
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}
