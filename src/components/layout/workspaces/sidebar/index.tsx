import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { listBoards } from "@/http/boards/list-boards";
import { getMyMembership } from "@/http/members/get-my-membership";
import { getWorkspace } from "@/http/workspaces/get-workspace";
import { getSession } from "@/lib/auth/get-session";
import type * as React from "react";
import { NavBoards } from "./nav-boards";
import { NavMain } from "./nav-main";
import { NavUserDropdown } from "./nav-user-dropdown";
import { WorkspaceSwitcher } from "./workspace-switcher";

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

  const sessionUserMemberRole = await getMyMembership({ workspaceId });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspace={workspace} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          workspaceId={workspaceId}
          sessionUserMemberRole={sessionUserMemberRole?.role}
        />
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
