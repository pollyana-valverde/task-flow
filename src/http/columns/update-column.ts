import { httpClient } from "@/lib/http/client";
import z from "zod";

const updateColumnSchema = z.object({
  title: z.string(),
});

interface UpdateColumnProps {
  title: string;
  columnId: string;
}

async function updateColumn({ title, columnId }: UpdateColumnProps) {
  const data = await httpClient(`/api/column/${columnId}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
  });

  return updateColumnSchema.parse(data);
}

export { updateColumn, updateColumnSchema };
