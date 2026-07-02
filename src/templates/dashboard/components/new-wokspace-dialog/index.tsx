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

type NewWorkspaceData = z.infer<typeof createWorkspaceSchema>;

const newWorkspaceSchema = z.object({
  title: z.string().min(2, "O Nome do worspace é obrigatório."),
});

function NewWorkspaceDialog() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<NewWorkspaceData>({
    resolver: zodResolver(newWorkspaceSchema),
  });

  async function handleCreateWorkspace(data: NewWorkspaceData) {
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
        <Button>
          <Plus className="mr-1" />
          Novo workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form
          className="grid gap-6"
          onSubmit={handleSubmit(handleCreateWorkspace)}
        >
          <DialogHeader>
            <DialogTitle asChild>
              <Text variant="h2">Novo workspace</Text>
            </DialogTitle>
            <DialogDescription asChild>
              <Text variant="sm">
                Workspaces agrupam seus boards e membros.
              </Text>
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

            <InputField
              errorInput={errors.title}
              register={register}
              input="title"
              label="Nome do workspace"
              placeholder="Digite o nome do workspace..."
            />
          </FieldGroup>

          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button className="px-6" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Criando workspace..." : "Criar workspace"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { NewWorkspaceDialog };
