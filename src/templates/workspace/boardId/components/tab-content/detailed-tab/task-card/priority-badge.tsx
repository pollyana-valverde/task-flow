import { Badge } from "@/components/ui/badge";
import { cva, type VariantProps } from "class-variance-authority";

const priorityBadgeVariants = cva("", {
  variants: {
    variant: {
      low: "text-foreground bg-muted",
      medium: "text-amber-700 bg-amber-200",
      high: "text-red-700 bg-red-200",
      urgent: "text-white bg-red-600",
    },
  },
});

interface PriorityBadgeProps
  extends VariantProps<typeof priorityBadgeVariants> {
  priority: "low" | "medium" | "high" | "urgent";
}

function PriorityBadge({ variant, priority }: PriorityBadgeProps) {
  return (
    <Badge className={priorityBadgeVariants({ variant })}>
      {priority === "low" && "Baixa"}
      {priority === "medium" && "Média"}
      {priority === "high" && "Alta"}
      {priority === "urgent" && "Urgente"}
    </Badge>
  );
}

export { PriorityBadge };
