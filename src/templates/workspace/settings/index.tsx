import { getWorkspace } from "@/http/workspaces/get-workspace";
import { DangerZone } from "./components/danger-zone";
import { SettingsHeader } from "./components/header";
import { UpdateForm } from "./components/update-form";

async function WorkspaceSettingsPage({ workspaceId }: { workspaceId: string }) {
  const workspace = await getWorkspace({ workspaceId })

  return (
    <div className="space-y-6 max-w-160 mx-auto">
      <SettingsHeader />
      <UpdateForm workspace={workspace} />
      <DangerZone workspaceId={workspaceId} />
    </div>
  );
}

export { WorkspaceSettingsPage };
