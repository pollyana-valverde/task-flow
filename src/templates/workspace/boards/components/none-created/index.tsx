import { LayoutGrid } from "lucide-react";
import { NewBoardDialog } from "../new-board-dialog";
import {
  NoneCreated,
  NoneCreatedAction,
  NoneCreatedContent,
  NoneCreatedIcon,
  NoneCreatedSubtitle,
  NoneCreatedTitle,
} from "@/components/ui/none-created";

function NoneBoardCreated({ workspaceId }: { workspaceId: string }) {
  return (
    <NoneCreated>
      <NoneCreatedIcon Icon={LayoutGrid} />
      <NoneCreatedContent>
        <NoneCreatedTitle>Crie seu primeiro board</NoneCreatedTitle>
        <NoneCreatedSubtitle>
          Boards são quadros kanban com colunas e tarefas. Comece com um modelo
          ou em branco.
        </NoneCreatedSubtitle>
      </NoneCreatedContent>
      <NoneCreatedAction>
        <NewBoardDialog workspaceId={workspaceId} />
      </NoneCreatedAction>
    </NoneCreated>
  );
}

export { NoneBoardCreated };
