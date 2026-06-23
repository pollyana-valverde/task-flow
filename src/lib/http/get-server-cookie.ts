import { cookies } from "next/headers";

async function getServerCookie() {
  const cookieStore = await cookies();
  return cookieStore.toString();
}

export { getServerCookie };
