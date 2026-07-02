"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { ErrorMessage } from "@/components/ui/error-message";
import { FieldGroup } from "@/components/ui/field";
import { InputField } from "@/components/ui/form/input-field";
import { authClient } from "@/lib/auth-client";
import { translateAuthError } from "@/utils/auth-errors";
import { Button } from "@/components/ui/button";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const signUpSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório"),
  email: z.email("Email inválido"),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
});

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSignUp(data: SignUpFormData) {
    await authClient.signUp.email({
      ...data,
      fetchOptions: {
        onSuccess: () => {
          redirect("/");
        },
        onError: (error) => {
          const { field, message } = translateAuthError(error.error.code);
          setError(field, { message }, { shouldFocus: true });
        },
      },
    });
  }

  return (
    <>
      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

      <form className="w-full" onSubmit={handleSubmit(onSignUp)}>
        <FieldGroup className="flex flex-col gap-5">
          <InputField
            errorInput={errors.name}
            register={register}
            input="name"
            label="Nome completo"
            placeholder="Digite seu nome completo..."
          />

          <InputField
            errorInput={errors.email}
            register={register}
            input="email"
            label="Email"
            type="email"
            placeholder="example@email.com"
          />

          <InputField
            errorInput={errors.password}
            register={register}
            input="password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha..."
          />

          <Button disabled={isSubmitting} size="lg">
            {isSubmitting ? "Criando conta..." : "Criar conta"}
          </Button>
        </FieldGroup>
      </form>
    </>
  );
}

export { SignUpForm, type SignUpFormData };
