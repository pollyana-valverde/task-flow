"use client";

import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getNameInitials } from "@/utils/get-name-initials";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const USER_DROPDOWN_LINKS = [
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

function UserDropdown() {
  const { data: session } = authClient.useSession();

  if (!session) {
    return;
  }

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-2 p-1.5 border"
        >
          {session.user.image ? (
            <Image
              className="rounded-md"
              width={28}
              height={28}
              src={session.user.image}
              alt={session.user.name}
            />
          ) : (
            <div className="rounded-md size-7 flex items-center justify-center text-xs bg-lime-900 text-white">
              {getNameInitials(session.user.name)}
            </div>
          )}
          <Text variant="sm" className="text-foreground">
            {session.user.name.split(" ")[0]}
          </Text>
          <ChevronDown className="w-4 h-4 text-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 mt-1" align="end">
        {USER_DROPDOWN_LINKS.map((link, index) => (
          <DropdownMenuItem key={`link-${index}`} asChild>
            <Link href={link.path}>
              <link.icon />
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} variant="destructive" asChild>
          <Link href={"/sign-in"}>
            <LogOut />
            Sair
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserDropdown };
