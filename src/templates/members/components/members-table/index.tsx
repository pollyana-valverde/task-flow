import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableRoot,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MemberCell } from "./member-cell";
import { StatusCell } from "./status-cell";
import { RoleBadge } from "@/components/ui/role-badge";

interface MembersTableProps {
  members: {
    id: string;
    role: "member" | "admin" | "owner";
    status: "active" | "pending" | "declined";
    joinedAt: Date;
    user: {
      name: string;
      email: string;
      image: string | null;
    };
  }[];
}

function MembersTable({ members }: MembersTableProps) {
  return (
    <TableRoot className="bg-popover">
      <TableHeader className="bg-muted/20">
        <TableRow className="border-border/60 ">
          <TableHead>Membro</TableHead>
          <TableHead>Papel</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id} className="border-border/60">
            <MemberCell
              user={member.user}
              status={member.status}
              joinedAt={member.joinedAt}
            />
            <TableCell>
              <RoleBadge role={member.role} variant={member.role} />
            </TableCell>
            <StatusCell status={member.status} variant={member.status} />
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Deletar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  );
}

export { MembersTable };
