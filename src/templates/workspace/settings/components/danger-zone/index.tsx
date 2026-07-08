import { Text } from "@/components/ui/text";
import { DeleteWorkspaceAction } from "./delete-workspace-action";
import { TransferOwnershipAction } from "./transfer-ownership-action";
import { listMembers } from "@/http/members/list-members";

async function DangerZone({ workspaceId }: { workspaceId: string }) {
  const members = await listMembers({ workspaceId });

  return (
    <div className="bg-popover px-6 py-7 rounded-2xl border border-destructive flex flex-col gap-5.5">
      <Text className="text-destructive font-semibold">Zona de perigo</Text>

      <DeleteWorkspaceAction workspaceId={workspaceId} />

      <TransferOwnershipAction workspaceId={workspaceId} members={members} />
    </div>
  );
}

export { DangerZone };
