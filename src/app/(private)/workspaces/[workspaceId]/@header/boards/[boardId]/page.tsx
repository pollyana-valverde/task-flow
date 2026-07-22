import { BoardIdHeader } from "@/components/layout/workspaces/boardId-header";
import { NotificationBell } from "@/components/ui/header/notification-bell";
import { ThemeSwitcher } from "@/components/ui/header/theme-switcher";
import { getBoard } from "@/http/boards/get-board";

interface DefaultBoardHeaderProps {
  params: Promise<{ workspaceId: string; boardId: string }>;
}

export default async function DefaultBoardHeader({
  params,
}: DefaultBoardHeaderProps) {
  const { boardId } = await params;

  const board = await getBoard({ boardId });

  return (
    <>
      <BoardIdHeader board={board} boardId={boardId} />
      <div className="flex justify-end items-center gap-3">
        <ThemeSwitcher />
        <NotificationBell />
      </div>
    </>
  );
}
