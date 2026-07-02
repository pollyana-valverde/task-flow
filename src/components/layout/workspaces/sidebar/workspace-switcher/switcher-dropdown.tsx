"use client";

import { Home } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { capitalizeFirtLetter } from "@/utils/captalize-first-letter";

interface SwitcherDropdownProps {
  workspaces: {
    id: string;
    title: string;
    createdAt: Date;
  }[];
}

function SwitcherDropdown({ workspaces }: SwitcherDropdownProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  return (
    <DropdownMenuContent
      className="w-(--radix-dropdown-menu-trigger-width) min-w-56 max-h-56 overflow-y-scroll rounded-lg"
      align="start"
      side={isMobile ? "bottom" : "right"}
      sideOffset={4}
    >
      <DropdownMenuLabel asChild>
        <Text variant="mono">Workspaces</Text>
      </DropdownMenuLabel>
      {workspaces.map((workspace) => (
        <DropdownMenuItem
          key={workspace.id}
          onClick={() => router.replace(`/workspaces/${workspace.id}/boards`)}
          className="gap-2 p-2"
        >
          <div className="size-8.5 flex items-center justify-center rounded-md bg-primary border border-foreground">
            <Text className="text-lime-950 font-bold font-heading">
              {workspace.title.split("")[0].toUpperCase()}
            </Text>
          </div>
          <div className="grid flex-1 text-left">
            <Text
              variant="sm"
              className="truncate text-foreground/90 font-bold"
            >
              {capitalizeFirtLetter(workspace.title)}
            </Text>
            <Text variant="mono" className="truncate">
              {workspace.createdAt.toLocaleDateString("pt-br", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </div>
        </DropdownMenuItem>
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem className="gap-2 p-2">
        <Home className="size-4 text-foreground/80" />
        <Link href={"/"} className="font-medium text-foreground/80">
          Voltar pro dashboard
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export { SwitcherDropdown };
