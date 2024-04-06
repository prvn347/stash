import express from "express";
import { PrismaClient } from "@repo/db/client";
const db = new PrismaClient();
const app = express();
app.use(express.json());
app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  // Update balance in db, add txn
  try {
    await db.$transaction([
      db.balence.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
      }),
      db.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(200).json("Captured ");
  } catch (error) {
    console.log(error);
    res.status(411).json({ message: "error while processing webhook" });
  }
});

app.listen(3003);
