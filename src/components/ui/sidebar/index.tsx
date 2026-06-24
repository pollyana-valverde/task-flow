import * as React from "react";
import { LayoutDashboard, Settings, Users } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavBoards } from "./nav-boards";
import { NavUser } from "./nav-user";
import { WorkspaceSwitcher } from "./workspace-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { listBoards } from "@/http/boards/list-boards";
import { getWorkspace } from "@/http/workspaces/get-workspace";
import { getSession } from "@/lib/auth/get-session";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  workspaceId: string;
}

async function AppSidebar({ workspaceId, ...props }: AppSidebarProps) {
  const boards = await listBoards({ workspaceId });
  const workspace = await getWorkspace({ workspaceId });
  const session = await getSession();

  const NAV_MAIN_LINKS = [
    {
      title: "Visão geral",
      path: `/workspaces/${workspaceId}/boards`,
      icon: LayoutDashboard,
    },
    {
      title: "Membros",
      path: `/workspaces/${workspaceId}/members`,
      icon: Users,
    },
    {
      title: "Visão geral",
      path: `/workspaces/${workspaceId}/settings`,
      icon: Settings,
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspace={workspace} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain links={NAV_MAIN_LINKS} />
        <NavBoards boards={boards} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export { AppSidebar };
