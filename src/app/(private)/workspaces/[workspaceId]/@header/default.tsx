import { NotificationBell } from "@/components/ui/header/notification-bell";
import { ThemeSwitcher } from "@/components/ui/header/theme-switcher";

export default function DefaultWorkspaceHeader() {
  return (
    <div className="flex justify-end items-center gap-3 w-full">
      <ThemeSwitcher />
      <NotificationBell />
    </div>
  );
}
