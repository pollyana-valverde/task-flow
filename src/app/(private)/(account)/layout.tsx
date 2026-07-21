import { AccountHeader } from "@/components/layout/account/header";
import { DashboardNavbar } from "@/components/layout/dashboard/navbar";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <DashboardNavbar />

      <main className="py-8 px-8 md:px-14 min-h-screen bg-background-muted flex justify-center w-full">
        <div className="flex flex-col gap-6 min-w-3xl">
          <AccountHeader />
          {children}
        </div>
      </main>
    </div>
  );
}
