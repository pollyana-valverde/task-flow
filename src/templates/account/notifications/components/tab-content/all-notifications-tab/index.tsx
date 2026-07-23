import { TabsContent } from "@/components/ui/tabs";
import { listNotifications } from "@/http/notifications/list-notifications";
import { NOTIFICATIONS_LIST } from "../../mock-data";
import { NotificationsCard } from "../../notifications-card";

async function AllNotificationsTab() {
  const notifications = await listNotifications()

  return (
    <TabsContent
      value="all"
      className="rounded-2xl bg-popover border overflow-hidden"
    >
      {NOTIFICATIONS_LIST.length === 0 ? (
        <div>Nenhum notificação</div>
      ) : (
        notifications.map((noti) => (
          <NotificationsCard key={noti.id} notification={noti} />
        ))
      )}
    </TabsContent>
  );
}

export { AllNotificationsTab };
