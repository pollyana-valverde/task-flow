import { listWorkspacesResultSchema } from "@/http/workspaces/list-workspaces";
import z from "zod";
import { WorkspaceCard } from "./workspace-card";

interface WorkspaceListProps {
  workspaces: z.infer<typeof listWorkspacesResultSchema>;
}

function WorkspaceList({ workspaces }: WorkspaceListProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
    </div>
  );
}

export { WorkspaceList };
