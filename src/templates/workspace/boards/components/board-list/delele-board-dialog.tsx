"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ErrorMessage } from "@/components/ui/error-message";
import { Text } from "@/components/ui/text";
import { deleteBoard } from "@/http/boards/delete-board";
import { ApiError } from "@/lib/http/api-error";
import { AlertOctagon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteBoardDialogProps {
  children: React.ReactNode;
  board: {
    id: string;
    title: string;
  };
}

function DeleteBoardDialog({ children, board }: DeleteBoardDialogProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function handleClose(isModalOpen: boolean) {
    setIsModalOpen(isModalOpen);
  }

  async function handleDeleteBoard() {
    setError(null);
    try {
      setLoading(true);
      await deleteBoard({ boardId: board.id });
      setIsModalOpen(false);

      router.refresh();
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
        return;
      }

      setError("Ocorreu um erro. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm md:max-w-md shadow-red-950 ring-red-950 dark:ring-red-950 dark:shadow-red-950">
        <DialogHeader className="space-y-4">
          <DialogTitle className="flex gap-3 items-center">
            <div className="bg-destructive/20 border border-destructive p-2 rounded-lg">
              <AlertOctagon className="text-destructive size-5.5" />
            </div>
            <Text className="text-foreground" variant="h2">
              Excluir {board.title}?
            </Text>
          </DialogTitle>
          <DialogDescription asChild>
            <Text variant="mono">
              Todas as colunas e tarefas serão excluídas. Esta ação é permanente
              e não pode ser desfeita.
            </Text>
          </DialogDescription>

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </DialogHeader>
        <DialogFooter className="mt-3">
          <DialogClose asChild disabled={loading}>
            <Button className="px-6" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            disabled={loading}
            variant="destructive"
            onClick={handleDeleteBoard}
          >
            {loading ? "Excluindo board..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DeleteBoardDialog };
