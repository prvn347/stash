"use client";

import { PrismaClient } from "@repo/db/client";

// import { useB } from "@repo/store/useB";

import { Appbar } from "@repo/ui/appbar";
import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { NEXT_AUTH } from "../lib/auth";
import { redirect } from "next/navigation";
export default async function Page(): Promise<JSX.Element> {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
}
