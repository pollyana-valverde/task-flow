import type {
    CreateNotificationInput,
    INotificationsRepository,
} from "@/api/contracts/notification.contract";
import { database } from "@/api/database";
import { notifications } from "@/api/database/schemas";
import type { Notification } from "@/api/models/notification.model";
import { and, eq } from "drizzle-orm";

class NotificationRepository implements INotificationsRepository {
  async create(data: CreateNotificationInput) {
    const result = await database.insert(notifications).values(data).returning();
    return result[0] as Notification;
  }

  async createMany(data: CreateNotificationInput[]) {
    if (data.length === 0) return [];
    const result = await database.insert(notifications).values(data).returning();
    return result as Notification[];
  }

  async findByRecipient(recipientId: string, read?: boolean) {
    const conditions = [eq(notifications.recipientId, recipientId)];
    if (read !== undefined) conditions.push(eq(notifications.read, read));

    return (await database
      .select()
      .from(notifications)
      .where(and(...conditions))
      .orderBy(notifications.createdAt)) as Notification[];
  }

  async markAsRead(id: string, recipientId: string) {
    const result = await database
      .update(notifications)
      .set({ read: true, updatedAt: new Date() })
      .where(and(eq(notifications.id, id), eq(notifications.recipientId, recipientId)))
      .returning();

    return (result[0] as Notification) ?? null;
  }

  async markAllAsRead(recipientId: string) {
    await database
      .update(notifications)
      .set({ read: true, updatedAt: new Date() })
      .where(and(eq(notifications.recipientId, recipientId), eq(notifications.read, false)));
  }
}

export { NotificationRepository };
