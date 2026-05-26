import type { Workspace } from "@/api/models/workspace.model";

interface IWorkspaceRepository {
  findById(id: Workspace["id"]): Promise<Workspace | null>;
  findByOwnerId(ownerId: Workspace["ownerId"]): Promise<Workspace[]>;
  create(
    data: Omit<Workspace, "id" | "createdAt" | "updatedAt">,
  ): Promise<Workspace>;
  update(
    id: Workspace["id"],
    data: Partial<Workspace>,
  ): Promise<Workspace | null>;
  delete(id: Workspace["id"]): Promise<void>;
}

interface IWorkspaceService {
  findById(
    id: Workspace["id"],
    ownerId: Workspace["ownerId"],
  ): Promise<Workspace>;
  findByOwnerId(ownerId: Workspace["ownerId"]): Promise<Workspace[]>;
  create(
    title: Workspace["title"],
    ownerId: Workspace["ownerId"],
  ): Promise<Workspace>;
  update(
    id: Workspace["id"],
    data: Partial<Workspace>,
    ownerId: Workspace["ownerId"],
  ): Promise<Workspace>;
  delete(id: Workspace["id"], ownerId: Workspace["ownerId"]): Promise<void>;
}

export type { IWorkspaceRepository, IWorkspaceService };
