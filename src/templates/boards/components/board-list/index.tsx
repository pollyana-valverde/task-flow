import { listBoardsResultSchema } from "@/http/boards/list-boards";
import { getWorkspaceResultSchema } from "@/http/workspaces/get-workspace";
import z from "zod";
import { BoardCard } from "./board-card";

interface BoardListProps {
  boards: z.infer<typeof listBoardsResultSchema>;
}

function BoardList({ boards }: BoardListProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
}

export { BoardList };
