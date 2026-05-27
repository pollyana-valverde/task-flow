import { Hono } from "hono";
import { authRoutes } from "./auth.routes";
import { workspaceRoutes } from "./workspace.routes";

const routes = new Hono();

// Rotas públicas
routes.route("/auth", authRoutes);

// Rotas privadas
routes.route("/workspace", workspaceRoutes);

export { routes };
