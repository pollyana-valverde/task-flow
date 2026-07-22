import { httpClient } from "@/lib/http/client";
import z from "zod";

const updateBoardSchema = z.object({
  title: z.string(),
});

interface UpdateBoardProps {
  title: string;
  boardId: string;
}

async function updateBoard({ title, boardId }: UpdateBoardProps) {
  const data = await httpClient(`/api/board/${boardId}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
  });

  return updateBoardSchema.parse(data);
}

export { updateBoard, updateBoardSchema };
