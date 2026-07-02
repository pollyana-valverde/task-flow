import { AlertOctagon } from "lucide-react";
import { Text } from "./text";

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-3 bg-destructive/10 text-destructive rounded-lg border border-destructive flex items-center gap-2">
      <AlertOctagon className="w-5 h-5" />
      <Text className="text-destructive">{children}</Text>
    </div>
  );
}

export { ErrorMessage };
