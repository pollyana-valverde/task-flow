import { hash as bHash, compare } from "bcrypt";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { database } from "@/api/database";

import { apiEnv } from "@/api-env";

const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      minLength: 8,
      hash: async (password) => bHash(password, 12),
      verify: async ({ password, hash }) => compare(password, hash),
    },
  },
  rateLimit: {
    enabled: true,
    window: 60 * 15, // 15 minutes
    max: 5, // Max 5 attempts per window
  },
  trustedOrigins: [apiEnv.BETTER_AUTH_URL],
  advanced: {
    database: {
      generateId: false,
    },
  },
});

type AuthSession = typeof auth.$Infer.Session;

export { auth, type AuthSession };
