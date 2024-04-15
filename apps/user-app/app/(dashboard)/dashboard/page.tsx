import BalenceChart from "../../../components/BalenceChart";
import { getBalance } from "../transfer/page";

export default async function Page(): Promise<JSX.Element> {
  const balence = await getBalance();
  return (
    <div>
      <div className="   text-newpurple font-bold text-xl p-3 ">DASHBOARD</div>
      <div className="text-2xl font-semibold p-3">
        {" "}
        Balance{" "}
        <span className=" text-sm text-newpurple">Rs.{balence.amount}/-</span>
        <BalenceChart />
      </div>
    </div>
  );
}
