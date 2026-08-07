"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../button";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-3"
    >
      <Sun className="size-5 hidden dark:block" />
      <Moon className="size-5 block dark:hidden" />
    </Button>
  );
}

export { ThemeSwitcher };
