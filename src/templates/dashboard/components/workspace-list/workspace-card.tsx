import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { ArrowRight, Crown } from "lucide-react";
import { RoleBadge } from "./role-badge";

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
      image: string;
      role: "owner" | "admin" | "member";
    }[];
  };
}

function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  function getInitials(name: string): string {
    const parts = name.split(" ");
    const firstLetter = parts[0]?.[0] ?? "";
    const lastLetter = parts[parts.length - 1]?.[0] ?? "";

    return `${firstLetter}${lastLetter}`.toUpperCase();
  }

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
            Criado em {workspace.createdAt.toDateString()}
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
        <AvatarGroup>
          {workspace.members.map((member) => (
            <Avatar key={member.userId}>
              {member.image && (
                <AvatarImage src={member.image} alt={member.image} />
              )}
              <AvatarFallback
                className={cn(
                  !member.image && "bg-lime-900 text-white text-xs font-medium",
                )}
              >
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
          ))}
          {workspace.members.length > 4 && (
            <AvatarGroupCount className="bg-lime-100 text-lime-950/60 border border-lime-950/10">
              +{workspace.members.length}
            </AvatarGroupCount>
          )}
        </AvatarGroup>

        <Button
          variant="ghost"
          size="sm"
          className="text-lime-950/60 group hover:bg-lime-950/5 hover:text-lime-950 px-3"
        >
          Abrir{" "}
          <ArrowRight className="group-hover:text-lime-950 text-lime-950/60" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export { WorkspaceCard };
