import { Hono } from "hono";
import { cors } from "hono/cors";
import { errorHandler } from "@/api/middlewares/error-handler";
import { routes } from "@/api/routes";

const app = new Hono().basePath("/api");

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  }),
);

app.route("/", routes);
app.onError(errorHandler);

export { app };
