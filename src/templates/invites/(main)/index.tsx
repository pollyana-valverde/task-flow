import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { getNotification } from "@/http/notifications/get-notification";
import { AcceptInviteAction } from "./components/accept-invite-action";
import { DeclineInviteAction } from "./components/decline-invite-action";

async function InvitesPage({ inviteId }: { inviteId: string }) {
  const notification = await getNotification({ notificationId: inviteId });

  return (
    <Card className="text-center shadow-[4px_4px_0] border-2 border-foreground dark:border-lime-700 dark:shadow-lime-700 gap-5 min-w-sm">
      <CardHeader>
        <CardTitle>
          <Text variant="h2">Você foi convidado</Text>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-92.5">{notification.message}</CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <DeclineInviteAction
          inviteId={notification.id}
          workspaceId={notification.workspaceId}
        />
        <AcceptInviteAction
          inviteId={notification.id}
          workspaceId={notification.workspaceId}
        />
      </CardFooter>
    </Card>
  );
}

export { InvitesPage };
