"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { authClient } from "@/lib/auth-client";
import { AlertOctagon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DangerZone() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function handleClose(isModalOpen: boolean) {
    setIsModalOpen(isModalOpen);
  }

  async function handleDeleteWorkspace() {
    setError(null);
    await authClient.deleteUser({
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          router.replace("/profile");
          setIsModalOpen(false);
        },
        onError: (error) => {
          setError("Ocorreu um erro. Tente novamente mais tarde.");
          console.log(error.error.message);
        },
      },
    });
  }

  return (
    <div className="space-y-4">
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <Card className="hover:translate-y-0 gap-3 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Zona de perigo</CardTitle>
            <CardDescription>
              Excluir sua conta remove permanentemente todos os seus dados. Esta
              ação é irreversível.
            </CardDescription>
          </CardHeader>

          <CardFooter className="justify-end">
            <DialogTrigger asChild>
              <Button variant="destructive">Excluir minha conta</Button>
            </DialogTrigger>
          </CardFooter>
        </Card>

        <DialogContent className="sm:max-w-sm md:max-w-md shadow-red-950 ring-red-950 dark:ring-red-950 dark:shadow-red-950">
          <DialogHeader className="space-y-4">
            <DialogTitle className="flex gap-3 items-center">
              <div className="bg-destructive/20 border border-destructive p-2 rounded-lg">
                <AlertOctagon className="text-destructive size-5.5" />
              </div>
              <Text className="text-foreground" variant="h2">
                Excluir conta?
              </Text>
            </DialogTitle>
            <DialogDescription asChild>
              <Text variant="mono">
                Todos os workspaces, boards e suas tarefas serão excluídas. Esta
                ação é permanente e não pode ser desfeita.
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
              onClick={handleDeleteWorkspace}
            >
              {loading ? "Excluindo workspace" : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { DangerZone };
