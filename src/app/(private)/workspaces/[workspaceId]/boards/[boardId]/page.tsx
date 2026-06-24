interface BoardDetailsPageProps {
  params: Promise<{
    workspaceId: string;
    boardId: string;
  }>;
}

export default async function BoardDetails({ params }: BoardDetailsPageProps) {
  const { boardId } = await params;
  return <div>teste de board {boardId}</div>;
}
