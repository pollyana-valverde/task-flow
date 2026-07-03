import { listWorkspacesResultSchema } from "@/http/workspaces/list-workspaces";
import { NewWorkspaceDialog } from "../new-wokspace-dialog";
import z from "zod";
import {
  Header,
  HeaderAction,
  HeaderContent,
  HeaderSubtitle,
  HeaderTitle,
} from "@/components/ui/header";

interface DashboardHeaderProps {
  workspace: z.infer<typeof listWorkspacesResultSchema>;
}

function DashboardHeader({ workspace }: DashboardHeaderProps) {
  return (
    <Header>
      <HeaderContent>
        <HeaderTitle>Meus workspaces</HeaderTitle>
        <HeaderSubtitle>
          {workspace.length} de 10 workspaces · você é membro de todos
        </HeaderSubtitle>
      </HeaderContent>

      <HeaderAction>
        <NewWorkspaceDialog />
      </HeaderAction>
    </Header>
  );
}

export { DashboardHeader };
