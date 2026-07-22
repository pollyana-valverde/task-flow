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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import type { getTaskResultSchema } from "@/http/tasks/get-task";
import { moveToColumn, moveToColumnInputSchema } from "@/http/tasks/move-to-column";
import { ApiError } from "@/lib/http/api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

interface MoveToColumnDialogProps {
  children: React.ReactNode;
  currentColumn: string
  columns: {
    id: string
    title: string
    }[]
  task: z.infer<typeof getTaskResultSchema>;
}

type MoveToColumnData = z.infer<typeof moveToColumnInputSchema>;

function MoveToColumnDialog({ children, task , currentColumn, columns}: MoveToColumnDialogProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
  } = useForm<MoveToColumnData>({
    defaultValues: {
      newColumnId: ""
    },
    values: {
      oldColumnId: task.columnId,
      newColumnId: ""
    },
    resolver: zodResolver(moveToColumnInputSchema),
  });

  async function handleMoveToColumn(data: MoveToColumnData) {
    try {
      await moveToColumn({ oldColumnId: task.columnId, newColumnId: data.newColumnId, taskId: task.id });

      reset();
      setIsModalOpen(false);

      router.refresh();
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.issues) {
          setError("root", {
            message: error.issues?.map((err) => err.message)[0],
          });
        } else if (error.message) {
          setError("root", { message: error.message });
        }
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
      <DialogContent className="sm:max-w-sm md:max-w-lg">
        <form className="grid gap-6" onSubmit={handleSubmit(handleMoveToColumn)}>
          <DialogHeader>
            <DialogTitle asChild>
              <Text variant="h2">Mover tarefa</Text>
            </DialogTitle>
            <DialogDescription asChild>
              <Text variant="sm">Mova a tarefa para uma nova coluna.</Text>
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

            <Field>
              <FieldLabel htmlFor="currentColumn">Coluna Atual</FieldLabel>
              <Input disabled value={currentColumn} id="currentColumn"/>
            </Field>

              <Field className="flex flex-col gap-1">
                <FieldLabel htmlFor="description">Mover para coluna:</FieldLabel>

                <Controller
                  name="newColumnId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value as string}
                      onValueChange={(value) => {
                        if (value) field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Escolha a nova coluna..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {columns.map((column) => (
                            (column.title !== currentColumn && (
                              <SelectItem key={column.id} value={column.id}>
                                {column.title}
                              </SelectItem>
                            ))
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
          </FieldGroup>

          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button className="px-6" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Movendo tarefa..." : "Mover"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { MoveToColumnDialog };
