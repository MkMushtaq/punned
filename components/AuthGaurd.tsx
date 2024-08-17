import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils"
export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    className?: string;
}

export const LoadingSpinner = ({
    size = 24,
    className,
    ...props
}: ISVGProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("animate-spin", className)}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
};

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {

            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setIsAuthenticated(true);
            }

            setLoading(false);
        };
        checkAuth();

        const getJWTToken = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session?.access_token) {
                return data.session?.access_token
            }
        }

        getJWTToken();

    }, [supabase.auth]);

    if (loading) {
        return <div className='flex items-center justify-center' ><LoadingSpinner /></div>
    }

    if (!isAuthenticated) {
        router.push('/login')
        return;
    }

    return <>{children}</>;
};

export default AuthGuard;
