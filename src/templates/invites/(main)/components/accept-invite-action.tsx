"use client";

import { Button } from "@/components/ui/button";
import { acceptInvite } from "@/http/members/accept-invite";
import { useRouter } from "next/navigation";

interface AcceptInviteActionProps {
  workspaceId: string | null;
  inviteId: string;
}

function AcceptInviteAction({
  workspaceId,
  inviteId,
}: AcceptInviteActionProps) {
  const router = useRouter();

  async function handleAcceptInvite() {
    try {
      if (!workspaceId) {
        return;
      }

      await acceptInvite({
        workspaceId: workspaceId,
        notificationId: inviteId,
      });
      router.replace(
        `/invites/${inviteId}/invite-accepted?workspaceId=${workspaceId}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  return <Button onClick={handleAcceptInvite}>Aceitar</Button>;
}

export { AcceptInviteAction };
