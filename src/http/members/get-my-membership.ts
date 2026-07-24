import { httpClient } from "@/lib/http/client";
import { getServerCookie } from "@/lib/http/get-server-cookie";
import z from "zod";

const getMyMembershipResultSchema = z.object({
  role: z.enum(["owner", "admin", "member"]),
});

async function getMyMembership({ workspaceId }: { workspaceId: string }) {
  const cookie = await getServerCookie();

  const data = await httpClient(
    `/api/workspace/${workspaceId}/member/my-membership`,
    {
      headers: { Cookie: cookie },
    }
  );

  return getMyMembershipResultSchema.parse(data);
}

export { getMyMembership, getMyMembershipResultSchema };
