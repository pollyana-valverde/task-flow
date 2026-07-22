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
import { InputField } from "@/components/ui/form/input-field";
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
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { createTask, createTaskSchema } from "@/http/tasks/create-task";
import { ApiError } from "@/lib/http/api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

interface NewTaskDialogProps {
  columnId: string;
  children: React.ReactNode;
  members: {
    id: string;
    userId: string;
    user: {
      name: string;
    };
  }[];
}

const newTaskSchema = createTaskSchema.extend({
  title: z.string().min(2, "O Nome da tarefa é obrigatório."),
  dueDate: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.coerce.date().nullable().optional()
  ),
  assigneeId: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.uuid().nullable().optional()
  ),
});

type NewTaskDataInput = z.input<typeof newTaskSchema>;
type NewTaskDataOutput = z.output<typeof newTaskSchema>;

function NewTaskDialog({ columnId, children, members }: NewTaskDialogProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
  } = useForm<NewTaskDataInput, any, NewTaskDataOutput>({
    defaultValues: {
      priority: "medium",
      assigneeId: "",
    },
    resolver: zodResolver(newTaskSchema),
  });

  async function handleCreateTask(data: NewTaskDataOutput) {
    try {
      await createTask({ createData: { ...data }, columnId });

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
        <form className="grid gap-6" onSubmit={handleSubmit(handleCreateTask)}>
          <DialogHeader>
            <DialogTitle asChild>
              <Text variant="h2">Nova tarefa</Text>
            </DialogTitle>
            <DialogDescription asChild>
              <Text variant="sm">Crie um novo estágio no seu board.</Text>
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

            <InputField
              errorInput={errors.title}
              register={register}
              input="title"
              label="Título"
              placeholder="Digite o nome da tarefa..."
            />

            <Field className="flex flex-col gap-1">
              <FieldLabel htmlFor="description">Descrição</FieldLabel>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Digite a descrição da tarefa..."
              />
              <span>{errors.description?.message}</span>
            </Field>

            <Field className="flex flex-col gap-1">
              <FieldLabel htmlFor="priority">Papel</FieldLabel>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <ToggleGroup
                    id="priority"
                    type="single"
                    variant="outline"
                    size="lg"
                    value={field.value}
                    onValueChange={(value) => {
                      if (value) field.onChange(value);
                    }}
                  >
                    <ToggleGroupItem
                      value="urgent"
                      aria-label="Toggle urgent"
                      className="text-red-600 hover:text-red-600 data-[state=on]:bg-red-600 data-[state=on]:text-white data-[state=on]:border-red-600 dark:data-[state=on]:border-red-600 data-[state=on]:shadow-none uppercase font-mono font-semibold"
                    >
                      Urgente
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="high"
                      aria-label="Toggle high"
                      className="text-red-700 hover:text-red-700 data-[state=on]:bg-red-200 data-[state=on]:text-red-700 data-[state=on]:border-red-500 dark:data-[state=on]:border-red-700 dark:data-[state=on]:bg-red-800/10 data-[state=on]:shadow-none uppercase font-mono font-semibold"
                    >
                      Alta
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="medium"
                      aria-label="Toggle medium"
                      className="text-amber-700 hover:text-amber-700 data-[state=on]:bg-amber-200 data-[state=on]:text-amber-700 data-[state=on]:border-amber-500 dark:data-[state=on]:border-amber-700 dark:data-[state=on]:bg-amber-800/10 data-[state=on]:shadow-none uppercase font-mono font-semibold"
                    >
                      Média
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="low"
                      aria-label="Toggle low"
                      className="text-foreground hover:text-foreground data-[state=on]:bg-muted data-[state=on]:text-foreground data-[state=on]:border-foreground dark:data-[state=on]:border-foreground dark:data-[state=on]:bg-muted data-[state=on]:shadow-none uppercase font-mono font-semibold"
                    >
                      Baixa
                    </ToggleGroupItem>
                  </ToggleGroup>
                )}
              />
              <span>{errors.priority?.message}</span>
            </Field>

            <div className="flex gap-4">
              <Field className="flex flex-col gap-1">
                <FieldLabel htmlFor="description">Responsável</FieldLabel>

                <Controller
                  name="assigneeId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value as string}
                      onValueChange={(value) => {
                        if (value) field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Escolha um responsável..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {members.map((member) => (
                            <SelectItem key={member.id} value={member.userId}>
                              {member.user.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <span>{errors.assigneeId?.message}</span>
              </Field>

              <Field className="flex flex-col gap-1">
                <FieldLabel htmlFor="dueDate">Vencimento</FieldLabel>
                <Input
                  id="dueDate"
                  type="date"
                  {...register("dueDate")}
                  placeholder="Digite a data de vencimento da tarefa..."
                  aria-required={false}
                  required={false}
                />
                <span>{errors.dueDate?.message}</span>
              </Field>
            </div>
          </FieldGroup>

          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button className="px-6" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Criando tarefa..." : "Criar tarefa"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { NewTaskDialog };
