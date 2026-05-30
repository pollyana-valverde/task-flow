import { createMiddleware } from "hono/factory";
import { type AuthSession, auth } from "@/api/auth";
import { AppError } from "@/api/utils/app-error";

const ensureAuthenticated = createMiddleware<{
  Variables: {
    user: AuthSession["user"] | null;
    session: AuthSession["session"] | null;
  };
}>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session?.user || !session) {
    throw new AppError("Unauthorized", 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);

  await next();
});

export { ensureAuthenticated };
