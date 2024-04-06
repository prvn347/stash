"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { p2pTransfer } from "../lib/action/p2paction";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="h-[40vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Number"}
              label="Number"
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                className="  bg-newpurple "
                onClick={async () => {
                  const resp = await p2pTransfer(amount, number);
                  if (resp && resp.message) {
                    setError(resp.message);
                  }
                }}
              >
                Send
              </Button>
              <div className=" text-green-600 font-semibold">
                {" "}
                {error && <p>{error}</p>}
              </div>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
