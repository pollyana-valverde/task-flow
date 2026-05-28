import { Hono } from "hono";
import { WorkspaceController } from "@/api/controllers/workspace.controller";
import { verifyAuthorization } from "@/api/middlewares/verify-authorization";
import type { WorkspaceMemberRole } from "@/api/models/workspace-member.model";
import { WorkspaceRepository } from "@/api/repositories/workspace.repository";
import { WorkspaceService } from "@/api/services/workspace.services";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";

const workspaceRoutes = new Hono();

workspaceRoutes.use("*", ensureAuthenticated);

const workspaceRepository = new WorkspaceRepository();
const workspaceService = new WorkspaceService(workspaceRepository);
const workspaceController = new WorkspaceController(workspaceService);

// workspace
workspaceRoutes.get("/", workspaceController.findByOwnerId);
workspaceRoutes.get(
  "/:id",
  verifyAuthorization(
    ["owner", "admin", "member"] as WorkspaceMemberRole[],
    workspaceRepository,
  ),
  workspaceController.findById,
);
workspaceRoutes.post("/", workspaceController.create);
workspaceRoutes.patch(
  "/:id",
  verifyAuthorization(["owner"] as WorkspaceMemberRole[], workspaceRepository),
  workspaceController.update,
);
workspaceRoutes.delete(
  "/:id",
  verifyAuthorization(["owner"] as WorkspaceMemberRole[], workspaceRepository),
  workspaceController.delete,
);

// workspace members
workspaceRoutes.post(
  "/:id/invite",
  verifyAuthorization(
    ["owner", "admin"] as WorkspaceMemberRole[],
    workspaceRepository,
  ),
  workspaceController.inviteMember,
);
workspaceRoutes.post("/:id/invite/accept", workspaceController.acceptInvite);
workspaceRoutes.post("/:id/invite/decline", workspaceController.declineInvite);
workspaceRoutes.patch(
  "/:id/members/:uid/role",
  verifyAuthorization(["owner"] as WorkspaceMemberRole[], workspaceRepository),
  workspaceController.updateRole,
);
workspaceRoutes.delete(
  "/:id/members/:uid",
  verifyAuthorization(["owner"] as WorkspaceMemberRole[], workspaceRepository),
  workspaceController.removeMember,
);

export { workspaceRoutes };
