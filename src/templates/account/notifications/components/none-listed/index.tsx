import {
    NoneCreated,
    NoneCreatedContent,
    NoneCreatedIcon,
    NoneCreatedSubtitle,
    NoneCreatedTitle,
} from "@/components/ui/none-created";
import { Bell } from "lucide-react";

function NoneNotificationListed() {
  return (
    <NoneCreated className="h-84.5">
      <NoneCreatedIcon Icon={Bell} />
      <NoneCreatedContent>
        <NoneCreatedTitle>Tudo em dia!</NoneCreatedTitle>
        <NoneCreatedSubtitle>
          Você não tem novas notificações. Quando algo acontecer nos seus
          boards, aparece aqui.
        </NoneCreatedSubtitle>
      </NoneCreatedContent>
    </NoneCreated>
  );
}

export { NoneNotificationListed };
