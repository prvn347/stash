// export function AddMoneyComponent() {
//   return (
//     <div>
//       <div className=" p-6">
//         <span>Add Money</span>

//         <InputType label="Amount" type="number" placeholder="amount" />
//         <div>
//           <label htmlFor="bank">Bank</label>
//           <select name="bank" id="bank">
//             <option value="HDFC">HDFC</option>
//             <option value="SBI">SBI</option>
//             <option value="BoB">BoB</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

// export function InputType({
//   label,
//   placeholder,
//   type,
// }: {
//   label: string;
//   placeholder: string;
//   type: string;
// }) {
//   return (
//     <div>
//       <label htmlFor="input"> {label}</label>
//       <input
//         id="input"
//         name="input"
//         type={type}
//         className=" w-60 text-black rounded-md"
//         placeholder={placeholder}
//       />
//     </div>
//   );
// }

"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
// import { TextInput } from "@repo/ui/textinput";
import { TextInput } from "@repo/ui/text-input";
import { createOnRampTransaction } from "../lib/action/createOnRamptxn";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );

  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  return (
    <Card title="Add Money" href={""}>
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(value) => {
            setAmount(value);
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnRampTransaction(amount * 100, provider);
              window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
