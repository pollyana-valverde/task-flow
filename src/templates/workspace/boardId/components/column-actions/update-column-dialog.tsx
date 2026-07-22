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
import { FieldGroup } from "@/components/ui/field";
import { InputField } from "@/components/ui/form/input-field";
import { Text } from "@/components/ui/text";
import { updateColumn, updateColumnSchema } from "@/http/columns/update-column";
import { ApiError } from "@/lib/http/api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface UpdateColumnDialogProps {
  children: React.ReactNode;
  column: {
    id: string;
    title: string;
  };
}

const updateColumnInputSchema = updateColumnSchema.extend({
  title: z.string().min(2, "O Nome da coluna é obrigatório."),
});

type UpdateColumnData = z.infer<typeof updateColumnInputSchema>;

function UpdateColumnDialog({ children, column }: UpdateColumnDialogProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<UpdateColumnData>({
    values: {
      title: column.title,
    },
    resolver: zodResolver(updateColumnInputSchema),
  });

  async function handleCreateColumn(data: UpdateColumnData) {
    try {
      await updateColumn({ title: data.title, columnId: column.id });

      reset();
      setIsModalOpen(false);

      router.refresh();
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm md:max-w-md">
        <form
          className="grid gap-6"
          onSubmit={handleSubmit(handleCreateColumn)}
        >
          <DialogHeader>
            <DialogTitle asChild>
              <Text variant="h2">
                Atualizar coluna{" "}
                <span className="font-bold">{column.title}</span>?
              </Text>
            </DialogTitle>
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
              {isSubmitting ? "Atualizando coluna..." : "Atulizar coluna"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { UpdateColumnDialog };
