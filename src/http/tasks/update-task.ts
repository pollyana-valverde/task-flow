import { httpClient } from "@/lib/http/client";
import z from "zod";

const updateTaskSchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  assigneeId: z.uuid().nullable().optional(),
  dueDate: z.coerce.date().nullable().optional(),
});

interface UpdateTaskProps {
  updateData: z.infer<typeof updateTaskSchema>;
  taskId: string;
}

async function updateTask({ updateData, taskId }: UpdateTaskProps) {
  const data = await httpClient(`/api/task/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(updateData),
  });

  return updateTaskSchema.parse(data);
}

export { updateTask, updateTaskSchema };
