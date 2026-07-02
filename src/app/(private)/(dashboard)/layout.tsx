import { DashboardNavbar } from "@/components/layout/dashboard/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <DashboardNavbar />

      <main className="flex flex-col py-8 px-8 md:px-14 min-h-screen bg-background-muted">
        {children}
      </main>
    </div>
  );
}
