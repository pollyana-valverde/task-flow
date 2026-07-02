import Link from "next/link";
import { Text } from "@/components/ui/text";
import { SignUpForm } from "./components/form";

function SignUpPage() {
  return (
    <div className="flex flex-col items-start w-full gap-7">
      <div className="flex flex-col items-start w-full gap-1">
        <Text variant="h1">Crie sua conta</Text>
        <Text>Comece a organizar seu time em minutos.</Text>
      </div>

      <SignUpForm />

      <div className="flex gap-1 justify-center w-full">
        <Text>Já tem conta?</Text>
        <Link
          href="/sign-in"
          className=" leading-[140%] font-bold text-chart-3 hover:underline"
        >
          Entre
        </Link>
      </div>
    </div>
  );
}

export { SignUpPage };
