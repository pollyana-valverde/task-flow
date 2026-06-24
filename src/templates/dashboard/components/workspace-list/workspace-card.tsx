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
import { RoleBadge } from "./role-badge";
import { MemberAvatar } from "./member-avatar";
import Link from "next/link";

interface WorkspaceCardProps {
  workspace: {
    id: string;
    title: string;
    ownerId: string;
    membersCount: number;
    boardsCount: number;
    createdAt: Date;
    updatedAt: Date;
    members: {
      workspaceId: string;
      userId: string;
      name: string;
      image: string | null;
      role: "owner" | "admin" | "member";
    }[];
  };
}

function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center px-(--card-spacing)">
        <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-lime-800 text-white">
          <Text variant="heading-1">
            {workspace.title.split("")[0].toUpperCase()}
          </Text>
        </div>
        <RoleBadge members={workspace.members} />
      </div>

      <div className="flex gap-2 items-center">
        <CardHeader className="flex-1">
          <Text variant="heading-2" className="text-lime-950 truncate">
            {workspace.title}
          </Text>
          <CardDescription className="text-lime-950/60">
            Criado em{" "}
            {workspace.createdAt.toLocaleDateString("pt-br", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 items-end">
          <Text className="text-lime-950/60">
            <strong className="text-lime-950">{workspace.boardsCount}</strong>{" "}
            {workspace.boardsCount === 1 ? "board" : "boards"}
          </Text>
          <Text className="text-lime-950/60">
            <strong className="text-lime-950">{workspace.membersCount}</strong>{" "}
            {workspace.membersCount === 1 ? "membro" : "membros"}
          </Text>
        </CardContent>
      </div>

      <CardFooter className="justify-between">
        <MemberAvatar members={workspace.members} />
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-lime-950/60 group hover:bg-lime-950/5 hover:text-lime-950 px-3"
        >
          <Link href={`/workspaces/${workspace.id}/boards`}>
            Abrir{" "}
            <ArrowRight className="group-hover:text-lime-950 text-lime-950/60" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export { WorkspaceCard };
