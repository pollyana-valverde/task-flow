import { createAuthClient } from "better-auth/react";
import { clientEnv } from "@/client-env";

const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_API_URL,
});

export { authClient };
