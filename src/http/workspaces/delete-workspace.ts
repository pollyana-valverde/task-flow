import { httpClient } from "@/lib/http/client";
import z from "zod";

const deleteWorkspaceSchema = z.object({
  message: z.string(),
});

async function deleteWorkspace({ workspaceId }: { workspaceId: string }) {
  const data = await httpClient(`/api/workspace/${workspaceId}`, {
    method: "DELETE",
  });

  return deleteWorkspaceSchema.parse(data);
}

export { deleteWorkspace, deleteWorkspaceSchema };
