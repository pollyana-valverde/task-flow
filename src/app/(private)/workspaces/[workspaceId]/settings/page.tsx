import { WorkspaceSettingsPage } from "@/templates/workspace/settings";

interface SettingsPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function Settings({ params }: SettingsPageProps) {
  const { workspaceId } = await params;

  return <WorkspaceSettingsPage workspaceId={workspaceId} />;
}
