// "use client";

import { LucideIcon, LucideProps } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Text } from "../text";
import Link from "next/link";
// import { usePathname } from "next/navigation";

interface NavMainProps {
  links: {
    title: string;
    path: string;
    icon: LucideIcon;
  }[];
}

export function NavMain({ links }: NavMainProps) {
  // const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel asChild>
        <Text variant="label" className="text-lime-950/60">
          Geral
        </Text>
      </SidebarGroupLabel>
      <SidebarMenu>
        {links.map((link, index) => (
          <SidebarMenuItem key={`${index}-${link.title}`}>
            <SidebarMenuButton
              key={link.title}
              asChild
              className="hover:bg-lime-950/5"
            >
              <Link href={link.path}>
                {link.icon && <link.icon className="text-lime-950" />}
                <Text variant="content" className="text-lime-950">
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
