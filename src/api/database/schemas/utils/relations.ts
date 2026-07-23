import { relations } from "drizzle-orm";
import {
  accounts,
  boardColumns,
  boards,
  notifications,
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
  receivedNotifications: many(notifications, { relationName: "recipient" }),
  triggeredNotifications: many(notifications, { relationName: "actor" }),
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
   notifications: many(notifications),
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
   notifications: many(notifications),
}));

// board columns
const boardColumnsRelations = relations(boardColumns, ({ one, many }) => ({
  boards: one(boards, {
    fields: [boardColumns.boardId],
    references: [boards.id],
  }),
  tasks: many(tasks),
}));

// tasks
const tasksRelations = relations(tasks, ({ one, many }) => ({
  assignee: one(users, {
    fields: [tasks.assigneeId],
    references: [users.id],
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
  updater: one(users, {
    fields: [tasks.updatedBy],
    references: [users.id],
    relationName: "updater",
  }),
  notifications: many(notifications),
}));

// notifications
const notificationsRelations = relations(notifications, ({ one }) => ({
  recipient: one(users, {
    fields: [notifications.recipientId],
    references: [users.id],
    relationName: "recipient",
  }),
  actor: one(users, {
    fields: [notifications.actorId],
    references: [users.id],
    relationName: "actor",
  }),
  task: one(tasks, {
    fields: [notifications.taskId],
    references: [tasks.id],
  }),
  board: one(boards, {
    fields: [notifications.boardId],
    references: [boards.id],
  }),
  workspace: one(workspaces, {
    fields: [notifications.workspaceId],
    references: [workspaces.id],
  }),
}));

export {
  accountsRelations, boardColumnsRelations, boardsRelations, notificationsRelations, sessionsRelations, tasksRelations, usersRelations, workspaceMembersRelations, workspacesRelations
};

