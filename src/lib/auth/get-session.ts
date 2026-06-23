import { auth } from "@/api/auth";
import { headers } from "next/headers";
import { cache } from "react";

const getSession = cache(async () => {
  return await auth.api.getSession({ headers: await headers() });
});

export { getSession };
