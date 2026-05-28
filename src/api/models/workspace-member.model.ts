enum WorkspaceMemberRole {
  Owner = "owner",
  Admin = "admin",
  Member = "member",
}

enum WorkspaceMemberStatus {
  Active = "active",
  Pending = "pending",
  Declined = "declined",
}

interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  role: WorkspaceMemberRole;
  status: WorkspaceMemberStatus;
  joinedAt: Date;
}

export type { WorkspaceMember, WorkspaceMemberRole, WorkspaceMemberStatus };
