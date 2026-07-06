import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { getNameInitials } from "@/utils/get-name-initials";

interface MemberCellProps {
  status: "active" | "pending" | "declined";
  joinedAt: Date;
  user: {
    name: string;
    email: string;
    image: string | null;
  };
}

function MemberCell({ user, status, joinedAt }: MemberCellProps) {
  return (
    <TableCell className="flex items-center gap-3">
      {status === "pending" ? (
        <>
          <Avatar size="lg">
            <AvatarFallback className="bg-muted border-dashed border border-muted-foreground/50 text-muted-foreground/75">
              ?
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Text
              variant="sm"
              className="leading-tight text-foreground/75 font-semibold"
            >
              {user.email}
            </Text>
            <Text variant="mono">
              Convite enviado em {joinedAt.toLocaleDateString("pt-BR")}
            </Text>
          </div>
        </>
      ) : (
        <>
          <Avatar size="lg">
            {user.image && <AvatarImage src={user.image} alt={user.name} />}
            <AvatarFallback
              className={cn(
                !user.image && "bg-lime-900 text-white font-bold font-heading",
              )}
            >
              {getNameInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Text
              variant="sm"
              className="leading-tight text-foreground font-semibold"
            >
              {user.name}
            </Text>
            <Text variant="mono">{user.email}</Text>
          </div>
        </>
      )}
    </TableCell>
  );
}

export { MemberCell };
