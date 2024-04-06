"use server";

import { PrismaClient } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";
import { error } from "console";

const db = new PrismaClient();

export async function p2pTransfer(amount: string, to: string) {
  const session = await getServerSession(NEXT_AUTH);

  const from = session.user.id;

  try {
    const toUser = await db.user.findUnique({
      where: {
        number: to,
      },
    });
    if (!toUser) {
      return console.log("user not found");
    }

    const send = await db.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balence" WHERE "userId" = ${Number(from)} FOR UPDATE`;
      const balance = await tx.balence.findFirst({
        where: {
          userId: Number(from),
        },
      });
      if (!balance?.amount || balance.amount < Number(amount)) {
        throw new Error("insufficient fund");
      }

      await tx.balence.update({
        where: {
          userId: Number(from),
        },
        data: {
          amount: { decrement: Number(amount) * 100 },
        },
      });
      await tx.balence.upsert({
        where: {
          userId: toUser.id,
        },
        update: {
          amount: { increment: Number(amount) * 100 },
        },
        create: {
          userId: toUser.id,
          locked: 0,
          amount: Number(amount) * 100,
        },
      });
      await tx.p2PTransfer.create({
        data: {
          toUserId: toUser.id,
          fromUserId: Number(from),
          amount: Number(amount) * 100,
          timestamp: new Date(),
        },
      });
    });
    return {
      message: "Transaction Succefull!",
    };
  } catch (error) {
    console.log(error);
  }
}
