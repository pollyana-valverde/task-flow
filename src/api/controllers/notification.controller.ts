import type { INotificationsService } from "@/api/contracts/notification.contract";
import type { Context } from "hono";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.uuid("Invalid notification ID format"),
});

const querySchema = z.object({
  read: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => (value === undefined ? undefined : value === "true")),
});

class NotificationController {
  constructor(private notificationService: INotificationsService) {}

  findByRecipient = async (c: Context) => {
    const { id: userId } = c.get("user");
    const { read } = querySchema.parse(c.req.query());

    const notifications = await this.notificationService.findByRecipient(
      userId,
      read
    );

    return c.json(notifications, 200);
  };

  findById = async (c: Context) => {
    const { id } = paramsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    const notification = await this.notificationService.findById(id, userId);

    return c.json(notification, 200);
  };

  markAsRead = async (c: Context) => {
    const { id } = paramsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    const notification = await this.notificationService.markAsRead(id, userId);

    return c.json(notification, 200);
  };

  markAllAsRead = async (c: Context) => {
    const { id: userId } = c.get("user");

    await this.notificationService.markAllAsRead(userId);

    return c.json({ message: "All notifications marked as read" }, 200);
  };

  delete = async (c: Context) => {
    const { id } = paramsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    await this.notificationService.delete(id, userId);

    return c.json({ message: "Notification deleted" }, 200);
  };
}

export { NotificationController };
