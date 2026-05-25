import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import { boards } from ".";
import { timestamps } from "./column.helper";

const boardColumns = table("board_columns", {
  id: t.uuid().primaryKey().defaultRandom().notNull(),
  title: t.text().notNull(),
  boardId: t
    .uuid()
    .notNull()
    .references(() => boards.id, { onDelete: "cascade" }),
  ...timestamps,
});

export { boardColumns };
