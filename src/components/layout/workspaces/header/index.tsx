import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface WorkspacesHeaderProps extends React.ComponentProps<"header"> {}

function WorkspacesHeader({ children, className }: WorkspacesHeaderProps) {
  return (
    <header
      className={cn(
        "bg-popover py-3 px-8 flex items-center gap-3 border-b border-muted",
        className,
      )}
    >
      <SidebarTrigger className="p-3" />
      {children}
    </header>
  );
}

export { WorkspacesHeader };
