import type { BoardColumn } from "./board-column.model";

interface Board {
  id: string;
  title: string;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;

  columns?: BoardColumn[];
}

export type { Board };
