import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import { cva, VariantProps } from "class-variance-authority";

const statusCellBadgeVariants = cva("", {
  variants: {
    variant: {
      active: "text-lime-700 bg-lime-200",
      pending: "text-amber-700 bg-amber-200",
      declined: "text-red-700 bg-red-200",
    },
  },
});

interface StatusCellProps extends VariantProps<typeof statusCellBadgeVariants> {
  status: "active" | "pending" | "declined";
}

function StatusCell({ variant, status }: StatusCellProps) {
  return (
    <TableCell>
      <Badge className={statusCellBadgeVariants({ variant })}>
        {status === "active" && "Ativo"}
        {status === "pending" && "Pendente"}
        {status === "declined" && "Recusado"}
      </Badge>
    </TableCell>
  );
}

export { StatusCell };
