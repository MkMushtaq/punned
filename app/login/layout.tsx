'use client'
import { useAuth } from "../context/AuthProvider";
import { useRouter } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const route = useRouter();
    if (isAuthenticated) {
        route.push('/home');
    }

    return (
        <div className="">
            {children}
        </div>
    );
}