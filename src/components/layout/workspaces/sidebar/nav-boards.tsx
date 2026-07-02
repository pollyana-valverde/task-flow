"use client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { capitalizeFirtLetter } from "@/utils/captalize-first-letter";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBoardsProps {
  boards: {
    id: string;
    title: string;
    workspaceId: string;
    columnsCount: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

function NavBoards({ boards }: NavBoardsProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel asChild>
        <Text variant="mono" className="uppercase">
          Boards
        </Text>
      </SidebarGroupLabel>
      <SidebarMenu>
        {boards.map((board) => (
          <SidebarMenuItem key={board.id}>
            <SidebarMenuButton
              asChild
              className={cn(
                "hover:bg-primary border-2 border-transparent hover:border-foreground dark:hover:border-lime-700 gap-2.5 rounded-lg h-10 px-2.5",
                pathname ===
                  `/workspaces/${board.workspaceId}/boards/${board.id}` &&
                  "bg-primary border-2 border-foreground dark:border-lime-700",
              )}
            >
              <Link
                href={`/workspaces/${board.workspaceId}/boards/${board.id}`}
              >
                <div className="size-2 rounded-full bg-lime-800" />
                <Text
                  variant="sm"
                  className={cn(
                    "truncate group-hover/menu-button:font-semibold group-hover/menu-button:text-sidebar-primary-foreground",
                    pathname ===
                      `/workspaces/${board.workspaceId}/boards/${board.id}` &&
                      "font-semibold text-sidebar-primary-foreground",
                  )}
                >
                  {capitalizeFirtLetter(board.title)}
                </Text>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export { NavBoards };
