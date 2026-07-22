import { httpClient } from "@/lib/http/client";
import z from "zod";

const exitWorkspaceSchema = z.object({
  message: z.string(),
});

async function exitWorkspace({ workspaceId }: { workspaceId: string }) {
  const data = await httpClient(`/api/workspace/${workspaceId}/exit`, {
    method: "DELETE",
  });

  return exitWorkspaceSchema.parse(data);
}

export { exitWorkspace, exitWorkspaceSchema };
