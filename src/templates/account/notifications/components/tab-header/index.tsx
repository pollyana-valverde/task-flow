import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NOTIFICATIONS_LIST } from "../mock-data";

function TabHeader() {
  const nonReadedNotifications = NOTIFICATIONS_LIST.filter(
    (noti) => noti.readed === false
  );

  return (
    <TabsList>
      <TabsTrigger value="all">
        Todas <span className="opacity-50">{ NOTIFICATIONS_LIST.length}</span>
      </TabsTrigger>
      <TabsTrigger value="non-readed">
        Não lidas <span className="opacity-50">{nonReadedNotifications.length}</span>
      </TabsTrigger>
    </TabsList>
  )
}

export { TabHeader };
