import type { Context } from "hono";
import { z } from "zod";
import type { IWorkspaceService } from "@/api/contracts/workspace.contract";

const paramsSchema = z.object({
  id: z.uuid("Invalid workspace ID format"),
});

const bodySchema = z.object({
  title: z.string().min(1, "Workspace name is required"),
});

class WorkspaceController {
  constructor(private workspaceService: IWorkspaceService) {}

  async findById(c: Context) {
    const { id } = paramsSchema.parse(c.req.param());
    const { id: ownerId } = c.get("user");

    const workspace = await this.workspaceService.findById(id, ownerId);

    return c.json(workspace, 200);
  }

  async findByOwnerId(c: Context) {
    const { id: ownerId } = c.get("user");

    const workspaces = await this.workspaceService.findByOwnerId(ownerId);

    return c.json(workspaces, 200);
  }

  async create(c: Context) {
    const { title } = bodySchema.parse(c.req.json());
    const { id: ownerId } = c.get("user");

    const workspace = await this.workspaceService.create(title, ownerId);

    return c.json(workspace, 201);
  }

  async update(c: Context) {
    const { id } = paramsSchema.parse(c.req.param());
    const { title } = bodySchema.parse(c.req.json());
    const { id: ownerId } = c.get("user");

    const workspace = await this.workspaceService.update(
      id,
      { title },
      ownerId,
    );

    return c.json(workspace, 200);
  }

  async delete(c: Context) {
    const { id } = paramsSchema.parse(c.req.param());
    const { id: ownerId } = c.get("user");

    await this.workspaceService.delete(id, ownerId);

    return c.json({ message: "Workspace deleted successfully" }, 200);
  }
}

export { WorkspaceController };
