import { httpClient } from "@/lib/http/client";
import z from "zod";

const createWorkspaceSchema = z.object({
  title: z.string(),
});

async function createWorkspace({ title }: { title: string }) {
  const data = await httpClient("/api/workspace", {
    method: "POST",
    body: JSON.stringify({ title }),
  });

  return createWorkspaceSchema.parse(data);
}

export { createWorkspace, createWorkspaceSchema };
