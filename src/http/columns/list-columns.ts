import { httpClient } from "@/lib/http/client";
import { getServerCookie } from "@/lib/http/get-server-cookie";
import z from "zod";

const listColumnsResultSchema = z.array(
  z.object({
    id: z.uuid(),
    title: z.string(),
    boardId: z.uuid(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    tasks: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        priority: z.enum(["low", "medium", "high", "urgent"]),
        assigneeId: z.string().nullable(),
        columnId: z.string(),
        dueDate: z.coerce.date().nullable(),
        createdAt: z.coerce.date(),
        updatedAt: z.coerce.date(),
        createdBy: z.string(),
        updatedBy: z.string().nullable(),
        assignee: z
          .object({
            name: z.string(),
            image: z.string().nullable(),
          })
          .nullable(),
      }),
    ),
  }),
);

async function listColumns({ boardId }: { boardId: string }) {
  const cookie = await getServerCookie();

  const data = await httpClient(`/api/board/${boardId}/columns`, {
    headers: { Cookie: cookie },
  });

  return listColumnsResultSchema.parse(data);
}

export { listColumns, listColumnsResultSchema };
