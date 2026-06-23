import { clientEnv } from "@/client-env";
import { ApiError } from "./api-error";

async function httpClient(
  path: string,
  options: RequestInit = {},
): Promise<unknown> {
  const url = new URL(path, clientEnv.NEXT_PUBLIC_API_URL);

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(response.status, body);
  }

  return response.status === 204 ? null : response.json();
}

export { httpClient };
