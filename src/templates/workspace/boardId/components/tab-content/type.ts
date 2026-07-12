interface TaskProps {
  id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high" | "urgent";
  assigneeId: string | null;
  columnId: string;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string | null;

  assignee: {
    name: string;
    image: string | null;
  } | null;
}
