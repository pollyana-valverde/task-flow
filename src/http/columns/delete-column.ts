import { httpClient } from "@/lib/http/client";
import z from "zod";

const deleteColumnSchema = z.object({
  message: z.string(),
});

async function deleteColumn({ columnId }: { columnId: string }) {
  const data = await httpClient(`/api/column/${columnId}`, {
    method: "DELETE",
  });

  return deleteColumnSchema.parse(data);
}

export { deleteColumn, deleteColumnSchema };
