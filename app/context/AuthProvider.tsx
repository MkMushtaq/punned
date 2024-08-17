'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    loading: boolean;
    user: any;
    accessToken: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [accessToken, setAccessToken] = useState<string>('');
    const supabase = createClient();

    useEffect(() => {
        // Check authentication status (this is just a placeholder, implement your own logic)
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            }
            setLoading(false);
        };

        const getAccessToken = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session?.access_token) {
                setAccessToken(data.session?.access_token)
                return data.session?.access_token
            }
        }
        checkAuth();
        getAccessToken();

    }, [supabase.auth]);

    const login = () => {
        // Implement login logic
        localStorage.setItem('token', 'dummy-token');
        setIsAuthenticated(true);
        // router.push('/dashboard');
    };

    const logout = () => {
        // Implement logout logic
        localStorage.removeItem('token');
        setIsAuthenticated(false);

        // router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, user, login, logout, accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };