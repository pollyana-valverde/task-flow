import { httpClient } from "@/lib/http/client";
import z from "zod";

const deleteTaskSchema = z.object({
  message: z.string(),
});

interface DeleteTaskProps {
  taskId: string;
}

async function deleteTask({ taskId }: DeleteTaskProps) {
  const data = await httpClient(`/api/task/${taskId}`, {
    method: "DELETE",
  });

  return deleteTaskSchema.parse(data);
}

export { deleteTask, deleteTaskSchema };

