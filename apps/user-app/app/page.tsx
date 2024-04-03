"use client";

import { PrismaClient } from "@repo/db/client";

// import { useB } from "@repo/store/useB";
import Balence from "../components/Balence";
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Page(): JSX.Element {
  const session = useSession();
  return <div>heelo</div>;
}
