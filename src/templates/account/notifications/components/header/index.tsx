import { Text } from "@/components/ui/text";
import { listNotifications } from "@/http/notifications/list-notifications";
import { ReadAllNotificationsAction } from "./read-all-notifications-action";

async function Header() {
  const notifications = await listNotifications();

  const nonReadedNotifications = notifications.filter(
    (noti) => noti.read === false
  );

  return (
    <div className="flex justify-between gap-4 items-center">
      <Text variant="mono">{nonReadedNotifications.length} não {" "}
        {nonReadedNotifications.length === 1 ? "lida" : "lidas"}</Text>
      <ReadAllNotificationsAction />
    </div>
  );
}

export { Header };
