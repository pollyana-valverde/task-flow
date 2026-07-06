import {
  Header,
  HeaderContent,
  HeaderSubtitle,
  HeaderTitle,
  HeaderAction,
} from "@/components/ui/header";
import z from "zod";
import { InviteMemberDialog } from "../invite-member-dialog";
import { listMembersResultSchema } from "@/http/members/list-members";

interface DashboardHeaderProps {
  members: z.infer<typeof listMembersResultSchema>;
  workspaceId: string;
}

function MembersHeader({ members, workspaceId }: DashboardHeaderProps) {
  return (
    <Header>
      <HeaderContent>
        <HeaderTitle>Membros</HeaderTitle>
        <HeaderSubtitle>
          {members.length === 1
            ? `${members.length} membro ativo`
            : `${members.length} membros ativos`}{" "}
          · 1 convite pendente
        </HeaderSubtitle>
      </HeaderContent>
      <HeaderAction>
        <InviteMemberDialog workspaceId={workspaceId} />
      </HeaderAction>
    </Header>
  );
}

export { MembersHeader };
