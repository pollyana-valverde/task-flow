import { Text } from "@/components/ui/text";
import z from "zod";
import { NewBoardDialog } from "./new-board-dialog";
import { getWorkspaceResultSchema } from "@/http/workspaces/get-workspace";

interface BoardsHeaderProps {
  workspace: z.infer<typeof getWorkspaceResultSchema>;
}

function BoardsHeader({ workspace }: BoardsHeaderProps) {
  return (
    <div className="flex flex-col items-center md:flex-row justify-between gap-2">
      <div className="flex flex-col gap-0.5">
        <Text variant="heading-1" className="text-lime-950">
          Visão geral
        </Text>
        <Text variant="content" className="text-lime-950/80">
          {workspace.boardsCount} boards · {workspace.membersCount} membros
          ativos
        </Text>
      </div>

      <NewBoardDialog />
    </div>
  );
}

export { BoardsHeader };
