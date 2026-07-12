import { httpClient } from "@/lib/http/client";
import { getServerCookie } from "@/lib/http/get-server-cookie";
import z from "zod";

const getBoardResultSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  workspaceId: z.uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

async function getBoard({ boardId }: { boardId: string }) {
  const cookie = await getServerCookie();

  const data = await httpClient(`/api/board/${boardId}`, {
    headers: { Cookie: cookie },
  });

  return getBoardResultSchema.parse(data);
}

export { getBoard, getBoardResultSchema };
