import { httpClient } from "@/lib/http/client";
import z from "zod";

const updateRoleInputSchema = z.object({
  role: z.enum(["admin", "member"]),
});

const updateRoleResponseSchema = z.object({
  message: z.string(),
});

interface UpdateRoleProps {
  role: "admin" | "member";
  workspaceId: string;
  memberId: string;
}

async function updateRole({ role, workspaceId, memberId }: UpdateRoleProps) {
  const data = await httpClient(
    `/api/workspace/${workspaceId}/member/${memberId}/role`,
    {
      method: "PATCH",
      body: JSON.stringify({ role }),
    }
  );

  return updateRoleResponseSchema.parse(data);
}

export { updateRole, updateRoleInputSchema };
