"use client";

import {
  Header,
  HeaderContent,
  HeaderSubtitle,
  HeaderTitle,
} from "@/components/ui/header";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const ACCOUNT_HEADER_LINKS = [
  { path: "/profile", label: "Perfil" },
  { path: "/settings", label: "Configurações" },
  { path: "/notifications", label: "Notificações" },
];

function AccountHeader() {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <Header>
        <HeaderContent>
          <HeaderTitle>Conta</HeaderTitle>
          <HeaderSubtitle>Gerencie seu perfil e preferências</HeaderSubtitle>
        </HeaderContent>
      </Header>

      <div className="inline-flex border border-border bg-muted/50 gap-1 w-fit h-fit items-center justify-center rounded-xl p-0.75 text-muted-foreground ">
        {ACCOUNT_HEADER_LINKS.map((link, index) => (
          <Link
            key={index}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-lg border-2 border-transparent px-4 py-2.5 text-sm whitespace-nowrap text-foreground/60 transition-all hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring dark:text-muted-foreground dark:hover:text-foreground",
              pathname === link.path && "shadow-[1.5px_1.5px_0] shadow-lime-950 text-foreground bg-primary border-2 border-foreground dark:border-lime-700 dark:text-primary-foreground"
            )}
            href={link.path}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export { AccountHeader };
