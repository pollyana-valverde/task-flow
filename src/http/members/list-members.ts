import { httpClient } from "@/lib/http/client";
import { getServerCookie } from "@/lib/http/get-server-cookie";
import z from "zod";

const listMembersResultSchema = z.array(
  z.object({
    id: z.uuid(),
    userId: z.uuid(),
    workspaceId: z.uuid(),
    role: z.enum(["member", "admin", "owner"]),
    joinedAt: z.coerce.date(),
    status: z.enum(["active", "pending", "declined"]),
    user: z.object({
      name: z.string(),
      email: z.email(),
      image: z.url().nullable(),
    }),
  }),
);

async function listMembers({ workspaceId }: { workspaceId: string }) {
  const cookie = await getServerCookie();

  const data = await httpClient(`/api/workspace/${workspaceId}/member`, {
    headers: { Cookie: cookie },
  });

  return listMembersResultSchema.parse(data);
}

export { listMembers, listMembersResultSchema };
