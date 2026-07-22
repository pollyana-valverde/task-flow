import { RoleBadge } from "@/components/ui/role-badge";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/ui/table";
import { ActionCell } from "./action-cell";
import { MemberCell } from "./member-cell";
import { StatusCell } from "./status-cell";

interface MembersTableProps {
  sessionUserId: string | undefined
  workspaceId:string
  members: {
    id: string;
    userId: string;
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

function MembersTable({ members, workspaceId, sessionUserId }: MembersTableProps) {
const sessionUserCurrentWorkspaceRole = members.find((member) => sessionUserId === member.userId)

  return (
    <TableRoot className="bg-popover">
      <TableHeader className="bg-muted/20">
        <TableRow className="border-border/60 ">
          <TableHead>Membro</TableHead>
          <TableHead>Papel</TableHead>
          <TableHead>Status</TableHead>
          {sessionUserCurrentWorkspaceRole?.role === "owner" && <TableHead />}
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
            {sessionUserCurrentWorkspaceRole?.role === "owner" && member.role !== "owner" && (
              <ActionCell member={{ ...member, role: member.role as "member" | "admin" }} workspaceId={workspaceId} />
            )}
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  );
}

export { MembersTable };
