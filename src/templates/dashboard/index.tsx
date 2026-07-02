import { DashboardHeader } from "./components/header";
import { listWorkspaces } from "@/http/workspaces/list-workspaces";
import { WorkspaceList } from "./components/workspace-list";
import { NoneCreated } from "./components/none-created";

async function DashboardPage() {
  const workspaces = await listWorkspaces();

  return (
    <div className="space-y-6">
      <DashboardHeader workspace={workspaces} />
      {workspaces.length === 0 ? (
        <NoneCreated />
      ) : (
        <WorkspaceList workspaces={workspaces} />
      )}
    </div>
  );
}

export { DashboardPage };
