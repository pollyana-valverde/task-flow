import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { getNameInitials } from "@/utils/get-name-initials";
import { PenLine } from "lucide-react";
import Link from "next/link";

interface UserInfoProps {
  user:
    | {
        image?: string | null;
        name: string;
        email: string;
      }
    | undefined;
}

async function UserInfo({ user }: UserInfoProps) {
  if (!user) {
    return;
  }

  return (
    <div className="border-2 border-lime-950 dark:border-lime-700 rounded-2xl shadow-[4px_4px_0] dark:shadow-lime-700 bg-popover px-7 py-6 relative overflow-hidden">
      <div className="bg-primary w-full h-1/3 absolute top-0 left-0" />
      <div className="flex flex-col gap-5.5">
        <div className="flex justify-between items-end">
          <div className="flex items-end gap-4">
            <Avatar className="size-20 outline-3 outline-popover rounded-2xl shadow-[0_2px_8px_0] shadow-primary-foreground/20">
              {user.image && (
                <AvatarImage
                  className="rounded-2xl"
                  src={user.image}
                  alt={user.name}
                />
              )}
              <AvatarFallback
                className={cn(
                  "rounded-2xl",
                  !user.image &&
                    "bg-lime-900 text-white font-bold font-heading text-2xl"
                )}
              >
                {getNameInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col z-1 mb-0.5">
              <Text
                variant="h2"
                className="leading-tight text-foreground text-2xl"
              >
                {user.name}
              </Text>
              <Text variant="sm" className="font-mono">
                {user.email}
              </Text>
            </div>
          </div>

          <Button asChild className="z-1" variant="secondary" size="sm">
            <Link href={"/settings"}>
              <PenLine className="mr-1" /> Editar perfil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export { UserInfo };
