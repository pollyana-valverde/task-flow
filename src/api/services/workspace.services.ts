import type {
  IWorkspaceRepository,
  IWorkspaceService,
} from "@/api/contracts/workspace.contract";
import type { User } from "@/api/models/user.model";
import type {
  WorkspaceMember,
  WorkspaceMemberRole,
  WorkspaceMemberStatus,
} from "@/api/models/workspace-member.model";
import type { Workspace } from "@/api/models/workspace.model";
import { AppError } from "@/api/utils/app-error";
import { getUserIdByEmail } from "@/api/utils/get-user-email";
import type { INotificationsService } from "../contracts/notification.contract";
import type { Notification } from "../models/notification.model";

class WorkspaceService implements IWorkspaceService {
  constructor(
    private workspaceRepository: IWorkspaceRepository,
    private notificationService: INotificationsService
  ) {}

  // workspace
  async findAll(userId: User["id"]) {
    const workspaces = await this.workspaceRepository.findAll(userId);

    if (!workspaces) {
      throw new AppError("Failed to fetch workspaces", 500);
    }

    return workspaces;
  }

  async findById(id: Workspace["id"], userId: WorkspaceMember["userId"]) {
    const workspace = await this.workspaceRepository.findById(id);

    if (!workspace) {
      throw new AppError("Workspace not found", 404);
    }

    const member = await this.workspaceRepository.findMember(id, userId);

    if (!member || member.status !== "active") {
      throw new AppError("Forbidden", 403);
    }

    return workspace;
  }

  async create(title: Workspace["title"], ownerId: Workspace["ownerId"]) {
    // Fetch existing workspaces
    const existingWorkspaces =
      await this.workspaceRepository.findByOwnerId(ownerId);

    // Validate if the owner already has 10 workspaces
    if (existingWorkspaces.length >= 10) {
      throw new AppError(
        "You have reached the maximum number of workspaces (10)",
        403
      );
    }

    // Create the workspace
    const createdWorkspace = await this.workspaceRepository.create({
      title,
      ownerId,
    });

    // Validate if the workspace was created successfully
    if (!createdWorkspace) {
      throw new AppError("Failed to create workspace", 500);
    }

    const workspaceMember = await this.workspaceRepository.addMember(
      createdWorkspace.id,
      ownerId,
      "active" as WorkspaceMemberStatus,
      "owner" as WorkspaceMemberRole
    );

    if (!workspaceMember) {
      throw new AppError("Failed to add owner to workspace", 500);
    }

    return createdWorkspace;
  }

  async update(
    id: Workspace["id"],
    title: Workspace["title"],
    ownerId: Workspace["ownerId"]
  ) {
    // Fetch the existing workspace
    const existingWorkspace = await this.workspaceRepository.findById(id);

    // Validate that the workspace exists
    if (!existingWorkspace) {
      throw new AppError("Workspace not found", 404);
    }

    // Validate that the workspace belongs to the specified owner
    if (existingWorkspace.ownerId !== ownerId) {
      throw new AppError("You're not the owner of this workspace", 403);
    }

    // Update the workspace with the provided data
    const updatedWorkspace = await this.workspaceRepository.update(id, title);

    // Validate that the workspace was updated successfully
    if (!updatedWorkspace) {
      throw new AppError("Failed to update workspace", 500);
    }

    return updatedWorkspace;
  }

  async delete(id: Workspace["id"], ownerId: Workspace["ownerId"]) {
    // Fetch the existing workspace
    const existingWorkspace = await this.workspaceRepository.findById(id);
    // Validate that the workspace exists
    if (!existingWorkspace) {
      throw new AppError("Workspace not found", 404);
    }

    // Validate that the workspace belongs to the specified owner
    if (existingWorkspace.ownerId !== ownerId) {
      throw new AppError("You're not the owner of this workspace", 403);
    }

    const members = await this.workspaceRepository.findMembers(id);
    const actor = members.find((m) => m.userId === ownerId);

    await this.workspaceRepository.delete(id);

    try {
      await this.notificationService.notifyMany(
        members.filter((m) => m.userId !== ownerId).map((m) => m.userId),
        {
          actorId: ownerId,
          type: "workspace_deleted",
          message: `${actor?.user?.name ?? "Alguém"} excluiu o workspace: ${existingWorkspace.title}`,
          taskId: null,
          boardId: null,
          workspaceId: null,
        }
      );
    } catch (error) {
      console.error("Failed to notify members of workspace deletion", error);
    }
  }

  // workspace members
  async findMyMembership(workspaceId: Workspace["id"], userId: User["id"]) {
    const member = await this.workspaceRepository.findMember(
      workspaceId,
      userId
    );

    if (!member || member.status !== "active") {
      throw new AppError("Membership not found", 404);
    }

    return { role: member.role };
  }

