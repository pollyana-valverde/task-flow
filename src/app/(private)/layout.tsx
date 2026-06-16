import { Bell, Moon, SearchIcon } from "lucide-react";

import { Logo } from "@/components/ui/header/logo";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { UserButon } from "@/components/ui/header/user-button";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <header className="py-3 px-8 grid grid-cols-3 items-center gap-3 border-b border-lime-950/20">
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
          <div className="hover:bg-lime-950/5 rounded-lg p-3 group">
            <Moon className="w-5 h-5 text-lime-950/70 group-hover:text-lime-950" />
          </div>

          <div className="relative hover:bg-lime-950/5 rounded-lg p-3 group">
            <Bell className="w-5 h-5 text-lime-950/70 group-hover:text-lime-950" />
            <div className="absolute bg-red-700 rounded-full flex items-center justify-center h-5 w-5 top-1 right-1.5 border-2 border-white">
              <span className="text-xs text-white">1</span>
            </div>
          </div>

          <UserButon />
        </div>
      </header>

      <main className="flex flex-col justify-center items-center py-11 px-8 md:px-14 h-screen bg-lime-950/5">
        {children}
      </main>
    </div>
  );
}
