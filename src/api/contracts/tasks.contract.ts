import type { Task } from "@/api/models/task.model";

interface ITasksRepository {
  findById(id: Task["id"]): Promise<Task | null>;
  create(
    data: Omit<Task, "id" | "createdAt" | "updatedAt">,
    columnId: Task["columnId"],
  ): Promise<Task>;
  update(
    id: Task["id"],
    data: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>,
  ): Promise<Task | null>;
  moveToColumn(
    id: Task["id"],
    newColumnId: Task["columnId"],
  ): Promise<Task | null>;
  delete(id: Task["id"]): Promise<void>;
}

interface ITasksService {
  findById(id: Task["id"]): Promise<Task | null>;
  create(
    data: Omit<
      Task,
      "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "columnId"
    >,
    columnId: Task["columnId"],
    userId: Task["createdBy"],
  ): Promise<Task>;
  update(
    id: Task["id"],
    data: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>,
    userId: Task["updatedBy"],
  ): Promise<Task | null>;
  moveToColumn(
    id: Task["id"],
    oldColumnId: Task["columnId"],
    newColumnId: Task["columnId"],
    userId: Task["updatedBy"],
  ): Promise<Task | null>;
  delete(id: Task["id"], userId: Task["updatedBy"]): Promise<void>;
}

export type { ITasksRepository, ITasksService };
