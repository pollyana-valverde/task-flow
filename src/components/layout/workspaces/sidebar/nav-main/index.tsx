"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Text } from "@/components/ui/text";
import { LayoutDashboard, Settings, Users } from "lucide-react";
import { NavMainItem } from "./nav-main-item";

interface NavMainProps {
  workspaceId: string;
  sessionUserMemberRole?: "member" | "admin" | "owner";
}

function NavMain({ workspaceId, sessionUserMemberRole }: NavMainProps) {
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
      title: "Configurações",
      path: `/workspaces/${workspaceId}/settings`,
      icon: Settings,
      role: "owner",
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel asChild>
        <Text variant="mono" className="uppercase">
          Geral
        </Text>
      </SidebarGroupLabel>
      <SidebarMenu>
        {NAV_MAIN_LINKS.map((link) =>
          link.role ? (
            link.role === sessionUserMemberRole && (
              <NavMainItem key={`${Math.random()}-${link.title}`} link={link} />
            )
          ) : (
            <NavMainItem key={`${Math.random()}-${link.title}`} link={link} />
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export { NavMain };
