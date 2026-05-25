import * as t from "drizzle-orm/pg-core";
import { pgEnum as Enum, pgTable as table } from "drizzle-orm/pg-core";
import { boardColumns, users, workspaceMembers } from ".";
import { timestamps } from "./column.helper";

const taskPriorityEnum = Enum("task_priority", [
  "low",
  "medium",
  "high",
  "urgent",
]);

const tasks = table("tasks", {
  id: t.uuid().primaryKey().defaultRandom().notNull(),
  title: t.text().notNull(),
  description: t.text(),
  priority: taskPriorityEnum().notNull().default("medium"),
  assigneeId: t
    .uuid()
    .references(() => workspaceMembers.id, { onDelete: "set null" }),
  columnId: t
    .uuid()
    .notNull()
    .references(() => boardColumns.id, { onDelete: "cascade" }),
  dueDate: t.timestamp(),
  createdBy: t
    .uuid()
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  updatedBy: t
    .uuid()
    .references(() => workspaceMembers.id, { onDelete: "set null" }),
  ...timestamps,
});

export { tasks, taskPriorityEnum };
