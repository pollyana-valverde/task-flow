import { Bell } from "lucide-react";

function NotificationBell() {
  return (
    <div className="relative hover:bg-lime-950/5 rounded-lg p-3 group">
      <Bell className="w-5 h-5 text-lime-950/70 group-hover:text-lime-950" />
      <div className="absolute bg-red-700 rounded-full flex items-center justify-center h-5 w-5 top-1 right-1.5 border-2 border-white">
        <span className="text-xs text-white">1</span>
      </div>
    </div>
  );
}

export { NotificationBell };
