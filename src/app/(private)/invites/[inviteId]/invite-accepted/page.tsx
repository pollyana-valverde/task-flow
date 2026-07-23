import { InviteAcceptedPage } from "@/templates/invites/invite-accepted";
import { notFound } from "next/navigation";

interface InviteAcceptedProps {
  params: Promise<{
    inviteId: string;
  }>;
  searchParams: Promise<{ workspaceId?: string }>;
}

export default async function InviteAccepted({
  params,
  searchParams,
}: InviteAcceptedProps) {
  const { inviteId } = await params;
  const { workspaceId } = await searchParams;

  if (!workspaceId) {
    return notFound();
  }

  return <InviteAcceptedPage inviteId={inviteId} workspaceId={workspaceId} />;
}
