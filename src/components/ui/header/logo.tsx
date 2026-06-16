import { Layers } from "lucide-react";
import { Text } from "../text";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="p-0.5 bg-lime-800 border-b-3 border-r-3 border-lime-400 rounded-tl-lg rounded-xl">
        <div className="p-2 bg-lime-400 rounded-tl-md rounded-lg border-t-3 border-l-3 border-lime-50">
          <Layers className="h-5 w-5 text-lime-950" />
        </div>
      </div>
      <Text variant="heading-1" className="text-lime-950">
        Task Flow
      </Text>
    </div>
  );
}

export { Logo };
