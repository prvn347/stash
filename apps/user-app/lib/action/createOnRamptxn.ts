"use server";

import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";
import { PrismaClient } from "@repo/db/client";
const prisma = new PrismaClient();

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(NEXT_AUTH);
  const token = Math.random().toString();
  const userId = session.user.id;

  if (!userId) {
    return {
      msg: "user not logged in",
    };
  }

  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount,
      startTime: new Date(),
      provider,
      token: token,
      status: "Processing",
    },
  });

  return {
    message: "onramp txn added",
  };
}
