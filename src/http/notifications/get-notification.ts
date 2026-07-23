import { httpClient } from "@/lib/http/client";
import { getServerCookie } from "@/lib/http/get-server-cookie";
import z from "zod";
import { notificationTypeSchema } from "./list-notifications";

const getNotificationResultSchema = z.object({
  id: z.uuid(),
  recipientId: z.uuid(),
  actorId: z.uuid().nullable(),
  type: notificationTypeSchema,
  message: z.string(),
  read: z.boolean(),
  taskId: z.uuid().nullable(),
  boardId: z.uuid().nullable(),
  workspaceId: z.uuid().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

async function getNotification({ notificationId }: { notificationId: string }) {
  const cookie = await getServerCookie();

  const data = await httpClient(`/api/notification/${notificationId}`, {
    headers: { Cookie: cookie },
  });

  return getNotificationResultSchema.parse(data);
}

export { getNotification, getNotificationResultSchema };
