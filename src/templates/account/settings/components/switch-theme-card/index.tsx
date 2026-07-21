"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

function SwitchThemeCard() {
  const { theme, setTheme } = useTheme();

  return (
    <Card className="hover:translate-y-0 gap-3">
      <CardHeader>
        <CardTitle>Aparência</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 grid-rows-1 h-full gap-2.5">
        <Button
          variant={theme === "light" ? "secondary" : "outline"}
          onClick={() => setTheme("light")}
          className={cn(
            "flex flex-col p-3.5 gap-2",
            theme === "light" && "bg-secondary"
          )}
        >
          <div className="w-full h-1/2 bg-white border rounded-lg" />
          <Text className="font-semibold text-foreground">Claro</Text>
        </Button>

        <Button
          variant={theme === "dark" ? "secondary" : "outline"}
          onClick={() => setTheme("dark")}
          className={cn(
            "flex flex-col p-3.5 gap-2",
            theme === "dark" && "bg-secondary"
          )}
        >
          <div className="w-full h-1/2 bg-[#0e1207] border rounded-lg" />
          <Text className="font-semibold text-foreground">Claro</Text>
        </Button>
      </CardContent>
    </Card>
  );
}

export { SwitchThemeCard };
