import { Moon } from "lucide-react";

function ThemeSwitch() {
  return (
    <div className="hover:bg-lime-950/5 rounded-lg p-3 group">
      <Moon className="w-5 h-5 text-lime-950/70 group-hover:text-lime-950" />
    </div>
  );
}

export { ThemeSwitch };
