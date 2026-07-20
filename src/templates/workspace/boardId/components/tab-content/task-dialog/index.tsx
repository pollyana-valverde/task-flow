import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import { getTask } from "@/http/tasks/get-task";

import { cn } from "@/lib/utils";
import { getNameInitials } from "@/utils/get-name-initials";
import { PriorityBadge } from "../detailed-tab/task-card/priority-badge";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirtLetter } from "@/utils/captalize-first-letter";

interface TaskDialogProps {
  columnName: string;
  taskId: string;
  children: React.ReactNode;
}

async function TaskDialog({ taskId, children, columnName }: TaskDialogProps) {
  const task = await getTask({ taskId });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm md:max-w-xl">
        <DialogHeader>
          <DialogTitle asChild className="font-bold">
            <div className="flex items-center gap-3">
              <PriorityBadge variant={task.priority} priority={task.priority} />
              <Badge className="text-foreground/75 bg-muted normal-case">
                {capitalizeFirtLetter(columnName)}
              </Badge>
            </div>
          </DialogTitle>

          <DialogDescription asChild className="text-foreground">
            <Text variant="h2">{capitalizeFirtLetter(task.title)}</Text>
          </DialogDescription>
        </DialogHeader>

        <hr />

        <div className="flex gap-7.5">
          <div className="flex flex-col gap-1">
            <Text variant="mono" className="uppercase">
              Responsável
            </Text>
            {task.assignee ? (
              <div className="flex items-center gap-1.5">
                <Avatar size="sm">
                  {task.assignee.image && (
                    <AvatarImage
                      src={task.assignee.image}
                      alt={task.assignee.name}
                    />
                  )}
                  <AvatarFallback
                    className={cn(
                      !task.assignee.image &&
                        "bg-lime-900 text-white font-bold font-heading text-[10px]!",
                    )}
                  >
                    {getNameInitials(task.assignee.name)}
                  </AvatarFallback>
                </Avatar>
                <Text className="text-foreground" variant="sm">
                  {task.assignee.name}
                </Text>
              </div>
            ) : (
              <div className="w-ful text-center">
                <Text variant="mono" className="uppercase font-bold">
                  --
                </Text>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Text variant="mono" className="uppercase">
              Prazo
            </Text>
            <Text
              variant="mono"
              className={cn(
                "text-sm text-foreground",
                task.dueDate && task.dueDate < new Date() && "text-destructive",
              )}
            >
              {task.dueDate ? (
                task.dueDate?.toLocaleDateString("pt-br", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              ) : (
                <div className="w-ful text-center">
                  <Text variant="mono" className="uppercase font-bold">
                    -- -- ----
                  </Text>
                </div>
              )}
            </Text>
          </div>

          <div className="flex flex-col gap-1">
            <Text variant="mono" className="uppercase">
              Criado por
            </Text>
            <div className="flex items-center gap-1.5">
              <Avatar size="sm">
                {task.creator.image && (
                  <AvatarImage
                    src={task.creator.image}
                    alt={task.creator.name}
                  />
                )}
                <AvatarFallback
                  className={cn(
                    !task.creator.image &&
                      "bg-lime-900 text-white font-bold font-heading text-[10px]!",
                  )}
                >
                  {getNameInitials(task.creator.name)}
                </AvatarFallback>
              </Avatar>
              <Text className="text-foreground" variant="sm">
                {task.creator.name}
              </Text>
            </div>
          </div>
        </div>

        <hr />

        <div className="flex flex-col gap-1">
          <Text variant="mono" className="uppercase">
            Descrição
          </Text>
          <Text variant="sm">
            {task.description ? (
              capitalizeFirtLetter(task.description)
            ) : (
              <Text variant="mono" className="uppercase font-bold">
                --
              </Text>
            )}
          </Text>
        </div>

        <DialogFooter className="mt-3">
          <div className="flex-1">
            <Button variant="destructive">Excluir tarefa</Button>
          </div>
          <DialogClose asChild>
            <Button className="px-6" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">Editar tarefa</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { TaskDialog };
