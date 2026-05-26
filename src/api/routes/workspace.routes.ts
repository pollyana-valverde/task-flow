import { Hono } from "hono";
import { WorkspaceController } from "../controllers/workspace.controller";
import { verifyAuthorization } from "../middlewares/verify-authorization";
import type { WorkspaceMemberRole } from "../models/workspace-member.model";
import { WorkspaceRepository } from "../repositories/workspace.repository";
import { WorkspaceService } from "../services/workspace.services";

const workspaceRoutes = new Hono();

const workspaceRepository = new WorkspaceRepository();
const workspaceService = new WorkspaceService(workspaceRepository);
const workspaceController = new WorkspaceController(workspaceService);

workspaceRoutes.get(
  "/:ownerId",
  verifyAuthorization(["owner"] as WorkspaceMemberRole[]),
  workspaceController.findByOwnerId,
);

export { workspaceRoutes };
