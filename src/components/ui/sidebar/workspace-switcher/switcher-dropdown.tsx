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
      className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
      align="start"
      side={isMobile ? "bottom" : "right"}
      sideOffset={4}
    >
      <DropdownMenuLabel asChild>
        <Text variant="label" className="text-lime-950/60 normal-case">
          Workspaces
        </Text>
      </DropdownMenuLabel>
      {workspaces.map((workspace) => (
        <DropdownMenuItem
          key={workspace.id}
          onClick={() => router.replace(`/workspaces/${workspace.id}/boards`)}
          className="gap-2 p-2"
        >
          <div className="h-9.5 w-9.5 flex items-center justify-center rounded-lg bg-lime-800 text-white">
            <Text variant="heading-3">
              {workspace.title.split("")[0].toUpperCase()}
            </Text>
          </div>
          <div className="grid flex-1 text-left">
            <Text className="truncate font-semibold text-lime-950">
              {workspace.title}
            </Text>
            <Text variant="caption" className="truncate text-lime-950/60">
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
        <Home className="size-4 text-lime-950/60" />
        <Link href={"/"} className="font-medium text-lime-950/60">
          Voltar pro dashboard
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export { SwitcherDropdown };
