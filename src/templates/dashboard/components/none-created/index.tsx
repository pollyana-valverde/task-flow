import {
  NoneCreated,
  NoneCreatedAction,
  NoneCreatedContent,
  NoneCreatedIcon,
  NoneCreatedSubtitle,
  NoneCreatedTitle,
} from "@/components/ui/none-created";
import { Layers } from "lucide-react";
import { NewWorkspaceDialog } from "../new-wokspace-dialog";

function NoneWorkspaceCreated() {
  return (
    <NoneCreated>
      <NoneCreatedIcon Icon={Layers} />
      <NoneCreatedContent>
        <NoneCreatedTitle>Nenhum workspace ainda</NoneCreatedTitle>
        <NoneCreatedSubtitle>
          Crie seu primeiro workspace para agrupar boards e convidar seu time.
        </NoneCreatedSubtitle>
      </NoneCreatedContent>
      <NoneCreatedAction>
        <NewWorkspaceDialog />
      </NoneCreatedAction>
    </NoneCreated>
  );
}

export { NoneWorkspaceCreated };
