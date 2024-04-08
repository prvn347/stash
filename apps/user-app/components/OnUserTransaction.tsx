"use client";
import { Card } from "@repo/ui/card";
import { useSession } from "next-auth/react";

enum OnRampStatus {
  Success,
  Failure,
  Processing,
}
export const OnUserTransaction = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?

    toUserName: string;
    fromUserName: string;
    toUserId: number;
    fromUserId: number;
    isMe: boolean;
  }[];
}) => {
  const session = useSession();
  console.log("ny id is" + JSON.stringify(session));

  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <div className="pt-2 w-full  p-2 ">
      {transactions.map((t) => (
        <div className="flex justify-between  border rounded-md p-2 bg-gray-400  ">
          <div>
            {
              <div className="text-sm">
                {t.isMe ? t.fromUserName : t.toUserName}
              </div>
            }{" "}
            <div className="text-slate-600 text-xs">
              {t.time.toDateString()}
            </div>
            {/* <div className="text-slate-600 text-xs">{t.status}</div> */}
          </div>
          {t.isMe ? (
            <div className="flex flex-col justify-center text-green-500 ">
              + Rs {t.amount / 100}
            </div>
          ) : (
            <div className="flex flex-col justify-center text-red-600 ">
              - Rs {t.amount / 100}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
