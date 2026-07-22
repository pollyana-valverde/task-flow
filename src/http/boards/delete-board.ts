import { httpClient } from "@/lib/http/client";
import z from "zod";

const deleteBoardSchema = z.object({
  message: z.string(),
});

async function deleteBoard({ boardId }: { boardId: string }) {
  const data = await httpClient(`/api/board/${boardId}`, {
    method: "DELETE",
  });

  return deleteBoardSchema.parse(data);
}

export { deleteBoard, deleteBoardSchema };
