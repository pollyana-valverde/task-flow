import { eq } from "drizzle-orm";
import { database } from "../database";
import { users } from "../database/schemas";

async function getUserIdByEmail(email: string) {
  const user = await database
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user[0]?.id ?? null;
}

export { getUserIdByEmail };
