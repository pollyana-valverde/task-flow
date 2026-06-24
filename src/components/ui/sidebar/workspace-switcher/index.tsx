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
import { Text } from "../../text";
import { SwitcherDropdown } from "./switcher-dropdown";
import { listWorkspaces } from "@/http/workspaces/list-workspaces";

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
            className=" border border-lime-950 hover:bg-lime-950/5 focus-visible:ring-lime-500/50 h-14 rounded-lg gap-2.5"
            asChild
          >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-lime-950/5 data-[state=open]:text-lime-950"
            >
              <div className="h-full w-9.5 flex items-center justify-center rounded-lg bg-lime-800 text-white">
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
              <ChevronsUpDown className="ml-auto text-lime-950/60" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <SwitcherDropdown workspaces={workspaces} />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export { WorkspaceSwitcher };
