import { getWorkspace } from "@/http/workspaces/get-workspace";
import { BoardsHeader } from "./components/header";
import { BoardList } from "./components/board-list";
import { NoneCreated } from "./components/board-list/none-created";
import { listBoards } from "@/http/boards/list-boards";

async function BoardsPage({ workspaceId }: { workspaceId: string }) {
  const workspace = await getWorkspace({ workspaceId });
  const boards = await listBoards({ workspaceId });

  return (
    <div className="space-y-6">
      <BoardsHeader workspace={workspace} />
      {boards.length === 0 ? <NoneCreated /> : <BoardList boards={boards} />}
    </div>
  );
}

export { BoardsPage };
