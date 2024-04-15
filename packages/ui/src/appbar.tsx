import { Button } from "./button";
import { Lexend_Deca } from "next/font/google";
const lexend_Deca = Lexend_Deca({
  weight: "600",
  subsets: ["latin"],
});
interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: () => void;
  onSignout: () => void;
  homeRoute?: () => void;
}

export const Appbar = ({
  user,
  onSignin,
  onSignout,
  homeRoute,
}: AppbarProps) => {
  return (
    <div className="flex justify-between border-gray-800 border-b px-4">
      <div
        onClick={homeRoute}
        className={`text-2xl flex text-newpurple cursor-pointer flex-col justify-center  ${lexend_Deca.className}`}
      >
        stash-wallet
      </div>
      <div className="flex flex-col justify-center pt-2 ">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
