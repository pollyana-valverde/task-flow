import { Text } from "@/components/ui/text";
import { Layers } from "lucide-react";
import { NewWorkspaceDialog } from "../header/new-wokspace-dialog";

function NoneCreated() {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center gap-6">
      <div className="bg-secondary dark:bg-secondary/70 border-2 border-dashed border-primary rounded-2xl p-5.5">
        <Layers className="size-10 text-chart-3/80" />
      </div>
      <div className="flex flex-col gap-2 items-center  text-center">
        <Text variant="h1">Nenhum workspace ainda</Text>
        <Text className="text-muted-foreground/75 max-w-sm">
          Crie seu primeiro workspace para agrupar boards e convidar seu time.
        </Text>
      </div>
      <NewWorkspaceDialog />
    </div>
  );
}

export { NoneCreated };
