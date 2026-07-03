import { httpClient } from "@/lib/http/client";
import z from "zod";

const inviteMemberInputSchema = z.object({
  email: z.email(),
  role: z.enum(["admin", "member"]),
});

const inviteMemberResponseSchema = z.object({
  message: z.string(),
});

interface InviteMemberProps {
  email: string;
  role: "admin" | "member";
  workspaceId: string;
}

async function inviteMember({ email, role, workspaceId }: InviteMemberProps) {
  const data = await httpClient(`/api/workspace/${workspaceId}/invite-member`, {
    method: "POST",
    body: JSON.stringify({ email, role }),
  });

  return inviteMemberResponseSchema.parse(data);
}

export { inviteMember, inviteMemberInputSchema };
