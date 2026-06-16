"use client";

import { ChevronDown } from "lucide-react";
import { Text } from "../text";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

function UserButon() {
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

  return (
    <div className="flex items-center gap-2 py-2 px-2.5 rounded-lg border border-lime-950 hover:bg-lime-950/5 transition-all">
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
    </div>
  );
}

export { UserButon };
