import { getWorkspace } from "@/http/workspaces/get-workspace";
import { BoardsHeader } from "./components/header";
import { BoardList } from "./components/board-list";
import { NoneCreated } from "./components/none-created";
import { listBoards } from "@/http/boards/list-boards";

async function BoardsPage({ workspaceId }: { workspaceId: string }) {
  const workspace = await getWorkspace({ workspaceId });
  const boards = await listBoards({ workspaceId });

  return (
    <div className="space-y-6">
      {boards.length === 0 ? (
        <NoneCreated workspaceId={workspaceId} />
      ) : (
        <>
          <BoardsHeader workspace={workspace} workspaceId={workspaceId} />
          <BoardList boards={boards} workspaceId={workspaceId} />
        </>
      )}
    </div>
  );
}

export { BoardsPage };
