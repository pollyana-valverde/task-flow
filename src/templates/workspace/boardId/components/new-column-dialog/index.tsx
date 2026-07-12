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
import { createColumn, createColumnSchema } from "@/http/columns/create-column";

import { ApiError } from "@/lib/http/api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";


const newColumnSchema = createColumnSchema.extend({
  title: z.string().min(2, "O Nome da coluna é obrigatório."),
});

type NewColumnData = z.infer<typeof newColumnSchema>;

function NewColumnDialog({ boardId }: { boardId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<NewColumnData>({
    resolver: zodResolver(newColumnSchema),
  });

  async function handleCreateColumn(data: NewColumnData) {
    try {
      await createColumn({ title: data.title, boardId });

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
        <Button variant="outline" className="border-dashed min-w-67 h-fit">
          <Plus className="mr-1" />
          Nova coluna
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm md:max-w-md">
        <form className="grid gap-6" onSubmit={handleSubmit(handleCreateColumn)}>
          <DialogHeader>
            <DialogTitle asChild>
              <Text variant="h2">Nova coluna</Text>
            </DialogTitle>
            <DialogDescription asChild>
              <Text variant="sm">
                Crie um novo estágio no seu board.
              </Text>
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

            <InputField
              errorInput={errors.title}
              register={register}
              input="title"
              label="Nome da coluna"
              placeholder="Ex: Em revisão"
            />
          </FieldGroup>

          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button className="px-6" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Criando coluna..." : "Criar coluna"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { NewColumnDialog };
