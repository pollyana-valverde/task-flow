import { NotificationBell } from "@/components/ui/header/notification-bell";
import { ThemeSwitcher } from "@/components/ui/header/theme-switcher";
import { Text } from "@/components/ui/text";
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
      <div className="h-11.5 flex flex-1 gap-2 items-center">
        <div className="size-3 bg-lime-800 rounded-full" />
        <Text variant="h2">{board.title}</Text>
      </div>
      <div className="flex justify-end items-center gap-3">
        <ThemeSwitcher />
        <NotificationBell />
      </div>
    </>
  );
}
