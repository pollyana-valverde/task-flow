import { httpClient } from "@/lib/http/client";
import z from "zod";

const createColumnSchema = z.object({
  title: z.string(),
});

interface CreateColumnProps {
  title: string;
  boardId: string;
}

async function createColumn({ title, boardId }: CreateColumnProps) {
  const data = await httpClient(`/api/board/${boardId}/column`, {
    method: "POST",
    body: JSON.stringify({ title }),
  });

  return createColumnSchema.parse(data);
}

export { createColumn, createColumnSchema };
