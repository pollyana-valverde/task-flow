import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";
import Link from "next/link";
import { Text } from "../text";

interface LogoProps extends React.ComponentProps<"div"> {}

function Logo({ className, ...props }: LogoProps) {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-3" {...props}>
        <div
          className={cn(
            "p-2 bg-primary bg-clip-padding border-2 border-lime-950 dark:border-lime-700 rounded-lg shadow-[3px_3px_0]  shadow-primary inset-shadow-[3px_3px_0] inset-shadow-lime-50 dark:inset-shadow-[#181d10]",
            className
          )}
        >
          <Layers className="size-5 text-lime-950" />
        </div>
        <Text variant="h2">Task Flow</Text>
      </div>
    </Link>
  );
}

export { Logo };
