import Link from 'next/link'
import React from 'react'
import logo from "../../../public/assets/logo.png";
import Image from 'next/image';
import { Button, buttonVariants } from '../ui/button';
import { ThemeToggle } from './ThemeToggle';
import { auth, signOut } from '@/app/utils/auth';
export default async function Navbar() {
  const session = await auth();
  return (
    <div className='flex items-center justify-between py-5'>
        <Link href="/" className='flex  items-center gap-2'>
        <Image src={logo} height={25} width={25} alt="logo"/>
        <h1 className='text-2xl font-bold '>Hired<span className='text-primary'>Up</span></h1>
        </Link>
        <div className='flex items-center gap-4'>
            <ThemeToggle/>
            {
              session?.user  ? (
                <form action={async () => {
                   "use server"
                   await signOut({redirectTo: "/"})
                }}>
            <Button variant="secondary" className='bg-yellow-400'>
            Log Out
            </Button>
                </form>
               
              ): (
          <Link href="/login" className={buttonVariants({variant: "outline" , size:"lg"})}>
            Login
          </Link>
              )
            }
        
        </div>
       
    </div>
  )
}
