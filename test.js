const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_SECRET",
});

instance.orders.create({
  amount: 100,
  currency: "INR",
  receipt: "abc",
})
.then(console.log)
.catch(console.error);