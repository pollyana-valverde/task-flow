import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabBoardDetailsHeader } from "./components/tab-header";
import { CompactedTab } from "./components/compacted-tab";
import { DetailedTab } from "./components/detailed-tab";

function BoardDetailsPage({ boardId }: { boardId: string }) {
  return (
    <Tabs defaultValue="detailed">
      <TabBoardDetailsHeader />
      <DetailedTab boardId={boardId} />
      <CompactedTab boardId={boardId} />
    </Tabs>
  );
}

export { BoardDetailsPage };
