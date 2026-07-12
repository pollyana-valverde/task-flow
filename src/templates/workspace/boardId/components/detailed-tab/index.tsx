import { listColumns } from "@/http/columns/list-columns";
import { TabContent } from "../tab-content";
import { TaskCard } from "./components/task-card";

async function DetailedTab({ boardId }: { boardId: string }) {
  const columns = await listColumns({ boardId });

  return (
    <TabContent tabValue="detailed" boardId={boardId} columns={columns} >
      {columns.map((column) => (
        (column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        )))
      ))}
    </TabContent>

  );
}
export { DetailedTab };
