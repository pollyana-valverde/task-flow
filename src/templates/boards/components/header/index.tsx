import z from "zod";
import { NewBoardDialog } from "../new-board-dialog";
import { getWorkspaceResultSchema } from "@/http/workspaces/get-workspace";
import {
  Header,
  HeaderAction,
  HeaderContent,
  HeaderSubtitle,
  HeaderTitle,
} from "@/components/ui/header";

interface BoardsHeaderProps {
  workspace: z.infer<typeof getWorkspaceResultSchema>;
  workspaceId: string;
}

function BoardsHeader({ workspace, workspaceId }: BoardsHeaderProps) {
  return (
    <Header>
      <HeaderContent>
        <HeaderTitle>Visão geral</HeaderTitle>
        <HeaderSubtitle>
          {workspace.boardsCount === 1
            ? `${workspace.boardsCount} board`
            : `${workspace.boardsCount} boards`}{" "}
          ·{" "}
          {workspace.membersCount === 1
            ? `${workspace.membersCount} membro ativo`
            : `${workspace.membersCount} membros ativos`}
        </HeaderSubtitle>
      </HeaderContent>

      <HeaderAction>
        <NewBoardDialog workspaceId={workspaceId} />
      </HeaderAction>
    </Header>
  );
}

export { BoardsHeader };
