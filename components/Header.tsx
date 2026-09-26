"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { cn, getInitials } from "@/lib/utils"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Session } from 'next-auth';

const Header = ({ session }: { session: Session }) => {
    const pathName = usePathname()
    return (
        <header className='my-10 flex justify-between gap-5 w-[90vw] '>
            <Link href="/">
                <Image src="/icons/logo.svg" alt='logo' width={40} height={40} />
            </Link>

            <ul className='flex flex-row items-center gap-8'>
                <li>
                    <Link href="/" className={cn(
                        'text-base cursor-pointer capitalize',
                        pathName === "/" ? "text-amber-100" : "text-light-100"
                    )}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/search" className={cn(
                        'text-base cursor-pointer capitalize',
                        pathName === "/search" ? "text-amber-200" : "text-light-100"
                    )}
                    >
                        Search
                    </Link>
                </li>

                <li>
                    <Link href={"/my-profile"} className='flex gap-3 items-center'>
                        <Avatar className="bg-amber-100">
                            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                            <AvatarFallback className="text-gray-800">{getInitials(session?.user?.name || "User")} </AvatarFallback>

                        </Avatar>
                            <p className='text-light-100'>{session?.user?.name}</p>
                    </Link>
                </li>

                
            </ul>
        </header >
    )
}

export default Header