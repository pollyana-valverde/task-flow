import { Text } from "@/components/ui/text";
import z from "zod";
import { NewBoardDialog } from "../new-board-dialog";
import { getWorkspaceResultSchema } from "@/http/workspaces/get-workspace";

interface BoardsHeaderProps {
  workspace: z.infer<typeof getWorkspaceResultSchema>;
  workspaceId: string;
}

function BoardsHeader({ workspace, workspaceId }: BoardsHeaderProps) {
  return (
    <div className="flex flex-col items-center md:flex-row justify-between gap-2">
      <div className="flex flex-col gap-0.5">
        <Text variant="h1">Visão geral</Text>
        <Text variant="mono" className="text-sm">
          {workspace.boardsCount === 1
            ? `${workspace.boardsCount} board`
            : `${workspace.boardsCount} boards`}{" "}
          ·{" "}
          {workspace.membersCount === 1
            ? `${workspace.membersCount} membro ativo`
            : `${workspace.membersCount} membros ativos`}
        </Text>
      </div>

      <NewBoardDialog workspaceId={workspaceId} />
    </div>
  );
}

export { BoardsHeader };
