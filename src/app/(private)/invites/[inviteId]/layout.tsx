interface InvitesLayoutProps {
  children: React.ReactNode;
}

export default async function InvitesLayout({
  children,
}: InvitesLayoutProps) {

  return (
    <div
      className={`
      flex flex-col items-center justify-center h-screen w-full
      bg-[url('@/assets/images/not-found-back.svg')] bg-cover bg-center bg-no-repeat
      dark:bg-[url('@/assets/images/not-found-back-dark.svg')]
      `}
    >
      {children}
    </div>
  );
}
