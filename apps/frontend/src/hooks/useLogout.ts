import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
    const { setAuth } = useAuthContext();
    const router = useRouter();

    const logout = useCallback(() => {
        // Clear authentication data
        setAuth(null);

        // Optionally clear localStorage/sessionStorage
        localStorage.removeItem('authToken');

        // Redirect to login page␊
        router.push('/login');
    }, [setAuth, router]);

    return logout;
};

export default useLogout;