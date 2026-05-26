import { Hono } from "hono";
import { cors } from "hono/cors";

import { routes } from "./routes";

const app = new Hono().basePath("/api");

app.use("*", cors({ origin: "http://localhost:3000" }));

app.route("/", routes);

export { app };
