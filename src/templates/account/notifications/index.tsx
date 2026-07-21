import { Tabs } from "@/components/ui/tabs";
import { Header } from "./components/header";
import { AllNotificationsTab } from "./components/tab-content/all-notifications-tab";
import { NonReadedNotificationsTab } from "./components/tab-content/non-readed-notifications-tab";
import { TabHeader } from "./components/tab-header";

function NotificationsPage() {
  return (
    <div className="flex flex-col gap-5">
      <Header />

      <Tabs defaultValue="all" className="gap-3">
        <TabHeader />
        <AllNotificationsTab />
        <NonReadedNotificationsTab />
      </Tabs>
    </div>
  );
}

export { NotificationsPage };
