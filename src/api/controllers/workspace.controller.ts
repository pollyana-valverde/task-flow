import type { IWorkspaceService } from "@/api/contracts/workspace.contract";
import type { WorkspaceMemberRole } from "@/api/models/workspace-member.model";
import type { Context } from "hono";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.uuid("Invalid workspace ID format"),
});

const memberParamsSchema = z.object({
  id: z.uuid(),
  uid: z.uuid(),
});

const workspaceSchema = z.object({
  title: z
    .string("Workspace title must be a string")
    .min(1, "Workspace title is required"),
});

const inviteSchema = z.object({
  email: z.email("Invalid email format"),
  role: z.enum(["admin", "member"]).optional().default("member"),
});

const notificationIdSchema = z.object({
  notificationId: z.uuid("Invalid notification ID format"),
});

const updateRoleSchema = z.object({
  role: z.enum(["admin", "member"]),
});

const transferOwnershipSchema = z.object({
  newOwnerId: z.uuid("Invalid user ID format"),
});

class WorkspaceController {
  constructor(private workspaceService: IWorkspaceService) {}

  // workspace
  findAll = async (c: Context) => {
    const { id: userId } = c.get("user");

    const workspaces = await this.workspaceService.findAll(userId);

    return c.json(workspaces, 200);
  };

  findById = async (c: Context) => {
    const { id } = paramsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    const workspace = await this.workspaceService.findById(id, userId);

    return c.json(workspace, 200);
  };

  create = async (c: Context) => {
    const body = await c.req.json();

    const { title } = workspaceSchema.parse(body);
    const { id: ownerId } = c.get("user");

    const workspace = await this.workspaceService.create(title, ownerId);

    return c.json(workspace, 201);
  };

  update = async (c: Context) => {
    const body = await c.req.json();

    const { id } = paramsSchema.parse(c.req.param());
    const { title } = workspaceSchema.parse(body);
    const { id: ownerId } = c.get("user");

    const workspace = await this.workspaceService.update(id, title, ownerId);

    return c.json(workspace, 200);
  };

  delete = async (c: Context) => {
    const { id } = paramsSchema.parse(c.req.param());
    const { id: ownerId } = c.get("user");

    await this.workspaceService.delete(id, ownerId);

    return c.json({ message: "Workspace deleted successfully" }, 200);
  };

  // workspace members
  findMyMembership = async (c: Context) => {
    const { id: workspaceId } = paramsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    const membership = await this.workspaceService.findMyMembership(
      workspaceId,
      userId
    );

    return c.json(membership, 200);
  };

  findMembers = async (c: Context) => {
    const { id: workspaceId } = paramsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    const members = await this.workspaceService.findMembers(
      workspaceId,
      userId
    );

    return c.json(members, 200);
  };

  inviteMember = async (c: Context) => {
    const { id: workspaceId } = paramsSchema.parse(c.req.param());
    const { id: inviterId } = c.get("user");

    const body = await c.req.json();
    const { email, role } = inviteSchema.parse(body);

    await this.workspaceService.inviteMember(
      workspaceId,
      email,
      role as WorkspaceMemberRole,
      inviterId
    );

    return c.json({ message: "Invite sent" }, 200);
  };

  acceptInvite = async (c: Context) => {
    const { id: workspaceId } = paramsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    const body = await c.req.json();
    const { notificationId } = notificationIdSchema.parse(body);

    await this.workspaceService.acceptInvite(
      workspaceId,
      userId,
      notificationId
    );

    return c.json({ message: "Invite accepted" }, 200);
  };

  declineInvite = async (c: Context) => {
    const { id: workspaceId } = paramsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    const body = await c.req.json();
    const { notificationId } = notificationIdSchema.parse(body);

    await this.workspaceService.declineInvite(
      workspaceId,
      userId,
      notificationId
    );

    return c.json({ message: "Invite declined" }, 200);
  };

  updateRole = async (c: Context) => {
    const { id: workspaceId, uid: memberId } = memberParamsSchema.parse(
      c.req.param()
    );
    const { id: actorId } = c.get("user");

    const body = await c.req.json();
    const { role } = updateRoleSchema.parse(body);

    await this.workspaceService.updateMemberRole(
      workspaceId,
      memberId,
      role as WorkspaceMemberRole,
      actorId
    );

    return c.json({ message: "Member role updated" }, 200);
  };

  transferOwnership = async (c: Context) => {
    const { id: workspaceId } = paramsSchema.parse(c.req.param());
    const { id: oldOwnerId } = c.get("user");

    const body = await c.req.json();
    const { newOwnerId } = transferOwnershipSchema.parse(body);

    await this.workspaceService.transferOwnership(
      workspaceId,
      oldOwnerId,
      newOwnerId
    );

    return c.json({ message: "Ownership transferred" }, 200);
  };

  exitWorkspace = async (c: Context) => {
    const { id: workspaceId } = paramsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    await this.workspaceService.exitWorkspace(workspaceId, userId);

    return c.json({ message: "Exited workspace" }, 200);
  };

  removeMember = async (c: Context) => {
    const { id: workspaceId, uid: memberId } = memberParamsSchema.parse(
      c.req.param()
    );
    const { id: actorId } = c.get("user");

    await this.workspaceService.removeMember(workspaceId, memberId, actorId);

    return c.json({ message: "Member removed from workspace" }, 200);
  };
}

export { WorkspaceController };
