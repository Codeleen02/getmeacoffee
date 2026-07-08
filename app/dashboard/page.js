"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { fetchUser, updateProfile } from '@/actions/useractions';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter()
  const [form, setform] = useState({})
  useEffect(() => {
   if (status === "unauthenticated") {
    router.push("/login");
  }
  if (status === "authenticated") {
    getdata();
  }
  }, [status]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.log("Session:", session);
    const result = await updateProfile(formData, session.user.id);

    if (result?.error) {
      alert(result.error);
      return;
    }

    toast.success("🦄 Profile Updated!");
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const getdata = async () => {
    if (!session?.user?.email) return;

    console.log("Searching for:", session.user.email);

    const u = await fetchUser(session.user.id);
    if (!u) {
      console.log("User not found");
      return;
    }
    console.log("User returned from DB:", u);

    setform(u);
  };
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
      <div className='flex flex-col items-center text-lg font-bold text-white mt-5 mx-auto '>Welcome to my Dashboard

        <form onSubmit={handleSubmit} className="mx-auto mt-13">
          <div className="relative z-0 w-full mb-5 group text-white">
            <input type="username" name="username" id="username" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" value={form?.username || ""} onChange={handleChange} placeholder=" " required />
            <label htmlFor="username" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Username</label>
          </div>
          <div className="relative z-0 w-full mb-5 group text-white">
            <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" value={form.email ? form.email : ""} onChange={handleChange} placeholder=" " required />
            <label htmlFor="password" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
          </div>
          <div className="relative z-0 w-full mb-5 group text-white">
            <input type="text" name="profilepic" id="profilepic" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" value={form.profilepic ? form.profilepic : ""} onChange={handleChange} placeholder=" " required />
            <label htmlFor="repeat_password" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">profilepic</label>
          </div>
          <div className="relative z-0 w-full mb-5 group text-white">
            <input type="text" name="coverpic" id="coverpic" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" value={form.coverpic ? form.coverpic : ""} onChange={handleChange} placeholder=" " required />
            <label f="coverpic" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">coverpic</label>
            {/* razorpay ID */}
          </div>
          <div className="relative z-0 w-full mb-5 group text-white">
            <input type="text" name="razorpayid" id="razorpayid" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} placeholder=" " required />
            <label f="razorpayid" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">RazorPay ID</label>
          </div>
          {/* Razorpay secret */}
          <div className="relative z-0 w-full mb-5 group text-white">
            <input type="text" name="razorpaysecret" id="razorpaysecret" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} placeholder=" " required />
            <label f="razorpaysecret" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">RazorPay Secret</label>
          </div>
          <button type="submit" className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm  leading-5 mt-15 rounded-lg md:h-9 h-7 mx-30 px-3 md:mx-55 ">Save</button>
        </form>
      </div>
    </>
  )
}

export default Dashboard
