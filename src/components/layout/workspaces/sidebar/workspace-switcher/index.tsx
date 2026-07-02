import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Text } from "@/components/ui/text";
import { SwitcherDropdown } from "./switcher-dropdown";
import { listWorkspaces } from "@/http/workspaces/list-workspaces";
import { capitalizeFirtLetter } from "@/utils/captalize-first-letter";

interface WorkspaceSwitcherProps {
  workspace: {
    title: string;
    createdAt: Date;
  };
}

async function WorkspaceSwitcher({ workspace }: WorkspaceSwitcherProps) {
  const workspaces = await listWorkspaces();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="shadow-[2px_2px_0] border-2 border-foreground dark:border-lime-700 dark:shadow-lime-700 hover:bg-foreground/5 focus-visible:ring-primary/20 h-14 px-2.5 rounded-xl gap-2.5"
            asChild
          >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-foreground/5 data-[state=open]:text-foreground"
            >
              <div className="size-8 flex items-center justify-center rounded-md bg-primary border border-foreground">
                <Text className="text-lime-950 font-bold font-heading">
                  {workspace.title.split("")[0].toUpperCase()}
                </Text>
              </div>

              <div className="grid flex-1 text-left">
                <Text
                  variant="sm"
                  className="truncate text-foreground font-bold"
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
              <ChevronsUpDown className="ml-auto text-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <SwitcherDropdown workspaces={workspaces} />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export { WorkspaceSwitcher };
