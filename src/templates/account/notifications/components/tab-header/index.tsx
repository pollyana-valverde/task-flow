import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listNotifications } from "@/http/notifications/list-notifications";

async function TabHeader() {
  const notifications = await listNotifications()
  const nonReadedNotifications = notifications.filter(
    (noti) => noti.read === false
  );

  return (
    <TabsList>
      <TabsTrigger value="all">
        Todas <span className="opacity-50">{ notifications.length}</span>
      </TabsTrigger>
      <TabsTrigger value="non-readed">
        Não lidas <span className="opacity-50">{nonReadedNotifications.length}</span>
      </TabsTrigger>
    </TabsList>
  )
}

export { TabHeader };
