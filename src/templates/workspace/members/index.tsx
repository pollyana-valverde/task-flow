import { getMyMembership } from "@/http/members/get-my-membership";
import { listMembers } from "@/http/members/list-members";
import { MembersHeader } from "./components/header";
import { MembersTable } from "./components/members-table";

async function MembersPage({ workspaceId }: { workspaceId: string }) {
  const members = await listMembers({ workspaceId });
  const sessionUserMemberRole = await getMyMembership({ workspaceId });

  return (
    <div className="space-y-6">
      <MembersHeader members={members} workspaceId={workspaceId}
      sessionUserMemberRole={sessionUserMemberRole}
      />
      <MembersTable
        members={members}
        workspaceId={workspaceId}
        sessionUserMemberRole={sessionUserMemberRole}
      />
    </div>
  );
}

export { MembersPage };
