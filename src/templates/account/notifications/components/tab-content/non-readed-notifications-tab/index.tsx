import { TabsContent } from "@/components/ui/tabs";
import { NOTIFICATIONS_LIST } from "../../mock-data";
import { NotificationsCard } from "../../notifications-card";

function NonReadedNotificationsTab() {
  const nonReadedNotifications = NOTIFICATIONS_LIST.filter(
    (noti) => noti.readed === false
  );

  return (
    <TabsContent
      value="non-readed"
      className="rounded-2xl bg-popover border overflow-hidden"
    >
      {nonReadedNotifications.length === 0 ? (
        <div>Nenhum notificação</div>
      ) : (
        nonReadedNotifications.map((noti) => (
          <NotificationsCard key={noti.id} notification={noti} />
        ))
      )}
    </TabsContent>
  );
}

export { NonReadedNotificationsTab };
