import { NotificationBell } from "@/components/ui/header/notification-bell";
import { ThemeSwitcher } from "@/components/ui/header/theme-switcher";
import { SidebarTrigger } from "@/components/ui/sidebar";

function WorkspacesHeader() {
  return (
    <header className="bg-popover py-3 px-8 flex justify-between items-center gap-3 border-b border-muted">
      <SidebarTrigger className="p-3" />
      <div className="flex justify-end items-center gap-3">
        <ThemeSwitcher />
        <NotificationBell />
      </div>
    </header>
  );
}

export { WorkspacesHeader };
