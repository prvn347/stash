import { PrismaClient } from "@repo/db/client";

import { useB } from "@repo/store/useB";
import Balence from "../components/Balence";
export default function Page(): JSX.Element {
  return (
    <div className=" text-xl text-red-300">
      hello
      <Balence />
    </div>
  );
}
