import { Text } from "@/components/ui/text";
import { Plus } from "lucide-react";

interface TaskListProps {
  tasks: TaskProps[];
  children: React.ReactNode
}

function TaskList({ tasks, children}: TaskListProps) {
  return (
    <>
      {tasks.length === 0 && (
        <div className="py-7.5 px-4 flex flex-col justify-center items-center bg-popover/70 border-3 border-dashed border-muted rounded-xl">
          <div className="bg-secondary dark:bg-secondary/70 border-2 border-dashed border-primary rounded-xl p-2.5 mb-3">
            <Plus className="size-5 text-chart-3/80"/>
          </div>
          <Text variant="sm" className="text-foreground">Nenhuma tarefa criada</Text>
          <Text variant="mono">Crie uma tarefa</Text>
        </div>
      )}
      {children}
    </>
  );
}

export { TaskList };
