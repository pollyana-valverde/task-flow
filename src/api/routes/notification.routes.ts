import { NotificationController } from "@/api/controllers/notification.controller";
import { ensureAuthenticated } from "@/api/middlewares/ensure-authenticated";
import { NotificationRepository } from "@/api/repositories/notification.repository";
import { NotificationService } from "@/api/services/notification.services";
import { Hono } from "hono";

const notificationRoutes = new Hono();

notificationRoutes.use("*", ensureAuthenticated);

const notificationRepository = new NotificationRepository();
const notificationService = new NotificationService(notificationRepository);
const notificationController = new NotificationController(notificationService);

notificationRoutes.get("/", notificationController.findByRecipient);
notificationRoutes.patch("/read-all", notificationController.markAllAsRead);
notificationRoutes.patch("/:id/read", notificationController.markAsRead);

export { notificationRoutes };
