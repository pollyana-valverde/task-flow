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
    image: string;
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
        <AvatarGroupCount className="bg-lime-100 text-lime-950/60 border border-lime-950/10">
          +{members.length}
        </AvatarGroupCount>
      )}
    </AvatarGroup>
  );
}

export { MemberAvatar };
