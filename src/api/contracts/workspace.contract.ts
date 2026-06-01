import type { User } from "@/api/models/user.model";
import type { Workspace } from "@/api/models/workspace.model";
import type {
  WorkspaceMember,
  WorkspaceMemberRole,
  WorkspaceMemberStatus,
} from "@/api/models/workspace-member.model";

interface IWorkspaceRepository {
  // workspace
  findAll(userId: User["id"]): Promise<Workspace[]>;
  findById(id: Workspace["id"]): Promise<Workspace | null>;
  findByOwnerId(ownerId: Workspace["ownerId"]): Promise<Workspace[]>;
  create(title: Workspace["title"]): Promise<Workspace>;
  update(
    id: Workspace["id"],
    title: Workspace["title"],
  ): Promise<Workspace | null>;
  delete(id: Workspace["id"]): Promise<void>;

  // workspace members
  findMembers(workspaceId: Workspace["id"]): Promise<WorkspaceMember[]>;
  findMember(
    workspaceId: Workspace["id"],
    userId: User["id"],
  ): Promise<WorkspaceMember | null>;
  addMember(
    workspaceId: Workspace["id"],
    userId: User["id"],
    status?: WorkspaceMemberStatus,
    role?: WorkspaceMemberRole,
  ): Promise<WorkspaceMember>;
  transferOwnership(
    workspaceId: Workspace["id"],
    newOwnerId: User["id"],
  ): Promise<Workspace | null>;
  updateMemberRole(
    workspaceId: Workspace["id"],
    userId: User["id"],
    role: WorkspaceMemberRole,
  ): Promise<WorkspaceMemberRole | null>;
  updateMemberStatus(
    workspaceId: Workspace["id"],
    userId: User["id"],
    status: WorkspaceMemberStatus,
  ): Promise<WorkspaceMemberStatus | null>;
  removeMember(workspaceId: Workspace["id"], userId: User["id"]): Promise<void>;
}

interface IWorkspaceService {
  // workspace
  findAll(userId: User["id"]): Promise<Workspace[]>;
  findById(
    id: Workspace["id"],
    userId: WorkspaceMember["userId"],
  ): Promise<Workspace>;
  findByOwnerId(ownerId: Workspace["ownerId"]): Promise<Workspace[]>;
  create(
    title: Workspace["title"],
    ownerId: Workspace["ownerId"],
  ): Promise<Workspace>;
  update(
    id: Workspace["id"],
    title: Workspace["title"],
    ownerId: Workspace["ownerId"],
  ): Promise<Workspace>;
  delete(id: Workspace["id"], ownerId: Workspace["ownerId"]): Promise<void>;

  // workspace members
  inviteMember(
    workspaceId: Workspace["id"],
    email: User["email"],
  ): Promise<WorkspaceMember>;
  acceptInvite(
    workspaceId: Workspace["id"],
    userId: User["id"],
  ): Promise<WorkspaceMemberStatus>;
  declineInvite(
    workspaceId: Workspace["id"],
    userId: User["id"],
  ): Promise<WorkspaceMemberStatus>;
  updateMemberRole(
    workspaceId: Workspace["id"],
    userId: User["id"],
    role: WorkspaceMemberRole,
  ): Promise<WorkspaceMemberRole>;
  transferOwnership(
    workspaceId: Workspace["id"],
    oldOwnerId: User["id"],
    newOwnerId: User["id"],
  ): Promise<Workspace | null>;
  exitWorkspace(
    workspaceId: Workspace["id"],
    userId: User["id"],
  ): Promise<void>;
  removeMember(workspaceId: Workspace["id"], userId: User["id"]): Promise<void>;
}

export type { IWorkspaceRepository, IWorkspaceService };
