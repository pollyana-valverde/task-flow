import { Text } from "@/components/ui/text";
import { LayersPlus } from "lucide-react";

function NoneCreated() {
  return (
    <div className="w-full h-full p-10 rounded-xl border border-b-3 border-r-3 border-lime-950 bg-white flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col gap-2.5 items-center">
        <Text variant="heading-1" className="text-lime-950">
          Nenhum board criado ainda
        </Text>
      </div>
      <Text className="text-lime-950/60">
        Crie um board para organizar tarefas em colunas kanban.
      </Text>
    </div>
  );
}

export { NoneCreated };
