import { getSession } from "@/lib/auth/get-session";
import Link from "next/link";

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
import { MemberAvatar } from "./member-avatar";
import { capitalizeFirtLetter } from "@/utils/captalize-first-letter";
import { RoleBadge } from "@/components/ui/role-badge";

interface WorkspaceCardProps {
  workspace: {
    id: string;
    title: string;
    membersCount: number;
    boardsCount: number;
    createdAt: Date;
    members: {
      userId: string;
      name: string;
      image: string | null;
      role: "owner" | "admin" | "member";
    }[];
  };
}

async function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const session = await getSession();

  const member = workspace.members.find(
    (member) => member.userId === session?.user.id,
  );

  return (
    <Card className="shadow-[4px_4px_0] border-2 border-foreground dark:border-lime-700 dark:shadow-lime-700 gap-5">
      <div className="flex justify-between items-center px-(--card-spacing)">
        <div className="size-12 flex items-center justify-center rounded-xl bg-primary text-lime-950 border-2 border-lime-950 dark:border-lime-700">
          <Text variant="h2">{workspace.title.charAt(0).toUpperCase()}</Text>
        </div>
        <RoleBadge role={member?.role} variant={member?.role} />
      </div>

      <div className="flex gap-2 items-center">
        <CardHeader className="flex-1 gap-0">
          <Text variant="h2" className="truncate">
            {capitalizeFirtLetter(workspace.title)}
          </Text>
          <CardDescription>
            <Text variant="mono">
              Criado em{" "}
              {workspace.createdAt.toLocaleDateString("pt-br", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-1 items-end">
          <Text variant="mono">
            <strong className="text-foreground">{workspace.boardsCount}</strong>{" "}
            {workspace.boardsCount === 1 ? "board" : "boards"}
          </Text>
          <Text variant="mono">
            <strong className="text-foreground">
              {workspace.membersCount}
            </strong>{" "}
            {workspace.membersCount === 1 ? "membro" : "membros"}
          </Text>
        </CardContent>
      </div>

      <hr className="border-muted mx-(--card-spacing) -mb-1.5" />

      <CardFooter className="justify-between">
        <MemberAvatar members={workspace.members} />
        <Button asChild variant="ghost" size="sm" className=" group">
          <Link href={`/workspaces/${workspace.id}/boards`}>
            Abrir{" "}
            <ArrowRight className="group-hover:text-foreground text-foreground/70 " />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export { WorkspaceCard };
