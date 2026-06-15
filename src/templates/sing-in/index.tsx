import Link from "next/link";
import { Text } from "@/components/ui/text";
import { SignInForm } from "./components/sign-in-form";

function SignInPage() {
  return (
    <div className="flex flex-col items-start w-full gap-7">
      <div className="flex flex-col items-start w-full gap-1">
        <Text className="text-lime-950" variant="heading-1">
          Bem-vindo de volta
        </Text>
        <Text className="text-lime-950/80">
          Entre na sua conta para continuar.
        </Text>
      </div>

      <SignInForm />

      <div className="flex gap-1 justify-center w-full">
        <Text className="text-lime-950/80">Não tem conta?</Text>
        <Link
          href="/sign-up"
          className=" leading-[140%] font-bold text-lime-700 hover:text-lime-600 transition-colors"
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}

export { SignInPage };
