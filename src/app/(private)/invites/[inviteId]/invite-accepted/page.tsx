import { InviteAcceptedPage } from "@/templates/invites/invite-accepted";
import { notFound } from "next/navigation";

interface InviteAcceptedProps {
  searchParams: Promise<{ workspaceId?: string }>;
}

export default async function InviteAccepted({
  searchParams,
}: InviteAcceptedProps) {
  const { workspaceId } = await searchParams;

  if (!workspaceId) {
    return notFound();
  }

  return <InviteAcceptedPage workspaceId={workspaceId} />;
}
