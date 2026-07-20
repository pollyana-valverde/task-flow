import { httpClient } from "@/lib/http/client";
import { getServerCookie } from "@/lib/http/get-server-cookie";
import z from "zod";

const getTaskResultSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  assigneeId: z.uuid().nullable().optional(),
  columnId: z.uuid(),
  dueDate: z.coerce.date().nullable().optional(),
  createdBy: z.string(),
  updatedBy: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  assignee: z
    .object({
      name: z.string(),
      image: z.string().nullable(),
    })
    .nullable(),
  creator: z
    .object({
      name: z.string(),
      image: z.string().nullable(),
    })
});

async function getTask({ taskId }: { taskId: string }) {
  const cookie = await getServerCookie();

  const data = await httpClient(`/api/task/${taskId}`, {
    headers: { Cookie: cookie },
  });

  return getTaskResultSchema.parse(data);
}

export { getTask, getTaskResultSchema };
