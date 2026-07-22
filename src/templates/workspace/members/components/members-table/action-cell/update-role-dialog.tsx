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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Text } from "@/components/ui/text";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { updateRole, updateRoleInputSchema } from "@/http/members/update-role";
import { ApiError } from "@/lib/http/api-error";
import { cn } from "@/lib/utils";
import { capitalizeFirtLetter } from "@/utils/captalize-first-letter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import type { ActionCellProps } from "./type";

const updateRoleSchema = updateRoleInputSchema.extend({
  role: z.enum(["admin", "member"], "Opção inválida"),
});

type UpdateRoleData = z.infer<typeof updateRoleSchema>;

function UpdateRoleDialog({ workspaceId, children, member }: ActionCellProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
  } = useForm<UpdateRoleData>({
    defaultValues: {
      role: member.role,
    },
    resolver: zodResolver(updateRoleSchema),
  });

  async function handleUpdateRole(data: UpdateRoleData) {
    try {
      await updateRole({ ...data, workspaceId, memberId: member.userId });

      reset();
      setIsModalOpen(false);

      router.refresh();
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.issues) {
          setError("root", {
            message: error.issues?.map((err) => err.message)[0],
          });
        }

        if (error.message) {
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
      <DialogContent className="sm:max-w-sm md:max-w-md">
        <form className="grid gap-6" onSubmit={handleSubmit(handleUpdateRole)}>
          <DialogHeader>
            <DialogTitle asChild>
              <Text variant="h2">
                Atualizar papel do membro{" "}
                <span className="font-bold">
                  {capitalizeFirtLetter(member.user.name)}
                </span>
              </Text>
            </DialogTitle>
            <DialogDescription asChild>
              <Text variant="sm">
                Atualize o papel desse membro no workspace para membro ou admin.
              </Text>
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

            <Field className="flex flex-col gap-1">
              <FieldLabel
                htmlFor="role"
                className={cn(errors.role && "text-destructive")}
              >
                Papel
              </FieldLabel>
              <Controller
                name="role"
                control={control}
                defaultValue="member"
                render={({ field }) => (
                  <ToggleGroup
                    id="role"
                    type="single"
                    variant="outline"
                    size="lg"
                    value={field.value}
                    onValueChange={(value) => {
                      if (value) field.onChange(value);
                    }}
                  >
                    <ToggleGroupItem value="admin" aria-label="Toggle admin">
                      Admin
                    </ToggleGroupItem>
                    <ToggleGroupItem value="member" aria-label="Toggle member">
                      Membro
                    </ToggleGroupItem>
                  </ToggleGroup>
                )}
              />
              <FieldError
                errors={[{ message: errors.role?.message }]}
                className="text-end"
              >
                {errors.role?.message}
              </FieldError>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button className="px-6" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Atualizando papel..." : "Atualizar papel"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { UpdateRoleDialog };
