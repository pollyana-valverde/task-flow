import { eq } from "drizzle-orm";
import type { IWorkspaceRepository } from "@/api/contracts/workspace.contract";
import { database } from "@/api/database";
import { workspaces } from "@/api/database/schemas";
import type { Workspace } from "@/api/models/workspace.model";

class WorkspaceRepository implements IWorkspaceRepository {
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
      .set({ title })
      .where(eq(workspaces.id, id))
      .returning();

    return result[0] ?? null;
  }

  async delete(id: Workspace["id"]) {
    await database.delete(workspaces).where(eq(workspaces.id, id));
    return;
  }
}

export { WorkspaceRepository };
