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
    await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({
        to: `+${body.phone}`,
        code: `+${body.code}`,
      })
      .then((verification_check) => console.log(verification_check.status))

      .catch((e: any) => {
        console.log(e);
        return NextResponse.json(e);
      });
    const user = await db.user.create({
      data: {
        number: body.phone,
        password: body.password,
        name: body.name,
      },
    });
    return NextResponse.json({
      msg: "Registered",
    });
  } catch (error: any) {
    throw NextResponse.json({ msg: "invalid otp" });
  }
}
