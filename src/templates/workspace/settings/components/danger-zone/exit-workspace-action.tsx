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
import { exitWorkspace } from "@/http/workspaces/exit-workspace";
import { ApiError } from "@/lib/http/api-error";
import { AlertOctagon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ExitWorkspaceAction({ workspaceId }: { workspaceId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function handleClose(isModalOpen: boolean) {
    setIsModalOpen(isModalOpen);
  }

  async function handleExitWorkspace() {
    setError(null);
    try {
      setLoading(true);
      await exitWorkspace({ workspaceId });
      setIsModalOpen(false);

      router.replace("/");
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
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <Text className="text-foreground">Sair do workspace</Text>
        <Text variant="mono">
          Sair do workspace removerá completamente seu acesso a todos os boards
          e tarefas desse workspace. Esta ação só pode ser revertida se for
          convidado novamente para ser membro.
        </Text>
      </div>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogTrigger asChild>
          <Button variant="destructive">Sair do workspace</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm md:max-w-md shadow-red-950 ring-red-950 dark:ring-red-950 dark:shadow-red-950">
          <DialogHeader className="space-y-4">
            <DialogTitle className="flex gap-3 items-center">
              <div className="bg-destructive/20 border border-destructive p-2 rounded-lg">
                <AlertOctagon className="text-destructive size-5.5" />
              </div>
              <Text className="text-foreground" variant="h2">
                Sair do workspace?
              </Text>
            </DialogTitle>
            <DialogDescription asChild>
              <Text variant="mono">
                Esta ação só pode ser revertida se for convidado novamente para
                ser membro. Deseja mesmo sair deste workspace?
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
              onClick={handleExitWorkspace}
            >
              {loading ? "Saindo do workspace..." : "Sair"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { ExitWorkspaceAction };
