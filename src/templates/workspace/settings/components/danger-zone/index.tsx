import { Text } from "@/components/ui/text";
import { DeleteWorkspaceAction } from "./delete-workspace-action";
import { TransferOwnershipAction } from "./transfer-ownership-action";

function DangerZone({ workspaceId }: { workspaceId: string }) {
  return (
    <div className="bg-popover px-6 py-7 rounded-2xl border border-destructive flex flex-col gap-5.5">
      <Text className="text-destructive font-semibold">Zona de perigo</Text>

      <DeleteWorkspaceAction workspaceId={workspaceId} />

      <TransferOwnershipAction />
    </div>
  );
}

export { DangerZone };
