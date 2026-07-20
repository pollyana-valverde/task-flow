import { listColumns } from "@/http/columns/list-columns";
import { TaskCard } from "./task-card";
import { TabsContent } from "@/components/ui/tabs";
import { ColumnsList } from "../columns-list";
import { TaskList } from "../tasks-list";
import { NewColumnDialog } from "../../new-column-dialog";

interface CompactedTabProps {
  boardId: string
  workspaceId: string
}

async function CompactedTab({ boardId, workspaceId }: CompactedTabProps) {
  const columns = await listColumns({ boardId });

  return (
    <TabsContent value="compacted" className="flex gap-4">
      {columns.map((column) => (
        <ColumnsList key={column.id} column={column} workspaceId={workspaceId}>
          <TaskList tasks={column.tasks}>
              {column.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </TaskList>
        </ColumnsList>
      ))}
      <NewColumnDialog boardId={boardId} />
    </TabsContent>

  );
}
export { CompactedTab };
