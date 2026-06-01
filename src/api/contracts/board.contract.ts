import type { Board } from "@/api/models/board.model";
import type { BoardColumn } from "../models/board-column.model";
import type { Task } from "../models/task.model";

interface IBoardRepository {
  // board
  findById(id: Board["id"]): Promise<{
    board: Board;
    board_columns: BoardColumn;
    tasks: Task;
  } | null>;
  findByWorkspaceId(workspaceId: Board["workspaceId"]): Promise<Board | null>;
  create(
    workspaceId: Board["workspaceId"],
    title: Board["title"],
  ): Promise<Board>;
  update(id: Board["id"], title: Board["title"]): Promise<Board | null>;
  delete(id: Board["id"]): Promise<void>;

  //board columns
  createColumn(
    boardId: Board["id"],
    title: BoardColumn["title"],
  ): Promise<BoardColumn | null>;
  updateColumn(
    columnId: BoardColumn["id"],
    title: BoardColumn["title"],
  ): Promise<BoardColumn | null>;
  deleteColumn(columnId: BoardColumn["id"]): Promise<void>;
}

interface IBoardService {
  // board
  findById(
    id: Board["id"],
    workspaceId: Board["workspaceId"],
  ): Promise<{
    board: Board;
    board_columns: BoardColumn;
    tasks: Task;
  } | null>;
  findByWorkspaceId(workspaceId: Board["workspaceId"]): Promise<Board | null>;
  create(
    title: Board["title"],
    workspaceId: Board["workspaceId"],
  ): Promise<Board>;
  update(
    id: Board["id"],
    title: Board["title"],
    workspaceId: Board["workspaceId"],
  ): Promise<Board | null>;
  delete(id: Board["id"], workspaceId: Board["workspaceId"]): Promise<void>;

  //board columns
  createColumn(
    boardId: Board["id"],
    title: BoardColumn["title"],
  ): Promise<BoardColumn | null>;
  updateColumn(
    boardId: Board["id"],
    columnId: BoardColumn["id"],
    title: BoardColumn["title"],
  ): Promise<BoardColumn | null>;
  deleteColumn(
    columnId: BoardColumn["id"],
    boardId: Board["id"],
  ): Promise<void>;
}

export type { IBoardRepository, IBoardService };
