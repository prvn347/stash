import { Card } from "@repo/ui/card";

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
    // fromUserName: string;
    // toUserName: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions" href={""}>
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions" href={""}>
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">Sent INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
              {/* <div className="text-slate-600 text-xs">{t.status}</div> */}
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
