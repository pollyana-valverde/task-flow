import { CoreButton } from "@/components/ui/form/core-button";
import { Text } from "@/components/ui/text";
import { Plus } from "lucide-react";

function DashboardHeader() {
  return (
    <div className="flex flex-col items-center md:flex-row justify-between gap-2">
      <div className="flex flex-col gap-0.5">
        <Text variant="heading-1" className="text-lime-950">
          Meus workspaces
        </Text>
        <Text variant="content" className="text-lime-950/80">
          3 de 10 workspaces · você é membro de todos abaixo
        </Text>
      </div>
      <CoreButton>
        <Plus />
        Novo workspace
      </CoreButton>
    </div>
  );
}

export { DashboardHeader };
