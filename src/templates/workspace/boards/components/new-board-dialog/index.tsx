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
import { FieldGroup } from "@/components/ui/field";
import { InputField } from "@/components/ui/form/input-field";
import { Text } from "@/components/ui/text";
import { createBoardSchema, createBoard } from "@/http/boards/create-board";
import { ApiError } from "@/lib/http/api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type NewBoardData = z.infer<typeof createBoardSchema>;

const newBoardSchema = z.object({
  title: z.string().min(2, "O Nome do board é obrigatório."),
});

function NewBoardDialog({ workspaceId }: { workspaceId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<NewBoardData>({
    resolver: zodResolver(newBoardSchema),
  });

  async function handleCreateBoard(data: NewBoardData) {
    try {
      await createBoard({ title: data.title, workspaceId });

      reset();
      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof ApiError) {
        setError("root", { message: error.message });
        return;
      }

      setError("root", {
        message: "Ocorreu um erro. Tente novamente mais tarde.",
      });
    }
  }

  function handleClose(isModalOpen: boolean) {
    setIsModalOpen(isModalOpen);
    if (!isModalOpen) reset();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-1" />
          Novo board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form className="grid gap-6" onSubmit={handleSubmit(handleCreateBoard)}>
          <DialogHeader>
            <DialogTitle asChild>
              <Text variant="h2">Novo board</Text>
            </DialogTitle>
            <DialogDescription asChild>
              <Text variant="sm">
                Boards organizam tarefas em colunas kanban.
              </Text>
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

            <InputField
              errorInput={errors.title}
              register={register}
              input="title"
              label="Nome do board"
              placeholder="Digite o nome do board..."
            />
          </FieldGroup>

          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button className="px-6" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Criando board..." : "Criar board"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { NewBoardDialog };
