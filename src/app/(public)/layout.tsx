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
          bg-[url('@/assets/images/login-back.svg')]
          bg-cover bg-center bg-no-repeat h-screen
          p-11 flex flex-col justify-between gap-6 bg-lime-50
          dark:bg-[#181d10] dark:bg-[url('@/assets/images/login-back-dark.svg')]
          dark:border-r-2 dark:border-[#2C3618]`}
      >
        <Logo />

        <div className="space-y-4 flex flex-col">
          <Text variant="display" className="leading-[130%] max-w-lg">
            Onde estratégia encontra{" "}
            <span className=" px-2 rounded-lg bg-primary text-lime-950 border-2 border-lime-950 bg-clip-padding">
              execução.
            </span>
          </Text>
          <Text className="max-w-md">
            Organize times, boards e tarefas em um só lugar. Quadros kanban
            colaborativos com controle de papéis, prioridades e prazos.
          </Text>
        </div>

        <div className="flex gap-9">
          <div className="flex flex-col">
            <Text variant="h1">10k+</Text>
            <Text variant="mono" className="text-chart-3">
              times ativos
            </Text>
          </div>
          <div className="flex flex-col">
            <Text variant="h1">2M+</Text>
            <Text variant="mono" className="text-chart-3">
              tarefas movidas
            </Text>
          </div>
          <div className="flex flex-col">
            <Text variant="h1">99.9%</Text>
            <Text variant="mono" className="text-chart-3">
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
