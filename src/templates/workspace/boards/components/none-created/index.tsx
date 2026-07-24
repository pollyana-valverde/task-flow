import {
  NoneCreated,
  NoneCreatedAction,
  NoneCreatedContent,
  NoneCreatedIcon,
  NoneCreatedSubtitle,
  NoneCreatedTitle,
} from "@/components/ui/none-created";
import { getMyMembership } from "@/http/members/get-my-membership";
import { LayoutGrid } from "lucide-react";
import { NewBoardDialog } from "../new-board-dialog";

async function NoneBoardCreated({ workspaceId }: { workspaceId: string }) {
  const sessionUserMemberRole = await getMyMembership({ workspaceId });

  return (
    <NoneCreated>
      <NoneCreatedIcon Icon={LayoutGrid} />
      <NoneCreatedContent>
        <NoneCreatedTitle>
          {sessionUserMemberRole.role !== "member"
            ? "Crie seu primeiro board"
            : "Nenhum board criado"}
        </NoneCreatedTitle>
        <NoneCreatedSubtitle>
          Boards são quadros kanban com colunas e tarefas.
        </NoneCreatedSubtitle>
      </NoneCreatedContent>
      {sessionUserMemberRole.role !== "member" && (
        <NoneCreatedAction>
          <NewBoardDialog workspaceId={workspaceId} />
        </NoneCreatedAction>
      )}
    </NoneCreated>
  );
}

export { NoneBoardCreated };
