import { Text } from "@/components/ui/text";
import { listWorkspacesResultSchema } from "@/http/workspaces/list-workspaces";
import { NewWorkspaceDialog } from "./new-wokspace-dialog";
import z from "zod";

interface DashboardHeaderProps {
  workspace: z.infer<typeof listWorkspacesResultSchema>;
}

function DashboardHeader({ workspace }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col items-center md:flex-row justify-between gap-2">
      <div className="flex flex-col gap-0.5">
        <Text variant="heading-1" className="text-lime-950">
          Meus workspaces
        </Text>
        <Text variant="content" className="text-lime-950/80">
          {workspace.length} de 10 workspaces · você é membro de todos abaixo
        </Text>
      </div>

      <NewWorkspaceDialog />
    </div>
  );
}

export { DashboardHeader };
