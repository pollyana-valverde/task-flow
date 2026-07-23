type NotificationType =
  | "task_due"
  | "workspace_invite"
  | "task_assigned"
  | "task_moved"
  | "task_deleted"
  | "board_created"
  | "board_deleted"
  | "workspace_deleted"
  | "member_promoted";

interface Notification {
  id: string;
  recipientId: string;
  actorId: string | null;
  type: NotificationType;
  message: string;
  read: boolean;
  taskId: string | null;
  boardId: string | null;
  workspaceId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type { Notification, NotificationType };
