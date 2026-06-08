import { Hono } from "hono";
import { ensureAuthenticated } from "@/api/middlewares/ensure-authenticated";
import { BoardRepository } from "@/api/repositories/board.repository";
import { WorkspaceRepository } from "@/api/repositories/workspace.repository";
import { TaskController } from "../controllers/task.controller";
import { TaskRepository } from "../repositories/task.repository";
import { TaskService } from "../services/task.services";

const taskRoutes = new Hono();
const columnTaskRoutes = new Hono();

taskRoutes.use("*", ensureAuthenticated);

const taskRepository = new TaskRepository();
const boardRepository = new BoardRepository();
const workspaceRepository = new WorkspaceRepository();

const taskService = new TaskService(
  taskRepository,
  boardRepository,
  workspaceRepository,
);
const taskController = new TaskController(taskService);

columnTaskRoutes.post("/", taskController.create);

taskRoutes.get("/:id", taskController.findById);
taskRoutes.put("/:id", taskController.update);
taskRoutes.patch("/:id/move", taskController.moveToColumn);
taskRoutes.delete("/:id", taskController.delete);

export { taskRoutes, columnTaskRoutes };
