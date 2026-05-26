import { createMiddleware } from "hono/factory";
import type { AuthSession } from "@/api/auth";
import { AppError } from "@/api/utils/app-error";
import { getMemberRole } from "@/api/utils/get-member-role";
import type { WorkspaceMemberRole } from "../models/workspace-member.model";

function verifyAuthorization(roles: WorkspaceMemberRole[]) {
  return createMiddleware<{
    Variables: {
      user: AuthSession["user"] | null;
    };
  }>(async (c, next) => {
    const user = c.get("user");
    const workspaceId = c.req.param("workspaceId");

    // verifica se o usuário está autenticado
    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    // verifica se o workspace existe
    if (!workspaceId) {
      throw new AppError("Workspace not found", 404);
    }

    // busca o role do usuário nesse workspace
    const memberRole = await getMemberRole(user.id, workspaceId);

    // usuário não é membro do workspace ou não está na lista de roles permitidos
    if (!memberRole || !roles.includes(memberRole as WorkspaceMemberRole)) {
      throw new AppError("Forbidden", 403);
    }

    await next();
  });
}

export { verifyAuthorization };
