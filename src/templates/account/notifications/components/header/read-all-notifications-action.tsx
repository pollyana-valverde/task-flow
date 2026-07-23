"use client";

import { Button } from "@/components/ui/button";
import { readAllNotifications } from "@/http/notifications/read-all-notifications";
import { useRouter } from "next/navigation";

function ReadAllNotificationsAction() {
  const router = useRouter();

  async function handleReadAllNotifications() {
    try {
      await readAllNotifications();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button
      onClick={handleReadAllNotifications}
      variant="secondary"
      size="sm"
      className="bg-popover"
    >
      Marcar tudo como lido
    </Button>
  );
}

export { ReadAllNotificationsAction };
