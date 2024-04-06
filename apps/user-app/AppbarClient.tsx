"use client";

import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function AppbarClient() {
  const router = useRouter();
  const session = useSession();

  return (
    <div>
      <Appbar
        homeRoute={() => {
          router.push("/");
        }}
        onSignin={signIn}
        onSignout={async () => {
          await signOut();
          router.push("/api/auth/signin");
        }}
        user={session.data?.user}
      />
    </div>
  );
}