  async findMembers(
    workspaceId: Workspace["id"],
    userId: WorkspaceMember["userId"]
  ) {
    const member = await this.workspaceRepository.findMember(
      workspaceId,
      userId
    );

    // Check if the user is a member of the workspace
    if (!member || member.status !== "active") {
      throw new AppError("Forbidden", 403);
    }

    const members = await this.workspaceRepository.findMembers(workspaceId);

    // Validate that the members were fetched successfully
    if (!members) {
      throw new AppError("Failed to fetch workspace members", 500);
    }

    return members;
  }

  async inviteMember(
    workspaceId: Workspace["id"],
    email: User["email"],
    role: WorkspaceMemberRole,
    inviterId: User["id"]
  ) {
    const userId = await getUserIdByEmail(email);

    if (!userId) {
      throw new AppError("User not found", 404);
    }

    const existingMember = await this.workspaceRepository.findMember(
      workspaceId,
      userId
    );

    // Check if the user is already an active member of the workspace
    if (existingMember?.status === "active") {
      throw new AppError("User is already a member of this workspace", 400);
    }

    // Check if the user already has an invitation
    if (existingMember?.status === "pending") {
      throw new AppError(
        "User already has a pending invitation of this workspace",
        400
      );
    }

    const members = await this.workspaceRepository.findMembers(workspaceId);

    // Validate that the members were fetched successfully
    if (members.length >= 50) {
      throw new AppError("Workspace member limit reached", 403);
    }

    const workspaceMember = await this.workspaceRepository.addMember(
      workspaceId,
      userId,
      "pending" as WorkspaceMemberStatus,
      role
    );

    // Validate that the member was invited successfully
    if (!workspaceMember) {
      throw new AppError("Failed to invite member to workspace", 500);
    }

    try {
      const members = await this.workspaceRepository.findMembers(workspaceId);
      const inviter = members.find((m) => m.userId === inviterId);
      const workspace = await this.workspaceRepository.findById(workspaceId);

      await this.notificationService.notify({
        recipientId: userId,
        actorId: inviterId,
        type: "workspace_invite",
        message: `${inviter?.user?.name ?? "Alguém"} convidou você para um workspace: ${workspace?.title}`,
        taskId: null,
        boardId: null,
        workspaceId,
      });
    } catch (error) {
      console.error("Failed to notify invited user", error);
    }

    return workspaceMember;
  }

  private async handleInviteResponse(
    workspaceId: Workspace["id"],
    userId: User["id"],
    newStatus: WorkspaceMemberStatus,
    notificationId: Notification["id"]
  ) {
    const member = await this.workspaceRepository.findMember(
      workspaceId,
      userId
    );

    // Check if the user has a pending invitation for the workspace
    if (!member || member?.status !== "pending") {
      throw new AppError("No pending invitation found for this workspace", 404);
    }

    const updatedStatus = await this.workspaceRepository.updateMemberStatus(
      workspaceId,
      userId,
      newStatus
    );

    // Validate that the invitation was updated successfully
    if (!updatedStatus) {
      throw new AppError("Failed to update workspace invitation", 500);
    }

    try {
      await this.notificationService.delete(notificationId, userId);
    } catch (error) {
      console.error("Failed to delete invite notification", error);
    }

    return updatedStatus;
  }

  async acceptInvite(
    workspaceId: Workspace["id"],
    userId: User["id"],
    notificationId: Notification["id"]
  ) {
    return await this.handleInviteResponse(
      workspaceId,
      userId,
      "active" as WorkspaceMemberStatus,
      notificationId
    );
  }

  async declineInvite(
    workspaceId: Workspace["id"],
    userId: User["id"],
    notificationId: Notification["id"]
  ) {
    return await this.handleInviteResponse(
      workspaceId,
      userId,
      "declined" as WorkspaceMemberStatus,
      notificationId
    );
  }

  async updateMemberRole(
    workspaceId: Workspace["id"],
    userId: User["id"],
    role: WorkspaceMemberRole,
    actorId: User["id"]
  ) {
    const member = await this.workspaceRepository.findMember(
      workspaceId,
      userId
    );

    // Check if the user is a member of the workspace
    if (!member) {
      throw new AppError("User is not a member of this workspace", 404);
    }

    const updatedRole = await this.workspaceRepository.updateMemberRole(
      workspaceId,
      userId,
      role
    );

    // Validate that the role was updated successfully
    if (!updatedRole) {
      throw new AppError("Failed to update member role", 500);
    }

    if (role === "admin") {
      try {
        const members = await this.workspaceRepository.findMembers(workspaceId);
        const actor = members.find((m) => m.userId === actorId);
        const workspace = await this.workspaceRepository.findById(workspaceId);

        await this.notificationService.notify({
          recipientId: userId,
          actorId,
          type: "member_promoted",
          message: `${actor?.user?.name ?? "Alguém"} promoveu você a admin em ${workspace?.title}`,
          taskId: null,
          boardId: null,
          workspaceId,
        });
      } catch (error) {
        console.error("Failed to notify promoted member", error);
      }
    }

    if (role === "member") {
      try {
        const members = await this.workspaceRepository.findMembers(workspaceId);
        const actor = members.find((m) => m.userId === actorId);
        const workspace = await this.workspaceRepository.findById(workspaceId);

        await this.notificationService.notify({
          recipientId: userId,
          actorId,
          type: "member_promoted",
          message: `${actor?.user?.name ?? "Alguém"} rebaixou você a membro em ${workspace?.title}`,
          taskId: null,
          boardId: null,
          workspaceId,
        });
      } catch (error) {
        console.error("Failed to notify promoted member", error);
      }
    }

    return updatedRole;
  }

