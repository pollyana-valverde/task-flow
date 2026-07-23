import { httpClient } from "@/lib/http/client";
import { getServerCookie } from "@/lib/http/get-server-cookie";
import z from "zod";

const notificationTypeSchema = z.enum([
  "task_due",
  "workspace_invite",
  "task_assigned",
  "task_moved",
  "task_deleted",
  "board_created",
  "board_deleted",
  "workspace_deleted",
  "member_promoted",
]);

const listNotificationsResultSchema = z.array(
  z.object({
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
  })
);

async function listNotifications() {
  const cookie = await getServerCookie();

  const data = await httpClient(`/api/notification`, {
    headers: { Cookie: cookie },
  });

  return listNotificationsResultSchema.parse(data);
}

export { listNotifications, listNotificationsResultSchema, notificationTypeSchema };
