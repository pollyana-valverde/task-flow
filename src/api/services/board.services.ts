import type {
  IBoardRepository,
  IBoardService,
} from "@/api/contracts/board.contract";
import type { IWorkspaceRepository } from "@/api/contracts/workspace.contract";
import type { Board } from "@/api/models/board.model";
import type { BoardColumn } from "@/api/models/board-column.model";
import { AppError } from "@/api/utils/app-error";

class BoardService implements IBoardService {
  constructor(
    private boardRepository: IBoardRepository,
    private workspaceRepository: IWorkspaceRepository,
  ) {}
  // board
  async findById(id: Board["id"], workspaceId: Board["workspaceId"]) {
    const existingWorkspace =
      await this.workspaceRepository.findById(workspaceId);

    if (!existingWorkspace) {
      throw new AppError("Workspace not found", 404);
    }

    const existingBoard = await this.boardRepository.findById(id);

    if (!existingBoard) {
      throw new AppError("Board not found", 404);
    }

    return existingBoard;
  }

  async findByWorkspaceId(workspaceId: Board["workspaceId"]) {
    const existingWorkspace =
      await this.workspaceRepository.findById(workspaceId);

    if (!existingWorkspace) {
      throw new AppError("Workspace not found", 404);
    }

    const existingBoards =
      await this.boardRepository.findByWorkspaceId(workspaceId);

    if (!existingBoards) {
      throw new AppError("Boards not found", 404);
    }

    return existingBoards;
  }

  async create(title: Board["title"], workspaceId: Board["workspaceId"]) {
    const existingWorkspace =
      await this.workspaceRepository.findById(workspaceId);

    if (!existingWorkspace) {
      throw new AppError("Workspace not found", 404);
    }

    const createdBoard = await this.boardRepository.create(title, workspaceId);

    if (!createdBoard) {
      throw new AppError("Failed to create board", 500);
    }

    return createdBoard;
  }

  async update(
    id: Board["id"],
    title: Board["title"],
    workspaceId: Board["workspaceId"],
  ) {
    const existingWorkspace =
      await this.workspaceRepository.findById(workspaceId);

    if (!existingWorkspace) {
      throw new AppError("Workspace not found", 404);
    }

    const existingBoard = await this.boardRepository.findById(id);

    if (!existingBoard) {
      throw new AppError("Board not found", 404);
    }

    const updatedBoard = await this.boardRepository.update(id, title);

    if (!updatedBoard) {
      throw new AppError("Failed to update board", 500);
    }

    return updatedBoard;
  }

  async delete(id: Board["id"], workspaceId: Board["workspaceId"]) {
    const existingWorkspace =
      await this.workspaceRepository.findById(workspaceId);

    if (!existingWorkspace) {
      throw new AppError("Workspace not found", 404);
    }

    const existingBoard = await this.boardRepository.findById(id);

    if (!existingBoard) {
      throw new AppError("Board not found", 404);
    }

    return await this.boardRepository.delete(id);
  }

  // board column
  async createColumn(boardId: Board["id"], title: BoardColumn["title"]) {
    const existingBoard = await this.boardRepository.findById(boardId);

    if (!existingBoard) {
      throw new AppError("Board not found", 404);
    }

    const createdColumn = await this.boardRepository.createColumn(
      boardId,
      title,
    );

    if (!createdColumn) {
      throw new AppError("Failed to create column", 500);
    }

    return createdColumn;
  }

  async updateColumn(
    boardId: Board["id"],
    columnId: BoardColumn["id"],
    title: BoardColumn["title"],
  ) {
    const existingBoard = await this.boardRepository.findById(boardId);

    if (!existingBoard) {
      throw new AppError("Board not found", 404);
    }

    const existingColumn = await this.boardRepository.updateColumn(
      columnId,
      title,
    );

    if (!existingColumn) {
      throw new AppError("Failed to update column", 500);
    }

    return existingColumn;
  }

  async deleteColumn(columnId: BoardColumn["id"], boardId: Board["id"]) {
    const existingBoard = await this.boardRepository.findById(boardId);

    if (!existingBoard) {
      throw new AppError("Board not found", 404);
    }

    return await this.boardRepository.deleteColumn(columnId);
  }
}

export { BoardService };
