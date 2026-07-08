"use client";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { FieldGroup } from "@/components/ui/field";
import { InputField } from "@/components/ui/form/input-field";
import { Text } from "@/components/ui/text";
import {
  updateWorkspace,
  updateWorkspaceSchema,
} from "@/http/workspaces/update-workspace";
import { ApiError } from "@/lib/http/api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

interface UpdateWorkspaceProps {
  workspaceId: string;
}

const updateWorkspaceInputSchema = updateWorkspaceSchema.extend({
  title: z.string().min(2, "O Nome do workspace é obrigatório."),
});

type UpdateWorkspaceData = z.infer<typeof updateWorkspaceInputSchema>;

function UpdateForm({ workspaceId }: UpdateWorkspaceProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<UpdateWorkspaceData>({
    resolver: zodResolver(updateWorkspaceInputSchema),
  });

  async function handleUpdateWorkspace(data: UpdateWorkspaceData) {
    try {
      await updateWorkspace({ title: data.title, workspaceId });

      reset();
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

  return (
    <div className="bg-popover px-6 py-7 rounded-2xl border border-border space-y-5.5">
      <div className="flex flex-col">
        <Text className="text-foreground font-semibold">Geral</Text>
        <Text variant="mono">
          O nome do workspace é visível para todos os membros.
        </Text>
      </div>
      <form
        onSubmit={handleSubmit(handleUpdateWorkspace)}
        className="flex flex-col gap-4"
      >
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
        <Button type="submit" disabled={isSubmitting} className="self-end">
          {isSubmitting ? "Salvando alterações..." : "Salvar alterações"}
        </Button>
      </form>
    </div>
  );
}

export { UpdateForm };
