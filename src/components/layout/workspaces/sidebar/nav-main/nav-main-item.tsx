"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavMainItemProps {
  link: {
    title: string;
    path: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  };
}

function NavMainItem({ link }: NavMainItemProps) {
  const pathname = usePathname();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        key={link.title}
        asChild
        className={cn(
          "hover:bg-primary border-2 border-transparent hover:border-foreground dark:hover:border-lime-700 gap-2.5 rounded-lg h-10 px-2.5",
          pathname === link.path &&
            "bg-primary border-2 border-foreground dark:border-lime-700"
        )}
      >
        <Link href={link.path}>
          <link.icon
            className={cn(
              "text-muted-foreground/75 group-hover/menu-button:text-sidebar-primary-foreground",
              pathname === link.path && "text-sidebar-primary-foreground"
            )}
          />
          <Text
            variant="sm"
            className={cn(
              "group-hover/menu-button:font-semibold group-hover/menu-button:text-sidebar-primary-foreground",
              pathname === link.path &&
                "font-semibold text-sidebar-primary-foreground"
            )}
          >
            {link.title}
          </Text>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export { NavMainItem };
