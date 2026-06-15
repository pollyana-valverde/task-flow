import Link from "next/link";
import { Text } from "@/components/ui/text";
import { SignUpForm } from "./components/sign-up-form";

function SignUpPage() {
  return (
    <div className="flex flex-col items-start w-full gap-7">
      <div className="flex flex-col items-start w-full gap-1">
        <Text className="text-lime-950" variant="heading-1">
          Crie sua conta
        </Text>
        <Text className="text-lime-950/80">
          Comece a organizar seu time em minutos.
        </Text>
      </div>

      <SignUpForm />

      <div className="flex gap-1 justify-center w-full">
        <Text className="text-lime-950/80">Já tem conta?</Text>
        <Link
          href="/sign-in"
          className=" leading-[140%] font-bold text-lime-700 hover:text-lime-600 transition-colors"
        >
          Entre
        </Link>
      </div>
    </div>
  );
}

export { SignUpPage };
