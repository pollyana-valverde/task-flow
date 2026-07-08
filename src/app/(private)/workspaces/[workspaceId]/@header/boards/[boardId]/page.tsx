interface DefaultBoardHeaderProps {
  params: Promise<{ workspaceId: string; boardId: string }>;
}

export default async function DefaultBoardHeader({
  params,
}: DefaultBoardHeaderProps) {
  const { boardId } = await params;

  // aqui você buscaria o board pelo boardsId (fetch/query própria)
  // const board = await getBoard(boardsId);

  return (
    <div className="h-11.5">
      <h1 className="text-lg font-semibold">{boardId}</h1>
    </div>
  );
}
