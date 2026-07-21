import { Badge } from "@/components/ui/badge";
import { cva, type VariantProps } from "class-variance-authority";
import { Crown } from "lucide-react";

const roleBadgeBadgeVariants = cva("normal-case", {
  variants: {
    variant: {
      owner:
        "text-lime-700 bg-lime-200 border-lime-400 dark:text-lime-200 dark:bg-lime-700",
      admin:
        "text-zinc-700 bg-zinc-200 border-zinc-400 dark:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-950",
      member:
        "text-zinc-500 bg-zinc-200 dark:bg-zinc-600/80 dark:text-zinc-200/60",
    },
  },
});

interface RoleBadgeProps extends VariantProps<typeof roleBadgeBadgeVariants> {
  role: "owner" | "admin" | "member" | undefined;
}

function RoleBadge({ variant, role }: RoleBadgeProps) {
  return (
    <Badge className={roleBadgeBadgeVariants({ variant })}>
      {role === "owner" && (
        <div className="flex gap-1">
          <Crown className="size-3 text-lime-700 dark:text-lime-200 translate-y-0.5" />{" "}
          Dono
        </div>
      )}
      {role === "admin" && "Admin"}
      {role === "member" && "Membro"}
      {role === undefined && "?"}
    </Badge>
  );
}

export { RoleBadge };
