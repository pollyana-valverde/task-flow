"use client";

import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";
import { redirect } from "next/navigation";
import { UserButtonLink } from "./user-button-link";

const USER_BUTTON_LINKS = [
  {
    path: "/profile",
    icon: User,
    label: "Meu perfil",
  },
  {
    path: "/settings",
    icon: Settings,
    label: "Configurações",
  },
  {
    path: "/notifications",
    icon: Bell,
    label: "Notificações",
  },
];

function UserButon() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession();

  if (!session) {
    return (
      <div className="flex items-center gap-2 py-2 px-2.5 rounded-lg border border-lime-950 hover:bg-lime-950/5 transition-all">
        <Text variant="content" className="text-lime-950 font-semibold">
          Login
        </Text>
      </div>
    );
  }

  const splitUserName: string[] = session.user.name.split(" ");
  const splitUserFirstNameLetter: string[] = splitUserName[0].split("");
  const splitUserLastNameLetter: string[] = splitUserName[1].split("");
  const userNameFirtsLetters: string = `${splitUserFirstNameLetter[0]}${splitUserLastNameLetter[0]}`;

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/sign-in");
        },
      },
    });
  }

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      tabIndex={0}
      className=" relative flex items-center gap-2 py-2 px-2.5 rounded-lg border border-lime-950 hover:bg-lime-950/5 transition-all outline-none focus-visible:ring-3  focus-visible:ring-lime-500/50"
    >
      {session.user.image ? (
        <Image
          className="rounded-full"
          width={28}
          height={28}
          src={session.user.image}
          alt={session.user.name}
        />
      ) : (
        <div className="rounded-full h-7 w-7 flex items-center justify-center text-sm bg-lime-900 text-white">
          {userNameFirtsLetters}
        </div>
      )}
      <Text variant="content" className="text-lime-950 font-semibold">
        {splitUserName[0]}
      </Text>
      <ChevronDown className="w-4 h-4 text-lime-950" />

      {isOpen && (
        <nav className="absolute min-w-50 top-[120%] right-0 p-1 bg-white rounded-lg border border-lime-950 space-y-1">
          {USER_BUTTON_LINKS.map((link, index) => (
            <UserButtonLink
              key={`link-${index}`}
              path={link.path}
              Icon={link.icon}
              label={link.label}
            />
          ))}
          <hr />
          <UserButtonLink
            onClick={handleSignOut}
            variant="destructive"
            path="/sign-in"
            Icon={LogOut}
            label="Sair"
          />
        </nav>
      )}
    </div>
  );
}

export { UserButon };
