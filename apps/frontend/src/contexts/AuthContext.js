import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Au démarrage, on recharge le token dans localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { id, role, exp } = jwtDecode(token);
      if (Date.now() < exp * 1000) {
        setUser({ id, role, token });
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const { id, role } = jwtDecode(token);
    setUser({ id, role, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
