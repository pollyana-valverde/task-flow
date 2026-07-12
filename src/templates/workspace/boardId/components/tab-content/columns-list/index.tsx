import { Text } from "@/components/ui/text";
import { capitalizeFirtLetter } from "@/utils/captalize-first-letter";
import { NewColumnDialog } from "../../new-column-dialog";
import { NewTaskDialog } from "../../new-task-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ColumnsLIstProps {
  boardId: string
  children: React.ReactNode
  columns: {
    id: string;
    title: string;
    boardId: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: TaskProps[]
  }[]
}

async function ColumnsList({ columns, children, boardId }:ColumnsLIstProps) {
  return (
    <>
      {columns.map((column) => (
        <div key={column.id} className="space-y-3 min-w-67">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-2.5 bg-lime-800 rounded-full mb-0.5" />
              <Text variant="sm" className="font-bold text-foreground">
                {capitalizeFirtLetter(column.title)}
              </Text>
              <div className="bg-muted rounded-md px-2 ">
                <Text variant="mono">{column.tasks.length}</Text>
              </div>
            </div>
            <NewTaskDialog columnId={column.id}>
              <div className="p-1 rounded-md hover:bg-muted text-muted-foreground/75 hover:text-muted-foreground mr-1">
                <Plus className="size-4 "/>
              </div>
            </NewTaskDialog>
          </div>
          {children}
          <NewTaskDialog columnId={column.id}>
            <Button variant="outline" className="w-full h-fit">
              <Plus className="mr-1" />
              Adicionar Tarefa
            </Button>
          </NewTaskDialog>
        </div>
      ))}

      <NewColumnDialog boardId={boardId} />
    </>
  );
}
export { ColumnsList };
