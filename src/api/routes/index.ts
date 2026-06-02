import { Hono } from "hono";
import { authRoutes } from "./auth.routes";
import { boardRoutes } from "./board.routes";
import { workspaceRoutes } from "./workspace.routes";

const routes = new Hono();

// Rotas públicas
routes.route("/auth", authRoutes);

// Rotas privadas
routes.route("/workspace", workspaceRoutes);
routes.route("/workspace/:id/board", boardRoutes);

export { routes };
