import { DangerZone } from "./components/danger-zone";
import { SettingsHeader } from "./components/header";
import { UpdateForm } from "./components/update-form";

async function WorkspaceSettingsPage({ workspaceId }: { workspaceId: string }) {
  return (
    <div className="space-y-6 w-160 mx-auto">
      <SettingsHeader />
      <UpdateForm workspaceId={workspaceId} />
      <DangerZone workspaceId={workspaceId} />
    </div>
  );
}

export { WorkspaceSettingsPage };
