"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ErrorMessage } from "@/components/ui/error-message";
import { FieldGroup } from "@/components/ui/field";
import { InputField } from "@/components/ui/form/input-field";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(2, "O nome é obrigatório"),
  newPassword: z.string().min(2, "O nome é obrigatório"),
});

function UpdatePassword() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UpdatePasswordData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  async function handleUpdatePassword(data: UpdatePasswordData) {
    await authClient.changePassword({
      ...data,
      fetchOptions: {
        onSuccess: () => {
          router.replace("/profile");
        },
        onError: () => {
          setError("root", {
            message: "Ocorreu um erro. Tente novamente mais tarde.",
          });
        },
      },
    });
  }

  return (
    <Card className="hover:translate-y-0">
      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(handleUpdatePassword)}
      >
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardAction>
            <Button size="sm" type="submit">
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <FieldGroup className="gap-4">
            <InputField
              errorInput={errors.currentPassword}
              register={register}
              input="currentPassword"
              label="Senha atual"
              type="password"
              placeholder="Digite a senha atual..."
            />

            <InputField
              errorInput={errors.newPassword}
              register={register}
              type="Nova senha"
              input="newPassword"
              label="Nome"
              placeholder="Digite a nova senha..."
            />
          </FieldGroup>
        </CardContent>
      </form>
    </Card>
  );
}

export { UpdatePassword };
