import { listColumns } from "@/http/columns/list-columns";
import { TabContent } from "../tab-content";
import { TaskCard } from "./components/task-card";

async function CompactedTab({ boardId }: { boardId: string }) {
  const columns = await listColumns({ boardId });

  return (
    <TabContent tabValue="compacted" boardId={boardId} columns={columns} >
      {columns.map((column) => (
        (column.tasks.map((task) => (
          <TaskCard task={task}/>
        )))
      ))}
    </TabContent>

  );
}
export { CompactedTab };
