import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ChevronDown, Heart, Layers2, LogOut } from 'lucide-react'
import Link from 'next/link'
import { signOut } from '@/app/utils/auth'

interface iAppProps{
    email: string;
    name: string;
    image: string; 
}

export default function UserDropdown({email, name, image}: iAppProps) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className='h-auto p-0 hover:bg-transparent ' variant="ghost">
                <Avatar>
                    <AvatarImage src={image} alt="Profile"/>
                    <AvatarFallback>
                         {name.charAt(0 )}
                    </AvatarFallback>
                </Avatar>

                <ChevronDown size={16} strokeWidth={2} className='ml-2 opacity-60'/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-50  ' align="end">
            <DropdownMenuLabel className='flex flex-col'>
                <span className="text-sm font-medium text-foreground">{name}</span>
                <span className="text-sm font-medium text-foreground">{email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup> 
                <DropdownMenuItem asChild>
                    <Link href="/favorites">
                    <Heart size={16} strokeWidth={2} className="opacity-60"/>
                    <span>Favourite jobs</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/my-jobs">
                    <Layers2 size={16} strokeWidth={2} className="opacity-60"/>
                    <span>My job listings</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator/>
            <DropdownMenuItem asChild>
                <form action={ async() => {
                    "use server"
                    await signOut({
                        redirectTo: "/"
                    });
                }}>
                    <button className="flex w-full items-center gap-2">
                        <LogOut size={16} strokeWidth={2} className="opacity-60"/>
                        <span>Logout</span>
                    </button>
                </form>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
