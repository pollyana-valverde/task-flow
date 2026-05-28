import * as t from "drizzle-orm/pg-core";
import { pgEnum as Enum, pgTable as table } from "drizzle-orm/pg-core";
import { users, workspaces } from ".";

const memberRoleEnum = Enum("member_role", ["owner", "admin", "member"]);

const memberStatusEnum = Enum("member_status", [
  "active",
  "pending",
  "declined",
]);

const workspaceMembers = table("workspace_members", {
  id: t.uuid().primaryKey().defaultRandom().notNull(),
  userId: t
    .uuid()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  workspaceId: t
    .uuid()
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  role: memberRoleEnum().notNull().default("member"),
  status: memberStatusEnum().notNull().default("pending"),
  joinedAt: t.timestamp().notNull().defaultNow(),
});

export { workspaceMembers, memberRoleEnum, memberStatusEnum };
