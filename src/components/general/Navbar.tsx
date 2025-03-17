import Link from 'next/link'
import React from 'react'
import logo from "../../../public/assets/logo.png";
import Image from 'next/image';
import { Button, buttonVariants } from '../ui/button';
import { ThemeToggle } from './ThemeToggle';
import { auth, signOut } from '@/app/utils/auth';
import UserDropdown from './userDropdown';
export default async function Navbar() {
  const session = await auth();
  return (
    <nav className='flex items-center justify-between py-5'>
        <Link href="/" className='flex  items-center gap-2'>
        <Image src={logo} height={25} width={25} alt="logo"/>
        <h1 className='text-2xl font-bold '>Hired<span className='text-primary'>Up</span></h1>
        </Link>
         {/* Desktop navigation */}
       <div className="hidden md:flex items-center gap-5">
        <ThemeToggle/>
        <Link className={buttonVariants({size: "lg"})}  href="/post-jobs">
        Post job
        </Link>
        <div className='flex items-center gap-4'>
            {
              session?.user  ? (
               <UserDropdown email={session?.user.email as string} image={session?.user.image as string} name={session?.user.name as string}/>
              ): (
          <Link href="/login" className={buttonVariants({variant: "outline" , size:"lg"})}>
            Login
          </Link>
              )
            }
        </div>
       </div>
    </nav>
  )
}
