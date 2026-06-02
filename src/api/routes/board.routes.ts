import { Hono } from "hono";
import { BoardController } from "@/api/controllers/board.controller";
import { ensureAuthenticated } from "@/api/middlewares/ensure-authenticated";
import { BoardRepository } from "@/api/repositories/board.repository";
import { WorkspaceRepository } from "@/api/repositories/workspace.repository";
import { BoardService } from "@/api/services/board.services";

const boardRoutes = new Hono();

boardRoutes.use("*", ensureAuthenticated);

const boardRepository = new BoardRepository();
const workspaceRepository = new WorkspaceRepository();
const boardService = new BoardService(boardRepository, workspaceRepository);
const boardController = new BoardController(boardService);

boardRoutes.get("/", boardController.findByWorkspaceId);
boardRoutes.get("/:boardId", boardController.findById);

boardRoutes.post("/", boardController.create);
boardRoutes.put("/:boardId", boardController.update);
boardRoutes.delete("/:boardId", boardController.delete);

// board columns
boardRoutes.post("/:boardId/columns", boardController.createColumn);
boardRoutes.put("/:boardId/columns/:columnId", boardController.updateColumn);
boardRoutes.delete("/:boardId/columns/:columnId", boardController.deleteColumn);

export { boardRoutes };
