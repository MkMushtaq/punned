'use client'
import AuthGuard from "@/components/AuthGaurd";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <section>
                {children}
            </section>
        </AuthGuard>
    );
}