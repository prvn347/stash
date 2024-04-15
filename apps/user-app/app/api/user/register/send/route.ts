// export const GET = async () => {
//   const session = await getServerSession(NEXT_AUTH);
//   if (session.user) {
//     return NextResponse.json({
//       user: session.user,
//     });
//   }
//   return NextResponse.json(
//     {
//       message: "You are not logged in",
//     },
//     {
//       status: 403,
//     }
//   );
// // };
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { userSignUpSchema } from "../../../../../lib/validation";
import { error } from "console";
import { PrismaClient } from "@repo/db/client";
const db = new PrismaClient();
import { Twilio } from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const verifySid = process.env.VERIFY_SERVICE_SID as string;

const myNumber = process.env.MY_NUMBER;
const client = new Twilio(accountSid, authToken);
console.log(accountSid);
console.log(authToken);
console.log(verifySid);
export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const payloadParser = userSignUpSchema.safeParse(body);
    if (!payloadParser.success) {
      throw new Error("invalid input");
    }
    await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: `+91${body.phone}`, channel: "sms" })
      .then((verification) => console.log(verification.status))

      .catch((e: any) => {
        console.log(e);
        throw new Error("otp not sent");
      });

    return NextResponse.json({ msg: "OTP sent!" });
  } catch (error: any) {
    return NextResponse.json({
      msg: "invalid input",
    });
  }
}
