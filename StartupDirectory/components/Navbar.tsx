import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {

    const session = await auth()

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={50} height={50} />
                </Link>

                <div className="flex items-center gap-5">
                    { session && session?.user ? (
                        <>
                            <Link href="/startup/create"> 
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden" /> 
                            </Link>
                            <form action={async ()=>{
                                'use server'
                                await signOut({redirectTo:"/"});
                            }}>
                                <button type="submit"> 
                                    <span className="max-sm:hidden">Logout</span>
                                    <LogOut className="size-6 sm:hidden text-red-500" />
                                </button>
                            </form>
                            <Link href={`user/${session?.id}`}> 
                                <Avatar className="size-10">
                                    <AvatarImage
                                        src={session?.user?.image || ""}
                                        alt={session?.user?.name || ""}
                                    />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                    ) : (
                        <>
                            <form action={async () => {
                                'use server';
                                await signIn("github");
                            }}>
                                <button type="submit"> 
                                    <span className="flex justify-content-bottom"> 
                                        <Image src="/login.png" alt="login" width={25} height={25} /> &nbsp; Login 
                                    </span> 
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </nav>
        </header>

    )
};

export default Navbar;
