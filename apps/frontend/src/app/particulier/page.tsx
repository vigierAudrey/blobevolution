"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginFormParticulier from "@components/particulier/LoginFormParticulier";
import RegisterFormParticulier from "@components/particulier/RegisterFormParticulier";
import { logout } from "@utils/authApi";
import { useAuth } from "@/hooks/useAuth"; // 



export default function Particulier() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      alert('Déconnexion réussie !');
      router.push('/'); // Redirection vers la page d'accueil après déconnexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert('Échec de la déconnexion, veuillez réessayer.');
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Accès Particulier</h2>
      {isFirstVisit ? <RegisterFormParticulier /> : <LoginFormParticulier />}
      <button
        className="mt-4 text-blue-600 underline"
        onClick={() => setIsFirstVisit(!isFirstVisit)}
      >
        {isFirstVisit ? 'Déjà un compte ? Connectez-vous' : 'Première visite ? Inscrivez-vous'}
      </button>
      <button 
        onClick={handleLogout}  
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Déconnexion
      </button>
    </div>
  );
}
