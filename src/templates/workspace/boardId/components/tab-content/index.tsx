import { TabsContent } from "@/components/ui/tabs";
import { TaskList } from "./tasks-list";
import { ColumnsList } from "./columns-list";

interface TabContentProps {
  children: React.ReactNode
  boardId: string;
  tabValue: "detailed" | "compacted";
  columns: {
    id: string;
    title: string;
    boardId: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: TaskProps[]
  }[];
}

async function TabContent({ boardId, tabValue, children, columns }: TabContentProps) {
  const tasks = columns.map((column) => column.tasks)[0]

  return (
    <TabsContent value={tabValue} className="flex gap-4">
      <ColumnsList boardId={boardId} columns={columns}>
        <TaskList tasks={tasks}>
          {children }
        </TaskList>
      </ColumnsList>
    </TabsContent>
  );
}
export { TabContent };
