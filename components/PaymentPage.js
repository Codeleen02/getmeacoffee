"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {
  fetchpayments,
  initiate,
  fetchUserByUsername,
} from "@/actions/useractions";

export default function PaymentPage({ username }) {
  const { data: session, update } = useSession();
  const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const [Paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: ""
  })

  const [loading, setLoading] = useState(false);
  const [currentUser, setcurrentUser] = useState()
  const [Payment, setPayment] = useState([])
  const handlechange = (e) => {
    setPaymentform({ ...Paymentform, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    getData()
  }, [])

  const getData = async (params) => {
    let u = await fetchUserByUsername(username)
    setcurrentUser(u)
    let dbpayments = await fetchpayments(username)
    setPayment(dbpayments)
    console.log(u, dbpayments)
  }

  const pay = async () => {
    try {
      const amount = Number(Paymentform.amount);
      if (!amount || amount <= 0) {
        alert("Enter a valid amount");
        return;
      }
      setLoading(true);
      let order = await initiate(username, amount, Paymentform);
      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Get Me A Coffee",
        description: "Support Creator",
        image: "https://example.com/your_logo.png",
        order_id: order.id,

      
        handler: async function (response) {
          const res = await fetch("/api/razorpay", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const data = await res.json();

          if (data.success) {
            toast.success("🦄 Payment Successful!");
          }
        },

        prefill: {
          name: Paymentform.name || session?.user?.name || "",
          email: session?.user?.email || "",
          contact: "",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },

        theme: {
          color: "#3399cc",
        },

      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    };
  }
  const handlePayment = async () => {
    console.log(window.Razorpay);
    if (!window.Razorpay) {
      alert("Razorpay not ready");
      return;
    }
    if (!Paymentform.amount || isNaN(Number(Paymentform.amount))) {
      alert("Enter a valid amount");
      return;
    }
    await pay()
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ToastContainer />
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <div className="cover w-full relative">
        <img className='object-fill w-full h-85' src="gojo.jfif" alt="gojo" />
        <div className='absolute -bottom-7.5 border-2 border-white rounded-full md:right-[47%] right-[41%]'>
          <img className='w-15 h-15 rounded-full' src="pf.jfif" alt="pfp" />
        </div>
      </div>
      <div className="text-blue-50 flex flex-col justify-center items-center mt-7 mb-5">
        <div className='font-bold'>
          @{username}
        </div>
        <div className='text-slate-400'>
         Lets help {username} get a coffee
        </div>
        <div className='text-slate-400'>
        {Payment.length} Payments. raised ₹{Payment.reduce((a,b)=>a+b.amount,0)}
        </div>
      </div>
      <div className="payment flex gap-3 text-taupe-50 md:justify-center md:mx-auto md:w-[80%] md:flex-row mx-25 rounded-lg mb-7 md:max-h-95 flex-col w-full text-sm max-w-screen">
        <div className="supporters w-1/2 bg-slate-900 overflow-y-scroll md:scrollable scrollablemob
">
          {/* Show list of all the supporters as a leaderboard */}
          <h2 className='text-center font-bold my-5 '>Supporters</h2>
          <ul className='mx-5'>
            {Payment.map((payments, index) => (
              <li key={payments._id} className='flex my-3 text-white '>
                <img className='invert w-9 h-9 mr-3 mt-1.5' src="user.png" alt="user" />
                <span className="text-white">
                  {payments.name} donated {payments.amount} with a message "{payments.message}"
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="makePayment w-1/2 bg-slate-900 ">
          <h2 className='md:text-2xl text-lg font-bold my-5 text-center'>Make a Payment</h2>
          <div className='flex gap-2 mx-5 flex-col'>
            {/* input for name and message */}
            <div>
              <input onChange={handlechange} value={Paymentform.name} name="name" type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
            </div>
            <input onChange={handlechange} value={Paymentform.message} name="message" type="text" className='w-full p-3 rounded-lg bg-slate-800 ' placeholder='Enter Message' />
            <input onChange={handlechange} value={Paymentform.amount} name="amount" type="text" placeholder='Enter Amount' className='w-full p-3 rounded-lg bg-slate-800 ' />

          </div><button onClick={(handlePayment)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm px-4 py-2.5 text-center leading-5 md:mx-55 mx-18 my-5 rounded-lg">Pay</button>
          <div className='flex gap-2 mx-5 mb-5 justify-center'>
            <button className='bg-slate-800 rounded-lg p-2' onClick={() => setPaymentform({ ...Paymentform, amount: 10 })}>Pay ₹10</button>
            <button className='bg-slate-800 rounded-lg p-2' onClick={() => setPaymentform({ ...Paymentform, amount: 20 })}>Pay ₹20</button>
            <button className='bg-slate-800 rounded-lg p-2' onClick={() => setPaymentform({ ...Paymentform, amount: 30 })}>Pay ₹30</button>
          </div>
        </div>
      </div>
    </>
  );
}