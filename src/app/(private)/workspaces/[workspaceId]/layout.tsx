import { ThemeSwitch } from "@/components/ui/header/theme-switch";
import { NotificationBell } from "@/components/ui/header/notification-bell";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/sidebar/index";

interface WorkspacesLayoutProps {
  params: Promise<{
    workspaceId: string;
  }>;
  children: React.ReactNode;
}

export default async function WorkspacesLayout({
  children,
  params,
}: WorkspacesLayoutProps) {
  const { workspaceId } = await params;

  return (
    <SidebarProvider>
      <AppSidebar workspaceId={workspaceId} />
      <SidebarInset>
        <header className=" py-3 px-8 flex justify-between items-center gap-3 border-b border-lime-950/20">
          <SidebarTrigger className="hover:bg-lime-950/5 rounded-lg p-3 group" />
          <div className="flex justify-end items-center gap-3">
            <ThemeSwitch />
            <NotificationBell />
          </div>
        </header>

        <main className="flex flex-col py-8 px-8 md:px-14 h-screen bg-lime-950/5">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
