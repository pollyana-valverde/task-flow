import { TabsList, TabsTrigger } from "@/components/ui/tabs";

function TabBoardDetailsHeader() {
  return (
    <div className="py-3 -mt-8 ">
      <TabsList>
        <TabsTrigger value="detailed">Detalhado</TabsTrigger>
        <TabsTrigger value="compacted">Compacto</TabsTrigger>
      </TabsList>
    </div>
  );
}

export { TabBoardDetailsHeader };
