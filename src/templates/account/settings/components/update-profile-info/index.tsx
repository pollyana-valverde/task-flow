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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputField } from "@/components/ui/form/input-field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

interface UpdateProfileInfoData {
  name: string;
}

const updateProfileInfoSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório"),
});

function UpdateProfileInfo() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UpdateProfileInfoData>({
    values: {
      name: session?.user.name ?? "",
    },
    resolver: zodResolver(updateProfileInfoSchema),
  });

  async function handleUpdateProfileInfo(data: UpdateProfileInfoData) {
    await authClient.updateUser({
      name: data.name,
      fetchOptions: {
        onSuccess: () => {
          router.push("/profile");
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
        onSubmit={handleSubmit(handleUpdateProfileInfo)}
      >
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardAction>
            <Button size="sm" type="submit">
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <FieldGroup className="gap-4">
            <InputField
              errorInput={errors.name}
              register={register}
              input="name"
              label="Nome"
              placeholder="Digite seu nome..."
            />

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input value={session?.user.email} disabled />
            </Field>
          </FieldGroup>
        </CardContent>
      </form>
    </Card>
  );
}

export { UpdateProfileInfo };
