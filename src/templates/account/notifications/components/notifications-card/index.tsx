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
import { Ellipsis, type LucideProps } from "lucide-react";
import Link from "next/link";

interface NotificationsCardProps {
  notification: {
    path: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    text: string;
    desc: string;
    button: boolean;
    readed: boolean;
  };
}

function NotificationsCard({ notification }: NotificationsCardProps) {
  return (
    <Link
      href={notification.path}
      className={cn(
        "px-5 py-4 flex items-start gap-3 justify-between not-last:border-b hover:bg-muted/30",
        !notification.readed && "bg-secondary/70 hover:bg-secondary"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-destructive/30 p-2.5 ">
          <notification.icon className="size-4 text-destructive" />
        </div>
        <div className="flex flex-col">
          <Text>{notification.text}</Text>
          <Text variant="mono">{notification.desc}</Text>
          {notification.button && (
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
