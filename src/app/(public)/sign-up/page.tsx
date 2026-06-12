"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    await authClient.signUp.email({
      name,
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          redirect("/");
        },
      },
    });
  }

  return (
    <form
      method="POST"
      className="flex flex-col items-start w-full gap-7"
      onSubmit={(e) => {
        handleSignUp(e);
      }}
    >
      <div className="flex flex-col items-start w-full gap-1">
        <Text className="text-lime-950" variant="heading-1">
          Crie sua conta
        </Text>
        <Text className="text-lime-950/80">
          Comece a organizar seu time em minutos.
        </Text>
      </div>

      <FieldGroup className="flex flex-col gap-5">
        <Field className="flex flex-col">
          <FieldLabel className="text-lime-950">Nome completo</FieldLabel>
          <Input
            placeholder="Digite seu nome completo..."
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <Field className="flex flex-col">
          <FieldLabel className="text-lime-950">Email</FieldLabel>
          <Input
            placeholder="example@email.com"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field className="flex flex-col">
          <FieldLabel className="text-lime-950">Senha</FieldLabel>
          <Input
            placeholder="Digite sua senha..."
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        {/* Botão */}
        <div
          className={`
          p-0.5 bg-lime-950
          border-b-3 border-r-3 border-lime-400 rounded-tl-lg rounded-xl 
          hover:border-lime-950 group`}
        >
          <Button
            className={`
            bg-lime-400 w-full
            rounded-tl-md rounded-lg border-t-2 border-l-2 border-white text-lime-950 
            group-hover:bg-lime-400 group-hover:border-none`}
          >
            Criar conta
          </Button>
        </div>
      </FieldGroup>

      <div className="flex gap-1">
        <Text className="text-lime-950/80">Já tem conta?</Text>
        <Link
          href="/sign-in"
          className=" leading-[140%] font-bold text-lime-700 hover:text-lime-600 transition-colors"
        >
          Entre
        </Link>
      </div>
    </form>
  );
}
