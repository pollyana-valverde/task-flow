import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const priorityLineVariants = cva("", {
  variants: {
    variant: {
      low: "bg-muted",
      medium: "bg-amber-200",
      high: "bg-red-200",
      urgent: "bg-red-600",
    },
  },
});

interface PriorityLineProps extends VariantProps<typeof priorityLineVariants> {}

function PriorityLine({ variant }: PriorityLineProps) {
  return (
    <div className={cn(priorityLineVariants({ variant }), "h-full w-1")} />
  );
}

export { PriorityLine };
