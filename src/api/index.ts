import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api");

app.use("*", cors({ origin: "http://localhost:3000" }));

export { app };
