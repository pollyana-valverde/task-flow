import { AlignStartHorizontal, Clock, Crown, Inbox, Mail, StickyNote, Trash, UserLock, UserMinus, UserPen } from "lucide-react";

interface NotificationIconProps {
  type: "task_due" | "workspace_invite" | "task_assigned" | "task_moved" | "task_deleted" | "board_created" | "board_deleted" | "workspace_deleted" | "member_promoted" | "workspace_member_left" | "workspace_member_removed" | "workspace_ownership_transferred";
}

function NotificationIcon({type}:NotificationIconProps) {
  return (
    <>
      {type === "task_due" && (
        <div className="rounded-lg bg-destructive/20 p-2.5 ">
          <Clock className="size-4 text-destructive" />
        </div>
      )}
      {type === "workspace_invite" && (
        <div className="rounded-lg bg-indigo-500/20 p-2.5 ">
          <Mail className="size-4 text-indigo-700" />
        </div>
      )}
      {type === "task_assigned" && (
        <div className="rounded-lg bg-sky-500/20 p-2.5 ">
          <Inbox className="size-4 text-sky-700" />
        </div>
      )}
      {type === "task_moved" && (
        <div className="rounded-lg bg-lime-500/20 p-2.5 ">
          <StickyNote className="size-4 text-lime-700" />
        </div>
      )}
      {type === "task_deleted" && (
        <div className="rounded-lg bg-destructive/20 p-2.5 ">
          <Trash className="size-4 text-destructive" />
        </div>
      )}
      {type === "board_created" && (
        <div className="rounded-lg bg-green-500/20 p-2.5 ">
          <AlignStartHorizontal className="size-4 text-green-700" />
        </div>
      )}
      {type === "board_deleted" && (
        <div className="rounded-lg bg-destructive/20 p-2.5 ">
          <Trash className="size-4 text-destructive" />
        </div>
      )}
      {type === "workspace_deleted" && (
        <div className="rounded-lg bg-destructive/20 p-2.5 ">
          <Trash className="size-4 text-destructive" />
        </div>
      )}
      {type === "member_promoted" && (
        <div className="rounded-lg bg-amber-500/20 p-2.5 ">
          <UserPen className="size-4 text-amber-700" />
        </div>
      )}
      {type === "workspace_member_left" && (
        <div className="rounded-lg bg-amber-500/20 p-2.5 ">
          <UserMinus className="size-4 text-amber-700" />
        </div>
      )}
      {type === "workspace_member_removed" && (
        <div className="rounded-lg bg-amber-500/20 p-2.5 ">
          <UserLock className="size-4 text-amber-700" />
        </div>
      )}
      {type === "workspace_ownership_transferred" && (
        <div className="rounded-lg bg-amber-500/20 p-2.5 ">
          <Crown className="size-4 text-amber-700" />
        </div>
      )}
    </>
  )
}

export { NotificationIcon };
