import { Text } from "@/components/ui/text";
import { LayersPlus } from "lucide-react";

function NoneCreated() {
  return (
    <div className="w-full h-full p-10 rounded-xl border border-b-3 border-r-3 border-lime-950 bg-white flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col gap-2.5 items-center">
        <Text variant="heading-1" className="text-lime-950">
          Você ainda não faz parte de nenhum workspace
        </Text>
      </div>
      <Text className="text-lime-950/60">
        Crie seu primeiro workspace para começar a organizar boards e tarefas
        com seu time.
      </Text>
    </div>
  );
}

export { NoneCreated };
