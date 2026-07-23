import { TabsContent } from "@/components/ui/tabs";
import { listNotifications } from "@/http/notifications/list-notifications";
import { NoneNotificationListed } from "../../none-listed";
import { NotificationsCard } from "../../notifications-card";

async function AllNotificationsTab() {
  const notifications = await listNotifications();

  return (
    <TabsContent
      value="all"
      className="rounded-2xl bg-popover border overflow-hidden"
    >
      {notifications.length === 0 ? (
        <NoneNotificationListed />
      ) : (
        notifications.map((noti) => (
          <NotificationsCard key={noti.id} notification={noti} />
        ))
      )}
    </TabsContent>
  );
}

export { AllNotificationsTab };
