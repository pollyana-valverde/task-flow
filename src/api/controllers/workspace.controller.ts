import type { Context } from "hono";
import { z } from "zod";
import type { IWorkspaceService } from "@/api/contracts/workspace.contract";

const paramsSchema = z.object({
  id: z.uuid("Invalid workspace ID format"),
});

const bodySchema = z.object({
  title: z
    .string("Workspace title must be a string")
    .min(1, "Workspace title is required"),
});

class WorkspaceController {
  constructor(private workspaceService: IWorkspaceService) {}

  findById = async (c: Context) => {
    const { id } = paramsSchema.parse(c.req.param());
    const { id: ownerId } = c.get("user");

    const workspace = await this.workspaceService.findById(id, ownerId);

    return c.json(workspace, 200);
  };

  findByOwnerId = async (c: Context) => {
    const { id: ownerId } = c.get("user");

    const workspaces = await this.workspaceService.findByOwnerId(ownerId);

    return c.json(workspaces, 200);
  };

  create = async (c: Context) => {
    const body = await c.req.json();

    const { title } = bodySchema.parse(body);
    const { id: ownerId } = c.get("user");

    const workspace = await this.workspaceService.create(title, ownerId);

    return c.json(workspace, 201);
  };

  update = async (c: Context) => {
    const body = await c.req.json();

    const { id } = paramsSchema.parse(c.req.param());
    const { title } = bodySchema.parse(body);
    const { id: ownerId } = c.get("user");

    const workspace = await this.workspaceService.update(
      id,
      { title },
      ownerId,
    );

    return c.json(workspace, 200);
  };

  delete = async (c: Context) => {
    const { id } = paramsSchema.parse(c.req.param());
    const { id: ownerId } = c.get("user");

    await this.workspaceService.delete(id, ownerId);

    return c.json({ message: "Workspace deleted successfully" }, 200);
  };
}

export { WorkspaceController };
