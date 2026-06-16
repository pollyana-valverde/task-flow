import { z } from "zod";

const apiEnvSchema = z.object({
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),
  GOOGLE_CLIENT_ID: z.string().min(32),
  GOOGLE_CLIENT_SECRET: z.string().min(32),
  GOOGLE_REDIRECT_URI: z.url(),
});

export const apiEnv = apiEnvSchema.parse(process.env);
