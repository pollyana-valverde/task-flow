import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import Link from "next/link";

async function InviteDeclinedPage() {
  return (
    <Card className="text-center shadow-[4px_4px_0] border-2 border-foreground dark:border-lime-700 dark:shadow-lime-700 gap-4 min-w-sm">
      <CardHeader>
        <CardTitle>
          <Text variant="h2">Convite recusado!</Text>
        </CardTitle>
      </CardHeader>
      <CardContent>Tudo certo, o convite foi recusado.</CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={"/"}>Voltar ao iníco</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export { InviteDeclinedPage };
