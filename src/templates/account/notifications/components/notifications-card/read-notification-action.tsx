"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { readNotification } from "@/http/notifications/read-notification";
import { useRouter } from "next/navigation";

function ReadNotificationAction({
  notificationId,
}: {
  notificationId: string;
}) {
  const router = useRouter();

  async function handleReadNotification() {
    try {
      await readNotification({ notificationId });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DropdownMenuItem onClick={handleReadNotification}>
      Marcar como lido
    </DropdownMenuItem>
  );
}

export { ReadNotificationAction };
