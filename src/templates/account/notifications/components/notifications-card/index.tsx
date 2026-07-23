import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

interface NotificationsCardProps {
  notification: {
    // id: string;
    // recipientId: string;
    // actorId: string | null;
    type: "task_due" | "workspace_invite" | "task_assigned" | "task_moved" | "task_deleted" | "board_created" | "board_deleted" | "workspace_deleted" | "member_promoted";
    message: string;
    read: boolean;
    // taskId: string | null;
    // boardId: string | null;
    // workspaceId: string | null;
    createdAt: Date;
  };
}

function NotificationsCard({ notification }: NotificationsCardProps) {
  return (
    <Link
      href={"/"}
      className={cn(
        "px-5 py-4 flex items-start gap-3 justify-between not-last:border-b hover:bg-muted/30",
        !notification.read && "bg-secondary/70 hover:bg-secondary"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-destructive/30 p-2.5 ">
          {/*<notification.icon className="size-4 text-destructive" />*/}
        </div>
        <div className="flex flex-col">
          <Text>{notification.message}</Text>
          <Text variant="mono">{notification.createdAt.toLocaleDateString()}</Text>
          {notification.type === "workspace_invite" && (
            <Button size="sm" className="mt-3 w-fit">
              Ver convite
            </Button>
          )}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="size-4 text-muted-foreground/75" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-mono uppercase font-semibold">
              Ações
            </DropdownMenuLabel>
            <DropdownMenuItem>Marcar como lido</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Excluir</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Link>
  );
}

export { NotificationsCard };
