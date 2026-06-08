import { eq } from "drizzle-orm";
import type { ITasksRepository } from "@/api/contracts/tasks.contract";
import { database } from "@/api/database";
import { tasks } from "@/api/database/schemas";
import type { Task } from "@/api/models/task.model";

class TaskRepository implements ITasksRepository {
  async findById(id: Task["id"]) {
    const result = await database
      .select()
      .from(tasks)
      .where(eq(tasks.id, id))
      .limit(1);

    return (result[0] as Task) ?? null;
  }

  async create(
    data: Omit<Task, "id" | "createdAt" | "updatedAt">,
    columnId: Task["columnId"],
  ) {
    const result = await database
      .insert(tasks)
      .values({ ...data, columnId })
      .returning();

    return result[0] as Task;
  }

  async update(
    id: Task["id"],
    data: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>,
  ) {
    const result = await database
      .update(tasks)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(tasks.id, id))
      .returning();

    return (result[0] as Task) ?? null;
  }

  async moveToColumn(id: Task["id"], newColumnId: Task["columnId"]) {
    const result = await database
      .update(tasks)
      .set({ columnId: newColumnId, updatedAt: new Date() })
      .where(eq(tasks.id, id))
      .returning();

    return (result[0] as Task) ?? null;
  }

  async delete(id: Task["id"]) {
    await database.delete(tasks).where(eq(tasks.id, id));
  }
}

export { TaskRepository };
