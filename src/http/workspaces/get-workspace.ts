import { httpClient } from "@/lib/http/client";
import { getServerCookie } from "@/lib/http/get-server-cookie";
import z from "zod";

const getWorkspaceResultSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  ownerId: z.uuid(),
  membersCount: z.number(),
  boardsCount: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

async function getWorkspace({ workspaceId }: { workspaceId: string }) {
  const cookie = await getServerCookie();

  const data = await httpClient(`/api/workspace/${workspaceId}`, {
    headers: { Cookie: cookie },
  });

  return getWorkspaceResultSchema.parse(data);
}

export { getWorkspace, getWorkspaceResultSchema };
