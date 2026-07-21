import { getSession } from "@/lib/auth/get-session";
import { UserCards } from "./components/user-cards";
import { UserInfo } from "./components/user-info";

async function ProfilePage() {
  const session = await getSession();

  return (
    <div className="flex flex-col gap-4">
      <UserInfo user={session?.user} />
      <UserCards user={session?.user}/>
    </div>
  )
}

export { ProfilePage };
