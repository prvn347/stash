import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NEXT_AUTH } from "../../../lib/auth";
export const GET = async () => {
  const session = await getServerSession(NEXT_AUTH);
  if (session.user) {
    return NextResponse.json({
      user: session.user,
    });
  }
  return NextResponse.json(
    {
      message: "You are not logged in",
    },
    {
      status: 403,
    }
  );
};
