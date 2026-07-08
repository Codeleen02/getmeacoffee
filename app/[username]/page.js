import React from 'react'
import PaymentPage from '@/components/PaymentPage'

export default async function Username({ params }) {
  const { username } = await params;
  return <PaymentPage username={username} />;
}
export const metadata = {
    title:"Login - Get me a coffee"
}