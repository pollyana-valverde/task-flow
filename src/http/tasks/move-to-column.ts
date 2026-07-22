import { httpClient } from "@/lib/http/client";
import z from "zod";

const moveToColumnInputSchema = z.object({
  oldColumnId: z.uuid(),
  newColumnId: z.uuid(),
});

const moveToColumnResponseSchema = z.object({
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
})

interface MoveToColumnProp {
  oldColumnId: string;
  newColumnId: string;
  taskId: string;
}

async function moveToColumn({
  newColumnId,
  oldColumnId,
  taskId,
}: MoveToColumnProp) {
  const data = await httpClient(`/api/task/${taskId}/move`, {
    method: "PATCH",
    body: JSON.stringify({ oldColumnId, newColumnId }),
  });

  return moveToColumnResponseSchema.parse(data);
}

export { moveToColumn, moveToColumnInputSchema };
