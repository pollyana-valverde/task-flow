import type { Board } from "@/api/models/board.model";
import type { BoardColumn } from "../models/board-column.model";
// import type { Task } from "../models/task.model";
import type { User } from "../models/user.model";

interface IBoardRepository {
  // board
  findById(id: Board["id"]): Promise<Board | null>;
  findByWorkspaceId(workspaceId: Board["workspaceId"]): Promise<Board[]>;
  create(
    workspaceId: Board["workspaceId"],
    title: Board["title"],
  ): Promise<Board>;
  update(id: Board["id"], title: Board["title"]): Promise<Board | null>;
  delete(id: Board["id"]): Promise<void>;

  //board columns
  findColumns(boardId: Board["id"]): Promise<BoardColumn[]>;
  findColumn(columnId: BoardColumn["id"]): Promise<BoardColumn>;
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
    userId: User["id"],
  ): Promise<{
    board: Board;
    board_columns: BoardColumn[];
    // tasks: Task[];
  } | null>;
  findByWorkspaceId(workspaceId: Board["workspaceId"]): Promise<Board[]>;
  create(
    userId: User["id"],
    title: Board["title"],
    workspaceId: Board["workspaceId"],
  ): Promise<Board>;
  update(
    userId: User["id"],
    id: Board["id"],
    title: Board["title"],
  ): Promise<Board | null>;
  delete(userId: User["id"], id: Board["id"]): Promise<void>;

  //board columns
  createColumn(
    userId: User["id"],
    boardId: Board["id"],
    title: BoardColumn["title"],
  ): Promise<BoardColumn | null>;
  updateColumn(
    userId: User["id"],
    columnId: BoardColumn["id"],
    title: BoardColumn["title"],
  ): Promise<BoardColumn | null>;
  deleteColumn(userId: User["id"], columnId: BoardColumn["id"]): Promise<void>;
}

export type { IBoardRepository, IBoardService };
