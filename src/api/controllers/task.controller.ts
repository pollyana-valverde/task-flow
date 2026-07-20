import type { Context } from "hono";
import { z } from "zod";
import type { ITasksService } from "@/api/contracts/tasks.contract";
import type { TaskPriority } from "../models/task.model";

const columnParamsSchema = z.object({
  columnId: z.uuid("Invalid column ID format"),
});

const taskParamsSchema = z.object({
  id: z.uuid("Invalid task ID format"),
});

const taskBodySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z.string().optional(),
  priority: z
    .enum(["low", "medium", "high", "urgent"])
    .optional()
    .default("medium"),
  assigneeId: z.uuid("Invalid assignee ID format").optional(),
  dueDate: z
    .coerce
    .date()
    .optional(),
});

const moveTaskBodySchema = z.object({
  oldColumnId: z.uuid("Invalid column ID format"),
  newColumnId: z.uuid("Invalid column ID format"),
});

class TaskController {
  constructor(private taskService: ITasksService) {}

  findById = async (c: Context) => {
    const { id } = taskParamsSchema.parse(c.req.param());

    const task = await this.taskService.findById(id);

    return c.json(task, 200);
  };

  create = async (c: Context) => {
    const { columnId } = columnParamsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    const body = await c.req.json();
    const { title, description, assigneeId, dueDate, priority } =
      taskBodySchema.parse(body);

    const newTask = await this.taskService.create(
      {
        title,
        description,
        priority: priority as TaskPriority,
        assigneeId,
        dueDate,
      },
      columnId,
      userId,
    );

    return c.json(newTask, 201);
  };

  update = async (c: Context) => {
    const { id } = taskParamsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    const body = await c.req.json();
    const { title, description, assigneeId, dueDate, priority } = taskBodySchema
      .partial()
      .parse(body);

    const updatedTask = await this.taskService.update(
      id,
      {
        title,
        description,
        assigneeId,
        dueDate,
        priority: priority as TaskPriority,
      },
      userId,
    );

    return c.json(updatedTask, 200);
  };

  moveToColumn = async (c: Context) => {
    const { id } = taskParamsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    const body = await c.req.json();
    const { oldColumnId, newColumnId } = moveTaskBodySchema.parse(body);

    const movedTask = await this.taskService.moveToColumn(
      id,
      oldColumnId,
      newColumnId,
      userId,
    );

    return c.json(movedTask, 200);
  };

  delete = async (c: Context) => {
    const { id } = taskParamsSchema.parse(c.req.param());
    const { id: userId } = c.get("user");

    await this.taskService.delete(id, userId);
    return c.json({ message: "Task deleted successfully" }, 200);
  };
}

export { TaskController };
