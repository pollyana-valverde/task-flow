import { Text } from "@/components/ui/text";
import { getSession } from "@/lib/auth/get-session";
import { Crown } from "lucide-react";

interface RoleBadgeProps {
  members: {
    userId: string;
    role: "owner" | "admin" | "member";
  }[];
}

async function RoleBadge({ members }: RoleBadgeProps) {
  const session = await getSession();

  const member = members.find((member) => member.userId === session?.user.id);

  return (
    <>
      {member?.role === "owner" && (
        <div className="px-2.5 py-1 rounded-md bg-secondary border border-foreground/20">
          <Text
            variant="mono"
            className="text-foreground/80 font-mono flex gap-1 items-center"
          >
            <Crown className="h-3 w-3" /> Dono
          </Text>
        </div>
      )}
      {member?.role === "admin" && (
        <div className="px-2.5 py-1 rounded-md bg-foreground/20 border border-foreground/40">
          <Text
            variant="mono"
            className="text-foreground font-mono flex gap-1 items-center"
          >
            Admin
          </Text>
        </div>
      )}
      {member?.role === "member" && (
        <div className="px-2.5 py-1 rounded-md bg-lime-950/5 border border-lime-950/30">
          <Text
            variant="mono"
            className="text-lime-950/60 font-mono flex gap-1 items-center"
          >
            Membro
          </Text>
        </div>
      )}
    </>
  );
}

export { RoleBadge };
