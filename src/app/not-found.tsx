import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className={`
      flex flex-col items-center justify-center h-screen w-full
      bg-[url('@/assets/images/not-found-back.svg')] bg-cover bg-center bg-no-repeat
      dark:bg-[url('@/assets/images/not-found-back-dark.svg')]
      `}
    >
      <Text className="text-9xl font-black text-secondary [-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:var(--color-chart-3)]">
        404
      </Text>
      <Text variant="display">Página não encontrada</Text>
      <Link className=" mt-5" href="/">
        <Button>Voltar para home</Button>
      </Link>
    </div>
  );
}
