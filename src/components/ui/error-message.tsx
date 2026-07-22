import { cn } from "@/lib/utils";
import { AlertOctagon } from "lucide-react";
import { Text } from "./text";

interface ErrorMessageProps {
  children: React.ReactNode;
  classname?: string;
}

function ErrorMessage({ children, classname }: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "w-full p-3 bg-destructive/10 text-destructive rounded-lg border border-destructive flex items-center gap-2",
        classname
      )}
    >
      <AlertOctagon className="w-5 h-5" />
      <Text className="text-destructive">{children}</Text>
    </div>
  );
}

export { ErrorMessage };
