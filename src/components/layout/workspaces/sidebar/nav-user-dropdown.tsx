"use client";

import { Bell, ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { getNameInitials } from "@/utils/get-name-initials";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NAV_USER_DROPDOWN_LINKS = [
  {
    path: "/profile",
    icon: User,
    label: "Meu perfil",
  },
  {
    path: "/settings",
    icon: Settings,
    label: "Configurações",
  },
  {
    path: "/notifications",
    icon: Bell,
    label: "Notificações",
  },
];

interface NavUserDropdownProps {
  user:
    | {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined | undefined;
      }
    | undefined;
}

function NavUserDropdown({ user }: NavUserDropdownProps) {
  const { isMobile } = useSidebar();

  if (!user) return null;

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/sign-in");
        },
      },
    });
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user.image && (
                  <AvatarImage src={user.image} alt={user.image} />
                )}
                <AvatarFallback className="rounded-full bg-lime-700 border border-foreground dark:border-lime-800 text-sidebar-primary-foreground">
                  {getNameInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <Text variant="sm" className="truncate text-foreground">
                  {user.name}
                </Text>
                <Text variant="mono" className="truncate">
                  {user.email}
                </Text>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground/75" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {user.image && (
                    <AvatarImage src={user.image} alt={user.image} />
                  )}
                  <AvatarFallback className="rounded-full bg-lime-700 border border-foreground dark:border-lime-800 text-sidebar-primary-foreground">
                    {getNameInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <Text variant="sm" className="truncate text-foreground">
                    {user.name}
                  </Text>
                  <Text variant="mono" className="truncate">
                    {user.email}
                  </Text>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {NAV_USER_DROPDOWN_LINKS.map((link, index) => (
              <DropdownMenuItem key={`link-${index}`} asChild>
                <Link href={link.path}>
                  <link.icon />
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              variant="destructive"
              asChild
            >
              <Link href={"/sign-in"}>
                <LogOut />
                Sair
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export { NavUserDropdown };
