"use client";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { updateBoard, updateBoardSchema } from "@/http/boards/update-board";
import { ApiError } from "@/lib/http/api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface BoardIdHeaderProps {
  boardId: string;
  board: {
    id: string;
    title: string;
    workspaceId: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

const updateBoardInputSchema = updateBoardSchema.extend({
  title: z.string().min(2, "O Nome do Board é obrigatório."),
});

type UpdateBoardData = z.infer<typeof updateBoardInputSchema>;

function BoardIdHeader({ board, boardId }: BoardIdHeaderProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<UpdateBoardData>({
    values: {
      title: board.title,
    },
    resolver: zodResolver(updateBoardInputSchema),
  });

  async function handleUpdateWorkspace(data: UpdateBoardData) {
    try {
      await updateBoard({ title: data.title, boardId });

      reset();
      router.refresh();
      setIsEditing(false);
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
    <div className="h-11.5 flex flex-1 gap-2 items-center">
      <div className="size-3 bg-lime-800 rounded-full" />
      {isEditing ? (
        <form
          onSubmit={handleSubmit(handleUpdateWorkspace)}
          className="flex w-1/2 gap-4 items-center"
        >
          <FieldGroup>
            <Input
              className="py-2 px-4"
              id="title"
              variant={errors.title && "destructive"}
              placeholder="Digite o nome do board..."
              required
              {...register("title")}
            />

            <FieldError
              errors={[{ message: errors.title?.message }]}
              className="text-end"
            >
              {errors.title?.message}
            </FieldError>
          </FieldGroup>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="self-end shadow-[2px_2px_0]"
            size="sm"
          >
            {isSubmitting ? "Salvando alterações..." : "Salvar alterações"}
          </Button>
          {errors.root && (
            <ErrorMessage classname="py-2">{errors.root.message}</ErrorMessage>
          )}
        </form>
      ) : (
        <>
          <Text variant="h2">{board.title}</Text>
          <Button
            variant="ghost"
            className="p-3"
            onClick={() => setIsEditing(true)}
          >
            <PencilLine className="size-4.5" />
          </Button>
        </>
      )}
    </div>
  );
}

export { BoardIdHeader };
