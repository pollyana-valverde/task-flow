import { and, eq } from "drizzle-orm";
import { database } from "../database";
import { workspaceMembers } from "../database/schemas";

async function getMemberRole(userId: string, workspaceId: string) {
  const member = await database
    .select({ role: workspaceMembers.role })
    .from(workspaceMembers)
    .where(
      and(
        eq(workspaceMembers.userId, userId),
        eq(workspaceMembers.workspaceId, workspaceId),
      ),
    )
    .limit(1);

  return member[0]?.role ?? null;
}

export { getMemberRole };