  async transferOwnership(
    workspaceId: Workspace["id"],
    oldOwnerId: User["id"],
    newOwnerId: User["id"]
  ) {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    // Validate that the workspace exists
    if (!workspace) {
      throw new AppError("Workspace not found", 404);
    }

    // Validate that the current user is the owner of the workspace
    if (workspace.ownerId !== oldOwnerId) {
      throw new AppError("You're not the owner of this workspace", 403);
    }

    const newOwnerMember = await this.workspaceRepository.findMember(
      workspaceId,
      newOwnerId
    );

    // Validate that the new owner is a member of the workspace
    if (!newOwnerMember || newOwnerMember.status !== "active") {
      throw new AppError(
        "New owner must be an active member of the workspace",
        400
      );
    }

    const updatedWorkspaceOwner =
      await this.workspaceRepository.transferOwnership(workspaceId, newOwnerId);

    // Validate that the ownership was transferred successfully
    if (!updatedWorkspaceOwner) {
      throw new AppError("Failed to transfer workspace ownership", 500);
    }

    // Update the roles of the old and new owners
    const updatedOldOwnerRole = await this.workspaceRepository.updateMemberRole(
      workspaceId,
      oldOwnerId,
      "admin" as WorkspaceMemberRole
    );

    if (!updatedOldOwnerRole) {
      throw new AppError("Failed to update old owner role", 500);
    }

    const updatedNewOwnerRole = await this.workspaceRepository.updateMemberRole(
      workspaceId,
      newOwnerId,
      "owner" as WorkspaceMemberRole
    );

    if (!updatedNewOwnerRole) {
      throw new AppError("Failed to update new owner role", 500);
    }

    try {
      await this.notificationService.notify({
        recipientId: newOwnerId,
        actorId: oldOwnerId,
        type: "workspace_ownership_transferred",
        message: `Você agora é o dono do workspace: ${workspace.title}`,
        taskId: null,
        boardId: null,
        workspaceId,
      });
    } catch (error) {
      console.error("Failed to notify new owner of ownership transfer", error);
    }

    return updatedWorkspaceOwner;
  }

  async exitWorkspace(workspaceId: Workspace["id"], userId: User["id"]) {
    const member = await this.workspaceRepository.findMember(
      workspaceId,
      userId
    );

    // Check if the user is a member of the workspace
    if (!member) {
      throw new AppError("You are not a member of this workspace", 404);
    }

    // Prevent removing the owner from the workspace
    if (member.role === "owner") {
      throw new AppError(
        "You need to transfer ownership before exiting the workspace",
        403
      );
    }

    const members = await this.workspaceRepository.findMembers(workspaceId);
    const leavingMember = members.find((m) => m.userId === userId);

    const result = await this.workspaceRepository.removeMember(
      workspaceId,
      userId
    );

    try {
      await this.notificationService.notifyMany(
        members.filter((m) => m.userId !== userId).map((m) => m.userId),
        {
          actorId: userId,
          type: "workspace_member_left",
          message: `${leavingMember?.user?.name ?? "Alguém"} saiu do workspace`,
          taskId: null,
          boardId: null,
          workspaceId,
        }
      );
    } catch (error) {
      console.error(
        "Failed to notify members of user leaving workspace",
        error
      );
    }

    return result;
  }

  async removeMember(
    workspaceId: Workspace["id"],
    userId: User["id"],
    actorId: User["id"]
  ) {
    const member = await this.workspaceRepository.findMember(
      workspaceId,
      userId
    );

    // Check if the user is a member of the workspace
    if (!member) {
      throw new AppError("User is not a member of this workspace", 404);
    }

    const workspace = await this.workspaceRepository.findById(workspaceId);
    const result = await this.workspaceRepository.removeMember(
      workspaceId,
      userId
    );

    try {
      await this.notificationService.notify({
        recipientId: userId,
        actorId,
        type: "workspace_member_removed",
        message: `Você foi removido do workspace: ${workspace?.title}`,
        taskId: null,
        boardId: null,
        workspaceId: null,
      });
    } catch (error) {
      console.error("Failed to notify removed member", error);
    }

    return result;
  }
}

export { WorkspaceService };
