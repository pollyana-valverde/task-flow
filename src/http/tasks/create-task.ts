import { httpClient } from "@/lib/http/client";
import z from "zod";

const createTaskSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  assigneeId: z.uuid().nullable(),
  dueDate: z.coerce.date().nullable(),
});

interface CreateTaskProps {
  createData: z.infer<typeof createTaskSchema>;
  columnId: string;
}

async function createTask({ createData, columnId }: CreateTaskProps) {
  const data = await httpClient(`/api/column/${columnId}/task`, {
    method: "POST",
    body: JSON.stringify(createData),
  });

  return createTaskSchema.parse(data);
}

export { createTask, createTaskSchema };
