import { TabsContent } from "@/components/ui/tabs";
import { listNotifications } from "@/http/notifications/list-notifications";
import { NoneNotificationListed } from "../../none-listed";
import { NotificationsCard } from "../../notifications-card";

async function NonReadedNotificationsTab() {
  const notifications = await listNotifications();

  const nonReadedNotifications = notifications.filter(
    (noti) => noti.read === false
  );

  return (
    <TabsContent
      value="non-readed"
      className="rounded-2xl bg-popover border overflow-hidden"
    >
      {nonReadedNotifications.length === 0 ? (
        <NoneNotificationListed />
      ) : (
        nonReadedNotifications.map((noti) => (
          <NotificationsCard key={noti.id} notification={noti} />
        ))
      )}
    </TabsContent>
  );
}

export { NonReadedNotificationsTab };
