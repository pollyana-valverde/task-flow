import {
  Header,
  HeaderAction,
  HeaderContent,
  HeaderSubtitle,
  HeaderTitle,
} from "@/components/ui/header";
import type { listMembersResultSchema } from "@/http/members/list-members";
import type z from "zod";
import { InviteMemberDialog } from "../invite-member-dialog";

interface DashboardHeaderProps {
  members: z.infer<typeof listMembersResultSchema>;
  workspaceId: string;
  sessionUserMemberRole: {
    role: "member" | "admin" | "owner";
  };
}

function MembersHeader({
  members,
  workspaceId,
  sessionUserMemberRole,
}: DashboardHeaderProps) {
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
      {sessionUserMemberRole.role !== "member" && (
        <HeaderAction>
          <InviteMemberDialog workspaceId={workspaceId} />
        </HeaderAction>
      )}
    </Header>
  );
}

export { MembersHeader };
