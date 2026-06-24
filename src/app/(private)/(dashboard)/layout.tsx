import { Bell, Moon, SearchIcon } from "lucide-react";

import { Logo } from "@/components/ui/header/logo";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { UserButon } from "@/components/ui/header/user-button";
import { ThemeSwitch } from "@/components/ui/header/theme-switch";
import { NotificationBell } from "@/components/ui/header/notification-bell";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <header className=" py-3 px-8 grid grid-cols-3 items-center gap-3 border-b border-lime-950/20">
        <Logo />

        <InputGroup>
          <InputGroupInput
            id="search"
            placeholder="Buscar workspaces, boards, tarefas..."
          />
          <InputGroupAddon align="inline-start">
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <div className="flex justify-end items-center gap-3">
          <ThemeSwitch />
          <NotificationBell />
          <UserButon />
        </div>
      </header>

      <main className="flex flex-col py-8 px-8 md:px-14 h-screen bg-lime-950/5">
        {children}
      </main>
    </div>
  );
}
