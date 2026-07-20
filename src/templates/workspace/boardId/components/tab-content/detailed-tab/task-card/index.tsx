import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { capitalizeFirtLetter } from "@/utils/captalize-first-letter";
import { PriorityBadge } from "./priority-badge";
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
      <CardHeader className="flex gap-3 flex-1 items-center">
        <PriorityBadge variant={task.priority} priority={task.priority} />
      </CardHeader>

      <CardContent>
        <Text variant="sm" className="font-semibold text-foreground">
          {capitalizeFirtLetter(task.title)}
        </Text>
      </CardContent>

      <CardFooter className="justify-between">
        {task.assignee && (
          <Avatar size="sm">
            {task.assignee.image && (
              <AvatarImage src={task.assignee.image} alt={task.assignee.name} />
            )}
            <AvatarFallback
              className={cn(
                !task.assignee.image &&
                  "bg-lime-900 text-white font-bold font-heading text-[10px]!",
              )}
            >
              {task.assignee.name && getNameInitials(task.assignee.name)}
            </AvatarFallback>
          </Avatar>
        )}
        <Text variant="mono" className="text-muted-foreground text-right w-full">
          {task.dueDate?.toLocaleDateString("pt-br", {
            day: "numeric",
            month: "short",
          })}
        </Text>
      </CardFooter>
    </Card>
  );
}

export { TaskCard };
