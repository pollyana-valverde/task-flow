import { BoardDetailsPage } from "@/templates/workspace/boardId";

interface BoardDetailsPageProps {
  params: Promise<{
    workspaceId: string;
    boardId: string;
  }>;
}

export default async function BoardDetails({ params }: BoardDetailsPageProps) {
  const { boardId } = await params;

  return <BoardDetailsPage boardId={boardId} />;
}
