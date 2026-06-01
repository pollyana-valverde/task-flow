import type { Board } from "@/api/models/board.model";
import type { BoardColumn } from "../models/board-column.model";

interface IBoardRepository {
  // board
  findById(id: Board["id"]): Promise<Board | null>;
  findByWorkspaceId(workspaceId: Board["workspaceId"]): Promise<Board | null>;
  create(title: Board["title"]): Promise<Board>;
  update(id: Board["id"], title: Board["title"]): Promise<Board | null>;
  delete(id: Board["id"]): Promise<void>;

  //board columns
  createColumn(
    boardId: Board["id"],
    title: BoardColumn["title"],
  ): Promise<void>;
  updateColumn(
    columnId: BoardColumn["id"],
    title: BoardColumn["title"],
  ): Promise<void>;
  deleteColumn(columnId: BoardColumn["id"]): Promise<void>;
}

interface IBoardService {
  // board
  findById(
    id: Board["id"],
    workspaceId: Board["workspaceId"],
  ): Promise<Board | null>;
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
  ): Promise<void>;
  updateColumn(
    boardId: Board["id"],
    columnId: BoardColumn["id"],
    title: BoardColumn["title"],
  ): Promise<void>;
  deleteColumn(
    columnId: BoardColumn["id"],
    boardId: Board["id"],
  ): Promise<void>;
}

export type { IBoardRepository, IBoardService };
