import { InvitesPage } from "@/templates/invites/(main)";

interface InvitesProps{
  params: Promise<{
    inviteId: string;
  }>;
}

export default async function Invites({params}: InvitesProps) {
  const { inviteId } = await params;

  return <InvitesPage inviteId={inviteId} />
}
