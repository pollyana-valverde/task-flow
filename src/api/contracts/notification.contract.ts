import type { Notification } from "@/api/models/notification.model";

type CreateNotificationInput = Omit<Notification,
 "id" | "read" | "createdAt" | "updatedAt">
;

interface INotificationsRepository {
  create(data: CreateNotificationInput): Promise<Notification>;
  createMany(data: CreateNotificationInput[]): Promise<Notification[]>;
  findByRecipient(
    recipientId: Notification["recipientId"],
    read?: Notification["read"],
  ): Promise<Notification[]>;
  markAsRead(
    id: Notification["id"],
    recipientId: Notification["recipientId"],
  ): Promise<Notification | null>;
  markAllAsRead(recipientId: Notification["recipientId"]): Promise<void>;
}

interface INotificationsService {
  findByRecipient(
    recipientId: Notification["recipientId"],
    read?: Notification["read"],
  ): Promise<Notification[]>;
  markAsRead(
    id: Notification["id"],
    userId: Notification["recipientId"],
  ): Promise<Notification>;
  markAllAsRead(userId: Notification["recipientId"]): Promise<void>;
  notify(data: CreateNotificationInput): Promise<Notification>;
  notifyMany(
    recipientIds: Notification["recipientId"][],
    data: Omit<CreateNotificationInput, "recipientId">,
  ): Promise<Notification[]>;
}

export type { CreateNotificationInput, INotificationsRepository, INotificationsService };
