import { Bell } from "lucide-react";
import { Button } from "../button";
import Link from "next/link";

function NotificationBell() {
  return (
    <Button variant="ghost" className="relative p-3" asChild>
      <Link href="/notifications">
        <Bell className="size-5" />
        <div className="absolute bg-destructive rounded-full flex items-center justify-center h-5 w-5 top-1 right-1.5 border-2 border-background">
          <span className="text-xs text-white">1</span>
        </div>
      </Link>
    </Button>
  );
}

export { NotificationBell };
