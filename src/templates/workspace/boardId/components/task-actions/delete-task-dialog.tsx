"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ErrorMessage } from "@/components/ui/error-message";
import { Text } from "@/components/ui/text";
import { deleteTask } from "@/http/tasks/delete-task";
import { ApiError } from "@/lib/http/api-error";
import { AlertOctagon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteTaskDialogProps {
  children: React.ReactNode;
  taskId: string;
}

function DeleteTaskDialog({ taskId, children }: DeleteTaskDialogProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function handleClose(isModalOpen: boolean) {
    setIsModalOpen(isModalOpen);
  }

  async function handleDeleteTask() {
    setError(null);
    try {
      setLoading(true);
      await deleteTask({ taskId });
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
              Excluir tarefa?
            </Text>
          </DialogTitle>

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
            onClick={handleDeleteTask}
          >
            {loading ? "Excluindo tarefa..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DeleteTaskDialog };
