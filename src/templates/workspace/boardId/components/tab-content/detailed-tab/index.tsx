import { TabsContent } from "@/components/ui/tabs";
import { listColumns } from "@/http/columns/list-columns";
import { NewColumnDialog } from "../../column-actions/new-column-dialog";
import { ColumnsList } from "../columns-list";
import { TaskDialog } from "../task-dialog";
import { TaskList } from "../tasks-list";
import { TaskCard } from "./task-card";

interface DetailedTabProps {
  boardId: string;
  workspaceId: string;
}

async function DetailedTab({ boardId, workspaceId }: DetailedTabProps) {
  const columns = await listColumns({ boardId });

  return (
    <TabsContent value="detailed" className="flex gap-4">
      {columns.map((column) => (
        <ColumnsList key={column.id} column={column} workspaceId={workspaceId}>
          <TaskList tasks={column.tasks}>
            {column.tasks.map((task) => (
              <TaskDialog
                key={task.id}
                taskId={task.id}
                columnName={column.title}
              >
                <TaskCard task={task} />
              </TaskDialog>
            ))}
          </TaskList>
        </ColumnsList>
      ))}
      <NewColumnDialog boardId={boardId} />
    </TabsContent>
  );
}
export { DetailedTab };
