import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";

import { timestamps } from "./column.helper";

const users = table("users", {
  id: t.uuid().primaryKey().defaultRandom().notNull(),
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
  passwordHash: t.text().notNull(),
  ...timestamps,
});

export { users };
