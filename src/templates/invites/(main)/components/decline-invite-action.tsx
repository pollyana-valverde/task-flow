"use client";

import { Button } from "@/components/ui/button";
import { declineInvite } from "@/http/members/decline-invite";
import { useRouter } from "next/navigation";

interface DeclineInviteActionProps {
  workspaceId: string | null;
  inviteId: string;
}

function DeclineInviteAction({
  workspaceId,
  inviteId,
}: DeclineInviteActionProps) {
  const router = useRouter();

  async function handleDeclineInvite() {
    try {
      if (!workspaceId) {
        return;
      }

      await declineInvite({
        workspaceId: workspaceId,
        notificationId: inviteId,
      });
      router.replace(`/invites/${inviteId}/invite-declined`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button variant="secondary" onClick={handleDeclineInvite}>
      Recusar
    </Button>
  );
}

export { DeclineInviteAction };
