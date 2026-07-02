import * as React from "react";

import { NavMain } from "./nav-main";
import { NavBoards } from "./nav-boards";
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
import { NavUserDropdown } from "./nav-user-dropdown";

interface WorkspacesSidebarProps extends React.ComponentProps<typeof Sidebar> {
  workspaceId: string;
}

async function WorkspacesSidebar({
  workspaceId,
  ...props
}: WorkspacesSidebarProps) {
  const boards = await listBoards({ workspaceId });
  const workspace = await getWorkspace({ workspaceId });
  const session = await getSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspace={workspace} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain workspaceId={workspaceId} />
        <NavBoards boards={boards} />
      </SidebarContent>
      <SidebarFooter>
        <hr />
        <NavUserDropdown user={session?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export { WorkspacesSidebar };
