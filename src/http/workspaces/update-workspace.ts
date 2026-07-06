import { httpClient } from "@/lib/http/client";
import z from "zod";

const updateWorkspaceSchema = z.object({
  title: z.string(),
});

interface UpdateWorkspaceProps {
  title: string;
  workspaceId: string;
}

async function updateWorkspace({ title, workspaceId }: UpdateWorkspaceProps) {
  const data = await httpClient(`/api/workspace/${workspaceId}`, {
    method: "PATCH",
    body: JSON.stringify({ title }),
  });

  return updateWorkspaceSchema.parse(data);
}

export { updateWorkspace, updateWorkspaceSchema };
