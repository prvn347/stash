import { getServerSession } from "next-auth";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { NEXT_AUTH } from "../../../lib/auth";
import { PrismaClient } from "@repo/db/client";
import { OnUserTransaction } from "../../../components/OnUserTransaction";
const db = new PrismaClient();

async function userTransfer() {
  const session = await getServerSession(NEXT_AUTH);
  console.log(JSON.stringify(session));
  const txns = await db.p2PTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session?.user?.id) },
        {
          toUserId: Number(session?.user?.id),
        },
      ],
    },
    include: {
      fromUser: {
        select: {
          name: true,
        },
      },

      toUser: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      timestamp: "desc",
    },
  });
  console.log(txns);

  return txns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    toUserName: t.toUser.name,
    toUserId: t.toUserId,
    fromUserName: t.fromUser.name,
    fromUserId: t.fromUserId,
    isMe: t.toUserId === Number(session?.user?.id),
  }));
}

export default async function () {
  const balence = await userTransfer();

  return (
    <div className="w-full">
      <div className="  text-newpurple font-bold text-xl p-3 ">TRANSACTION</div>
      <div className="pt-4 m-5 flex justify-center items-center ">
        <OnUserTransaction transactions={balence} />
      </div>
    </div>
  );
}
