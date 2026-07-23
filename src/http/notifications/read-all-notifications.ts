import { httpClient } from "@/lib/http/client";
import z from "zod";

const readAllNotificationsResponseSchema = z.object({
  message: z.string(),
});

async function readAllNotifications() {
  const data = await httpClient(`/api/notification/read-all`, {
    method: "PATCH",
  });

  return readAllNotificationsResponseSchema.parse(data);
}

export { readAllNotifications };
