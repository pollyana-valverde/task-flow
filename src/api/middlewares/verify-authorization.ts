import { createMiddleware } from "hono/factory";
import type { AuthSession } from "@/api/auth";
import type { IWorkspaceRepository } from "@/api/contracts/workspace.contract";
import type { WorkspaceMemberRole } from "@/api/models/workspace-member.model";
import { AppError } from "@/api/utils/app-error";

function verifyAuthorization(
  roles: WorkspaceMemberRole[],
  workspaceRepository: IWorkspaceRepository,
) {
  return createMiddleware<{
    Variables: {
      user: AuthSession["user"] | null;
    };
  }>(async (c, next) => {
    const user = c.get("user");
    const workspaceId = c.req.param("id");

    // verifica se o usuário está autenticado
    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    // verifica se o workspace existe
    if (!workspaceId) {
      throw new AppError("Workspace not found", 404);
    }

    // busca o role do usuário nesse workspace
    const member = await workspaceRepository.findMember(workspaceId, user.id);

    if (!member) {
      throw new AppError("Forbidden", 403);
    }

    // verifica se o usuário é membro ativo do workspace
    if (member.status !== "active") {
      throw new AppError("Forbidden", 403);
    }

    // usuário não é membro do workspace ou não está na lista de roles permitidos
    if (!member.role || !roles.includes(member.role as WorkspaceMemberRole)) {
      throw new AppError("Forbidden", 403);
    }

    await next();
  });
}

export { verifyAuthorization };
