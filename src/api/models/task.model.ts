enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
  Urgent = "urgent",
}

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  assigneeId?: string;
  columnId: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export type { Task, TaskPriority };
