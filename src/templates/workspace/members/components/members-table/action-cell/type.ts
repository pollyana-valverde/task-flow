export interface ActionCellProps {
  workspaceId: string;
  children?: React.ReactNode;
  member: {
    userId: string;
    role: "admin" | "member";
    user: {
      name: string;
    };
  };
}
