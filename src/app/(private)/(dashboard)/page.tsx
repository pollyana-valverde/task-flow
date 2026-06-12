"use client";

import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
  const { data: session } = authClient.useSession();

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
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-lime-950">Dashboard</h1>
      <p className="text-lime-950/80">
        Bem-vindo ao seu dashboard! {session?.user.name}
      </p>
      <button
        className="bg-lime-400 text-lime-950 hover:bg-lime-300"
        type="button"
        onClick={handleSignOut}
      >
        sair
      </button>
    </div>
  );
}
