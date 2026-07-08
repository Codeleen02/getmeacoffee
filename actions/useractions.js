"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User"
import connectDb from "@/db/connectDb";

export const initiate = async (username, amount, Paymentform) => {
  await connectDb();
  let user = await User.findOne({ username })
  console.log(process.env.KEY_ID.length);
  console.log(process.env.KEY_SECRET.length);

  console.log(user.razorpayid.length);
  console.log(user.razorpaysecret.length);
  const instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: user.razorpaysecret,
  });

  let order;

  try {
    order = await instance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

  } catch (err) {
      console.dir(err, { depth: null });
      throw err;
    }

  await Payment.create({
    oid: order.id,
    amount,
    to_user: username,
    name: Paymentform?.name,
    message: Paymentform?.message,
    done: false
  });

  return order;
};

export const fetchUser = async (id) => {
  await connectDb()

  const user = await User.findById(id).lean()
  if (!user) return null;
  return JSON.parse(JSON.stringify(user))
}

export const fetchUserByUsername = async (username) => {
  await connectDb();

  const user = await User.findOne({ username }).lean();

  return JSON.parse(JSON.stringify(user));
};
export const fetchpayments = async (username) => {
  await connectDb()
  // find all payments sorted by decreasing order of amount and flatten object ids
  const payments = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .lean();

  return JSON.parse(JSON.stringify(payments));

}

export const updateProfile = async (data, id) => {
  await connectDb();

  const ndata = Object.fromEntries(data);

  // Remove accidental spaces
  ndata.razorpayid = ndata.razorpayid.trim();
  ndata.razorpaysecret = ndata.razorpaysecret.trim();

  const currentUser = await User.findById(id);

  if (!currentUser) {
    return { error: "User not found" };
  }

  if (currentUser.username !== ndata.username) {
    const existing = await User.findOne({
      username: ndata.username,
    });

    if (existing) {
      return {
        error: "Username already exists",
      };
    }
  }

  await User.findByIdAndUpdate(id, ndata);

  return {
    success: true,
  };
};
