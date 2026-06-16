import { Text } from "@/components/ui/text";
import { Logo } from "@/components/ui/header/logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid md:grid-cols-[60%_40%] ">
      <aside
        className={`
          bg-[url('@/assets/images/login-back.svg')] bg-cover bg-center bg-no-repeat h-screen
          p-11 flex flex-col justify-between gap-6`}
      >
        <Logo />

        <div className="space-y-2 flex flex-col max-w-md">
          <Text variant="display" className="text-lime-950">
            Onde estratégia encontra execução.
          </Text>
          <Text className="text-lime-950/80">
            Organize times, boards e tarefas em um só lugar. Quadros kanban
            colaborativos com controle de papéis, prioridades e prazos.
          </Text>
        </div>

        <div className="flex gap-7">
          <div className="flex flex-col">
            <Text variant="heading-1" className="text-lime-950">
              10k+
            </Text>
            <Text variant="content" className="text-lime-950/80">
              times ativos
            </Text>
          </div>
          <div className="flex flex-col">
            <Text variant="heading-1" className="text-lime-950">
              2M+
            </Text>
            <Text variant="content" className="text-lime-950/80">
              tarefas movidas
            </Text>
          </div>
          <div className="flex flex-col">
            <Text variant="heading-1" className="text-lime-950">
              99.9%
            </Text>
            <Text variant="content" className="text-lime-950/80">
              uptime
            </Text>
          </div>
        </div>
      </aside>
      <main className="flex flex-col justify-center items-center py-11 px-8 md:px-14 h-screen">
        {children}
      </main>
    </div>
  );
}
