interface SettingsPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function Settings({ params }: SettingsPageProps) {
  const { workspaceId } = await params;

  return <div>{workspaceId} settings</div>;
}
