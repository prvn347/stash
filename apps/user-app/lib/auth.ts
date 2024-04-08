import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@repo/db/client";
const db = new PrismaClient();

import { UserInputSchema } from "@repo/common/UserInputSchema";
import { constSelector } from "recoil";
interface creadential {
  id?: string;
  phone: string;
  password: string;
}

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "phone",
          type: "number",

          placeholder: "enter your number",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"phone" | "password", string> | undefined
      ) {
        // const cred = UserInputSchema.safeParse(credentials);

        if (!credentials) {
          return null;
        }
        // const hashedPassword = await bcrypt.hash(credentials?.password, 10);
        try {
          const existingUser = await db.user.findFirst({
            where: {
              number: credentials.phone,
            },
          });
          if (existingUser) {
            // const passwordValidation = await bcrypt.compare(
            //   credentials.password,
            //   existingUser.password
            // );

            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              phone: existingUser.number,
            };

            return null;
          }
        } catch (error) {
          throw error;
        }

        try {
          const user = await db.user.create({
            data: {
              number: credentials.phone,
              password: credentials.password,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
};
