import { MembersPage } from "@/templates/members";

interface MembersPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function Members({ params }: MembersPageProps) {
  const { workspaceId } = await params;

  return <MembersPage workspaceId={workspaceId} />;
}
