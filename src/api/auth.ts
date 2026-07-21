import { database } from "@/api/database";
import { hash as bHash, compare } from "bcrypt";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { apiEnv } from "@/api-env";

const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg",
    usePlural: true,
  }),
  user: {
    deleteUser: {
      enabled: true,
    }
  },
  emailAndPassword: {
    enabled: true,
    password: {
      minLength: 8,
      hash: async (password) => bHash(password, 12),
      verify: async ({ password, hash }) => compare(password, hash),
    },
  },
  rateLimit: {
    enabled: false,
    // window: 60 * 15, // 15 minutes
    // max: 5, // Max 5 attempts per window
  },
  trustedOrigins: [apiEnv.BETTER_AUTH_URL],
  baseURL: apiEnv.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: apiEnv.GOOGLE_CLIENT_ID,
      clientSecret: apiEnv.GOOGLE_CLIENT_SECRET,
      redirectUri: apiEnv.GOOGLE_REDIRECT_URI,
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
});

type AuthSession = typeof auth.$Infer.Session;

export { auth, type AuthSession };
