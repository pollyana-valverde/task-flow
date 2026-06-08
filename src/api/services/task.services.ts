import type { IBoardRepository } from "../contracts/board.contract";
import type {
  ITasksRepository,
  ITasksService,
} from "../contracts/tasks.contract";
import type { IWorkspaceRepository } from "../contracts/workspace.contract";
import type { Task } from "../models/task.model";
import { AppError } from "../utils/app-error";

class TaskService implements ITasksService {
  constructor(
    private taskRepository: ITasksRepository,
    private columnRepository: IBoardRepository,
    private workspaceRepository: IWorkspaceRepository,
  ) {}

  async findById(id: Task["id"]): Promise<Task | null> {
    const existingTask = await this.taskRepository.findById(id);

    if (!existingTask) {
      throw new AppError("Task not found", 404);
    }

    return existingTask;
  }

  async create(
    data: Omit<
      Task,
      "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "columnId"
    >,
    columnId: Task["columnId"],
    userId: Task["createdBy"],
  ) {
    const existingColumn =
      await this.columnRepository.findColumnWithBoard(columnId);

    if (!existingColumn) {
      throw new AppError("Column not found", 404);
    }

    const member = await this.workspaceRepository.findMember(
      existingColumn.boards?.workspaceId as string,
      userId,
    );

    if (!member) {
      throw new AppError("User is not a member of the workspace", 400);
    }

    const assigneeMember = await this.workspaceRepository.findMembers(
      existingColumn.boards?.workspaceId as string,
    );

    console.log("Assignee Member:", assigneeMember);

    if (assigneeMember.find((m) => m.userId === data.assigneeId)) {
      throw new AppError("Assignee user is not a member of the workspace", 400);
    }

    if (data.title.length >= 200) {
      throw new AppError("Task title must be less than 200 characters", 400);
    }

    if ((data.dueDate as Date) < new Date()) {
      throw new AppError("Due date must be in the future", 400);
    }

    const newTask = await this.taskRepository.create(
      { ...data },
      columnId,
      userId,
    );
    return newTask;
  }

  async update(
    id: Task["id"],
    data: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>,
    userId: Task["updatedBy"],
  ): Promise<Task | null> {
    const existingTask = await this.taskRepository.findById(id);

    if (!existingTask) {
      throw new AppError("Task not found", 404);
    }

    const existingColumn = await this.columnRepository.findColumnWithBoard(
      existingTask.columnId,
    );

    if (!existingColumn) {
      throw new AppError("Task does not belong to the specified column", 404);
    }

    const member = await this.workspaceRepository.findMember(
      existingColumn.boards?.workspaceId as string,
      userId,
    );

    if (!member) {
      throw new AppError("User is not a member of the workspace", 400);
    }

    const updatedTask = await this.taskRepository.update(id, {
      ...data,
      updatedBy: member.id,
    });

    if (!updatedTask) {
      throw new AppError("Failed to update task", 500);
    }

    return updatedTask;
  }

  async moveToColumn(
    id: Task["id"],
    oldColumnId: Task["columnId"],
    newColumnId: Task["columnId"],
    userId: Task["updatedBy"],
  ): Promise<Task | null> {
    const existingTask = await this.taskRepository.findById(id);

    if (!existingTask) {
      throw new AppError("Task not found", 404);
    }

    if (existingTask.columnId !== oldColumnId) {
      throw new AppError(
        "Task does not belong to the specified old column",
        400,
      );
    }

    const existingNewColumn =
      await this.columnRepository.findColumnWithBoard(newColumnId);

    if (!existingNewColumn) {
      throw new AppError("New column not found", 404);
    }

    const member = await this.workspaceRepository.findMember(
      existingNewColumn.boards?.workspaceId as string,
      userId,
    );

    if (!member) {
      throw new AppError("User is not a member of the workspace", 400);
    }

    const updatedTask = await this.taskRepository.moveToColumn(
      id,
      newColumnId,
      member.id,
    );

    if (!updatedTask) {
      throw new AppError("Failed to move task to new column", 500);
    }

    return updatedTask;
  }

  async delete(id: Task["id"], userId: Task["updatedBy"]): Promise<void> {
    const existingTask = await this.taskRepository.findById(id);

    if (!existingTask) {
      throw new AppError("Task not found", 404);
    }

    const existingColumn = await this.columnRepository.findColumnWithBoard(
      existingTask.columnId,
    );

    if (!existingColumn) {
      throw new AppError("Task does not belong to the specified column", 404);
    }

    const member = await this.workspaceRepository.findMember(
      existingColumn.boards?.workspaceId as string,
      userId,
    );

    if (!member) {
      throw new AppError("User is not a member of the workspace", 400);
    }

    if (member.role === "member" && existingTask.createdBy !== userId) {
      throw new AppError(
        "User does not have permission to delete this task",
        403,
      );
    }

    await this.taskRepository.delete(id);
  }
}

export { TaskService };
