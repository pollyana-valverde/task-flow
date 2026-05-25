import { relations } from "drizzle-orm";
import {
  accounts,
  boardColumns,
  boards,
  sessions,
  tasks,
  users,
  workspaceMembers,
  workspaces,
} from "..";

// users / auth
const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  workspaceMembers: many(workspaceMembers),
  ownedWorkspaces: many(workspaces),
  assignedTasks: many(tasks, { relationName: "assignee" }),
  createdTasks: many(tasks, { relationName: "creator" }),
  updatedTasks: many(tasks, { relationName: "updater" }),
}));

const sessionsRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

const accountsRelations = relations(accounts, ({ one }) => ({
  users: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

// workspaces
const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  owner: one(users, {
    fields: [workspaces.ownerId],
    references: [users.id],
  }),
  members: many(workspaceMembers),
  boards: many(boards),
}));

// workspaces members
const workspaceMembersRelations = relations(workspaceMembers, ({ one }) => ({
  user: one(users, {
    fields: [workspaceMembers.userId],
    references: [users.id],
  }),
  workspace: one(workspaces, {
    fields: [workspaceMembers.workspaceId],
    references: [workspaces.id],
  }),
}));

//boards
const boardsRelations = relations(boards, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [boards.workspaceId],
    references: [workspaces.id],
  }),
  columns: many(boardColumns),
}));

// board columns
const boardColumnsRelations = relations(boardColumns, ({ one, many }) => ({
  board: one(boards, {
    fields: [boardColumns.boardId],
    references: [boards.id],
  }),
  tasks: many(tasks),
}));

// tasks
const tasksRelations = relations(tasks, ({ one }) => ({
  assignee: one(workspaceMembers, {
    fields: [tasks.assigneeId],
    references: [workspaceMembers.id],
    relationName: "assignee",
  }),
  column: one(boardColumns, {
    fields: [tasks.columnId],
    references: [boardColumns.id],
  }),
  creator: one(users, {
    fields: [tasks.createdBy],
    references: [users.id],
    relationName: "creator",
  }),
  updater: one(workspaceMembers, {
    fields: [tasks.updatedBy],
    references: [workspaceMembers.id],
    relationName: "updater",
  }),
}));

export const schema = {
  users: usersRelations,
  sessions: sessionsRelations,
  accounts: accountsRelations,
  workspaces: workspacesRelations,
  workspaceMembers: workspaceMembersRelations,
  boards: boardsRelations,
  boardColumns: boardColumnsRelations,
  tasks: tasksRelations,
};
