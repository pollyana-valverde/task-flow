"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteNotification } from "@/http/notifications/delete-notification";
import { useRouter } from "next/navigation";

function DeleteNotificationAction({
  notificationId,
}: {
  notificationId: string;
}) {
  const router = useRouter();

  async function handleDeleteNotification() {
    try {
      await deleteNotification({ notificationId });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DropdownMenuItem variant="destructive" onClick={handleDeleteNotification}>
      Excluir
    </DropdownMenuItem>
  );
}

export { DeleteNotificationAction };
