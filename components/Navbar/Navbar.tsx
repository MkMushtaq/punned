"use client"
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'
import { useAuth } from "@/app/context/AuthProvider";
import { Loader2 } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { JSX, SVGProps } from "react";

export default function Navbar() {
    const router = useRouter()
    const { user: currentUser, loading: isAuthLoading } = useAuth();

    return (
        <div className="flex justify-between py-3">
            <div className="text-3xl cursor-pointer font-bold" onClick={() => { router.push('/home') }}>Punned</div>

            <div className="hidden md:flex gap-4">
                <Button variant="link" className="text-xl text-foreground" onClick={() => { router.push('/') }}>About</Button>
                <Button variant="link" className="text-xl text-foreground" onClick={() => { router.push('/home') }}>Post wall</Button>
            </div>
            <div className="hidden md:flex">
                {currentUser ? <Button className="text-md rounded-full text-[#212121]" onClick={() => router.push('/post')}>Post</Button> :
                    <Button disabled={isAuthLoading} className="text-md rounded-full min-w-[80px] text-[#212121]" onClick={() => router.push('/login')}>{isAuthLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Login'} </Button>
                }
            </div>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col ">
                    <Button variant="link" className="text-xl text-foreground">About</Button>
                    <Button variant="link" className="text-xl text-foreground" onClick={() => { router.push('/home') }}>Post wall</Button>
                    {currentUser ? <Button className="text-md rounded-full mx-auto max-w-[100px] text-[#212121]" onClick={() => router.push('/post')}>Post</Button> :
                        <Button disabled={isAuthLoading} className="text-md rounded-full min-w-[30px] text-[#212121]" onClick={() => router.push('/login')}>{isAuthLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Login'} </Button>
                    }
                </SheetContent>
            </Sheet>
        </div>
    );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}
