import { listMembers } from "@/http/members/list-members";
import { getSession } from "@/lib/auth/get-session";
import { MembersHeader } from "./components/header";
import { MembersTable } from "./components/members-table";

async function MembersPage({ workspaceId }: { workspaceId: string }) {
  const members = await listMembers({ workspaceId });
  const session = await getSession();

  return (
    <div className="space-y-6">
      <MembersHeader members={members} workspaceId={workspaceId} />
      <MembersTable
        members={members}
        workspaceId={workspaceId}
        sessionUserId={session?.user.id}
      />
    </div>
  );
}

export { MembersPage };
