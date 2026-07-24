import { Logo } from "@/components/ui/header/logo";
import { NotificationBell } from "@/components/ui/header/notification-bell";
import { ThemeSwitcher } from "@/components/ui/header/theme-switcher";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { UserDropdown } from "./user-dropdown";

function DashboardNavbar() {
  return (
    <header className="bg-popover py-3 px-8 grid grid-cols-2 md:grid-cols-3 items-center gap-3 border-b border-muted">
      <Logo />

      <InputGroup className="md:flex hidden">
        <InputGroupInput
          id="search"
          placeholder="Buscar workspaces, boards, tarefas..."
        />
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      <div className="flex justify-end items-center gap-1 md:gap-3">
        <ThemeSwitcher />
        <NotificationBell />
        <UserDropdown />
      </div>
    </header>
  );
}

export { DashboardNavbar };
