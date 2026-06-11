import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

export default function SignIn() {
  return (
    <div className="flex flex-col justify-center items-center gap-7 py-11 px-14 h-screen">
      <div className="flex flex-col items-start w-full gap-1">
        <Text className="text-lime-950" variant="heading-1">
          Bem-vindo de volta
        </Text>
        <Text className="text-lime-950/80">
          Entre na sua conta para continuar.
        </Text>
      </div>

      <FieldGroup className="flex flex-col gap-5">
        <Field className="flex flex-col">
          <FieldLabel className="text-lime-950">Email</FieldLabel>
          <Input placeholder="example@email.com" type="email" />
        </Field>

        <Field className="flex flex-col">
          <div className="flex justify-between items-center gap-2">
            <FieldLabel className="text-lime-950">Senha</FieldLabel>
            <Link
              href="/"
              className="text-lime-700 text-sm hover:text-lime-600 transition-colors font-bold"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <Input placeholder="******" type="password" />
        </Field>

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
            group-hover:bg-lime-400 group-hover:border-none hover:border-none hover:bg-lime-400`}
          >
            Entrar
          </Button>
        </div>
      </FieldGroup>

      <div className="flex gap-1">
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
