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
import { CoreButton } from "@/components/ui/form/core-button";
import { InputField } from "@/components/ui/form/input-field";
import { Text } from "@/components/ui/text";
import {
  createWorkspace,
  createWorkspaceSchema,
} from "@/http/workspaces/create-workspace";
import { ApiError } from "@/lib/http/api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type NewBoardData = z.infer<typeof createWorkspaceSchema>;

const newBoardSchema = z.object({
  title: z.string().min(2, "O Nome do worspace é obrigatório."),
});

function NewBoardDialog() {
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
      await createWorkspace(data);

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
        <CoreButton>
          <Plus />
          Novo board
        </CoreButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form className="grid gap-6" onSubmit={handleSubmit(handleCreateBoard)}>
          <DialogHeader>
            <DialogTitle asChild>
              <Text variant="heading-3">Novo board</Text>
            </DialogTitle>
            <DialogDescription asChild>
              <Text>Boards organizam tarefas em colunas kanban.</Text>
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
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
              <Button className="px-6 border-lime-950" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <CoreButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Criando board..." : "Criar board"}
            </CoreButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { NewBoardDialog };
