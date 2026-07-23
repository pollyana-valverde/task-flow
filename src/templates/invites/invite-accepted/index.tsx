import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { getWorkspace } from "@/http/workspaces/get-workspace";
import { capitalizeFirtLetter } from "@/utils/captalize-first-letter";
import Link from "next/link";

async function InviteAcceptedPage({ workspaceId }: { workspaceId: string }) {
  const workspace = await getWorkspace({
    workspaceId,
  });

  return (
    <Card className="text-center shadow-[4px_4px_0] border-2 border-foreground dark:border-lime-700 dark:shadow-lime-700 gap-5 min-w-sm">
      <CardHeader>
        <CardTitle>
          <Text variant="h2">Convite aceito!</Text>
        </CardTitle>
      </CardHeader>
      <CardContent>
        Você agora faz parte de{" "}
        <span className="font-bold">
          {capitalizeFirtLetter(workspace.title)}
        </span>
        . Bem-vindo(a) ao time.
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/workspaces/${workspaceId}/boards`}>
            Ir para o workspace
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export { InviteAcceptedPage };
