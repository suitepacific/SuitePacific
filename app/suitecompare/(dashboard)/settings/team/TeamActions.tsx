"use client";

import { UserMinus, X } from "lucide-react";
import { removeMemberAction, cancelInviteAction } from "./actions";

export function RemoveMemberButton({ memberId, memberName }: { memberId: string; memberName: string }) {
  return (
    <form action={removeMemberAction}>
      <input type="hidden" name="memberId" value={memberId} />
      <button
        type="submit"
        title={`Remove ${memberName}`}
        onClick={(e) => {
          if (!confirm(`Remove ${memberName} from your team? They will lose access immediately.`)) {
            e.preventDefault();
          }
        }}
        className="p-1.5 rounded-lg text-brand-300 hover:text-red-500 hover:bg-red-50 transition-colors"
      >
        <UserMinus className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}

export function CancelInviteButton({ inviteId, email }: { inviteId: string; email: string }) {
  return (
    <form action={cancelInviteAction}>
      <input type="hidden" name="inviteId" value={inviteId} />
      <button
        type="submit"
        title="Cancel invite"
        onClick={(e) => {
          if (!confirm(`Cancel the invite to ${email}?`)) {
            e.preventDefault();
          }
        }}
        className="p-1.5 rounded-lg text-brand-300 hover:text-red-500 hover:bg-red-50 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}
