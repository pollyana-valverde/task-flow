import { TabsContent } from "@/components/ui/tabs";
import { listColumns } from "@/http/columns/list-columns";
import { getMyMembership } from "@/http/members/get-my-membership";
import { NewColumnDialog } from "../../column-actions/new-column-dialog";
import { ColumnsList } from "../columns-list";
import { NoneColumnCreated } from "../none-created";
import { TaskDialog } from "../task-dialog";
import { TaskList } from "../tasks-list";
import { TaskCard } from "./task-card";

interface DetailedTabProps {
  boardId: string;
  workspaceId: string;
}

async function DetailedTab({ boardId, workspaceId }: DetailedTabProps) {
  const columns = await listColumns({ boardId });
  const sessionUserMemberRole = await getMyMembership({ workspaceId });

  return (
    <TabsContent
      value="detailed"
      className="flex gap-4 overflow-x-auto md:max-w-[calc(100vw-380px)]"
    >
      {columns.map((column) => (
        <ColumnsList key={column.id} column={column} workspaceId={workspaceId}>
          <TaskList tasks={column.tasks}>
            {column.tasks.map((task) => (
              <TaskDialog
                key={task.id}
                taskId={task.id}
                workspaceId={workspaceId}
                boardId={boardId}
                column={column}
              >
                <TaskCard task={task} />
              </TaskDialog>
            ))}
          </TaskList>
        </ColumnsList>
      ))}
      {sessionUserMemberRole.role !== "member" && (
        <NewColumnDialog boardId={boardId} />
      )}

      {sessionUserMemberRole.role === "member" && columns.length === 0 && (
        <NoneColumnCreated />
      )}
    </TabsContent>
  );
}
export { DetailedTab };
