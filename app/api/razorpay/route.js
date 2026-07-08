import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export async function POST(req) {
  await connectDb();

  const body = await req.json();
 
  const payment = await Payment.findOne({
    oid: body.razorpay_order_id,
  });
  if (!payment) {
    return NextResponse.json({ success: false }, { status: 404 });
  }
  
let user = await User.findOne({username:payment.to_user})

  const isValid = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
      user.razorpaysecret
  );

  if (!isValid) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  await Payment.findOneAndUpdate(
    { oid: body.razorpay_order_id },
    { $set: { done: true } },
    { new: true }
  );

  return NextResponse.json({ success: true });
}