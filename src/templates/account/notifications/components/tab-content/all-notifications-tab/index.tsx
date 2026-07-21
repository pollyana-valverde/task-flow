import { TabsContent } from "@/components/ui/tabs";
import { NOTIFICATIONS_LIST } from "../../mock-data";
import { NotificationsCard } from "../../notifications-card";

function AllNotificationsTab() {
  return (
    <TabsContent
      value="all"
      className="rounded-2xl bg-popover border overflow-hidden"
    >
      {NOTIFICATIONS_LIST.length === 0 ? (
        <div>Nenhum notificação</div>
      ) : (
        NOTIFICATIONS_LIST.map((noti) => (
          <NotificationsCard key={noti.id} notification={noti} />
        ))
      )}
    </TabsContent>
  );
}

export { AllNotificationsTab };
