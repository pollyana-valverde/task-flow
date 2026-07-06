import { listMembers } from "@/http/members/list-members";
import { MembersHeader } from "./components/header";
import { MembersTable } from "./components/members-table";

async function MembersPage({ workspaceId }: { workspaceId: string }) {
  const members = await listMembers({ workspaceId });

  return (
    <div className="space-y-6">
      <MembersHeader members={members} workspaceId={workspaceId} />
      <MembersTable members={members} />
    </div>
  );
}

export { MembersPage };
