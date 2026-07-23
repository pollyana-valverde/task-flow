import * as t from "drizzle-orm/pg-core";
import { pgEnum as Enum, pgTable as table } from "drizzle-orm/pg-core";
import { boards, tasks, users, workspaces } from ".";
import { timestamps } from "./utils/helpers";

const notificationTypeEnum = Enum("notification_type", [
  "task_due",
  "workspace_invite",
  "task_assigned",
  "task_moved",
  "task_deleted",
  "board_created",
  "board_deleted",
  "workspace_deleted",
  "member_promoted",
]);

const notifications = table(
  "notifications",
  {
    id: t.uuid().primaryKey().defaultRandom().notNull(),
    recipientId: t.uuid().notNull().references(() => users.id, { onDelete: "cascade" }),
    actorId: t.uuid().references(() => users.id, { onDelete: "set null" }),
    type: notificationTypeEnum().notNull(),
    message: t.text().notNull(),
    read: t.boolean().notNull().default(false),
    taskId: t.uuid().references(() => tasks.id, { onDelete: "set null" }),
    boardId: t.uuid().references(() => boards.id, { onDelete: "set null" }),
    workspaceId: t.uuid().references(() => workspaces.id, { onDelete: "set null" }),
    ...timestamps,
  },
  (table) => [
    t.index("notifications_recipientId_idx").on(table.recipientId),
    t.index("notifications_recipientId_read_idx").on(table.recipientId, table.read),
  ],
);

export { notifications, notificationTypeEnum };
