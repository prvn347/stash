"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/text-input";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SingUp() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    phone: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [otpno, setOtpno] = useState("");
  const [otp, setOtp] = useState(false);
  const handleSubmit = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/api/user/register/send",
        {
          phone: userData.phone,
        }
      );
      console.log(resp);

      setOtp(true);
    } catch (error: any) {
      setError("invalid input");
    }
  };
  const handleOtp = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/api/user/register/verify",
        {
          number: userData.phone,
          code: otp,
          name: userData.name,
          password: userData.password,
          phone: userData.phone,
        }
      );
      console.log(resp);
      router.push("/api/auth/signin");
      setOtp(true);
    } catch (error: any) {
      setError("invalid otp");
    }
  };
  return (
    <div>
      <div className=" flex justify-center h-screen">
        <div className=" flex flex-col justify-center ">
          <h1 className="font-bold text-2xl">Welcome to Stash!</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <TextInput
            placeholder={" Enter your phone number"}
            onChange={(e) => setUserData({ ...userData, phone: e })}
            label={" Phone number"}
          />
          <TextInput
            placeholder={" Enter your name "}
            onChange={(e) => setUserData({ ...userData, name: e })}
            label={" name"}
          />
          <TextInput
            placeholder={" Enter your password"}
            onChange={(e) => setUserData({ ...userData, password: e })}
            label={" password"}
          />
          <Button onClick={handleSubmit}>Get OTP</Button>
          {otp ? (
            <>
              <TextInput
                placeholder="Enter you 6 digit otp"
                onChange={(e) => setOtpno(e)}
                label="Enter OTP sent on your number."
              />
              <Button onClick={handleOtp}>Verify</Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
