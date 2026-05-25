import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import { users } from ".";
import { timestamps } from "./column.helper";

const workspaces = table("workspaces", {
  id: t.uuid().primaryKey().defaultRandom().notNull(),
  title: t.text().notNull(),
  ownerId: t
    .uuid()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});

export { workspaces };
