import { defineConfig } from "drizzle-kit";
import { apiEnv } from "@/api-env";

export default defineConfig({
  dialect: "postgresql",
  out: "./src/api/database/migrations",
  schema: "./src/api/database/schema",
  casing: "snake_case",
  dbCredentials: {
    url: apiEnv.DATABASE_URL,
  },
});
