import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";
import { capitalizeFirtLetter } from "@/utils/captalize-first-letter";
import { ArrowRight, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { DeleteBoardDialog } from "./delele-board-dialog";

interface BoardCardProps {
  board: {
    id: string;
    title: string;
    workspaceId: string;
    columnsCount: number;
    updatedAt: Date;
  };
  workspaceId: string;
}

function BoardCard({ board, workspaceId }: BoardCardProps) {
  return (
    <Card className="gap-4 py-5 hover:border hover:border-foreground dark:hover:border-primary">
      <CardHeader className="flex gap-3 flex-1 items-center">
        <div className="bg-lime-800 rounded-full size-3" />
        <CardTitle className="flex-1">
          <Text variant="h3" className="truncate">
            {capitalizeFirtLetter(board.title)}
          </Text>
        </CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DeleteBoardDialog board={board}>
                <div className="cursor-default text-destructive items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-hidden select-none hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive dark:focus:bg-destructive/20 dark:hover:bg-destructive/20">
                  Excluir
                </div>
              </DeleteBoardDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      <CardContent className="flex gap-2">
        {board.columnsCount === 0 ? (
          <div className="bg-muted/75 h-1.5 w-full rounded-full" />
        ) : (
          Array.from({ length: board.columnsCount }).map((_) => (
            <div
              key={Math.random()}
              className="bg-primary h-1.5 w-full rounded-full"
            />
          ))
        )}
      </CardContent>

      <CardFooter className="justify-between">
        <Text variant="mono" className="truncate">
          {board.columnsCount} {board.columnsCount === 1 ? "coluna" : "colunas"}{" "}
          · atualizado em{" "}
          {board.updatedAt.toLocaleDateString("pt-br", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })}
        </Text>
        <Button asChild variant="ghost" size="sm" className="text-sm group">
          <Link href={`/workspaces/${workspaceId}/boards/${board.id}`}>
            Abrir{" "}
            <ArrowRight className="group-hover:text-foreground text-foreground/70 size-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export { BoardCard };
