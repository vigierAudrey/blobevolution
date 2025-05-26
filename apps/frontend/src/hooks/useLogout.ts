import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
    const { setAuth } = useAuthContext();
    const navigate = useNavigate();

    const logout = useCallback(() => {
        // Clear authentication data
        setAuth(null);

        // Optionally clear localStorage/sessionStorage
        localStorage.removeItem('authToken');

        // Redirect to login page
        navigate('/login');
    }, [setAuth, navigate]);

    return logout;
};

export default useLogout;