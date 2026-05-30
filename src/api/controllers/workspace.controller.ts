import type { Context } from "hono";
import { z } from "zod";
import type { IWorkspaceService } from "@/api/contracts/workspace.contract";
import type { WorkspaceMemberRole } from "@/api/models/workspace-member.model";

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

  findByOwnerId = async (c: Context) => {
    const { id: ownerId } = c.get("user");

    const workspaces = await this.workspaceService.findByOwnerId(ownerId);

    return c.json(workspaces, 200);
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
  inviteMember = async (c: Context) => {
    const { id: workspaceId } = paramsSchema.parse(c.req.param());

    const body = await c.req.json();
    const { email } = inviteSchema.parse(body);

    await this.workspaceService.inviteMember(workspaceId, email);

    return c.json({ message: "Invite sent" }, 200);
  };

  acceptInvite = async (c: Context) => {
    const { id: workspaceId } = paramsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    await this.workspaceService.acceptInvite(workspaceId, userId);

    return c.json({ message: "Invite accepted" }, 200);
  };

  declineInvite = async (c: Context) => {
    const { id: workspaceId } = paramsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    await this.workspaceService.declineInvite(workspaceId, userId);

    return c.json({ message: "Invite declined" }, 200);
  };

  updateRole = async (c: Context) => {
    const { id: workspaceId, uid: memberId } = memberParamsSchema.parse(
      c.req.param(),
    );

    const body = await c.req.json();
    const { role } = updateRoleSchema.parse(body);

    await this.workspaceService.updateMemberRole(
      workspaceId,
      memberId,
      role as WorkspaceMemberRole,
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
      newOwnerId,
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
      c.req.param(),
    );

    await this.workspaceService.removeMember(workspaceId, memberId);

    return c.json({ message: "Member removed from workspace" }, 200);
  };
}

export { WorkspaceController };
