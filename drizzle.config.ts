import { defineConfig } from "drizzle-kit";
import { apiEnv } from "@/api-env";

export default defineConfig({
  out: "./src/api/database/migrations",
  schema: "./src/api/database/schemas/index.ts",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: apiEnv.DATABASE_URL,
  },
});
