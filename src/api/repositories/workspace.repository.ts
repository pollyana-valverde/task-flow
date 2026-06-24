import { and, count, eq, getTableColumns, inArray } from "drizzle-orm";
import type { IWorkspaceRepository } from "@/api/contracts/workspace.contract";
import { database } from "@/api/database";
import {
  boards,
  users,
  workspaceMembers,
  workspaces,
} from "@/api/database/schemas";
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
    //workspaces com contagem
    const result = await database
      .select({
        ...getTableColumns(workspaces),
      })
      .from(workspaces)
      .innerJoin(
        workspaceMembers,
        eq(workspaceMembers.workspaceId, workspaces.id),
      )
      .where(eq(workspaceMembers.userId, userId));

    if (!result.length) return [];

    //membros dos workspaces encontrados
    const workspaceIds = result.map((workspace) => workspace.id);

    const membersCount = await database
      .select({
        workspaceId: workspaceMembers.workspaceId,
        value: count(workspaceMembers.id),
      })
      .from(workspaceMembers)
      .where(inArray(workspaceMembers.workspaceId, workspaceIds))
      .groupBy(workspaceMembers.workspaceId);

    const boardsCount = await database
      .select({
        workspaceId: boards.workspaceId,
        value: count(boards.id),
      })
      .from(boards)
      .where(inArray(boards.workspaceId, workspaceIds))
      .groupBy(boards.workspaceId);

    const members = await database
      .select({
        workspaceId: workspaceMembers.workspaceId,
        userId: users.id,
        name: users.name,
        image: users.image,
        role: workspaceMembers.role,
      })
      .from(workspaceMembers)
      .innerJoin(users, eq(users.id, workspaceMembers.userId))
      .where(inArray(workspaceMembers.workspaceId, workspaceIds));

    return result.map((workspace) => ({
      ...workspace,
      membersCount:
        membersCount.find((member) => member.workspaceId === workspace.id)
          ?.value ?? 0,
      boardsCount:
        boardsCount.find((board) => board.workspaceId === workspace.id)
          ?.value ?? 0,
      members: members.filter((member) => member.workspaceId === workspace.id),
    }));
  }

  async findById(id: Workspace["id"]) {
    const [workspace] = await database
      .select({
        ...getTableColumns(workspaces),
      })
      .from(workspaces)
      .where(eq(workspaces.id, id))
      .limit(1);

    if (!workspace) return null;

    const [membersCount] = await database
      .select({ value: count(workspaceMembers.id) })
      .from(workspaceMembers)
      .where(eq(workspaceMembers.workspaceId, id));

    const [boardsCount] = await database
      .select({ value: count(boards.id) })
      .from(boards)
      .where(eq(boards.workspaceId, id));

    return {
      ...workspace,
      membersCount: membersCount.value,
      boardsCount: boardsCount.value,
    };
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
