import { httpClient } from "@/lib/http/client";
import z from "zod";

const declineInviteResponseSchema = z.object({
  message: z.string(),
});

interface DeclineInviteProps {
  workspaceId: string;
  notificationId: string;
}

async function declineInvite({
  workspaceId,
  notificationId,
}: DeclineInviteProps) {
  const data = await httpClient(
    `/api/workspace/${workspaceId}/invite-member/decline`,
    {
      method: "PATCH",
      body: JSON.stringify({ notificationId }),
    }
  );

  return declineInviteResponseSchema.parse(data);
}

export { declineInvite };
