import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface BoardCardProps {
  board: {
    id: string;
    title: string;
    workspaceId: string;
    columnsCount: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

function BoardCard({ board }: BoardCardProps) {
  return (
    <Card>
      <CardHeader className="flex gap-3 flex-1 items-center">
        <div className="bg-lime-500 rounded-full w-3 h-3" />
        <Text variant="heading-2" className="text-lime-950 truncate">
          {board.title}
        </Text>
      </CardHeader>

      <CardContent className="flex gap-2">
        {Array.from({ length: board.columnsCount }).map((_, i) => (
          <div key={i} className="bg-lime-500 h-1.5 w-full rounded-full" />
        ))}
      </CardContent>

      <CardFooter className="justify-between">
        <Text className="text-lime-950/60 font-mono" variant="content">
          {board.columnsCount} {board.columnsCount === 1 ? "coluna" : "colunas"}
        </Text>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-lime-950/60 group hover:bg-lime-950/5 hover:text-lime-950 px-3"
        >
          <Link href={`/workspaces/${board.id}/boards`}>
            Abrir{" "}
            <ArrowRight className="group-hover:text-lime-950 text-lime-950/60" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export { BoardCard };
