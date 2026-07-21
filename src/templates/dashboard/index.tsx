import { listWorkspaces } from "@/http/workspaces/list-workspaces";
import { DashboardHeader } from "./components/header";
import { NoneWorkspaceCreated } from "./components/none-created";
import { WorkspaceList } from "./components/workspace-list";

async function DashboardPage() {
  const workspaces = await listWorkspaces();

  return (
    <div className="space-y-6">
      <DashboardHeader workspace={workspaces} />
      {workspaces.length === 0 ? (
        <NoneWorkspaceCreated />
      ) : (
        <WorkspaceList workspaces={workspaces} />
      )}
    </div>
  );
}

export { DashboardPage };
