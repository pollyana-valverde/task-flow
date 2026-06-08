import { Hono } from "hono";
import { BoardController } from "@/api/controllers/board.controller";
import { ensureAuthenticated } from "@/api/middlewares/ensure-authenticated";
import { BoardRepository } from "@/api/repositories/board.repository";
import { WorkspaceRepository } from "@/api/repositories/workspace.repository";
import { BoardService } from "@/api/services/board.services";

const workspaceBoardRoutes = new Hono();
const boardRoutes = new Hono();
const boardColumnsRoutes = new Hono();

workspaceBoardRoutes.use("*", ensureAuthenticated);
boardRoutes.use("*", ensureAuthenticated);
boardColumnsRoutes.use("*", ensureAuthenticated);

const boardRepository = new BoardRepository();
const workspaceRepository = new WorkspaceRepository();
const boardService = new BoardService(boardRepository, workspaceRepository);
const boardController = new BoardController(boardService);

workspaceBoardRoutes.get("/", boardController.findByWorkspaceId);
workspaceBoardRoutes.post("/", boardController.create);

boardRoutes.get("/:boardId", boardController.findById);
boardRoutes.put("/:boardId", boardController.update);
boardRoutes.delete("/:boardId", boardController.delete);

// board columns
boardRoutes.post("/:boardId/column", boardController.createColumn);
boardColumnsRoutes.put("/:columnId", boardController.updateColumn);
boardColumnsRoutes.delete("/:columnId", boardController.deleteColumn);

export { boardRoutes, workspaceBoardRoutes, boardColumnsRoutes };
