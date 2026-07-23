import { BoardController } from "@/api/controllers/board.controller";
import { ensureAuthenticated } from "@/api/middlewares/ensure-authenticated";
import { BoardRepository } from "@/api/repositories/board.repository";
import { WorkspaceRepository } from "@/api/repositories/workspace.repository";
import { BoardService } from "@/api/services/board.services";
import { Hono } from "hono";
import { NotificationRepository } from "../repositories/notification.repository";
import { NotificationService } from "../services/notification.services";

const workspaceBoardRoutes = new Hono();
const boardRoutes = new Hono();
const boardColumnsRoutes = new Hono();

workspaceBoardRoutes.use("*", ensureAuthenticated);
boardRoutes.use("*", ensureAuthenticated);
boardColumnsRoutes.use("*", ensureAuthenticated);

const boardRepository = new BoardRepository();
const workspaceRepository = new WorkspaceRepository();

const notificationRepository = new NotificationRepository();
const notificationService = new NotificationService(notificationRepository);

const boardService = new BoardService(boardRepository, workspaceRepository, notificationService);
const boardController = new BoardController(boardService);

workspaceBoardRoutes.get("/", boardController.findByWorkspaceId);
workspaceBoardRoutes.post("/", boardController.create);

boardRoutes.get("/:boardId", boardController.findById);
boardRoutes.put("/:boardId", boardController.update);
boardRoutes.delete("/:boardId", boardController.delete);

// board columns
boardRoutes.get("/:boardId/columns", boardController.findColumnByBoardId);
boardRoutes.post("/:boardId/column", boardController.createColumn);
boardColumnsRoutes.put("/:columnId", boardController.updateColumn);
boardColumnsRoutes.delete("/:columnId", boardController.deleteColumn);

export { boardColumnsRoutes, boardRoutes, workspaceBoardRoutes };

