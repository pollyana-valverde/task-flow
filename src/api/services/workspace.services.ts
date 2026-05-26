import type {
  IWorkspaceRepository,
  IWorkspaceService,
} from "@/api/contracts/workspace.contract";
import type { Workspace } from "@/api/models/workspace.model";
import { AppError } from "@/api/utils/app-error";

class WorkspaceService implements IWorkspaceService {
  constructor(private workspaceRepository: IWorkspaceRepository) {}

  async findById(id: Workspace["id"], ownerId?: Workspace["ownerId"]) {
    // Fetch the workspace by its ID
    const workspace = await this.workspaceRepository.findById(id);

    // Validate that the workspace exists
    if (!workspace) {
      throw new AppError("Workspace not found", 404);
    }

    // Ensure that the workspace belongs to the specified owner
    if (ownerId && ownerId !== workspace?.ownerId) {
      throw new AppError("You're not the owner of this workspace", 403);
    }

    return workspace;
  }

  async findByOwnerId(ownerId: Workspace["ownerId"]) {
    return this.workspaceRepository.findByOwnerId(ownerId);
  }

  async create(title: Workspace["title"], ownerId: Workspace["ownerId"]) {
    // Fetch existing workspaces
    const existingWorkspaces =
      await this.workspaceRepository.findByOwnerId(ownerId);

    // Validate if the owner already has 10 workspaces
    if (existingWorkspaces.length >= 10) {
      throw new AppError(
        "You have reached the maximum number of workspaces (10)",
        403,
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

    return createdWorkspace;
  }

  async update(
    id: Workspace["id"],
    data: Partial<Workspace>,
    ownerId: Workspace["ownerId"],
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
    const updatedWorkspace = await this.workspaceRepository.update(id, data);

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

    return await this.workspaceRepository.delete(id);
  }
}

export { WorkspaceService };
