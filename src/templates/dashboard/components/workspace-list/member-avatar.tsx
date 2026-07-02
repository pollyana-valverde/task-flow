import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getNameInitials } from "@/utils/get-name-initials";

interface MemberAvatarProps {
  members: {
    userId: string;
    name: string;
    image: string | null;
  }[];
}

function MemberAvatar({ members }: MemberAvatarProps) {
  return (
    <AvatarGroup>
      {members.map((member) => (
        <Avatar key={member.userId}>
          {member.image && (
            <AvatarImage src={member.image} alt={member.image} />
          )}
          <AvatarFallback
            className={cn(
              !member.image && "bg-lime-900 text-white text-xs font-medium",
            )}
          >
            {getNameInitials(member.name)}
          </AvatarFallback>
        </Avatar>
      ))}
      {members.length > 4 && (
        <AvatarGroupCount className="bg-lime-100 text-foreground/60 border border-foreground/10">
          +{members.length}
        </AvatarGroupCount>
      )}
    </AvatarGroup>
  );
}

export { MemberAvatar };
