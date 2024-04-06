import { SendCard } from "../../../components/SendMoney";

export default function Page(): JSX.Element {
  return (
    <div>
      <div className="   text-newpurple font-bold text-xl p-3 ">Send Money</div>
      <div className=" p-6">
        <SendCard />
      </div>
    </div>
  );
}
