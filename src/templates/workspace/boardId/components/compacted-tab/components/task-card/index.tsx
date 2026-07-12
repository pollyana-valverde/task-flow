import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { capitalizeFirtLetter } from "@/utils/captalize-first-letter";
import { PriorityLine } from "./priority-line";
import { getNameInitials } from "@/utils/get-name-initials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: TaskProps;
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <Card
      size="sm"
      className="gap-3 hover:border hover:border-foreground dark:hover:border-primary"
    >
      <CardHeader className="flex gap-3 items-center h-7">
        <PriorityLine variant={task.priority} />
        <Text
          variant="sm"
          className="font-semibold text-foreground flex-1 line-clamp-2"
        >
          {capitalizeFirtLetter(task.title)}
        </Text>
        <Avatar size="sm">
          {task.assignee?.image && (
            <AvatarImage src={task.assignee.image} alt={task.assignee.name} />
          )}
          <AvatarFallback
            className={cn(
              !task.assignee?.image &&
                "bg-lime-900 text-white font-bold font-heading text-[10px]!",
            )}
          >
            {task.assignee?.name && getNameInitials(task.assignee.name)}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
    </Card>
  );
}

export { TaskCard };
