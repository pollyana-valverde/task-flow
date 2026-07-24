import { getMyMembership } from "@/http/members/get-my-membership";
import { ApiError } from "@/lib/http/api-error";
import { WorkspaceSettingsPage } from "@/templates/workspace/settings";
import { notFound } from "next/navigation";

interface SettingsPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function Settings({ params }: SettingsPageProps) {
  const { workspaceId } = await params;

  async function getRole() {
    try {
      const { role } = await getMyMembership({ workspaceId });
      return role;
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return notFound();
      throw error;
    }
  }

  const role = await getRole();
  if (role !== "owner") notFound();

  return <WorkspaceSettingsPage workspaceId={workspaceId} />;
}
