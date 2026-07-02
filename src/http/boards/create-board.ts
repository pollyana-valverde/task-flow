import { httpClient } from "@/lib/http/client";
import z from "zod";

const createBoardSchema = z.object({
  title: z.string(),
});

interface CreateBoardProps {
  title: string;
  workspaceId: string;
}

async function createBoard({ title, workspaceId }: CreateBoardProps) {
  const data = await httpClient(`/api/workspace/${workspaceId}/board`, {
    method: "POST",
    body: JSON.stringify({ title }),
  });

  return createBoardSchema.parse(data);
}

export { createBoard, createBoardSchema };
