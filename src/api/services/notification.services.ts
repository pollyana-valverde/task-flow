// src/api/services/notification.services.ts
import type {
    CreateNotificationInput,
    INotificationsRepository,
    INotificationsService,
} from "@/api/contracts/notification.contract";
import type { Notification } from "@/api/models/notification.model";
import { AppError } from "../utils/app-error";

class NotificationService implements INotificationsService {
  constructor(private notificationRepository: INotificationsRepository) {}

  async findByRecipient(recipientId: string, read?: boolean): Promise<Notification[]> {
    return this.notificationRepository.findByRecipient(recipientId, read);
  }

  async markAsRead(id: string, userId: string): Promise<Notification> {
    const updated = await this.notificationRepository.markAsRead(id, userId);

    if (!updated) {
      throw new AppError("Notification not found", 404);
    }

    return updated;
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.markAllAsRead(userId);
  }

  async notify(data: CreateNotificationInput): Promise<Notification> {
    return this.notificationRepository.create(data);
  }

  async notifyMany(
    recipientIds: string[],
    data: Omit<CreateNotificationInput, "recipientId">,
  ): Promise<Notification[]> {
    if (recipientIds.length === 0) return [];

    return this.notificationRepository.createMany(
      recipientIds.map((recipientId) => ({ ...data, recipientId })),
    );
  }
}

export { NotificationService };
