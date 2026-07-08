"use client";
import React, { useEffect } from 'react'
import { GoogleIcon, GitHubIcon, FacebookIcon, AppleIcon,LinkedInIcon,TwitterIcon } from '@/components/icons/svg'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
const login = () => {
     const { data: session,status } = useSession();
    const router = useRouter()
     
    useEffect(()=>{
        document.title = "Login - Get Me A Coffee"
        if (status === "loading") return;
        if(session){
            router.push("/dashboard");
        }
    }, [session,router]);
      
    return (
        <>

            <div className='text-white flex flex-col justify-center items-center mt-10 container'>
                <h1 className='text-xl font-bold mb-9'>Login to get started</h1>
                <div className='social-login-buttons '>
                    <div className="flex flex-col gap-2  p-3">

                        {/* Google */}
                        <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
                            <GoogleIcon />
                            Continue with Google
                        </button>

                        {/* LinkedIn */}
                        <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
                            <LinkedInIcon />
                            Continue with LinkedIn
                        </button>

                        {/* Twitter */}
                        <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
                            <TwitterIcon />
                            Continue with Twitter
                        </button>

                        {/* Facebook */}
                        <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
                            <FacebookIcon />
                            Continue with Facebook
                        </button>

                        {/* GitHub */}
                        <button  onClick={()=>{signIn("github")}}className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
                            <GitHubIcon />
                            Continue with Github
                        </button>

                        {/* Apple */}
                        <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
                            <AppleIcon />
                            Continue with Apple
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};
export default login

export async function generateMetdata(params) {
  return{
    title: `${params.username} - Get Me a Coffee`
  }
}