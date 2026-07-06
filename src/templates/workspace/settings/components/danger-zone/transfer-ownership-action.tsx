import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

function TransferOwnershipAction() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <Text className="text-foreground">Transferir propriedade</Text>
        <Text variant="mono">
          Você deixará de ser o dono e passará a ser admin. Esta ação é
          permanente.
        </Text>
      </div>
      <Button variant="destructive">Transferir propriedade</Button>
    </div>
  );
}

export { TransferOwnershipAction };
