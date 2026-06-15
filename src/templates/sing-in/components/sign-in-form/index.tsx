"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { CoreButton } from "@/components/ui/core-button";
import { ErrorMessage } from "@/components/ui/error-message";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputField } from "@/components/ui/input-field";
import { authClient } from "@/lib/auth-client";
import { translateAuthError } from "@/utils/auth-errors";

interface SignInFormData {
  email: string;
  password: string;
}

const signInSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
});

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSignIn(data: SignInFormData) {
    await authClient.signIn.email({
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
      <form className="w-full " onSubmit={handleSubmit(handleSignIn)}>
        <FieldGroup className="flex flex-col gap-5">
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
            type="password"
            placeholder="Digite sua senha..."
          >
            <div className="flex justify-between items-center gap-2">
              <FieldLabel className="text-lime-950">Senha</FieldLabel>
              <Link
                href="/"
                className="text-lime-700 text-sm hover:text-lime-600 transition-colors font-bold"
              >
                Esqueceu a senha?
              </Link>
            </div>
          </InputField>

          <CoreButton disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </CoreButton>
        </FieldGroup>
      </form>
    </>
  );
}

export { SignInForm };
