import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { MoreHorizontalIcon } from "lucide-react";
import { RemoveMemberDialog } from "./remove-member-dialog";
import type { ActionCellProps } from "./type";
import { UpdateRoleDialog } from "./update-role-dialog";

function ActionCell({ workspaceId, member }: ActionCellProps) {
  return (
    <TableCell className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <UpdateRoleDialog workspaceId={workspaceId} member={member}>
            <div className="cursor-default items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-hidden select-none focus:bg-muted focus:text-accent-foreground hover:bg-accent">
              Editar
            </div>
          </UpdateRoleDialog>
          <DropdownMenuSeparator />
          <RemoveMemberDialog workspaceId={workspaceId} member={member}>
            <div className="cursor-default text-destructive items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-hidden select-none hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive dark:focus:bg-destructive/20 dark:hover:bg-destructive/20">
              Remover
            </div>
          </RemoveMemberDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  );
}

export { ActionCell };
