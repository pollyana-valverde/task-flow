import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Ellipsis } from "lucide-react";
import Link from "next/link";
import { DeleteNotificationAction } from "./delete-notification-action";
import { NotificationIcon } from "./notification-icon";
import { ReadNotificationAction } from "./read-notification-action";

interface NotificationsCardProps {
  notification: {
    id: string;
    // recipientId: string;
    // actorId: string | null;
    type:
      | "task_due"
      | "workspace_invite"
      | "task_assigned"
      | "task_moved"
      | "task_deleted"
      | "board_created"
      | "board_deleted"
      | "workspace_deleted"
      | "member_promoted"
      | "workspace_member_left"
      | "workspace_member_removed"
      | "workspace_ownership_transferred";
    message: string;
    read: boolean;
    // taskId: string | null;
    // boardId: string | null;
    workspaceId: string | null;
    createdAt: Date;
  };
}

function NotificationsCard({ notification }: NotificationsCardProps) {
  return (
    <div
      className={cn(
        "px-5 py-4 flex items-start gap-3 justify-between not-last:border-b hover:bg-muted/30",
        !notification.read && "bg-secondary/70 hover:bg-secondary",
        notification.type === "workspace_invite" && "cursor-default"
      )}
    >
      <div className="flex items-start gap-3 w-full ">
        <NotificationIcon type={notification.type} />
        <div className="flex flex-col w-full ">
          <Text>{notification.message}</Text>
          <Text variant="mono">
            {notification.createdAt.toLocaleDateString()}
          </Text>
          <div className="flex">
            {notification.type === "workspace_invite" ? (
              <Button size="sm" className="mt-3 w-fit" asChild>
                <Link href={`/invites/${notification.id}`}>Ver convite</Link>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                className="w-fit group ml-auto"
                asChild
              >
                <Link href={`/workspaces/${notification.workspaceId}`}>
                  Abrir
                  <ArrowUpRight className="text-foreground/70 group-hover:text-foreground" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="size-4 text-muted-foreground/75" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <ReadNotificationAction notificationId={notification.id} />
            <DeleteNotificationAction notificationId={notification.id} />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { NotificationsCard };
