"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { TextInput } from "./text-input";
import { Button } from "./button";
import { Quote } from "./quote";

export const Signup = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState({
    phone: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  return (
    <div>
      <div className="  grid grid-cols-2">
        <Quote />
        <div className=" flex justify-center h-screen">
          <div className=" flex flex-col justify-center ">
            <h1 className="font-bold text-2xl">Login to Stash!</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <TextInput
              placeholder={" Enter your phone number"}
              onChange={(e) => setUserData({ ...userData, phone: e })}
              label={" Phone number"}
            />
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              onChange={(e) => setUserData({ ...userData, password: e })}
              type="password"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="password"
            />

            <Button
              onClick={async () => {
                await signIn("credentials", {
                  phone: userData.phone,
                  password: userData.password,
                  name: userData.name,
                  redirect: false,
                });
              }}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
