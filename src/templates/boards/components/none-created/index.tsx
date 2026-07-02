import { Text } from "@/components/ui/text";
import { Layers } from "lucide-react";
import { NewBoardDialog } from "../new-board-dialog";

function NoneCreated({ workspaceId }: { workspaceId: string }) {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center gap-6">
      <div className="bg-secondary dark:bg-secondary/70 border-2 border-dashed border-primary rounded-2xl p-5.5">
        <Layers className="size-10 text-chart-3/80" />
      </div>
      <div className="flex flex-col gap-2 items-center text-center">
        <Text variant="h1">Crie seu primeiro board</Text>
        <Text className="text-muted-foreground/75 max-w-sm">
          Boards são quadros kanban com colunas e tarefas. Comece com um modelo
          ou em branco.
        </Text>
      </div>
      <NewBoardDialog workspaceId={workspaceId} />
    </div>
  );
}

export { NoneCreated };
