import type { Board } from "./board.model";
import type { Task } from "./task.model";

interface BoardColumn {
  id: string;
  title: string;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;

  boards?: Board;
  tasks?: Task[];
}

export type { BoardColumn };
