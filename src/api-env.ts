import { z } from "zod";

const apiEnvSchema = z.object({
  DATABASE_URL: z.url(),
});

export const apiEnv = apiEnvSchema.parse(process.env);
