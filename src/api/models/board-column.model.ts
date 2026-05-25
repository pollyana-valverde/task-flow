interface BoardColumn {
  id: string;
  title: string;
  boardId: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export type { BoardColumn };
