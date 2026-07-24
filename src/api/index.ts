import { apiEnv } from "@/api-env";
import { errorHandler } from "@/api/middlewares/error-handler";
import { routes } from "@/api/routes";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api");

app.use(
  "*",
  cors({
    origin: apiEnv.BETTER_AUTH_URL,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  }),
);

app.route("/", routes);
app.onError(errorHandler);

export { app };
