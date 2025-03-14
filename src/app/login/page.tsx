import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../../../public/assets/logo.png";
import LoginForm from '@/components/forms/login-form';
export default function Login() {
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'> 
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Link href="/" className='flex gap-3 items-center self-center'>
        <Image src={logo} alt="logo" className='size-10'/>
        <h1 className='text-2xl font-bold'>Hired<span className='text-yellow-400'>Up</span></h1>
        </Link>
        <LoginForm/>
      </div>
      </div>
  )
}
