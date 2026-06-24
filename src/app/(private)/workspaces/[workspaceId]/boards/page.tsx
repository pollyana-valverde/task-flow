import { BoardsPage } from "@/templates/boards";

interface BoardsPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function Boards({ params }: BoardsPageProps) {
  const { workspaceId } = await params;

  return <BoardsPage workspaceId={workspaceId} />;
}
