import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";
import { listMembers } from "@/http/members/list-members";
import { capitalizeFirtLetter } from "@/utils/captalize-first-letter";
import { MoreHorizontalIcon, Plus } from "lucide-react";
import { DeleteColumnDialog } from "../column-actions/delete-column-dialog";
import { UpdateColumnDialog } from "../column-actions/update-column-dialog";
import { NewTaskDialog } from "../new-task-dialog";
import type { TaskProps } from "./type";

interface ColumnsLIstProps {
  workspaceId: string;
  children: React.ReactNode;
  column: {
    id: string;
    title: string;
    boardId: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: TaskProps[];
  };
}

async function ColumnsList({
  column,
  children,
  workspaceId,
}: ColumnsLIstProps) {
  const members = await listMembers({ workspaceId });

  return (
    <div key={column.id} className="space-y-3 min-w-67">
      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-2">
          <div className="size-2.5 bg-lime-800 rounded-full mb-0.5" />
          <Text variant="sm" className="font-bold text-foreground">
            {capitalizeFirtLetter(column.title)}
          </Text>
          <div className="bg-muted rounded-md px-2 ">
            <Text variant="mono">{column.tasks.length}</Text>
          </div>
        </div>
        <NewTaskDialog columnId={column.id} members={members}>
          <div className="p-1 rounded-md hover:bg-muted text-muted-foreground/75 hover:text-muted-foreground mr-1">
            <Plus className="size-4 " />
          </div>
        </NewTaskDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <UpdateColumnDialog column={column}>
              <div className="cursor-default items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-hidden select-none focus:bg-muted focus:text-accent-foreground hover:bg-accent">
                Editar
              </div>
            </UpdateColumnDialog>
            <DropdownMenuSeparator />
            <DeleteColumnDialog column={column}>
              <div className="cursor-default text-destructive items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-hidden select-none hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive dark:focus:bg-destructive/20 dark:hover:bg-destructive/20">
                Excluir
              </div>
            </DeleteColumnDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
      <NewTaskDialog columnId={column.id} members={members}>
        <Button variant="outline" className="w-full h-fit">
          <Plus className="mr-1" />
          Adicionar Tarefa
        </Button>
      </NewTaskDialog>
    </div>
  );
}
export { ColumnsList };
