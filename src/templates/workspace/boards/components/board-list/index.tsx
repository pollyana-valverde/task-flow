import type { listBoardsResultSchema } from "@/http/boards/list-boards";
import type z from "zod";
import { BoardCard } from "./board-card";

interface BoardListProps {
  boards: z.infer<typeof listBoardsResultSchema>;
  workspaceId: string;
}

function BoardList({ boards, workspaceId }: BoardListProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} workspaceId={workspaceId} />
      ))}
    </div>
  );
}

export { BoardList };
