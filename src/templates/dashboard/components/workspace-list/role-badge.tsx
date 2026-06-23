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
        <div className="px-2.5 py-1 rounded-md bg-lime-400/50 border border-lime-900/50">
          <Text
            variant="caption"
            className="text-lime-800 font-mono font-black flex gap-1 items-center"
          >
            <Crown className="h-3 w-3" /> Dono
          </Text>
        </div>
      )}
      {member?.role === "admin" && (
        <div className="px-2.5 py-1 rounded-md bg-lime-950/5 border border-lime-950">
          <Text
            variant="caption"
            className="text-lime-950 font-mono font-black flex gap-1 items-center"
          >
            Admin
          </Text>
        </div>
      )}
      {member?.role === "member" && (
        <div className="px-2.5 py-1 rounded-md bg-lime-950/5 border border-lime-950/30">
          <Text
            variant="caption"
            className="text-lime-950/60 font-mono font-black flex gap-1 items-center"
          >
            Membro
          </Text>
        </div>
      )}
    </>
  );
}

export { RoleBadge };
