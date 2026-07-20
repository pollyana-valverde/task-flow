import { BoardDetailsPage } from "@/templates/workspace/boardId";

interface BoardDetailsPageProps {
  params: Promise<{
    workspaceId: string;
    boardId: string;
  }>;
}

export default async function BoardDetails({ params }: BoardDetailsPageProps) {
  const { boardId, workspaceId } = await params;

  return <BoardDetailsPage boardId={boardId} workspaceId={workspaceId} />;
}
