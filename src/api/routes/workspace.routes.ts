import { Hono } from "hono";
import { WorkspaceController } from "@/api/controllers/workspace.controller";
// import { verifyAuthorization } from "@/api/middlewares/verify-authorization";
// import type { WorkspaceMemberRole } from "@/api/models/workspace-member.model";
import { WorkspaceRepository } from "@/api/repositories/workspace.repository";
import { WorkspaceService } from "@/api/services/workspace.services";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";

const workspaceRoutes = new Hono();

workspaceRoutes.use("*", ensureAuthenticated);

const workspaceRepository = new WorkspaceRepository();
const workspaceService = new WorkspaceService(workspaceRepository);
const workspaceController = new WorkspaceController(workspaceService);

workspaceRoutes.get("/", workspaceController.findByOwnerId);
workspaceRoutes.get("/:id", workspaceController.findById);
workspaceRoutes.post("/", workspaceController.create);
workspaceRoutes.put("/:id", workspaceController.update);
workspaceRoutes.delete("/:id", workspaceController.delete);

export { workspaceRoutes };
