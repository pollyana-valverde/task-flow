import { AlertOctagon } from "lucide-react";
import { Text } from "./text";

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-3 bg-red-100 text-red-700 rounded-lg border border-red-300 flex items-center gap-2">
      <AlertOctagon className="w-5 h-5" />
      <Text className="text-red-700">{children}</Text>
    </div>
  );
}

export { ErrorMessage };
