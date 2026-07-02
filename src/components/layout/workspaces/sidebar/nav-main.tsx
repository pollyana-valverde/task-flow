"use client";

import { LayoutDashboard, Settings, Users } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavMain({ workspaceId }: { workspaceId: string }) {
  const pathname = usePathname();

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
        {NAV_MAIN_LINKS.map((link, index) => (
          <SidebarMenuItem key={`${index}-${link.title}`}>
            <SidebarMenuButton
              key={link.title}
              asChild
              className={cn(
                "hover:bg-primary border-2 border-transparent hover:border-foreground dark:hover:border-lime-700 gap-2.5 rounded-lg h-10 px-2.5",
                pathname === link.path &&
                  "bg-primary border-2 border-foreground dark:border-lime-700",
              )}
            >
              <Link href={link.path}>
                {link.icon && (
                  <link.icon
                    className={cn(
                      "text-muted-foreground/75 group-hover/menu-button:text-sidebar-primary-foreground",
                      pathname === link.path &&
                        "text-sidebar-primary-foreground",
                    )}
                  />
                )}
                <Text
                  variant="sm"
                  className={cn(
                    "group-hover/menu-button:font-semibold group-hover/menu-button:text-sidebar-primary-foreground",
                    pathname === link.path &&
                      "font-semibold text-sidebar-primary-foreground",
                  )}
                >
                  {link.title}
                </Text>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
