"use client";

import Link from "next/link";
import { Text } from "@/components/ui/text";
import { SignInForm } from "./components/form";

function SignInPage() {
  return (
    <div className="flex flex-col items-start w-full gap-7">
      <div className="flex flex-col items-start w-full gap-1">
        <Text variant="h1">Bem-vindo de volta</Text>
        <Text>Entre na sua conta para continuar.</Text>
      </div>

      <SignInForm />

      <div className="flex gap-1 justify-center w-full">
        <Text>Não tem conta?</Text>
        <Link
          href="/sign-up"
          className=" leading-[140%] text-chart-3 hover:underline"
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}

export { SignInPage };
