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
  user: {
    image: string | null;
    name: string;
    email: string;
  };
}

export type { WorkspaceMember, WorkspaceMemberRole, WorkspaceMemberStatus };
