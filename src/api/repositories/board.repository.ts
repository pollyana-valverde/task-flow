import { eq } from "drizzle-orm";
import type { IBoardRepository } from "@/api/contracts/board.contract";
import { database } from "@/api/database";
import { boardColumns, boards } from "@/api/database/schemas";
import type { Board } from "@/api/models/board.model";
import type { BoardColumn } from "@/api/models/board-column.model";

class BoardRepository implements IBoardRepository {
  // board
  async findById(id: Board["id"]) {
    const result = await database
      .select()
      .from(boards)
      .where(eq(boards.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async findByWorkspaceId(workspaceId: Board["workspaceId"]) {
    const result = await database
      .select()
      .from(boards)
      .where(eq(boards.workspaceId, workspaceId));

    return result;
  }

  async create(title: Board["title"], workspaceId: Board["workspaceId"]) {
    const result = await database
      .insert(boards)
      .values({ title, workspaceId })
      .returning();

    return result[0];
  }

  async update(id: Board["id"], title: Board["title"]) {
    const result = await database
      .update(boards)
      .set({ title, updatedAt: new Date() })
      .where(eq(boards.id, id))
      .returning();

    return result[0] ?? null;
  }

  async delete(id: Board["id"]) {
    await database.delete(boards).where(eq(boards.id, id));
  }

  // board columns
  async findColumns(boardId: Board["id"]) {
    const result = await database
      .select()
      .from(boardColumns)
      .where(eq(boardColumns.boardId, boardId));

    return result;
  }

  async createColumn(boardId: Board["id"], title: BoardColumn["title"]) {
    const result = await database
      .insert(boardColumns)
      .values({ title, boardId })
      .returning();

    return result[0] ?? null;
  }

  async updateColumn(columnId: BoardColumn["id"], title: BoardColumn["title"]) {
    const result = await database
      .update(boardColumns)
      .set({ title, updatedAt: new Date() })
      .where(eq(boardColumns.id, columnId))
      .returning();

    return result[0] ?? null;
  }

  async deleteColumn(columnId: BoardColumn["id"]): Promise<void> {
    await database.delete(boardColumns).where(eq(boardColumns.id, columnId));
  }
}

export { BoardRepository };
