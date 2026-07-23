import { httpClient } from "@/lib/http/client";
import z from "zod";

const readNotificationResponseSchema = z.object({
  message: z.string(),
});

async function readNotification({
  notificationId,
}: {
  notificationId: string;
}) {
  const data = await httpClient(`/api/notification/${notificationId}/read`, {
    method: "PATCH",
  });

  return readNotificationResponseSchema.parse(data);
}

export { readNotification };
