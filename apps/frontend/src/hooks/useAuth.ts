// useAuth.ts

"use client"; // Important pour utiliser les hooks React

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/authApi";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  loading: boolean;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  const router = useRouter();

  // Vérifier l'état d'authentification au montage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ isAuthenticated: true, user: "Utilisateur", loading: false });
    } else {
      setAuth({ isAuthenticated: false, user: null, loading: false });
    }
  }, []);

  // Déconnexion
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      setAuth({ isAuthenticated: false, user: null, loading: false });
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return { ...auth, handleLogout };
};
