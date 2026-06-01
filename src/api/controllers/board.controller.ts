import type { Context } from "hono";
import { z } from "zod";
import type { IBoardService } from "@/api/contracts/board.contract";

const workspaceParamsSchema = z.object({
  workspaceId: z.uuid("Invalid workspace ID format"),
});

const boardParamsSchema = z.object({
  boardId: z.uuid("Invalid board ID format"),
});

const columnParamsSchema = z.object({
  columnId: z.uuid("Invalid column ID format"),
});

const boardBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const columnBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
});

class BoardController {
  constructor(private boardService: IBoardService) {}

  // board
  findById = async (c: Context) => {
    const params = c.req.param();

    const { boardId } = boardParamsSchema.parse(params);
    const { workspaceId } = workspaceParamsSchema.parse(params);

    const board = await this.boardService.findById(boardId, workspaceId);

    return c.json(board, 200);
  };

  findByWorkspaceId = async (c: Context) => {
    const { workspaceId } = workspaceParamsSchema.parse(c.req.param());

    const boards = await this.boardService.findByWorkspaceId(workspaceId);

    return c.json(boards, 200);
  };

  create = async (c: Context) => {
    const { workspaceId } = workspaceParamsSchema.parse(c.req.param());

    const body = await c.req.json();
    const { title } = boardBodySchema.parse(body);

    const board = await this.boardService.create(title, workspaceId);

    return c.json(board, 201);
  };

  update = async (c: Context) => {
    const { boardId } = boardParamsSchema.parse(c.req.param());

    const body = await c.req.json();
    const { title } = boardBodySchema.parse(body);

    const board = await this.boardService.update(boardId, title);

    return c.json(board, 200);
  };

  delete = async (c: Context) => {
    const { boardId } = boardParamsSchema.parse(c.req.param());

    await this.boardService.delete(boardId);

    return c.json({ message: "Board deleted successfully" }, 200);
  };

  // board columns
  createColumn = async (c: Context) => {
    const { boardId } = boardParamsSchema.parse(c.req.param());

    const body = await c.req.json();
    const { title } = columnBodySchema.parse(body);

    const column = await this.boardService.createColumn(boardId, title);

    return c.json(column, 201);
  };

  updateColumn = async (c: Context) => {
    const { columnId } = columnParamsSchema.parse(c.req.param());

    const body = await c.req.json();
    const { title } = columnBodySchema.parse(body);

    const column = await this.boardService.updateColumn(columnId, title);

    return c.json(column, 200);
  };

  deleteColumn = async (c: Context) => {
    const { columnId } = columnParamsSchema.parse(c.req.param());

    await this.boardService.deleteColumn(columnId);

    return c.json({ message: "Column deleted successfully" }, 200);
  };
}

export { BoardController };
