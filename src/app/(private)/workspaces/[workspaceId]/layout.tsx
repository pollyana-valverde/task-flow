import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { WorkspacesSidebar } from "@/components/layout/workspaces/sidebar";
import { WorkspacesHeader } from "@/components/layout/workspaces/header";

interface WorkspacesLayoutProps {
  params: Promise<{
    workspaceId: string;
  }>;
  children: React.ReactNode;
  header: React.ReactNode;
}

export default async function WorkspacesLayout({
  children,
  params,
  header,
}: WorkspacesLayoutProps) {
  const { workspaceId } = await params;

  return (
    <SidebarProvider>
      <WorkspacesSidebar workspaceId={workspaceId} />
      <SidebarInset>
        <WorkspacesHeader>{header}</WorkspacesHeader>

        <main className="flex flex-col py-8 px-8 md:px-14 min-h-screen bg-background-muted">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
