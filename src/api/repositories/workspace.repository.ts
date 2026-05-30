import { and, eq } from "drizzle-orm";
import type { IWorkspaceRepository } from "@/api/contracts/workspace.contract";
import { database } from "@/api/database";
import { workspaceMembers, workspaces } from "@/api/database/schemas";
import type { User } from "@/api/models/user.model";
import type { Workspace } from "@/api/models/workspace.model";
import type {
  WorkspaceMember,
  WorkspaceMemberRole,
  WorkspaceMemberStatus,
} from "@/api/models/workspace-member.model";

class WorkspaceRepository implements IWorkspaceRepository {
  // workspace
  async findAll(userId: User["id"]) {
    const result = await database
      .select()
      .from(workspaces)
      .innerJoin(
        workspaceMembers,
        eq(workspaceMembers.workspaceId, workspaces.id),
      )
      .where(eq(workspaceMembers.userId, userId));

    return result.map((row) => row.workspaces);
  }

  async findById(id: Workspace["id"]) {
    const result = await database
      .select()
      .from(workspaces)
      .where(eq(workspaces.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async findByOwnerId(ownerId: Workspace["ownerId"]) {
    return database
      .select()
      .from(workspaces)
      .where(eq(workspaces.ownerId, ownerId));
  }

  async create(data: Omit<Workspace, "id" | "createdAt" | "updatedAt">) {
    const result = await database.insert(workspaces).values(data).returning();

    return result[0];
  }

  async update(id: Workspace["id"], title: Workspace["title"]) {
    const result = await database
      .update(workspaces)
      .set({ title, updatedAt: new Date() })
      .where(eq(workspaces.id, id))
      .returning();

    return result[0] ?? null;
  }

  async delete(id: Workspace["id"]) {
    await database.delete(workspaces).where(eq(workspaces.id, id));
    return;
  }

  // workspace members
  async findMembers(workspaceId: Workspace["id"]) {
    const result = await database
      .select()
      .from(workspaceMembers)
      .where(eq(workspaceMembers.workspaceId, workspaceId));

    return result as WorkspaceMember[];
  }

  async findMember(workspaceId: Workspace["id"], userId: User["id"]) {
    const result = await database
      .select()
      .from(workspaceMembers)
      .where(
        and(
          eq(workspaceMembers.workspaceId, workspaceId),
          eq(workspaceMembers.userId, userId),
        ),
      );

    return (result[0] as WorkspaceMember) ?? null;
  }

  async addMember(
    workspaceId: Workspace["id"],
    userId: User["id"],
    status?: WorkspaceMemberStatus,
    role?: WorkspaceMemberRole,
  ) {
    const result = await database
      .insert(workspaceMembers)
      .values({
        workspaceId,
        userId,
        status: status ?? "pending",
        role: role ?? "member",
      })
      .returning();

    return result[0] as WorkspaceMember;
  }

  async transferOwnership(
    workspaceId: Workspace["id"],
    newOwnerId: User["id"],
  ) {
    const result = await database
      .update(workspaces)
      .set({ ownerId: newOwnerId, updatedAt: new Date() })
      .where(eq(workspaces.id, workspaceId))
      .returning();

    return result[0] ?? null;
  }

  async updateMemberRole(
    workspaceId: Workspace["id"],
    userId: User["id"],
    role: WorkspaceMemberRole,
  ) {
    const result = await database
      .update(workspaceMembers)
      .set({ role })
      .where(
        and(
          eq(workspaceMembers.workspaceId, workspaceId),
          eq(workspaceMembers.userId, userId),
        ),
      )
      .returning({ role: workspaceMembers.role });

    return (result[0]?.role as WorkspaceMemberRole) ?? null;
  }

  async updateMemberStatus(
    workspaceId: Workspace["id"],
    userId: User["id"],
    status: WorkspaceMemberStatus,
  ) {
    const result = await database
      .update(workspaceMembers)
      .set({ status })
      .where(
        and(
          eq(workspaceMembers.workspaceId, workspaceId),
          eq(workspaceMembers.userId, userId),
        ),
      )
      .returning({ status: workspaceMembers.status });

    return (result[0]?.status as WorkspaceMemberStatus) ?? null;
  }

  async removeMember(workspaceId: Workspace["id"], userId: User["id"]) {
    await database
      .delete(workspaceMembers)
      .where(
        and(
          eq(workspaceMembers.workspaceId, workspaceId),
          eq(workspaceMembers.userId, userId),
        ),
      );
    return;
  }
}

export { WorkspaceRepository };
