import { httpClient } from "@/lib/http/client";
import { getServerCookie } from "@/lib/http/get-server-cookie";
import z from "zod";

const listWorkspacesResultSchema = z.array(
  z.object({
    id: z.uuid(),
    title: z.string(),
    ownerId: z.uuid(),
    membersCount: z.number(),
    boardsCount: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    members: z.array(
      z.object({
        workspaceId: z.uuid(),
        userId: z.uuid(),
        name: z.string(),
        image: z.url().nullable(),
        role: z.enum(["owner", "admin", "member"]),
      }),
    ),
  }),
);

async function listWorkspaces() {
  const cookie = await getServerCookie();

  const data = await httpClient("/api/workspace", {
    headers: { Cookie: cookie },
  });

  return listWorkspacesResultSchema.parse(data);
}

export { listWorkspaces, listWorkspacesResultSchema };
