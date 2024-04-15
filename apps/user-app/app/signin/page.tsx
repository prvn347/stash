import { Signup } from "@repo/ui/signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { NEXT_AUTH } from "../../lib/auth";

const SigninPage = async () => {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    redirect("/dashboard");
  }
  return <Signup children={undefined} />;
};

export default SigninPage;
