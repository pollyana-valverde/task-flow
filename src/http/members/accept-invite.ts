import { httpClient } from "@/lib/http/client";
import z from "zod";

const acceptInviteResponseSchema = z.object({
  message: z.string(),
});

interface AcceptInviteProps {
  workspaceId: string;
  notificationId: string;
}

async function acceptInvite({
  workspaceId,
  notificationId,
}: AcceptInviteProps) {
  const data = await httpClient(
    `/api/workspace/${workspaceId}/invite-member/accept`,
    {
      method: "PATCH",
      body: JSON.stringify({ notificationId }),
    }
  );

  return acceptInviteResponseSchema.parse(data);
}

export { acceptInvite };
