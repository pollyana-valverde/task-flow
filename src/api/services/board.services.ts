import type {
  IBoardRepository,
  IBoardService,
} from "@/api/contracts/board.contract";
import type { IWorkspaceRepository } from "@/api/contracts/workspace.contract";
import type { Board } from "@/api/models/board.model";
import type { BoardColumn } from "@/api/models/board-column.model";
import { AppError } from "@/api/utils/app-error";
import type { User } from "../models/user.model";

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

    const board_columns = await this.boardRepository.findColumns(id);

    if (!board_columns) {
      throw new AppError("Failed to fetch board columns", 500);
    }

    return {
      board: existingBoard,
      board_columns,
    };
  }

  async findByWorkspaceId(workspaceId: Board["workspaceId"]) {
    const existingWorkspace =
      await this.workspaceRepository.findById(workspaceId);

    if (!existingWorkspace) {
      throw new AppError("Workspace not found", 404);
    }

    const existingBoards =
      await this.boardRepository.findByWorkspaceId(workspaceId);

    return existingBoards;
  }

  async create(
    title: Board["title"],
    workspaceId: Board["workspaceId"],
    userId: User["id"],
  ) {
    const existingWorkspace =
      await this.workspaceRepository.findById(workspaceId);

    if (!existingWorkspace) {
      throw new AppError("Workspace not found", 404);
    }

    const member = await this.workspaceRepository.findMember(
      workspaceId,
      userId,
    );

    if (!member) {
      throw new AppError("User is not a member of the workspace", 403);
    }

    if (member.role === "member") {
      throw new AppError(
        "User does not have permission to create a board",
        403,
      );
    }

    const createdBoard = await this.boardRepository.create(title, workspaceId);

    if (!createdBoard) {
      throw new AppError("Failed to create board", 500);
    }

    return createdBoard;
  }

  async update(
    userId: User["id"],
    id: Board["id"],
    title: Board["title"],
    workspaceId: Board["workspaceId"],
  ) {
    const existingBoard = await this.boardRepository.findById(id);

    if (!existingBoard) {
      throw new AppError("Board not found", 404);
    }

    const member = await this.workspaceRepository.findMember(
      workspaceId,
      userId,
    );

    if (!member) {
      throw new AppError("User is not a member of the workspace", 403);
    }

    if (member.role === "member") {
      throw new AppError(
        "User does not have permission to update a board",
        403,
      );
    }

    const updatedBoard = await this.boardRepository.update(id, title);

    if (!updatedBoard) {
      throw new AppError("Failed to update board", 500);
    }

    return updatedBoard;
  }

  async delete(
    userId: User["id"],
    id: Board["id"],
    workspaceId: Board["workspaceId"],
  ) {
    const existingBoard = await this.boardRepository.findById(id);

    if (!existingBoard) {
      throw new AppError("Board not found", 404);
    }

    const member = await this.workspaceRepository.findMember(
      workspaceId,
      userId,
    );

    if (!member) {
      throw new AppError("User is not a member of the workspace", 403);
    }

    if (member.role === "member") {
      throw new AppError(
        "User does not have permission to delete a board",
        403,
      );
    }

    return await this.boardRepository.delete(id);
  }

  // board column
  async createColumn(
    userId: User["id"],
    boardId: Board["id"],
    workspaceId: Board["workspaceId"],
    title: BoardColumn["title"],
  ) {
    const existingBoard = await this.boardRepository.findById(boardId);

    if (!existingBoard) {
      throw new AppError("Board not found", 404);
    }

    const member = await this.workspaceRepository.findMember(
      workspaceId,
      userId,
    );

    if (!member) {
      throw new AppError("User is not a member of the workspace", 403);
    }

    if (member.role === "member") {
      throw new AppError(
        "User does not have permission to create a column in this board",
        403,
      );
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
    userId: User["id"],
    boardId: Board["id"],
    columnId: BoardColumn["id"],
    workspaceId: Board["workspaceId"],
    title: BoardColumn["title"],
  ) {
    const existingBoard = await this.boardRepository.findById(boardId);

    if (!existingBoard) {
      throw new AppError("Board not found", 404);
    }

    const member = await this.workspaceRepository.findMember(
      workspaceId,
      userId,
    );

    if (!member) {
      throw new AppError("User is not a member of the workspace", 403);
    }

    if (member.role === "member") {
      throw new AppError(
        "User does not have permission to update a column in this board",
        403,
      );
    }

    const updatedColumn = await this.boardRepository.updateColumn(
      columnId,
      title,
    );

    if (!updatedColumn) {
      throw new AppError("Failed to update column", 500);
    }

    return updatedColumn;
  }

  async deleteColumn(
    userId: User["id"],
    columnId: BoardColumn["id"],
    boardId: Board["id"],
    workspaceId: Board["workspaceId"],
  ) {
    const existingBoard = await this.boardRepository.findById(boardId);

    if (!existingBoard) {
      throw new AppError("Board not found", 404);
    }

    const member = await this.workspaceRepository.findMember(
      workspaceId,
      userId,
    );

    if (!member) {
      throw new AppError("User is not a member of the workspace", 403);
    }

    if (member.role === "member") {
      throw new AppError(
        "User does not have permission to delete a column in this board",
        403,
      );
    }

    return await this.boardRepository.deleteColumn(columnId);
  }
}

export { BoardService };
