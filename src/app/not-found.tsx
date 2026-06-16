import { CoreButton } from "@/components/ui/form/core-button";
import { Text } from "@/components/ui/text";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className={`
      flex flex-col items-center justify-center h-screen w-full
      bg-[url('@/assets/images/not-found-back.svg')] bg-contain bg-center bg-no-repeat
      `}
    >
      <Text className="text-9xl font-black text-lime-100 [-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:var(--color-lime-600)]">
        404
      </Text>
      <Text variant="display" className="text-lime-900">
        Página não encontrada
      </Text>
      <Link className="w-1/4 mt-5" href="/">
        <CoreButton>Voltar para home</CoreButton>
      </Link>
    </div>
  );
}
