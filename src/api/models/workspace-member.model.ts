enum WorkspaceMemberRole {
  Owner = "owner",
  Admin = "admin",
  Member = "member",
}

interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  role: WorkspaceMemberRole;
  joinedAt: Date;
}

export type { WorkspaceMember, WorkspaceMemberRole };
