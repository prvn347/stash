import { getServerSession } from "next-auth";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { NEXT_AUTH } from "../../../lib/auth";
import { PrismaClient } from "@repo/db/client";
const db = new PrismaClient();

async function userTransfer() {
  const session = await getServerSession(NEXT_AUTH);
  console.log(JSON.stringify(session));
  const txns = await db.user.findFirst({
    where: {
      number: session?.user?.email,
    },
    include: {
      sentTransfers: {
        select: {
          amount: true,
          timestamp: true,
        },
      },
      receivedTransfers: true,
    },
  });
  return txns?.sentTransfers.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
  }));
}
export default async function () {
  const balence = await userTransfer();
  console.log(balence);
  return (
    <div>
      <div className="  text-newpurple font-bold text-xl p-3 ">TRANSACTION</div>
      <div className="pt-4">
        <OnRampTransactions transactions={balence} />
      </div>
    </div>
  );
}
