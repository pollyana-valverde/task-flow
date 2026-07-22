import { httpClient } from "@/lib/http/client";
import z from "zod";

const removeMemberSchema = z.object({
  message: z.string(),
});

interface RemoveMember {
  workspaceId: string;
  memberId: string;
}

async function removeMember({ workspaceId, memberId }: RemoveMember) {
  const data = await httpClient(
    `/api/workspace/${workspaceId}/member/${memberId}`,
    {
      method: "DELETE",
    }
  );

  return removeMemberSchema.parse(data);
}

export { removeMember, removeMemberSchema };
