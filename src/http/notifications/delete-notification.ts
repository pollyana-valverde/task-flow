import { httpClient } from "@/lib/http/client";
import z from "zod";

const deleteNotificationResponseSchema = z.object({
  message: z.string(),
});

async function deleteNotification({
  notificationId,
}: {
  notificationId: string;
}) {
  const data = await httpClient(`/api/notification/${notificationId}`, {
    method: "DELETE",
  });

  return deleteNotificationResponseSchema.parse(data);
}

export { deleteNotification };
