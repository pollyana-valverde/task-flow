import { Hono } from "hono";
import { ensureAuthenticated } from "@/api/middlewares/ensure-authenticated";
import { authRoutes } from "./auth.routes";

const routes = new Hono();

// Rotas públicas
routes.route("/auth", authRoutes);

// Rotas privadas
routes.use("*", ensureAuthenticated);

export { routes };
