import { listNotifications } from "@/http/notifications/list-notifications";
import { Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";

async function NotificationBell() {
  const notifications = await listNotifications();

  const nonReadedNotifications = notifications.filter(
    (noti) => noti.read === false
  );

  return (
    <Button variant="ghost" className="relative p-3" asChild>
      <Link href="/notifications">
        <Bell className="size-5" />
        {nonReadedNotifications.length > 0 && (
          <div className="absolute bg-destructive rounded-full flex items-center justify-center h-5 w-5 top-1 right-1.5 border-2 border-background">
            <span className="text-[.625rem] text-white">
              {nonReadedNotifications.length}
            </span>
          </div>
        )}
      </Link>
    </Button>
  );
}

export { NotificationBell };
