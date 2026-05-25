import { z } from "zod";

const apiEnvSchema = z.object({
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),
});

export const apiEnv = apiEnvSchema.parse(process.env);
