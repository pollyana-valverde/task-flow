import { httpClient } from "@/lib/http/client";
import { getServerCookie } from "@/lib/http/get-server-cookie";
import z from "zod";

const listBoardsResultSchema = z.array(
  z.object({
    id: z.uuid(),
    title: z.string(),
    workspaceId: z.uuid(),
    columnsCount: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
);

async function listBoards({ workspaceId }: { workspaceId: string }) {
  const cookie = await getServerCookie();

  const data = await httpClient(`/api/workspace/${workspaceId}/board`, {
    headers: { Cookie: cookie },
  });

  return listBoardsResultSchema.parse(data);
}

export { listBoards, listBoardsResultSchema };
