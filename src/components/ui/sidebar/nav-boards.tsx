import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Text } from "../text";
import Link from "next/link";

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
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel asChild>
        <Text variant="label" className="text-lime-950/60">
          Boards
        </Text>
      </SidebarGroupLabel>
      <SidebarMenu>
        {boards.map((board) => (
          <SidebarMenuItem key={board.id}>
            <SidebarMenuButton asChild className="hover:bg-lime-950/5">
              <Link
                href={`/workspaces/${board.workspaceId}/boards/${board.id}`}
              >
                <div className="w-2 h-2 bg-lime-500 rounded-full" />
                <Text variant="content" className="text-lime-950 truncate">
                  {board.title}
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
