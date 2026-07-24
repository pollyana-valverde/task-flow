import {
  Header,
  HeaderAction,
  HeaderContent,
  HeaderSubtitle,
  HeaderTitle,
} from "@/components/ui/header";
import { getMyMembership } from "@/http/members/get-my-membership";
import type { getWorkspaceResultSchema } from "@/http/workspaces/get-workspace";
import type z from "zod";
import { NewBoardDialog } from "../new-board-dialog";

interface BoardsHeaderProps {
  workspace: z.infer<typeof getWorkspaceResultSchema>;
  workspaceId: string;
}

async function BoardsHeader({ workspace, workspaceId }: BoardsHeaderProps) {
  const sessionUserMemberRole = await getMyMembership({ workspaceId });

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
            ? `${workspace.membersCount} membro`
            : `${workspace.membersCount} membros`}
        </HeaderSubtitle>
      </HeaderContent>

      {sessionUserMemberRole.role !== "member" && (
        <HeaderAction>
          <NewBoardDialog workspaceId={workspaceId} />
        </HeaderAction>
      )}
    </Header>
  );
}

export { BoardsHeader };
