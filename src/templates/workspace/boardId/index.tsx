import { Tabs } from "@/components/ui/tabs";
import { CompactedTab } from "./components/tab-content/compacted-tab";
import { DetailedTab } from "./components/tab-content/detailed-tab";
import { TabBoardDetailsHeader } from "./components/tab-header";

interface BoardDetailsPageProps {
  boardId: string;
  workspaceId: string;
}

function BoardDetailsPage({ boardId, workspaceId }: BoardDetailsPageProps) {
  return (
    <Tabs defaultValue="detailed">
      <TabBoardDetailsHeader />
      <DetailedTab boardId={boardId} workspaceId={workspaceId} />
      <CompactedTab boardId={boardId} workspaceId={workspaceId} />
    </Tabs>
  );
}

export { BoardDetailsPage };
