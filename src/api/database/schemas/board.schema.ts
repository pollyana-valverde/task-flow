import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import { workspaces } from ".";
import { timestamps } from "./utils/helpers";

const boards = table("boards", {
  id: t.uuid().primaryKey().defaultRandom().notNull(),
  title: t.text().notNull(),
  workspaceId: t
    .uuid()
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  ...timestamps,
});

export { boards };
