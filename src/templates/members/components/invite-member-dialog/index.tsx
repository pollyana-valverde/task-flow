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
import { InputField } from "@/components/ui/form/input-field";
import { Text } from "@/components/ui/text";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  inviteMember,
  inviteMemberInputSchema,
} from "@/http/members/invite-member";
import { ApiError } from "@/lib/http/api-error";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import z from "zod";

type InviteMemberData = z.infer<typeof inviteMemberInputSchema>;

const inviteMemberSchema = z.object({
  email: z.email("Email inválido"),
  role: z.enum(["admin", "member"], "Opção inválida"),
});

function InviteMemberDialog({ workspaceId }: { workspaceId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
  } = useForm<InviteMemberData>({
    resolver: zodResolver(inviteMemberSchema),
  });

  async function handleInviteMember(data: InviteMemberData) {
    try {
      await inviteMember({ email: data.email, role: data.role, workspaceId });

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
          Convidar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form
          className="grid gap-6"
          onSubmit={handleSubmit(handleInviteMember)}
        >
          <DialogHeader>
            <DialogTitle asChild>
              <Text variant="h2">Convidar membro</Text>
            </DialogTitle>
            <DialogDescription asChild>
              <Text variant="sm">Enviaremos um convite por email.</Text>
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

            <InputField
              errorInput={errors.email}
              register={register}
              input="email"
              label="Email"
              placeholder="example@email.com"
            />

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
              {isSubmitting ? "Enviando convite..." : "Enviar convite"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { InviteMemberDialog };
